"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, { MapRef, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  X,
  Check,
  Search,
  Loader2,
  Navigation,
  Compass,
  LocateFixed,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils";

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
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setIsGeocoding(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`,
        { signal: controller.signal }
      );
      const data = await response.json();
      clearTimeout(timeout);

      const admin = data.localityInfo?.administrative || [];
      const findLevel = (lvl: number) => admin.find((a: any) => a.adminLevel === lvl)?.name;

      const jalan = data.localityInfo?.informative?.find((i: any) => i.description === "street")?.name || data.locality || "";
      const desa = findLevel(8) || findLevel(7) || "";
      const kecamatan = findLevel(6) || "";
      const kabupaten = findLevel(5) || findLevel(4) || "";

      const parts = [jalan, desa, kecamatan, kabupaten].filter((v, i, arr) => v && arr.indexOf(v) === i);
      setAddress(parts.join(", ") || "Lokasi tanpa nama jalan");
    } catch (error) {
      setAddress("Gagal memuat alamat presisi");
    } finally {
      setIsGeocoding(false);
    }
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedSearch || debouncedSearch.length < 3) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await fetch(`https://photon.komoot.io/api?q=${encodeURIComponent(debouncedSearch)}&limit=5`);
        const data = await res.json();
        const formatted = (data.features || []).map((f: any) => {
          const p = f.properties;
          const label = [p.name, p.street, p.district, p.city].filter(Boolean).join(", ");
          return {
            place_id: p.osm_id || Math.random(),
            display_name: label,
            lat: f.geometry.coordinates[1].toString(),
            lon: f.geometry.coordinates[0].toString(),
          };
        });
        setSuggestions(formatted);
      } catch (error) {
        console.error(error);
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
  }, [isOpen, mounted, viewState.latitude, viewState.longitude, reverseGeocode]);

  const goToPlace = (item: Suggestion) => {
    setViewState((prev) => ({
      ...prev,
      longitude: parseFloat(item.lon),
      latitude: parseFloat(item.lat),
      zoom: 17,
    }));
    setSuggestions([]);
    setSearchQuery("");
  };

  if (!isOpen || !mounted) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        className="fixed inset-0 z-[9999] bg-white flex flex-col overflow-hidden"
      >
        {/* Header UI */}
        <div className="absolute top-0 inset-x-0 z-[101] p-6 flex flex-col items-center gap-4 pointer-events-none">
          <div className="w-full max-w-xl flex items-center gap-3 pointer-events-auto">
            <div className="relative flex-1 group">
              <div className="bg-white/90 backdrop-blur-2xl shadow-2xl rounded-[1.5rem] border border-[#F0EDE6] flex items-center p-1.5 transition-all focus-within:ring-4 focus-within:ring-[#D4AF97]/10">
                <div className="pl-4 text-[#D4AF97]">
                  {isSearching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari lokasi acara..."
                  className="flex-1 h-11 px-3 bg-transparent outline-none text-sm font-bold text-[#2C2C2C] placeholder:text-[#9B9B9B] placeholder:font-medium"
                />
              </div>

              {/* Suggestions */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl border border-[#F0EDE6] rounded-[2rem] shadow-2xl overflow-hidden p-2"
                  >
                    {suggestions.map((item) => (
                      <button
                        key={item.place_id}
                        onClick={() => goToPlace(item)}
                        className="w-full p-4 flex items-start gap-4 hover:bg-[#FDFCFB] rounded-2xl text-left transition-all group"
                      >
                        <div className="bg-[#FDFCFB] p-2.5 rounded-xl text-[#D4AF97] group-hover:bg-[#D4AF97] group-hover:text-white transition-all shrink-0">
                          <Compass size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-[#2C2C2C] truncate uppercase tracking-tight">
                            {item.display_name.split(",")[0]}
                          </p>
                          <p className="text-[10px] text-[#9B9B9B] font-medium truncate mt-0.5">
                            {item.display_name.split(",").slice(1).join(",")}
                          </p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={onClose}
              className="size-14 bg-white/90 backdrop-blur-2xl shadow-xl rounded-2xl border border-[#F0EDE6] flex items-center justify-center text-[#2C2C2C] hover:text-rose-500 transition-colors pointer-events-auto active:scale-90"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Engine */}
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="https://tiles.openfreemap.org/styles/bright"
          style={{ width: "100%", height: "100%" }}
          ref={mapRef}
        >
          <div className="absolute bottom-32 right-6 flex flex-col gap-2">
            <button 
                onClick={() => navigator.geolocation.getCurrentPosition((p) => mapRef.current?.flyTo({ center: [p.coords.longitude, p.coords.latitude], zoom: 16 }))}
                className="size-12 bg-white shadow-xl rounded-xl flex items-center justify-center text-[#2C2C2C] border border-[#F0EDE6] active:bg-slate-50"
            >
              <LocateFixed size={20} />
            </button>
            <NavigationControl showCompass={false} />
          </div>
        </Map>

        {/* Center Marker Pin */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative mb-12 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative drop-shadow-2xl"
            >
              <MapPin size={52} className="text-[#D4AF97] fill-[#D4AF97]/20 stroke-[2.5]" />
              <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#D4AF97]" />
            </motion.div>
            <div className="w-4 h-1.5 bg-black/10 blur-[2px] rounded-full mt-1 scale-x-150" />
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="absolute bottom-0 inset-x-0 z-[101] p-8 flex flex-col items-center pointer-events-none">
          <div className="w-full max-w-xl flex flex-col gap-4 pointer-events-auto">
            <motion.div 
              layout
              className="bg-white/90 backdrop-blur-2xl shadow-2xl rounded-[2rem] border border-[#F0EDE6] p-5 flex items-center gap-5"
            >
              <div className={cn(
                "size-12 rounded-2xl flex items-center justify-center transition-colors",
                isGeocoding ? "bg-amber-50 text-amber-500" : "bg-[#FDFCFB] text-[#D4AF97]"
              )}>
                {isGeocoding ? <Loader2 size={20} className="animate-spin" /> : <Navigation size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#9B9B9B]">Detail Alamat Terpilih</span>
                <p className="text-sm font-black text-[#2C2C2C] leading-tight line-clamp-2 mt-0.5">
                  {address}
                </p>
              </div>
            </motion.div>

            <button
              onClick={() => {
                const gmapsUrl = `https://www.google.com/maps?q=${viewState.latitude},${viewState.longitude}`;
                onConfirm({ address, link: gmapsUrl });
                onClose();
              }}
              disabled={isGeocoding}
              className="group w-full bg-[#2C2C2C] hover:bg-black disabled:bg-slate-400 text-white h-16 rounded-[2rem] shadow-2xl flex items-center justify-center gap-4 transition-all active:scale-[0.98]"
            >
              <div className="size-8 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Check size={18} className="text-[#D4AF97]" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.4em]">Simpan Lokasi Ini</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}