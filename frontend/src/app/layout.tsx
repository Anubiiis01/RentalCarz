import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css"; // Double check this path points to where your globals.css lives!

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Premium Wheels | Luxury & Sport Car Rentals",
  description: "Experience the thrill of driving premium sports cars and luxury SUVs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}