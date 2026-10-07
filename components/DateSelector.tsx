"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Users, ArrowRight, Check } from "lucide-react";

export interface DateSelectorProps {
  className?: string;
  variant?: "floating" | "inline";
  onBookNow?: (details: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }) => void;
}

export default function DateSelector({
  className = "",
  variant = "floating",
  onBookNow,
}: DateSelectorProps) {
  const [today, setToday] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    setToday(todayStr);
    setCheckIn(todayStr);
    setCheckOut(tomorrowStr);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onBookNow) {
      onBookNow({ checkIn, checkOut, adults, children: childrenCount });
    } else {
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 4000);
    }
  };

  const containerStyles =
    variant === "floating"
      ? "w-full max-w-5xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-4 md:p-6"
      : "w-full bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 p-4 md:p-5";

  return (
    <div className={`${containerStyles} ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
      >
        {/* Check-In */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="check-in-date"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300"
          >
            <Calendar className="w-4 h-4 text-amber-600" />
            Check-In
          </label>
          <div className="relative">
            <input
              id="check-in-date"
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
        </div>

        {/* Check-Out */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="check-out-date"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300"
          >
            <Calendar className="w-4 h-4 text-amber-600" />
            Check-Out
          </label>
          <div className="relative">
            <input
              id="check-out-date"
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
        </div>

        {/* Guests selector */}
        <div className="flex flex-col gap-1.5 relative">
          <label
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300"
          >
            <Users className="w-4 h-4 text-amber-600" />
            Guests
          </label>
          <button
            type="button"
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
            className="w-full px-3.5 py-2.5 text-sm font-medium text-left bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none flex items-center justify-between"
          >
            <span>
              {adults} Adult{adults > 1 ? "s" : ""}{" "}
              {childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? "ren" : ""}` : ""}
            </span>
            <span className="text-xs text-slate-400">▾</span>
          </button>

          {/* Guest Popover */}
          {isGuestDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 z-30 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Adults</div>
                  <div className="text-[11px] text-slate-500">Ages 13+</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={adults <= 1}
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-sm disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{adults}</span>
                  <button
                    type="button"
                    disabled={adults >= 10}
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Children</div>
                  <div className="text-[11px] text-slate-500">Ages 0-12</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={childrenCount <= 0}
                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                    className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-sm disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{childrenCount}</span>
                  <button
                    type="button"
                    disabled={childrenCount >= 8}
                    onClick={() => setChildrenCount(childrenCount + 1)}
                    className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsGuestDropdownOpen(false)}
                className="mt-1 w-full py-1.5 text-xs font-semibold text-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div>
          <button
            type="submit"
            className="w-full h-[44px] bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold tracking-wider text-xs md:text-sm uppercase rounded-lg shadow-lg hover:shadow-amber-600/30 transition-all duration-300 flex items-center justify-center gap-2 focus:ring-2 focus:ring-amber-500 active:scale-[0.98]"
          >
            {bookingSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Redirecting...</span>
              </>
            ) : (
              <>
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Booking confirmation notice */}
      {bookingSuccess && (
        <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-200 text-center animate-fade-in">
          Searching availability for {checkIn} to {checkOut} ({adults} adult{adults > 1 ? "s" : ""}). Call Reservation (+639171264937) for instant confirmation!
        </div>
      )}
    </div>
  );
}
