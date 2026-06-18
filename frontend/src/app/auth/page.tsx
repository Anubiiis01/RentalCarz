"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AdvancedAuthPage() {
  const router = useRouter();
  
  // UI Flow Control States
  const [currentMode, setCurrentMode] = useState<"login" | "signup" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  
  // Interactive Form Field States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Status feedback elements
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ msg: "", isError: false });

  const executeAuthCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ msg: "", isError: false });

    // Enforce business rules before execution
    if (currentMode === "signup" && !termsAccepted) {
      setFeedback({ msg: "You must review and agree to our Terms of Service.", isError: true });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: currentMode,
          email,
          password: currentMode !== "forgot" ? password : undefined,
          name: currentMode === "signup" ? name : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Authentication procedure failed.");

      setFeedback({ msg: data.message, isError: false });

      if (currentMode !== "forgot") {
        // Persist local session state handles
        localStorage.setItem("premium_user", JSON.stringify(data.user));
        if (rememberMe) localStorage.setItem("remember_driver_email", email);

        setTimeout(() => {
          router.push("/fleet");
        }, 1500);
      }
    } catch (err: any) {
      setFeedback({ msg: err.message, isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-brand-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
          
          {/* Form Banner Branding */}
          <div className="bg-brand-charcoal py-6 px-8 text-center">
            <h1 className="text-2xl font-black text-brand-white uppercase tracking-tight">
              {currentMode === "login" && "Access Showroom"}
              {currentMode === "signup" && "Create Premium Account"}
              {currentMode === "forgot" && "Account Recovery"}
            </h1>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">
              {currentMode === "login" && "Welcome back challenger"}
              {currentMode === "signup" && "Unlock the absolute fleet"}
              {currentMode === "forgot" && "Restore secure terminal link"}
            </p>
          </div>

          <form onSubmit={executeAuthCall} className="p-8 space-y-4">
            
            {/* Server Feedback Messenger */}
            {feedback.msg && (
              <div className={`p-4 rounded-xl text-xs font-bold leading-relaxed border ${
                feedback.isError ? "bg-red-50 text-brand-red border-red-100" : "bg-green-50 text-green-700 border-green-100"
              }`}>
                {feedback.msg}
              </div>
            )}

            {/* ELEMENT 1: Full Name Text Input (Signup Only) */}
            {currentMode === "signup" && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="James Bond"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                />
              </div>
            )}

            {/* ELEMENT 2: Email Address Block */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                required
                placeholder="driver@premiumwheels.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-brand-red"
              />
            </div>

            {/* ELEMENT 3 & 4: Secure Password Box with Show/Hide Widget */}
            {currentMode !== "forgot" && (
              <div className="space-y-1 relative">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">Secure Password</label>
                  
                  {/* ELEMENT 7: Forgot Password Switch Link */}
                  {currentMode === "login" && (
                    <button
                      type="button"
                      onClick={() => { setCurrentMode("forgot"); setFeedback({ msg: "", isError: false }); }}
                      className="text-[10px] font-bold text-brand-red uppercase tracking-wider hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-brand-offwhite border border-gray-200 text-brand-charcoal rounded-lg px-4 py-2.5 pr-12 text-sm font-medium focus:outline-hidden focus:border-brand-red"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-bold uppercase text-brand-muted hover:text-brand-charcoal transition-colors tracking-wide"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}

            {/* ELEMENT 8: Remember Me Checkbox (Login Only) */}
            {currentMode === "login" && (
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-sm bg-brand-offwhite accent-brand-red border-gray-200 text-brand-red cursor-pointer"
                />
                <label id="rememberMe" className="text-xs text-brand-muted font-bold tracking-tight cursor-pointer selection:bg-transparent">
                  Remember choice on this terminal device
                </label>
              </div>
            )}

            {/* ELEMENT 5: Legal Protection Terms & Conditions Checkbox (Signup Only) */}
            {currentMode === "signup" && (
              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded-sm bg-brand-offwhite accent-brand-red border-gray-200 text-brand-red cursor-pointer"
                />
                <label id="terms" className="text-xs text-brand-muted font-medium leading-tight cursor-pointer selection:bg-transparent">
                  I agree to the <span className="font-bold text-brand-charcoal hover:underline">Rental Terms of Service</span> and acknowledge white-glove driver screening guidelines.
                </label>
              </div>
            )}

            {/* Core Action Submit Trigger */}
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer py-3.5 bg-brand-red text-brand-white text-xs font-extrabold uppercase tracking-widest rounded-lg hover:bg-brand-red/90 transition-all shadow-md shadow-red-600/10 disabled:opacity-50 pt-4"
            >
              {loading ? "Processing..." : currentMode === "login" ? "Sign In Securely" : currentMode === "signup" ? "Create Account" : "Dispatch Recovery Email"}
            </button>

            {/* Flow Mode Switch Toggles */}
            <div className="text-center pt-3 border-t border-gray-100 mt-4 text-xs font-bold uppercase tracking-wider text-brand-muted">
              {currentMode === "login" && (
                <button type="button" onClick={() => { setCurrentMode("signup"); setFeedback({ msg: "", isError: false }); }} className="hover:text-brand-red">
                  New here? Register Premium Account
                </button>
              )}
              {currentMode === "signup" && (
                <button type="button" onClick={() => { setCurrentMode("login"); setFeedback({ msg: "", isError: false }); }} className="hover:text-brand-red">
                  Already have credentials? Sign In
                </button>
              )}
              {currentMode === "forgot" && (
                <button type="button" onClick={() => { setCurrentMode("login"); setFeedback({ msg: "", isError: false }); }} className="hover:text-brand-red">
                  Return to secure workspace link
                </button>
              )}
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}