"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
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

interface PhotonFeature {
  properties: {
    osm_id?: number;
    name?: string;
    city?: string;
    country?: string;
  };
  geometry: {
    coordinates: [number, number]; // [lng, lat]
  };
}

// Interface
interface MapPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    address: string;
    link: string;
    lat: number;
    lng: number;
  }) => void;
}

interface Suggestion {
  place_id: string;
  display_name: string;
  lat: number;
  lon: number;
}

// Komponen Internal untuk menangani pergerakan peta
function MapEventsHandler({
  onMove,
}: {
  onMove: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      onMove(center.lat, center.lng);
    },
  });
  return null;
}

// Komponen untuk menggerakkan kamera (FlyTo)
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapPicker({
  isOpen,
  onClose,
  onConfirm,
}: MapPickerProps) {
  const [mounted, setMounted] = useState(false);
  const [center, setCenter] = useState<[number, number]>([-6.2088, 106.8456]);

  // Debounce untuk koordinat agar tidak spam API saat peta digeser
  const [debouncedCenter] = useDebounce(center, 800);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 600);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [address, setAddress] = useState("Mencari lokasi...");
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Efek inisialisasi
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCenter([pos.coords.latitude, pos.coords.longitude]),
        () => console.warn("Akses lokasi ditolak"),
        { enableHighAccuracy: true },
      );
    }
  }, []);

  // Fungsi Reverse Geocode (Koordinat -> Alamat)
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setIsGeocoding(true);
    try {
      // Panggil API route yang baru saja kita buat
      const response = await fetch(`/api/geocode?lat=${lat}&lon=${lng}`);

      if (!response.ok) throw new Error("Gagal mengambil data");

      const data = await response.json();
      setAddress(data.display_name || "Lokasi tidak diketahui");
    } catch (error) {
      console.error("Geocoding Error:", error);
      setAddress("Gagal memuat alamat");
    } finally {
      setIsGeocoding(false);
    }
  }, []);

  // Hanya panggil API jika debouncedCenter berubah (pengguna berhenti menggeser peta)
  useEffect(() => {
    if (isOpen && mounted) {
      reverseGeocode(debouncedCenter[0], debouncedCenter[1]);
    }
  }, [debouncedCenter, isOpen, mounted, reverseGeocode]);

  // Fungsi Pencarian (Search Input)
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
        const formatted = (data.features || []).map((f: PhotonFeature) => ({
          place_id: f.properties.osm_id?.toString() || Math.random().toString(),
          display_name: [
            f.properties.name,
            f.properties.city,
            f.properties.country,
          ]
            .filter(Boolean)
            .join(", "),
          lat: f.geometry.coordinates[1],
          lon: f.geometry.coordinates[0],
        }));
        setSuggestions(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    };
    handleSearch();
  }, [debouncedSearch]);

  if (!isOpen || !mounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-white flex flex-col overflow-hidden"
      >
        {/* Search Bar UI */}
        <div className="absolute top-0 inset-x-0 z-[1001] p-6 flex flex-col items-center gap-4 pointer-events-none">
          <div className="w-full max-w-xl flex items-center gap-3 pointer-events-auto">
            <div className="relative flex-1">
              <div className="bg-white shadow-2xl rounded-2xl border border-slate-200 flex items-center p-1.5 focus-within:ring-2 ring-[#D4AF97]">
                <div className="pl-4 text-[#D4AF97]">
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
                  placeholder="Cari lokasi (cth: Grand Indonesia)..."
                  className="flex-1 h-11 px-3 bg-transparent outline-none text-sm font-semibold text-slate-800"
                />
              </div>

              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-2"
                  >
                    {suggestions.map((item) => (
                      <button
                        key={item.place_id}
                        onClick={() => {
                          setCenter([item.lat, item.lon]);
                          setSuggestions([]);
                          setSearchQuery("");
                        }}
                        className="w-full p-4 flex items-start gap-4 hover:bg-slate-50 rounded-xl text-left transition-all group"
                      >
                        <Compass className="text-slate-400 mt-1" size={16} />
                        <span className="text-sm text-slate-700 font-medium line-clamp-2">
                          {item.display_name}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={onClose}
              className="size-14 bg-white shadow-xl rounded-2xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-rose-500 transition-all active:scale-90"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Leaflet Engine */}
        <div className="flex-1 w-full h-full relative z-[1000]">
          <MapContainer
            center={center}
            zoom={15}
            zoomControl={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEventsHandler onMove={(lat, lng) => setCenter([lat, lng])} />
            <ChangeView center={center} />
          </MapContainer>

          <div className="absolute bottom-32 right-6 z-[1001] flex flex-col gap-2">
            <button
              onClick={() => {
                navigator.geolocation.getCurrentPosition((pos) => {
                  setCenter([pos.coords.latitude, pos.coords.longitude]);
                });
              }}
              className="size-12 bg-white shadow-xl rounded-xl flex items-center justify-center text-slate-700 border border-slate-200 active:bg-slate-50 pointer-events-auto"
            >
              <LocateFixed size={20} />
            </button>
          </div>
        </div>

        {/* Fixed Center Marker */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1001]">
          <div className="relative mb-10 flex flex-col items-center">
            <motion.div
              animate={isGeocoding ? { y: [0, -10, 0] } : { y: 0 }}
              transition={{ duration: 1, repeat: isGeocoding ? Infinity : 0 }}
              className="drop-shadow-2xl"
            >
              <MapPin
                size={48}
                className="text-[#D4AF97] fill-[#D4AF97]/20 stroke-[2.5]"
              />
            </motion.div>
            <div className="w-3 h-1 bg-black/20 blur-[1px] rounded-full mt-1" />
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="absolute bottom-0 inset-x-0 z-[1001] p-6 flex flex-col items-center pointer-events-none">
          <div className="w-full max-w-xl flex flex-col gap-4 pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border border-slate-200 p-5 flex items-center gap-4">
              <div
                className={cn(
                  "size-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                  isGeocoding
                    ? "bg-amber-50 text-amber-500"
                    : "bg-slate-50 text-[#D4AF97]",
                )}
              >
                {isGeocoding ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Navigation size={20} />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Lokasi Terpilih
                </p>
                <p className="text-sm font-bold text-slate-800 line-clamp-2 mt-0.5 leading-snug">
                  {isGeocoding ? "Mencari alamat..." : address}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const gmapsUrl = `https://www.google.com/maps?q=${center[0]},${center[1]}`;
                onConfirm({
                  address,
                  link: gmapsUrl,
                  lat: center[0],
                  lng: center[1],
                });
                onClose();
              }}
              disabled={isGeocoding}
              className="w-full bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white h-16 rounded-3xl shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              {isGeocoding ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Check size={20} className="text-[#D4AF97]" />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Konfirmasi Lokasi
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
