"use client";
import { useState } from "react";

export default function Hero() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", { pickupLocation, dropoffLocation, pickupDate, returnDate });
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-brand-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Sporty Red Accent Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red-light/40 rounded-full blur-3xl -z-10" />

      {/* 1. Header Pitch Area */}
      <div className="text-center max-w-3xl mx-auto space-y-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red-light rounded-full border border-red-100 text-brand-red text-xs font-bold uppercase tracking-wider">
          Experience Excellence
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-charcoal leading-tight">
          Drive The Luxury You <span className="text-brand-red">Deserve.</span>
        </h1>
        <p className="text-brand-muted text-base sm:text-lg max-w-2xl mx-auto">
          Pristine supercars, elite SUVs, and premium sedans waiting for your command. Impeccable service, locked-in rates, and zero friction.
        </p>
      </div>

      {/* 2. Unified Tri-Component Booking Bar (Airbnb Style) */}
      <div className="w-full max-w-5xl mx-auto">
        <form 
          onSubmit={handleSearch} 
          className="bg-brand-white border border-gray-200/80 rounded-2xl md:rounded-full shadow-xl shadow-gray-200/50 p-3 md:p-2 grid grid-cols-1 md:grid-cols-12 items-center gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100"
        >
          {/* Left Component: Pick-up Location */}
          <div className="md:col-span-3 px-5 py-3 md:py-2 flex flex-col justify-center text-left">
            <label className="text-xs font-extrabold uppercase text-brand-charcoal tracking-wider mb-1">
              Pick-up Location
            </label>
            <div className="relative">
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
                className="w-full bg-transparent text-brand-charcoal font-medium text-sm focus:outline-hidden appearance-none cursor-pointer pr-4"
              >
                <option value="" disabled hidden>Where to start?</option>
                <option value="los-angeles">Los Angeles (LAX)</option>
                <option value="miami">Miami Downtown</option>
                <option value="new-york">New York Manhattan</option>
                <option value="las-vegas">Las Vegas Strip</option>
              </select>
            </div>
          </div>

          {/* Center Component: Airbnb Style Integrated Calendar Inputs */}
          <div className="md:col-span-5 px-5 py-3 md:py-2 grid grid-cols-2 gap-4 text-left">
            <div className="flex flex-col justify-center">
              <label className="text-xs font-extrabold uppercase text-brand-charcoal tracking-wider mb-1">
                Pick-up Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
                className="w-full bg-transparent text-brand-charcoal font-medium text-sm focus:outline-hidden cursor-pointer"
              />
            </div>
            <div className="flex flex-col justify-center">
              <label className="text-xs font-extrabold uppercase text-brand-charcoal tracking-wider mb-1">
                Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
                className="w-full bg-transparent text-brand-charcoal font-medium text-sm focus:outline-hidden cursor-pointer"
              />
            </div>
          </div>

          {/* Right Component: Drop-off Location */}
          <div className="md:col-span-3 px-5 py-3 md:py-2 flex flex-col justify-center text-left">
            <label className="text-xs font-extrabold uppercase text-brand-charcoal tracking-wider mb-1">
              Drop-off Location
            </label>
            <div className="relative">
              <select
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                required
                className="w-full bg-transparent text-brand-charcoal font-medium text-sm focus:outline-hidden appearance-none cursor-pointer pr-4"
              >
                <option value="" disabled hidden>Where to leave it?</option>
                <option value="los-angeles">Los Angeles (LAX)</option>
                <option value="miami">Miami Downtown</option>
                <option value="new-york">New York Manhattan</option>
                <option value="las-vegas">Las Vegas Strip</option>
              </select>
            </div>
          </div>

          {/* Search Button Wrap */}
          <div className="md:col-span-1 p-2 md:p-0 flex items-center justify-center">
            <button
              type="submit"
              className="w-full md:w-14 md:h-14 bg-brand-red text-brand-white font-bold rounded-xl md:rounded-full hover:bg-brand-red-hover transition-all duration-200 flex items-center justify-center shadow-md shadow-red-600/20 group cursor-pointer py-3 md:py-0"
              aria-label="Search Flights"
            >
              {/* Sleek magnifying glass vector */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 transform group-hover:scale-110 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Subtle Trust Footnote */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-12 text-xs text-brand-muted font-semibold tracking-wider uppercase">
        <div className="flex items-center gap-1.5">⚡ Instant Confirmations</div>
        <div className="flex items-center gap-1.5">🛡️ Premium Insurance Included</div>
        <div className="flex items-center gap-1.5">💎 5-Star Rated Experience</div>
      </div>
    </section>
  );
}