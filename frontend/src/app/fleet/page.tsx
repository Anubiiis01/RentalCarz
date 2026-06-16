"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CarCard from "@/components/fleet/CarCard";

// Expanded mock dataset representing our global inventory
const MASTER_FLEET = [
  {
    id: "1",
    name: "911 Carrera GTS",
    brand: "Porsche",
    category: "Sport" as const,
    pricePerDay: 350,
    transmission: "Automatic" as const,
    fuelType: "Petrol" as const,
    seats: 4,
    imagePlaceholderText: "Porsche 911 GTS",
  },
  {
    id: "2",
    name: "Escalade Platinum",
    brand: "Cadillac",
    category: "SUV" as const,
    pricePerDay: 280,
    transmission: "Automatic" as const,
    fuelType: "Petrol" as const,
    seats: 7,
    imagePlaceholderText: "Cadillac Escalade",
  },
  {
    id: "3",
    name: "Taycan Turbo S",
    brand: "Porsche",
    category: "Luxury" as const,
    pricePerDay: 390,
    transmission: "Automatic" as const,
    fuelType: "Electric" as const,
    seats: 4,
    imagePlaceholderText: "Porsche Taycan EV",
  },
  {
    id: "4",
    name: "G 63 AMG Grand Edition",
    brand: "Mercedes-Benz",
    category: "SUV" as const,
    pricePerDay: 450,
    transmission: "Automatic" as const,
    fuelType: "Petrol" as const,
    seats: 5,
    imagePlaceholderText: "Mercedes G-Wagon",
  },
  {
    id: "5",
    name: "Vantage V8 Roadster",
    brand: "Aston Martin",
    category: "Sport" as const,
    pricePerDay: 420,
    transmission: "Automatic" as const,
    fuelType: "Petrol" as const,
    seats: 2,
    imagePlaceholderText: "Aston Martin Vantage",
  },
  {
    id: "6",
    name: "S-Class Maybach S580",
    brand: "Mercedes-Benz",
    category: "Luxury" as const,
    pricePerDay: 500,
    transmission: "Automatic" as const,
    fuelType: "Hybrid" as const,
    seats: 4,
    imagePlaceholderText: "Maybach S580",
  },
];

export default function FleetCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(600);

  // Memoized, high-performance client-side query filter engine
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
                  min="200"
                  max="600"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-red bg-brand-offwhite h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-brand-muted font-bold">
                  <span>$200/D</span>
                  <span>$600/D</span>
                </div>
              </div>

            </aside>

            {/* RIGHT REGION: The Live Fleet Grid Render */}
            <div className="lg:col-span-3">
              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} {...car} />
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
