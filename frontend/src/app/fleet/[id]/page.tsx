"use client";
import { useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock database fetch (In production, this would be a real API call to your backend)
const MASTER_FLEET = [
  { id: "1", name: "911 Carrera GTS", brand: "Porsche", category: "Sport", pricePerDay: 350, hp: 473, topSpeed: 193, zeroToSixty: 3.2, transmission: "Automatic", seats: 4, fuel: "Petrol" },
  { id: "2", name: "Escalade Platinum", brand: "Cadillac", category: "SUV", pricePerDay: 280, hp: 420, topSpeed: 130, zeroToSixty: 5.9, transmission: "Automatic", seats: 7, fuel: "Petrol" },
  { id: "3", name: "Taycan Turbo S", brand: "Porsche", category: "Luxury", pricePerDay: 390, hp: 750, topSpeed: 161, zeroToSixty: 2.6, transmission: "Automatic", seats: 4, fuel: "Electric" },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CarDetailsPage({ params }: PageProps) {
  // Next.js 15 Requirement: Safely unwrap the async params Promise using React.use()
  const resolvedParams = use(params);
  
  // State for the booking panel
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Find the specific car using the unwrapped ID parameter
  const car = MASTER_FLEET.find((c) => c.id === resolvedParams.id) || MASTER_FLEET[0];

  // Calculate estimated price based on dates (Mock logic)
  const days = pickupDate && returnDate ? 3 : 1; // Hardcoded to 3 days for UI demo purposes
  const subtotal = car.pricePerDay * days;
  const taxes = Math.round(subtotal * 0.1); // 10% mock tax
  const total = subtotal + taxes;

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 text-xs font-bold uppercase tracking-wider text-brand-muted">
          <Link href="/fleet" className="hover:text-brand-red transition-colors">Fleet</Link>
          <span className="mx-2">/</span>
          <Link href={`/fleet`} className="hover:text-brand-red transition-colors">{car.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-charcoal">{car.brand} {car.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Car Visuals & Details */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Main Header */}
            <div>
              <p className="text-sm font-extrabold text-brand-red uppercase tracking-widest mb-1">{car.brand}</p>
              <h1 className="text-4xl sm:text-5xl font-black text-brand-charcoal tracking-tight">{car.name}</h1>
            </div>

            {/* High-Fidelity Image Placeholder */}
            <div className="w-full aspect-video bg-brand-white border border-gray-200 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-xl shadow-gray-200/50">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              <p className="text-brand-muted font-mono font-bold tracking-widest z-10 text-center">
                [ HIGH-RES {car.brand.toUpperCase()} IMAGE HERE ]
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <section className="bg-brand-white border border-gray-100 rounded-2xl p-8 shadow-md shadow-gray-200/20">
              <h2 className="text-xl font-bold text-brand-charcoal mb-6 border-b border-gray-100 pb-4">Performance & Specs</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Horsepower</p>
                  <p className="text-xl font-black text-brand-charcoal">{car.hp} <span className="text-xs font-bold text-brand-red">HP</span></p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">0 - 60 MPH</p>
                  <p className="text-xl font-black text-brand-charcoal">{car.zeroToSixty} <span className="text-xs font-bold text-brand-red">SEC</span></p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Top Speed</p>
                  <p className="text-xl font-black text-brand-charcoal">{car.topSpeed} <span className="text-xs font-bold text-brand-red">MPH</span></p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Powertrain</p>
                  <p className="text-xl font-black text-brand-charcoal">{car.fuel}</p>
                </div>

              </div>
            </section>

            {/* Features List */}
            <section className="bg-brand-white border border-gray-100 rounded-2xl p-8 shadow-md shadow-gray-200/20">
              <h2 className="text-xl font-bold text-brand-charcoal mb-6 border-b border-gray-100 pb-4">Included Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-brand-charcoal">
                <div className="flex items-center gap-2">✅ Apple CarPlay / Android Auto</div>
                <div className="flex items-center gap-2">✅ Premium Surround Sound</div>
                <div className="flex items-center gap-2">✅ GPS Navigation</div>
                <div className="flex items-center gap-2">✅ Leather Sport Seating</div>
                <div className="flex items-center gap-2">✅ Comprehensive Insurance</div>
                <div className="flex items-center gap-2">✅ 24/7 Roadside Assistance</div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-brand-charcoal text-brand-white rounded-2xl p-6 md:p-8 shadow-2xl shadow-gray-900/50 border border-gray-800">
              
              <div className="flex items-end gap-2 mb-6 border-b border-gray-700 pb-6">
                <span className="text-4xl font-black tracking-tighter">${car.pricePerDay}</span>
                <span className="text-sm font-bold text-gray-400 mb-1">/ day</span>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pick-up Date</label>
                  <input 
                    type="date" 
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-brand-white rounded-lg px-4 py-3 text-sm focus:outline-hidden focus:border-brand-red font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Return Date</label>
                  <input 
                    type="date" 
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-brand-white rounded-lg px-4 py-3 text-sm focus:outline-hidden focus:border-brand-red font-medium"
                  />
                </div>

                {/* Price Calculation Breakdown */}
                <div className="pt-4 space-y-3 border-t border-gray-700">
                  <div className="flex justify-between text-sm font-medium text-gray-300">
                    <span>${car.pricePerDay} x {days} days</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-300">
                    <span>Taxes & Fees</span>
                    <span>${taxes}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-brand-white pt-2">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                <Link 
                  href="/auth"
                  className="w-full mt-6 py-4 bg-brand-red text-brand-white font-black rounded-lg hover:bg-brand-red/90 text-center block uppercase tracking-wide transition-all shadow-lg shadow-red-600/20"
                >
                  Sign In to Reserve
                </Link>
                
                <p className="text-center text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-4">
                  Account registration required
                </p>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}