"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface LocalUser {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [currentUser, setCurrentUser] = useState<LocalUser | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // This hook runs strictly on the client side after mounting
    setMounted(true);
    
    const checkUserSession = () => {
      const savedUserStr = localStorage.getItem("premium_user");
      if (savedUserStr) {
        try {
          setCurrentUser(JSON.parse(savedUserStr));
        } catch (e) {
          localStorage.removeItem("premium_user");
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkUserSession();

    // Listen for storage changes across tabs to keep authentication state synchronized
    window.addEventListener("storage", checkUserSession);
    return () => {
      window.removeEventListener("storage", checkUserSession);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("premium_user");
    setCurrentUser(null);
    setMobileMenuOpen(false);
    router.push("/auth");
    
    // Dispatch storage event locally so other components hear the logout signal
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <nav className="bg-brand-white border-b border-gray-200/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* LOGO */}
          <div className="flex items-center">
            <Link href="/" className="text-xl sm:text-2xl font-black tracking-tight text-brand-charcoal select-none">
              PREMIUM<span className="text-brand-red">WHEELS</span>
            </Link>
          </div>

          {}
          {/* DESKTOP NAVIGATION LINKS */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              href="/" 
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                pathname === "/" ? "text-brand-red" : "text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/fleet" 
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                pathname?.startsWith("/fleet") ? "text-brand-red" : "text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              Our Fleet
            </Link>
            <Link 
              href="/#services" 
              className="text-xs font-bold uppercase tracking-wider text-brand-muted hover:text-brand-charcoal transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/#about" 
              className="text-xs font-bold uppercase tracking-wider text-brand-muted hover:text-brand-charcoal transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/#contact" 
              className="text-xs font-bold uppercase tracking-wider text-brand-muted hover:text-brand-charcoal transition-colors"
            >
              Contact
            </Link>
          </div>

          {}
          {/* DESKTOP SESSION CONTROLS */}
          <div className="hidden md:flex items-center space-x-4">
            {!mounted ? (
              // Loading skeleton state during hydration to avoid layout shifts
              <div className="w-24 h-8 bg-gray-100 animate-pulse rounded-lg"></div>
            ) : currentUser ? (
              <div className="flex items-center space-x-3">
                {/* Active Profile Dashboard Redirection Button */}
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-md shadow-gray-900/10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span>My Dashboard</span>
                </Link>

                {/* Secure Account Sign Out */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-gray-200 hover:border-brand-red text-brand-charcoal hover:text-brand-red text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth"
                  className="px-4 py-2 text-brand-charcoal hover:text-brand-red text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/fleet"
                  className="px-4 py-2 bg-brand-red hover:bg-brand-red/90 text-brand-white text-xs font-extrabold uppercase tracking-widest rounded-lg transition-all shadow-md shadow-red-600/10"
                >
                  Book A Ride
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-charcoal hover:text-brand-red focus:outline-hidden p-2"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {}
      {/* MOBILE DROP-DOWN MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-white border-t border-gray-100 px-4 pt-4 pb-6 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold uppercase tracking-wide text-brand-charcoal hover:text-brand-red transition-colors py-2"
          >
            Home
          </Link>
          <Link
            href="/fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold uppercase tracking-wide text-brand-charcoal hover:text-brand-red transition-colors py-2"
          >
            Our Fleet
          </Link>
          <Link
            href="/#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold uppercase tracking-wide text-brand-charcoal hover:text-brand-red transition-colors py-2"
          >
            Services
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold uppercase tracking-wide text-brand-charcoal hover:text-brand-red transition-colors py-2"
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold uppercase tracking-wide text-brand-charcoal hover:text-brand-red transition-colors py-2"
          >
            Contact
          </Link>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            {!mounted ? (
              <div className="w-full h-10 bg-gray-100 animate-pulse rounded-lg"></div>
            ) : currentUser ? (
              <div className="space-y-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block px-4 py-3 bg-brand-charcoal text-brand-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center block px-4 py-3 border border-gray-200 text-brand-charcoal hover:text-brand-red text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer"
                >
                  Sign Out Securely
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block px-4 py-3 border border-gray-200 text-brand-charcoal text-xs font-bold uppercase tracking-wider rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/fleet"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block px-4 py-3 bg-brand-red text-brand-white text-xs font-extrabold uppercase tracking-widest rounded-lg shadow-md shadow-red-600/10"
                >
                  Book A Ride
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}