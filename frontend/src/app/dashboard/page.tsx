"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LocalUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

interface SavedCard {
  id: string;
  brand: "visa" | "mastercard" | "amex";
  last4: string;
  expDate: string;
  isDefault: boolean;
}

export default function UserDashboard() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<LocalUser | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "legal" | "billing" | "bookings" | "preferences">("overview");
  const [isClient, setIsClient] = useState(false);
  
  // Interactive Form Fields States (Initial empty states)
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseRegion, setLicenseRegion] = useState("");
  const [licenseExp, setLicenseExp] = useState("");

  // Digital Upload Filenames
  const [frontFileName, setFrontFileName] = useState("");
  const [backFileName, setBackFileName] = useState("");

  // Refs for programmatic file uploading triggers
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  // Billing States
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [billingAddress, setBillingAddress] = useState("");
  const [corpId, setCorpId] = useState("");

  // Mini Form states for adding new payment card
  const [newCardBrand, setNewCardBrand] = useState<"visa" | "mastercard" | "amex">("visa");
  const [newCardLast4, setNewCardLast4] = useState("");
  const [newCardExp, setNewCardExp] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);

  // Booking Preferences Toggles
  const [preferredClass, setPreferredClass] = useState("");
  const [preferredFuel, setPreferredFuel] = useState("");
  const [cdwEnabled, setCdwEnabled] = useState(false);
  const [roadsideEnabled, setRoadsideEnabled] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  // Empty Default Reservations List
  const [activeBookings, setActiveBookings] = useState<any[]>([]);
  const [pastBookings, setPastBookings] = useState<any[]>([]);

  // Saving Confirmation State
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedUserStr = localStorage.getItem("premium_user");
    if (!savedUserStr) {
      // Re-route back to unified secure authentication if session is invalid
      router.push("/auth");
    } else {
      const userObj = JSON.parse(savedUserStr);
      setCurrentUser(userObj);

      // Fetch user-specific persisted state values from localStorage
      const persistentDataStr = localStorage.getItem(`dashboard_data_${userObj.id}`);
      if (persistentDataStr) {
        try {
          const data = JSON.parse(persistentDataStr);
          setPhone(data.phone || "");
          setAddress(data.address || "");
          setLicenseNumber(data.licenseNumber || "");
          setLicenseRegion(data.licenseRegion || "");
          setLicenseExp(data.licenseExp || "");
          setBillingAddress(data.billingAddress || "");
          setCorpId(data.corpId || "");
          setPreferredClass(data.preferredClass || "");
          setPreferredFuel(data.preferredFuel || "");
          setCdwEnabled(!!data.cdwEnabled);
          setRoadsideEnabled(!!data.roadsideEnabled);
          setSmsAlerts(!!data.smsAlerts);
          setMarketingOptIn(!!data.marketingOptIn);
          setFrontFileName(data.frontFileName || "");
          setBackFileName(data.backFileName || "");
          setSavedCards(data.savedCards || []);
          setActiveBookings(data.activeBookings || []);
          setPastBookings(data.pastBookings || []);
        } catch (e) {
          console.error("Failed to parse saved dashboard credentials", e);
        }
      }
    }
  }, [router]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    // Package current states into persistent node
    const dashboardState = {
      phone,
      address,
      licenseNumber,
      licenseRegion,
      licenseExp,
      billingAddress,
      corpId,
      preferredClass,
      preferredFuel,
      cdwEnabled,
      roadsideEnabled,
      smsAlerts,
      marketingOptIn,
      frontFileName,
      backFileName,
      savedCards,
      activeBookings,
      pastBookings
    };

    localStorage.setItem(`dashboard_data_${currentUser.id}`, JSON.stringify(dashboardState));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      if (side === "front") {
        setFrontFileName(name);
      } else {
        setBackFileName(name);
      }
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCardLast4.length !== 4 || !newCardExp) return;

    const newCard: SavedCard = {
      id: "crd_" + Math.random().toString(36).substring(2, 9),
      brand: newCardBrand,
      last4: newCardLast4,
      expDate: newCardExp,
      isDefault: savedCards.length === 0 // Make primary if first card
    };

    const updatedCards = [...savedCards, newCard];
    setSavedCards(updatedCards);
    setNewCardLast4("");
    setNewCardExp("");
    setShowAddCard(false);

    // Persist immediately on list update
    if (currentUser) {
      const currentPersisted = localStorage.getItem(`dashboard_data_${currentUser.id}`);
      const baseObj = currentPersisted ? JSON.parse(currentPersisted) : {};
      baseObj.savedCards = updatedCards;
      localStorage.setItem(`dashboard_data_${currentUser.id}`, JSON.stringify(baseObj));
    }
  };

  const toggleDefaultCard = (id: string) => {
    const updatedCards = savedCards.map(c => ({
      ...c,
      isDefault: c.id === id
    }));
    setSavedCards(updatedCards);
    if (currentUser) {
      const currentPersisted = localStorage.getItem(`dashboard_data_${currentUser.id}`);
      const baseObj = currentPersisted ? JSON.parse(currentPersisted) : {};
      baseObj.savedCards = updatedCards;
      localStorage.setItem(`dashboard_data_${currentUser.id}`, JSON.stringify(baseObj));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("premium_user");
    router.push("/auth");
  };

  if (!isClient || !currentUser) {
    return (
      <div className="min-h-screen bg-brand-offwhite flex items-center justify-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-charcoal animate-pulse">
          Retrieving Secured Connection...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {}
        <section className="bg-brand-charcoal text-brand-white rounded-3xl p-8 mb-8 border border-gray-800 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-brand-red rounded-full border-4 border-gray-800 flex items-center justify-center font-black text-2xl shadow-lg relative">
                {currentUser.name.charAt(0).toUpperCase()}
                <span className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-brand-charcoal" title="Active Connection"></span>
              </div>
              
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{currentUser.name}</h1>
                  <span className="px-3 py-1 bg-brand-red text-brand-white text-[9px] font-black uppercase tracking-widest rounded-full">
                    VIP Member
                  </span>
                </div>
                <p className="text-gray-400 text-sm font-medium">{currentUser.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-gray-800/80 hover:bg-brand-red border border-gray-700 hover:border-brand-red transition-all text-xs font-black uppercase tracking-widest rounded-lg cursor-pointer"
            >
              Sign Out Securely
            </button>
          </div>
        </section>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <aside className="lg:col-span-3 bg-brand-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-2">
            {[
              { id: "overview", label: "Overview & Loyalty", icon: "📊" },
              { id: "profile", label: "Account Profile", icon: "👤" },
              { id: "legal", label: "Legal & Licenses", icon: "🛡️" },
              { id: "billing", label: "Billing & Finances", icon: "💳" },
              { id: "bookings", label: "Trip Reservations", icon: "🗺️" },
              { id: "preferences", label: "Preferences", icon: "⚙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-brand-charcoal text-brand-white shadow-md"
                    : "hover:bg-brand-offwhite text-brand-muted hover:text-brand-charcoal"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </aside>

          {}
          <div className="lg:col-span-9 bg-brand-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {saveSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between animate-fadeIn">
                <span>✓ Profile settings synced and saved successfully.</span>
              </div>
            )}

            {/* TAB 1: OVERVIEW & LOYALTY */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-brand-charcoal">Dashboard Terminal Status</h2>
                  <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider mt-1">Platform Membership & Rewards</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-brand-offwhite border border-gray-100 p-6 rounded-2xl">
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">KYC Status</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${licenseNumber ? "bg-green-500" : "bg-amber-500"}`}></span>
                      <h3 className="text-lg font-bold text-brand-charcoal">
                        {licenseNumber ? "Verified Account" : "Credentials Required"}
                      </h3>
                    </div>
                  </div>
                  <div className="bg-brand-offwhite border border-gray-100 p-6 rounded-2xl">
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Active Safe Score</p>
                    <h3 className="text-xl font-black text-brand-charcoal mt-1">100 / 100</h3>
                  </div>
                  <div className="bg-brand-offwhite border border-gray-100 p-6 rounded-2xl">
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Active Rentals</p>
                    <h3 className="text-xl font-black text-brand-charcoal mt-1">
                      {activeBookings.length} Live Trips
                    </h3>
                  </div>
                </div>

                <div className="bg-brand-charcoal text-brand-white rounded-2xl p-6 border border-gray-800 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loyalty Membership</p>
                      <h4 className="text-xl font-black text-brand-red tracking-tight mt-1">Elite Premium Driver</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Balance</p>
                      <p className="text-xl font-black text-brand-white mt-1">150 PTS</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-bold text-gray-400">
                      <span>Progress to VIP Tier</span>
                      <span>850 PTS left</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-brand-red h-full w-[15%] transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ACCOUNT PROFILE DETAILS */}
            {activeTab === "profile" && (
              <form onSubmit={handleSaveProfile} className="space-y-6 animate-fadeIn">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-brand-charcoal font-black uppercase tracking-tight">Essential Account Info</h2>
                  <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider mt-1">Communication Parameters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Mobile Contact Number</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Home Address</label>
                    <input
                      type="text"
                      placeholder="Street, City, State, ZIP"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Saved Sign-In Email</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full bg-gray-100 border border-gray-200 text-gray-400 rounded-lg px-4 py-2.5 text-sm font-medium cursor-not-allowed"
                  />
                </div>

                <div className="bg-brand-offwhite p-5 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-brand-charcoal">Two-Factor Authentication (2FA)</h4>
                    <p className="text-xs text-brand-muted mt-1 font-medium">Elevate reservation checkout protection steps.</p>
                  </div>
                  <button type="button" className="px-4 py-2 bg-brand-charcoal text-brand-white text-[10px] font-extrabold uppercase tracking-wider rounded-lg hover:bg-brand-red transition-all cursor-pointer">
                    Enable
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-red text-brand-white text-xs font-extrabold uppercase tracking-widest rounded-lg hover:bg-brand-charcoal transition-all cursor-pointer"
                >
                  Save Profile Configuration
                </button>
              </form>
            )}

            {/* TAB 3: LEGAL & COMPLIANCE */}
            {activeTab === "legal" && (
              <form onSubmit={handleSaveProfile} className="space-y-6 animate-fadeIn">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-brand-charcoal font-black uppercase tracking-tight">Legal & Driver Eligibility</h2>
                  <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider mt-1">Verified Drivers License credentials</p>
                </div>

                {/* Hidden Native File inputs */}
                <input
                  type="file"
                  ref={frontInputRef}
                  style={{ display: "none" }}
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange(e, "front")}
                />
                <input
                  type="file"
                  ref={backInputRef}
                  style={{ display: "none" }}
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange(e, "back")}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">License Identifier Number</label>
                    <input
                      type="text"
                      placeholder="DL-XXXXXXX"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Issuing Region/State</label>
                    <input
                      type="text"
                      placeholder="e.g. California, USA"
                      value={licenseRegion}
                      onChange={(e) => setLicenseRegion(e.target.value)}
                      className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Expiration Date Check</label>
                    <input
                      type="date"
                      value={licenseExp}
                      onChange={(e) => setLicenseExp(e.target.value)}
                      className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                    />
                  </div>
                </div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-5 text-center space-y-2 hover:border-brand-red/30 transition-colors">
                    <p className="text-xs font-bold text-brand-charcoal">Driver License Front</p>
                    {frontFileName ? (
                      <p className="text-[10px] text-green-600 font-extrabold uppercase tracking-wider">✓ {frontFileName}</p>
                    ) : (
                      <p className="text-[10px] text-brand-muted font-bold uppercase tracking-wider">No file chosen</p>
                    )}
                    <button 
                      type="button" 
                      onClick={() => frontInputRef.current?.click()}
                      className="px-3 py-1.5 bg-brand-charcoal text-brand-white text-[10px] font-extrabold uppercase rounded-lg hover:bg-brand-red transition-all cursor-pointer"
                    >
                      Select File
                    </button>
                  </div>

                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-5 text-center space-y-2 hover:border-brand-red/30 transition-colors">
                    <p className="text-xs font-bold text-brand-charcoal">Driver License Back</p>
                    {backFileName ? (
                      <p className="text-[10px] text-green-600 font-extrabold uppercase tracking-wider">✓ {backFileName}</p>
                    ) : (
                      <p className="text-[10px] text-brand-muted font-bold uppercase tracking-wider">No file chosen</p>
                    )}
                    <button 
                      type="button" 
                      onClick={() => backInputRef.current?.click()}
                      className="px-3 py-1.5 bg-brand-charcoal text-brand-white text-[10px] font-extrabold uppercase rounded-lg hover:bg-brand-red transition-all cursor-pointer"
                    >
                      Select File
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-red text-brand-white text-xs font-extrabold uppercase tracking-widest rounded-lg hover:bg-brand-charcoal transition-all cursor-pointer"
                >
                  Confirm Driver License Sync
                </button>
              </form>
            )}

            {/* TAB 4: FINANCIAL & BILLING */}
            {activeTab === "billing" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-brand-charcoal font-black uppercase tracking-tight">Financial Hub & Vault</h2>
                  <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider mt-1">Saved Methods for Secure Direct Reservations</p>
                </div>

                {}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-wider text-brand-charcoal">Saved Cards</h3>
                    <button 
                      type="button" 
                      onClick={() => setShowAddCard(!showAddCard)}
                      className="px-3 py-1 bg-brand-red text-brand-white text-[10px] font-bold uppercase rounded-lg hover:bg-brand-charcoal transition-all cursor-pointer"
                    >
                      {showAddCard ? "Cancel" : "+ Add Card"}
                    </button>
                  </div>
                  
                  {showAddCard && (
                    <form onSubmit={handleAddCard} className="bg-brand-offwhite p-5 rounded-2xl border border-gray-200/80 space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-brand-charcoal uppercase tracking-widest">Brand</label>
                          <select 
                            value={newCardBrand}
                            onChange={(e) => setNewCardBrand(e.target.value as any)}
                            className="w-full bg-brand-white border border-gray-200 text-brand-charcoal rounded-lg px-3 py-2 text-xs font-bold"
                          >
                            <option value="visa">Visa</option>
                            <option value="mastercard">Mastercard</option>
                            <option value="amex">American Express</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-brand-charcoal uppercase tracking-widest">Last 4 Digits</label>
                          <input 
                            type="text" 
                            maxLength={4}
                            placeholder="4321"
                            value={newCardLast4}
                            onChange={(e) => setNewCardLast4(e.target.value.replace(/\D/g, ""))}
                            className="w-full bg-brand-white border border-gray-200 text-brand-charcoal rounded-lg px-3 py-2 text-xs font-mono font-bold"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-brand-charcoal uppercase tracking-widest">Expiration (MM/YY)</label>
                          <input 
                            type="text" 
                            placeholder="12/28"
                            value={newCardExp}
                            onChange={(e) => setNewCardExp(e.target.value)}
                            className="w-full bg-brand-white border border-gray-200 text-brand-charcoal rounded-lg px-3 py-2 text-xs font-mono font-bold"
                            required
                          />
                        </div>
                      </div>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-white text-[10px] font-extrabold uppercase rounded-lg transition-all"
                      >
                        Save Card Details
                      </button>
                    </form>
                  )}

                  {savedCards.length === 0 ? (
                    <div className="text-center p-8 bg-brand-offwhite border border-dashed border-gray-200 rounded-2xl">
                      <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">No cards on file</p>
                      <p className="text-[10px] text-gray-400 mt-1">Add a payment card to activate rapid checkouts.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedCards.map((card) => (
                        <div
                          key={card.id}
                          onClick={() => toggleDefaultCard(card.id)}
                          className={`border rounded-2xl p-5 flex justify-between items-start cursor-pointer transition-all ${
                            card.isDefault
                              ? "bg-brand-charcoal text-brand-white border-brand-charcoal shadow-md"
                              : "bg-brand-offwhite text-brand-charcoal border-gray-200 hover:border-brand-red/40"
                          }`}
                        >
                          <div className="space-y-2">
                            <p className="text-xs font-black uppercase tracking-widest">{card.brand}</p>
                            <p className="text-sm font-mono font-bold">•••• •••• •••• {card.last4}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Expires {card.expDate}</p>
                          </div>
                          {card.isDefault && (
                            <span className="bg-brand-red text-brand-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                              Primary
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Billing Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 1024 Ocean Drive, Miami, FL 33139"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Corporate Business ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. CORP-XXXXXX"
                      value={corpId}
                      onChange={(e) => setCorpId(e.target.value)}
                      className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-red text-brand-white text-xs font-extrabold uppercase tracking-widest rounded-lg hover:bg-brand-charcoal transition-all cursor-pointer"
                  >
                    Confirm Billing Settings
                  </button>
                </form>
              </div>
            )}

            {/* TAB 5: RESERVATION BOOKINGS GRID */}
            {activeTab === "bookings" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-brand-charcoal font-black uppercase tracking-tight">Active Reservations Schedule</h2>
                  <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider mt-1">Booked Vehicles and Past Rentals</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-charcoal">Active upcoming trips</h3>
                  
                  {activeBookings.length === 0 ? (
                    <div className="text-center p-12 bg-brand-offwhite border border-dashed border-gray-200 rounded-2xl">
                      <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">No active reservations found</p>
                      <Link href="/fleet" className="inline-block mt-3 px-4 py-2 bg-brand-red text-brand-white text-[10px] font-black uppercase rounded-lg hover:bg-brand-charcoal transition-all">
                        Browse Our Fleet
                      </Link>
                    </div>
                  ) : (
                    activeBookings.map((res) => (
                      <div key={res.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                        <div className="bg-brand-charcoal text-brand-white p-5 flex justify-between items-center">
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{res.id}</p>
                            <h4 className="text-lg font-black tracking-tight">{res.brand} {res.carName}</h4>
                          </div>
                          <span className="px-3 py-1 bg-brand-red text-brand-white text-[9px] font-black uppercase tracking-widest rounded-full">
                            {res.category} Class
                          </span>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-offwhite">
                          <div className="space-y-4">
                            <div>
                              <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest">Date Range</p>
                              <p className="text-sm font-bold text-brand-charcoal">{res.pickupDate} to {res.returnDate}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest">Location Pickup Hub</p>
                              <p className="text-sm font-bold text-brand-charcoal">{res.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-charcoal">Past Trip Archive</h3>
                  {pastBookings.length === 0 ? (
                    <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider">No past history recorded.</p>
                  ) : (
                    pastBookings.map((past) => (
                      <div key={past.id} className="bg-brand-offwhite border border-gray-200/80 rounded-xl p-4 flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-bold text-brand-charcoal">{past.brand} {past.carName}</h4>
                          <p className="text-xs text-brand-muted mt-0.5">{past.dateRange}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-brand-charcoal">${past.total}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 6: ACCOUNT PREFERENCES */}
            {activeTab === "preferences" && (
              <form onSubmit={handleSaveProfile} className="space-y-6 animate-fadeIn">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-brand-charcoal font-black uppercase tracking-tight">Booking Preferences</h2>
                  <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider mt-1">Preset configurations for swift checkouts</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Preferred Vehicle Category</label>
                    <select
                      value={preferredClass}
                      onChange={(e) => setPreferredClass(e.target.value)}
                      className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                    >
                      <option value="">Select Category</option>
                      <option value="Sport">Sport Coupe / Supercars</option>
                      <option value="SUV">Luxury SUV Class</option>
                      <option value="Luxury">Premium Executive Sedans</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Preferred Fuel/Engine Type</label>
                    <select
                      value={preferredFuel}
                      onChange={(e) => setPreferredFuel(e.target.value)}
                      className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                    >
                      <option value="">Select Engine Type</option>
                      <option value="Gas">Traditional High-HP Petrol</option>
                      <option value="Electric">Pure High-Performance Electric</option>
                      <option value="Hybrid">Hybrid Powertrains</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-charcoal">Pre-Selected Insurance Protections</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-brand-offwhite rounded-xl">
                    <div>
                      <h4 className="text-xs font-bold text-brand-charcoal">Collision Damage Waiver (CDW)</h4>
                      <p className="text-[10px] text-brand-muted mt-0.5">Pre-select damage protection with absolute minimal liability.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cdwEnabled}
                      onChange={(e) => setCdwEnabled(e.target.checked)}
                      className="w-5 h-5 accent-brand-red cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-brand-offwhite rounded-xl">
                    <div>
                      <h4 className="text-xs font-bold text-brand-charcoal">Elite 24/7 Roadside Concierge Assist</h4>
                      <p className="text-[10px] text-brand-muted mt-0.5">Pre-select support for flat tires, battery support, or lockouts.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={roadsideEnabled}
                      onChange={(e) => setRoadsideEnabled(e.target.checked)}
                      className="w-5 h-5 accent-brand-red cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-charcoal">Alert & Communication Channels</h3>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-charcoal">Deliver active reservation text updates to my phone</span>
                    <input
                      type="checkbox"
                      checked={smsAlerts}
                      onChange={(e) => setSmsAlerts(e.target.checked)}
                      className="w-4 h-4 accent-brand-red cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-charcoal">Deliver promotional offers and fleet update emails</span>
                    <input
                      type="checkbox"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="w-4 h-4 accent-brand-red cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-red text-brand-white text-xs font-extrabold uppercase tracking-widest rounded-lg hover:bg-brand-charcoal transition-all cursor-pointer"
                >
                  Save Workspace Preferences
                </button>
              </form>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}