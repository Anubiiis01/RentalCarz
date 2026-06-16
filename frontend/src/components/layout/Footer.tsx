import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-white pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <span className="text-xl font-black tracking-tight">
            PREMIUM<span className="text-brand-red">WHEELS</span>
          </span>
          <p className="text-gray-400 text-xs leading-relaxed font-medium">
            Elevating transportation into an absolute art form. Experience elite vehicles with flawless reservation logistics across the nation's premier destinations.
          </p>
        </div>

        {/* Column 2: Fleet Links */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-brand-red">Our Collection</h5>
          <ul className="space-y-2 text-xs font-semibold text-gray-400">
            <li><Link href="/fleet?cat=Sport" className="hover:text-brand-white transition-colors">Hyper & Sport Coupes</Link></li>
            <li><Link href="/fleet?cat=Luxury" className="hover:text-brand-white transition-colors">Luxury Executive Sedans</Link></li>
            <li><Link href="/fleet?cat=SUV" className="hover:text-brand-white transition-colors">Premium Adventure SUVs</Link></li>
          </ul>
        </div>

        {/* Column 3: Corporate Links */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-brand-red">Company</h5>
          <ul className="space-y-2 text-xs font-semibold text-gray-400">
            <li><Link href="/about" className="hover:text-brand-white transition-colors">About Our Story</Link></li>
            <li><Link href="/careers" className="hover:text-brand-white transition-colors">Careers / Join Us</Link></li>
            <li><Link href="/terms" className="hover:text-brand-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact/Support */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-brand-red">Support</h5>
          <p className="text-gray-400 text-xs font-medium">24/7 Roadside Concierge hotline:</p>
          <p className="text-brand-white font-bold text-sm tracking-tight">+1 (800) 555-RIDE</p>
          <p className="text-gray-400 text-[11px] font-medium">concierge@premiumwheels.com</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/80 pt-8 text-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
        © {new Date().getFullYear()} Premium Wheels Inc. All rights reserved.
      </div>
    </footer>
  );
}
