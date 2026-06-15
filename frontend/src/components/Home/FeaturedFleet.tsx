import CarCard from "../fleet/CarCard";

// Mock vehicle matrix for static presentation
const FEATURED_CARS = [
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
];

export default function FeaturedFleet() {
  return (
    <section className="py-24 bg-brand-offwhite border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red block mb-2">
              Our Elite Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-charcoal">
              Explore Our Featured Fleet
            </h2>
          </div>
          <p className="text-brand-muted text-sm max-w-md font-medium">
            Hand-selected premium machines built to turn headers and elevate your travel experience. Maintained flawlessly for precision handling.
          </p>
        </div>

        {/* Responsive Grid Workspace */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_CARS.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </div>
    </section>
  );
}