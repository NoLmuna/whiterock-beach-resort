"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ResortImage from "./ResortImage";
import Button from "./Button";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  CalendarCheck,
} from "lucide-react";

interface NavDropdownItem {
  name: string;
  href: string;
  description?: string;
}

interface NavLink {
  name: string;
  href?: string;
  dropdown?: NavDropdownItem[];
}

const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "The Resort",
    dropdown: [
      { name: "About Us", href: "/about-us", description: "Resort history & Philippine Tourism Award" },
      { name: "Dining", href: "/dining", description: "Sunset Restaurant & Naya Bar and Grill" },
      { name: "Venues", href: "/venues", description: "Grand Ballroom, Convention Hall & Seaside" },
    ],
  },
  {
    name: "Accommodation",
    dropdown: [
      { name: "Standard Room", href: "/accommodation/standard-room", description: "Authentic Filipino comfort" },
      { name: "Deluxe Rooms", href: "/accommodation/deluxe-rooms", description: "Pool view & private balcony options" },
      { name: "Family Suite", href: "/accommodation/family-suite", description: "Spacious multi-bedroom suites" },
      { name: "Cabana", href: "/accommodation/cabana", description: "Beachfront & poolside cabanas" },
      { name: "Villas", href: "/accommodation/villa", description: "Villas with private Jacuzzi & whirlpool" },
      { name: "6-Bedroom Villa", href: "/accommodation/6-bedroom-villa", description: "Ultimate family & group retreat" },
    ],
  },
  {
    name: "Events",
    dropdown: [
      { name: "Meeting & Company Outings", href: "/events/company-outings", description: "Teambuilding & corporate conventions" },
      { name: "Wedding & Socials", href: "/events/wedding-and-social", description: "Beachfront weddings & celebrations" },
    ],
  },
  {
    name: "Offers",
    dropdown: [
      { name: "Staycation Specials", href: "/offers/staycation-specials", description: "Save up to 40% on holiday getaways" },
      { name: "Dining Deals", href: "/offers/dining-deals", description: "Buffets and special dining packages" },
    ],
  },
  { name: "Facilities", href: "/facilities" },
  {
    name: "More",
    dropdown: [
      { name: "FAQs", href: "/faqs", description: "Check-in info, amenities & directions" },
      { name: "Gallery", href: "/gallery", description: "Resort highlights & photo tours" },
      { name: "Privacy Policy", href: "/privacy-policy", description: "Data protection & privacy guidelines" },
      { name: "Hotel Policy", href: "/hotel-policy", description: "House rules, check-in & check-out" },
      { name: "Pet Policy Guidelines", href: "/pet-policy", description: "Pet rates, size limits & regulations" },
      { name: "Terms & Conditions", href: "/terms-and-conditions", description: "Booking terms & resort agreements" },
      { name: "Contact Us", href: "/contact-us", description: "Map location, hotlines & inquiry form" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  // Monitor scroll for sticky navbar visual elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleMobileSection = (name: string) => {
    setMobileExpandedSection(mobileExpandedSection === name ? null : name);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-xl py-2.5 border-b border-white/10"
          : "bg-gradient-to-b from-slate-950/85 via-slate-950/50 to-transparent py-3 md:py-4"
      }`}
    >
      {/* Top utility bar on desktop */}
      <div className="hidden lg:block border-b border-white/10 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs text-slate-300">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-amber-400 transition">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Subic, Zambales, Philippines
            </span>
            <a
              href="tel:+639171264937"
              className="flex items-center gap-1.5 hover:text-amber-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              Reservations: +63 917 126 4937
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:reservations@whiterock.com.ph"
              className="flex items-center gap-1.5 hover:text-amber-400 transition"
            >
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              reservations@whiterock.com.ph
            </a>
            <span className="text-amber-400 font-semibold tracking-wider text-[11px] uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Resort of the Year 2024
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-3 group">
          <div className="relative w-36 sm:w-44 md:w-52 h-10 sm:h-12 md:h-14">
            <ResortImage
              src="assets/icon/CW-WHITEROCK BEACH RESORT Logo.png"
              alt="Whiterock Beach Resort Logo"
              fill
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-102 drop-shadow-md"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((item) => {
            const hasDropdown = Boolean(item.dropdown);
            const isOpen = activeDropdown === item.name;

            if (hasDropdown) {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    className="flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold tracking-wider uppercase text-white/90 hover:text-amber-400 transition rounded-md"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-amber-400" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute top-full left-0 w-64 pt-2 z-50">
                      <div className="bg-slate-900/98 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl p-2 animate-fade-in divide-y divide-white/5">
                        {item.dropdown!.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-3 py-2.5 rounded-lg text-left hover:bg-white/10 transition group"
                          >
                            <span className="block text-xs font-bold text-white group-hover:text-amber-400 uppercase tracking-wide">
                              {subItem.name}
                            </span>
                            {subItem.description && (
                              <span className="block text-[11px] text-slate-400 group-hover:text-slate-300 mt-0.5 line-clamp-1">
                                {subItem.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href || "/"}
                className={`px-3 py-2 text-xs xl:text-sm font-semibold tracking-wider uppercase transition rounded-md ${
                  pathname === item.href
                    ? "text-amber-400 font-bold"
                    : "text-white/90 hover:text-amber-400"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            href="#booking-selector"
            variant="gold"
            size="sm"
            className="rounded-full shadow-lg"
          >
            <CalendarCheck className="w-3.5 h-3.5 mr-1.5" />
            Book Now
          </Button>
        </div>

        {/* Mobile Action & Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+639171264937"
            aria-label="Call Reservations"
            className="w-9 h-9 rounded-full bg-amber-600/90 text-white flex items-center justify-center hover:bg-amber-700 transition"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] sm:top-[68px] z-40 lg:hidden bg-slate-950/98 backdrop-blur-xl border-t border-white/10 flex flex-col justify-between overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <nav className="flex flex-col gap-1 divide-y divide-white/5">
            {NAV_LINKS.map((item) => {
              const hasDropdown = Boolean(item.dropdown);
              const isExpanded = mobileExpandedSection === item.name;

              if (hasDropdown) {
                return (
                  <div key={item.name} className="py-2">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(item.name)}
                      className="w-full flex items-center justify-between py-2 text-sm font-bold uppercase tracking-wider text-white hover:text-amber-400"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-amber-400" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-3 mt-1 flex flex-col gap-1 border-l-2 border-amber-600/50">
                        {item.dropdown!.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 text-xs font-medium text-slate-300 hover:text-amber-400 transition"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={item.name} className="py-2">
                  <Link
                    href={item.href || "/"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm font-bold uppercase tracking-wider text-white hover:text-amber-400"
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Mobile Footer Drawer Actions */}
          <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
            <Button
              href="#booking-selector"
              onClick={() => setMobileMenuOpen(false)}
              variant="gold"
              size="lg"
              className="w-full rounded-xl"
            >
              Book Your Stay Now
            </Button>

            <div className="flex flex-col gap-2 text-xs text-slate-400 text-center">
              <div>Reservations: +63 917 126 4937</div>
              <div>Sales: +63 908 814 6956</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
