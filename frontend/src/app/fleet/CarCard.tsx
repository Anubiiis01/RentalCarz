"use client";

interface CarCardProps {
  id: string;
  name: string;
  brand: string;
  category: string; // 👈 Changed from strict union to string to resolve the type error
  pricePerDay: number;
  transmission: string;
  fuelType: string;
  seats: number;
  hp: number;
  topSpeed: number;
  zeroToSixty: number;
  imagePlaceholderText: string;
  description: string;
  image?: string;   // 👈 Make sure this is present in the type definitions
}

// 👈 Destructure 'image' right here so the component actually receives it!
export default function CarCard({
  id,
  name,
  brand,
  category,
  pricePerDay,
  transmission,
  fuelType,
  seats,
  hp,
  topSpeed,
  zeroToSixty,
  imagePlaceholderText,
  description,
  image
}: CarCardProps) {
  return (
    <div className="bg-brand-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col">
      
      {/* IMAGE CONTAINER */}
      <div className="relative w-full h-48 bg-brand-charcoal flex items-center justify-center overflow-hidden group">
        {image ? (
          <img 
            src={image} 
            alt={`${brand} ${name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-center p-4">
            <span className="text-3xl block mb-1">🏎️</span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {imagePlaceholderText || name}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-brand-charcoal/80 backdrop-blur-xs text-brand-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm">
          {category}
        </div>
      </div>

      {/* DETAILS BODY */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-black text-brand-charcoal truncate">
              <span className="text-brand-muted font-medium text-sm block">{brand}</span>
              {name}
            </h2>
            <div className="text-right shrink-0 pl-2">
              <span className="text-lg font-black text-brand-red">${pricePerDay}</span>
              <span className="text-gray-400 text-[10px] block font-bold uppercase tracking-wide">/ Day</span>
            </div>
          </div>
          <p className="text-xs text-brand-muted line-clamp-2 mt-2 font-medium leading-relaxed">
            {description}
          </p>
        </div>

        {/* SPECS BLOCK */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-brand-charcoal/90 border-t border-gray-100 pt-3">
          <div className="bg-brand-offwhite px-2.5 py-1.5 rounded-md flex justify-between">
            <span className="text-gray-400">Power:</span>
            <span>{hp} HP</span>
          </div>
          <div className="bg-brand-offwhite px-2.5 py-1.5 rounded-md flex justify-between">
            <span className="text-gray-400">0-60:</span>
            <span>{zeroToSixty}s</span>
          </div>
          <div className="bg-brand-offwhite px-2.5 py-1.5 rounded-md flex justify-between col-span-2">
            <span className="text-gray-400">Transmission:</span>
            <span>{transmission}</span>
          </div>
        </div>
      </div>

    </div>
  );
}