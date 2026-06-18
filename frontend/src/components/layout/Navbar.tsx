"use html";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold tracking-tight text-brand-charcoal">
            PREMIUM<span className="text-brand-red">WHEELS</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-brand-charcoal">
          <Link href="/fleet" className="hover:text-brand-red transition-colors">Our Fleet</Link>
          <Link href="/services" className="hover:text-brand-red transition-colors">Services</Link>
          <Link href="/about" className="hover:text-brand-red transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-brand-red transition-colors">Contact</Link>
        </nav>

        {/* Action Buttons */}
<div className="flex items-center space-x-4">
  <Link href="/auth" className="text-sm font-semibold text-brand-charcoal hover:text-brand-red transition-colors hidden sm:block">
    Sign In
  </Link>
          <Link 
            href="/fleet" 
            className="px-5 py-2.5 bg-brand-red text-brand-white text-sm font-semibold rounded-lg hover:bg-brand-red-hover transition-all duration-200 shadow-md shadow-red-600/10 cursor-pointer"
          >
            Book A Ride
          </Link>
        </div>
      </div>
    </header>
  );
}