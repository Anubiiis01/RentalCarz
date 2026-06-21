"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MASTER_FLEET } from "@/data/fleetDb"; 

export default function FleetCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(1500); 

  // Memoized client-side query filter engine
  const filteredCars = useMemo(() => {
    return MASTER_FLEET.filter((car) => {
      const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = car.pricePerDay <= maxPrice;
      
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [selectedCategory, searchQuery, maxPrice]);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-brand-offwhite py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Banner Title */}
          <div className="mb-10 text-left space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
              The Showroom Floor
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-charcoal">
              Explore Our Absolute Fleet
            </h1>
            <p className="text-brand-muted text-sm font-medium">
              Filter through premium supercars, elite engineering, and white-glove luxury options.
            </p>
          </div>

          {/* Core Multi-Column Management Floor */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* LEFT SIDEBAR: Interactive Filters */}
            <aside className="bg-brand-white border border-gray-200/80 p-6 rounded-2xl shadow-xl shadow-gray-200/20 space-y-6 lg:sticky lg:top-24">
              
              {/* Filter Module 1: Live Input Search */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                  Search Model
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Porsche, AMG..."
                    className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal font-medium rounded-lg px-3.5 py-2.5 text-sm focus:outline-hidden focus:border-brand-red transition-all"
                  />
                </div>
              </div>

              {/* Filter Module 2: Category Switches */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-charcoal block mb-1">
                  Vehicle Type
                </label>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {["All", "Sport", "SUV", "Luxury"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-left rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-brand-red text-brand-white shadow-md shadow-red-600/10"
                          : "bg-brand-offwhite text-brand-charcoal border border-gray-100 hover:border-brand-red/30"
                      }`}
                    >
                      {cat} Vehicles
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Module 3: Price Ceiling Range */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                    Max Daily Rate
                  </label>
                  <span className="text-sm font-extrabold text-brand-red">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="180" 
                  max="1500" 
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-red bg-brand-offwhite h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-brand-muted font-bold">
                  <span>$180/D</span>
                  <span>$1500/D</span>
                </div>
              </div>

            </aside>

            {/* RIGHT REGION: Inline Map Renderer */}
            <div className="lg:col-span-3">
              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <div 
                      key={car.id} 
                      className="bg-brand-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
                    >
                      {/* IMAGE CONTAINER HEADER */}
                      <div className="relative w-full h-48 bg-brand-charcoal flex items-center justify-center overflow-hidden group">
                        {car.image ? (
                          <img 
                            src={car.image} 
                            alt={`${car.brand} ${car.name}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          // Dynamic fallback visual if no image URL is provided in fleetDb
                          <div className="text-center p-4">
                            <span className="text-3xl block mb-1">🏎️</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                              {car.imagePlaceholderText || car.name}
                            </span>
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-brand-charcoal/80 backdrop-blur-xs text-brand-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm">
                          {car.category}
                        </div>
                      </div>

                      {/* CARD DETAILS BODY */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-baseline justify-between">
                            <h2 className="text-lg font-black text-brand-charcoal truncate">
                              <span className="text-brand-muted font-medium text-sm block">{car.brand}</span>
                              {car.name}
                            </h2>
                            <div className="text-right shrink-0 pl-2">
                              <span className="text-lg font-black text-brand-red">${car.pricePerDay}</span>
                              <span className="text-gray-400 text-[10px] block font-bold uppercase tracking-wide">/ Day</span>
                            </div>
                          </div>
                          <p className="text-xs text-brand-muted line-clamp-2 mt-2 font-medium leading-relaxed">
                            {car.description}
                          </p>
                        </div>

                        {/* SPECS SUB-GRID (Pointing to specific fields like transmission, fuel type, and seats) */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-brand-charcoal/90 border-t border-gray-100 pt-3">
                          <div className="bg-brand-offwhite px-2.5 py-1.5 rounded-md flex justify-between">
                            <span className="text-gray-400">Gear:</span>
                            <span>{car.transmission}</span>
                          </div>
                          <div className="bg-brand-offwhite px-2.5 py-1.5 rounded-md flex justify-between">
                            <span className="text-gray-400">Fuel:</span>
                            <span>{car.fuelType}</span>
                          </div>
                          <div className="bg-brand-offwhite px-2.5 py-1.5 rounded-md flex justify-between col-span-2">
                            <span className="text-gray-400">Seats:</span>
                            <span>{car.seats} Seats</span>
                          </div>
                        </div>

                        {/* VIEW DETAILS ACTION BUTTON */}
                        <div className="pt-2">
                          <a 
                            href={`/fleet/${car.id}`}
                            className="block w-full text-center bg-brand-charcoal hover:bg-brand-red text-brand-white font-extrabold uppercase tracking-wider text-[11px] py-2.5 rounded-lg transition-colors duration-200"
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-brand-white border border-gray-100 rounded-2xl p-12 text-center max-w-lg mx-auto mt-8">
                  <span className="text-3xl block mb-2">🔍</span>
                  <h3 className="text-lg font-bold text-brand-charcoal">No Premium Matches</h3>
                  <p className="text-brand-muted text-sm mt-1 font-medium">
                    Try adjusting your structural filters or refining your model lookup parameters.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}