"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Our Mission", href: "/mission" },
    { label: "Our Team", href: "/team" },
    { label: "Contact Us", href: "/contact" },
  ];

  const handleDonate = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("openDonationModal"));
  };

  return (
    <header className="bg-teal-900 text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-tight">Pad The Way</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-teal-100 hover:text-white transition-colors duration-200">{link.label}</a>
          ))}
          <button onClick={handleDonate} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-sm transition-colors duration-200">Donate Now</button>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white" aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-teal-800 px-4 py-4 border-t border-teal-700">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="block py-3 text-sm font-medium text-teal-100 hover:text-white border-b border-teal-700 transition-colors duration-200" onClick={() => setIsOpen(false)}>{link.label}</a>
          ))}
          <button onClick={handleDonate} className="block mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-sm text-center transition-colors duration-200">Donate Now</button>
        </div>
      )}
    </header>
  );
}
