"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, { MapRef, NavigationControl, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  X,
  Check,
  Search,
  Loader2,
  Navigation,
  Target,
} from "lucide-react";
import { useDebounce } from "use-debounce";

interface MapPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { address: string; link: string }) => void;
}

interface Suggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export default function MapPicker({
  isOpen,
  onClose,
  onConfirm,
}: MapPickerProps) {
  const [mounted, setMounted] = useState(false);
  const [viewState, setViewState] = useState({
    latitude: -6.2088,
    longitude: 106.8456,
    zoom: 15,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 600);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [address, setAddress] = useState("Mencari lokasi...");
  const [isGeocoding, setIsGeocoding] = useState(false);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setViewState((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          })),
        () => {},
      );
    }
  }, []);

  // Reverse Geocoding using BigDataCloud with more detailed administrative mapping
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setIsGeocoding(true);

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`,
        { signal: controller.signal },
      );

      const data = await response.json();

      const admin = data.localityInfo?.administrative || [];
      const findLevel = (lvl: number) =>
        admin.find((a: any) => a.adminLevel === lvl)?.name;

      const jalan =
        data.localityInfo?.informative?.street || data.locality || "";

      const desa = findLevel(8) || findLevel(9) || data.locality;
      const kecamatan = findLevel(7) || findLevel(6);
      const kabupaten = findLevel(6) || findLevel(5);
      const provinsi = findLevel(4);
      const pos = data.postcode || "";

      const parts = [jalan, desa, kecamatan, kabupaten, provinsi, pos].filter(
        (v, i, arr) => v && arr.indexOf(v) === i,
      );

      setAddress(parts.join(", ") || "Alamat ditemukan");
    } catch (error) {
      console.error("Geocoding error:", error);
      setAddress("Gagal mengambil alamat (Check Connection)");
    } finally {
      setIsGeocoding(false);
    }
  }, []);

  // Search Places using Photon (Free & CORS-friendly)
  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedSearch || debouncedSearch.length < 3) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://photon.komoot.io/api?q=${encodeURIComponent(debouncedSearch)}&limit=5`,
        );
        const data = await res.json();
        // Adapt Photon data format to our Suggestion interface
        const formatted = (data.features || []).map((f: any) => {
          const p = f.properties;
          const label = [
            p.name,
            p.housenumber,
            p.street,
            p.district,
            p.city,
            p.state,
          ]
            .filter(Boolean)
            .join(", ");

          return {
            place_id: p.osm_id || Math.random(),
            display_name: label,
            lat: f.geometry.coordinates[1].toString(),
            lon: f.geometry.coordinates[0].toString(),
          };
        });
        setSuggestions(formatted);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    };
    handleSearch();
  }, [debouncedSearch]);

  useEffect(() => {
    if (isOpen && mounted) {
      reverseGeocode(viewState.latitude, viewState.longitude);
    }
  }, [
    isOpen,
    mounted,
    viewState.latitude,
    viewState.longitude,
    reverseGeocode,
  ]);

  const goToPlace = (item: Suggestion) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    setViewState((prev) => ({
      ...prev,
      longitude: lon,
      latitude: lat,
      zoom: 17,
    }));
    setSuggestions([]);
    setSearchQuery("");
  };

  if (!isOpen || !mounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-white flex flex-col font-sans"
      >
        {/* Floating Controller UI (mapcn-style) */}
        <div className="absolute top-0 inset-x-0 z-[1001] flex flex-col items-center gap-3 p-6">
          {/* Search Bar */}
          <div className="relative w-full max-w-xl group">
            <div className="bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl border border-white/40 flex items-center p-1.5 transition-all focus-within:ring-2 focus-within:ring-pink-200">
              <div className="pl-3 text-slate-400">
                {isSearching ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Search size={18} />
                )}
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari gedung, jalan, atau kota..."
                className="flex-1 h-10 px-3 bg-transparent outline-none text-sm text-slate-700 font-medium placeholder:text-slate-300"
              />
              <button
                onClick={onClose}
                className="p-2 mr-1 hover:bg-slate-100/50 rounded-xl text-slate-400 transition-colors"
                title="Tutup Peta"
              >
                <X size={20} />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
                >
                  <div className="max-h-[300px] overflow-y-auto px-2 py-2">
                    {suggestions.map((item) => (
                      <button
                        key={item.place_id}
                        onClick={() => goToPlace(item)}
                        className="w-full p-4 flex items-start gap-3.5 hover:bg-pink-50/50 rounded-2xl text-left transition-colors group"
                      >
                        <div className="bg-pink-100/50 p-2 rounded-xl text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors shrink-0 mt-0.5">
                          <MapPin size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-slate-700 truncate">
                            {item.display_name.split(",")[0]}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate mt-1 leading-relaxed">
                            {item.display_name.split(",").slice(1).join(",")}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Current Selection Bar */}
        </div>

        {/* mapcn engine (MapLibre) */}
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="https://tiles.openfreemap.org/styles/bright"
          style={{ width: "100%", height: "100%" }}
          ref={mapRef}
        >
          <NavigationControl position="bottom-right" />
        </Map>

        {/* Centered Floating Marker */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1000]">
          <div className="relative mb-14">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 blur-2xl bg-pink-500/30 rounded-full" />
              <MapPin
                size={56}
                className="text-pink-500 fill-pink-500/10 stroke-[2.5] relative"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-[3px] border-pink-500" />
            </motion.div>
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-5 h-2 bg-black/10 blur-[3px] rounded-full scale-x-150" />
          </div>
        </div>

        {/* Confirm Action Button */}
        <div className="absolute max-w-4xl bottom-0 left-0 right-0 mx-auto z-[1001] p-10 flex flex-col justify-center gap-4 pointer-events-none">
          <motion.div
            layout
            className="w-full bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl border border-white/40 p-4 flex items-center gap-4 group"
          >
            <div className="bg-slate-100 p-2.5 rounded-2xl text-slate-400 shrink-0">
              <Navigation
                size={18}
                className={isGeocoding ? "animate-pulse" : ""}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.25em] mb-1">
                Lokasi Presisi
              </p>
              <p className="text-[12px] font-semibold text-slate-600 leading-snug line-clamp-2 italic">
                {isGeocoding ? "Menarik data satelit..." : address}
              </p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const gmapsUrl = `https://www.google.com/maps?q=${viewState.latitude},${viewState.longitude}`;
              onConfirm({ address, link: gmapsUrl });
            }}
            disabled={isGeocoding}
            className="bg-slate-900 border border-slate-800 text-white px-12 py-5 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center gap-4 font-bold text-xs tracking-[0.3em] pointer-events-auto disabled:opacity-50 transition-all active:bg-black"
          >
            <div className="bg-green-500/20 p-1.5 rounded-full">
              <Check size={18} className="text-green-400" />
            </div>
            KONFIRMASI LOKASI
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
