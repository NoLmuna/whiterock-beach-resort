"use client";

import React, { useState } from "react";
import { X, Calendar, Users, Phone, Mail, CheckCircle2 } from "lucide-react";
import Button from "./Button";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialRoom = "Standard Room",
}: BookingModalProps) {
  const [today, setToday] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState(initialRoom);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [adults, setAdults] = useState("2");
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    setToday(todayStr);
    setCheckIn(todayStr);
    setCheckOut(tomorrowStr);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <h3 className="text-lg font-bold">Reserve Your Stay</h3>
            <p className="text-xs text-amber-400">Whiterock Beach Resort Direct Booking</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                Booking Request Received!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Thank you, <span className="font-semibold">{guestName || "Guest"}</span>. Our reservation team is preparing your booking for <span className="font-semibold">{roomType}</span> from {checkIn} to {checkOut}.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div>Direct Reservation Line: <strong>+63 917 126 4937</strong></div>
                <div>Sales Desk: <strong>+63 908 814 6956</strong></div>
                <div>Email: <strong>reservations@whiterock.com.ph</strong></div>
              </div>
              <Button onClick={onClose} variant="primary" className="w-full">
                Close Window
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                  Select Room / Accommodation
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Standard Room">Standard Room</option>
                  <option value="Superior Family Room">Superior Family Room</option>
                  <option value="Deluxe Room Pool View">Deluxe Room Pool View</option>
                  <option value="Deluxe Room With Balcony">Deluxe Room With Balcony</option>
                  <option value="Deluxe Family Room Pool View">Deluxe Family Room Pool View</option>
                  <option value="Beachfront Room">Beachfront Room</option>
                  <option value="Two-Bedroom Family Suite">Two-Bedroom Family Suite</option>
                  <option value="Standard Cabana">Standard Cabana</option>
                  <option value="Superior Cabana">Superior Cabana</option>
                  <option value="Beachfront Cabana">Beachfront Cabana</option>
                  <option value="One-Bedroom Villa">One-Bedroom Villa</option>
                  <option value="One-Bedroom Villa With Jacuzzi">One-Bedroom Villa With Jacuzzi</option>
                  <option value="3-Bedroom Villa With Whirlpool">3-Bedroom Villa With Whirlpool</option>
                  <option value="6-Bedroom Villa">6-Bedroom Villa</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                    Check-In
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maria Santos"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                    Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    placeholder="+63 9xx xxx xxxx"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="maria@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full mt-2">
                Submit Reservation Request
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
