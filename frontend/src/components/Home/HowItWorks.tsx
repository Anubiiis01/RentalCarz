export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Select Your Machine",
      description: "Browse our hand-selected fleet of pristine luxury cars, sports coupes, and elite adventure SUVs.",
    },
    {
      step: "02",
      title: "Lock In Your Dates",
      description: "Pick your delivery window and destination directly using our seamless booking interface.",
    },
    {
      step: "03",
      title: "Hit The Ignition",
      description: "Collect your keys at our premium garage hub or enjoy direct-to-door white-glove delivery.",
    },
  ];

  return (
    <section className="py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
            Streamlined Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-charcoal">
            How Premium Wheels Works
          </h2>
          <p className="text-brand-muted text-sm font-medium">
            Three simple milestones between your booking confirmation and hitting the open road.
          </p>
        </div>

        {/* Steps Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col space-y-4 relative group">
              {/* Grand Step Number Background */}
              <div className="text-6xl font-black text-brand-red/10 group-hover:text-brand-red/20 transition-colors duration-300 select-none">
                {item.step}
              </div>
              
              <h3 className="text-xl font-bold text-brand-charcoal tracking-tight">
                {item.title}
              </h3>
              
              <p className="text-brand-muted text-sm leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}