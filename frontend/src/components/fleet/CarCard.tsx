"use client";
import Link from "next/link";

interface CarCardProps {
  id: string;
  name: string;
  brand: string;
  category: "Luxury" | "Sport" | "SUV";
  pricePerDay: number;
  transmission: "Automatic" | "Manual";
  fuelType: "Electric" | "Hybrid" | "Petrol";
  seats: number;
  imagePlaceholderText: string; // Temporary placeholder until backend images are served
}

export default function CarCard({
  id,
  name,
  brand,
  category,
  pricePerDay,
  transmission,
  fuelType,
  seats,
  imagePlaceholderText,
}: CarCardProps) {
  return (
    <div className="bg-brand-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200/60 transition-all duration-300 flex flex-col h-full group">
      
      {/* Visual Header / Image Container */}
      <div className="relative aspect-video bg-brand-offwhite flex items-center justify-center p-6 border-b border-gray-50 overflow-hidden">
        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-2.5 py-1 bg-brand-charcoal text-brand-white text-[10px] font-bold uppercase tracking-wider rounded-md">
          {category}
        </span>
        
        {/* Decorative background grid vector */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

        {/* Temporary High-Fidelity Car Graphic Box */}
        <div className="text-brand-muted font-mono text-xs z-10 font-bold group-hover:scale-110 group-hover:text-brand-red transition-all duration-300">
          [ 🏎️ {imagePlaceholderText} Graphic ]
        </div>
      </div>

      {/* Product Information */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div>
          <p className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-1">{brand}</p>
          <h4 className="text-xl font-bold text-brand-charcoal tracking-tight group-hover:text-brand-red transition-colors">
            {name}
          </h4>
        </div>

        {/* Tech Specs Matrix */}
        <div className="grid grid-cols-3 gap-2 border-y border-gray-100 py-3 text-xs text-brand-muted font-medium">
          <div className="flex flex-col items-center justify-center text-center p-1 bg-brand-offwhite rounded-lg">
            <span className="text-[10px] font-bold uppercase tracking-wide text-brand-charcoal mb-0.5">Gear</span>
            {transmission === "Automatic" ? "Auto" : "Manual"}
          </div>
          <div className="flex flex-col items-center justify-center text-center p-1 bg-brand-offwhite rounded-lg">
            <span className="text-[10px] font-bold uppercase tracking-wide text-brand-charcoal mb-0.5">Fuel</span>
            {fuelType}
          </div>
          <div className="flex flex-col items-center justify-center text-center p-1 bg-brand-offwhite rounded-lg">
            <span className="text-[10px] font-bold uppercase tracking-wide text-brand-charcoal mb-0.5">Seats</span>
            {seats} Seats
          </div>
        </div>

        {/* Pricing Action Line */}
        <div className="flex items-center justify-between pt-2 mt-auto">
          <div>
            <span className="text-2xl font-extrabold text-brand-charcoal">${pricePerDay}</span>
            <span className="text-xs font-semibold text-brand-muted"> / day</span>
          </div>

          <Link
            href={`/fleet/${id}`}
            className="px-4 py-2.5 bg-brand-charcoal text-brand-white text-xs font-bold uppercase tracking-wider rounded-lg group-hover:bg-brand-red transition-colors duration-200 shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}