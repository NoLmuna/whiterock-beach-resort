"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ResortImage from "@/components/ResortImage";
import Button from "@/components/Button";
import DateSelector from "@/components/DateSelector";
import AutoScrollGallery, { GalleryItem } from "@/components/AutoScrollGallery";
import RoomCard from "@/components/RoomCard";
import BookingModal from "@/components/BookingModal";
import {
  Award,
  Sparkles,
  Waves,
  Palmtree,
  Compass,
  Star,
  Quote,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

const FACILITY_ITEMS: GalleryItem[] = [
  {
    src: "assets/images/homepage/Waterpark_5222.png",
    title: "Thrilling Waterpark",
    subtitle: "Huge waterslides, wave pools, and interactive water attractions for all ages.",
  },
  {
    src: "assets/images/homepage/Beach_Top_View_2552.png",
    title: "300-Meter Shoreline",
    subtitle: "Pristine beachfront panoramic vistas looking across Subic Bay.",
  },
  {
    src: "assets/images/homepage/Ballroom_9858.png",
    title: "Grand Ballroom",
    subtitle: "Magnificent venue spaces accommodating up to 600 banquet guests.",
  },
  {
    src: "assets/images/homepage/Kiddie_Playground_8864.png",
    title: "Kiddie Playground",
    subtitle: "Safe, vibrant play zones built specially for young children.",
  },
  {
    src: "assets/images/homepage/Seesaw_1181.png",
    title: "Adventure Playgrounds",
    subtitle: "Engaging outdoor play activities right along the grassy lawns.",
  },
  {
    src: "assets/images/homepage/Teambuilding_Ground_2838.png",
    title: "Teambuilding Grounds",
    subtitle: "Extensive obstacle courses and wide open lawns for corporate retreats.",
  },
  {
    src: "assets/images/homepage/Ground_2188.png",
    title: "Sprawling Resort Lawns",
    subtitle: "7 hectares of landscaped tropical greenery and tranquil pathways.",
  },
  {
    src: "assets/images/homepage/Gym_2256.png",
    title: "Fitness Center",
    subtitle: "Equipped workout facilities for staying energized during your vacation.",
  },
];

const TESTIMONIALS = [
  {
    name: "David P",
    location: "Manila, Philippines",
    review:
      "Rooms are freezing cold which is fine especially during the summer period. Staffs are very accommodating and kind!",
    rating: 5,
    tag: "Family Vacation",
  },
  {
    name: "Nicole M",
    location: "Pampanga, Philippines",
    review:
      "its was a good experience, the staff was exceptionally friendly and went above and beyond to ensure we had everything we needed.",
    rating: 5,
    tag: "Weekend Getaway",
  },
  {
    name: "Russell Ehrlich",
    location: "Sydney, Australia",
    review:
      "Went here with my girlfriend and her children. We all had a great time especially the younger kids in the water park",
    rating: 5,
    tag: "International Traveler",
  },
];

export default function HomePage() {
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  // GSAP scroll and entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleOpenBooking = (roomName: string = "Standard Room") => {
    setSelectedRoomForBooking(roomName);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* =========================================================================
          HERO VIDEO / SCENIC SECTION
          ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950"
      >
        {/* Scenic Background Media with subtle zoom */}
        <div className="absolute inset-0 z-0">
          <ResortImage
            src="assets/images/homepage/Beach_Top_View_2552.png"
            alt="Whiterock Beach Resort Aerial Shoreline"
            fill
            priority
            className="object-cover object-center scale-105 filter brightness-[0.7] contrast-[1.05]"
          />
          {/* Layered Gradient Overlays for optimal text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div
          ref={heroTextRef}
          className="relative z-10 max-w-5xl mx-auto my-auto text-center flex flex-col items-center gap-4 sm:gap-6 pt-10"
        >
          {/* Tourism Award Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase animate-fade-in">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Philippine Tourism Awards 2024 • Resort of the Year</span>
          </div>

          {/* Headings */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase drop-shadow-xl font-display leading-[1.1]">
            Experience Paradise <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              At Whiterock
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl font-light tracking-wide text-slate-200 max-w-2xl drop-shadow-md">
            YOUR ULTIMATE BEACH GETAWAY AWAITS!
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed hidden sm:block">
            Subic Zambales’ premier 7-hectare coastal destination featuring 300m
            of white shoreline, thrilling waterpark attractions, and luxury suites.
          </p>
        </div>

        {/* Date Selector / Booking Bar */}
        <div
          id="booking-selector"
          className="relative z-20 w-full max-w-5xl mx-auto mt-8 sm:mt-12"
        >
          <DateSelector
            onBookNow={(details) => {
              handleOpenBooking("Standard Room");
            }}
          />
        </div>
      </section>

      {/* =========================================================================
          ABOUT SECTION
          ========================================================================= */}
      <section
        ref={aboutRef}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <ResortImage
                src="assets/images/homepage/home1.png"
                alt="About Whiterock Beach Resort"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Overlay Award Chip */}
            <div className="absolute -bottom-5 -right-2 sm:right-6 bg-amber-600 text-white p-4 sm:p-5 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-white dark:border-slate-900">
              <Award className="w-8 h-8 text-amber-200 flex-shrink-0" />
              <div>
                <span className="block text-[10px] tracking-widest uppercase font-bold text-amber-200">
                  National Honor
                </span>
                <span className="block text-xs sm:text-sm font-bold">
                  Resort of the Year 2024
                </span>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 block">
                Discover Our Heritage
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight font-display">
                About Whiterock Beach Resort
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>Philippine Tourism Awards 2024 - Resort of the Year.</strong>{" "}
              Discover Whiterock Beach Resort, a premier beachfront getaway in Subic,
              Zambales. Spanning 7 hectares with a 300-meter shoreline, we offer
              thrilling waterpark attractions, scenic mountain views, and the perfect
              setting for family vacations, romantic escapes, and corporate retreats.
              Whether you seek adventure or relaxation, experience the best of sun,
              sea, and fun at Whiterock!
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <Palmtree className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    7 Hectares
                  </h4>
                  <p className="text-[11px] text-slate-500">Expansive beach property</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <Waves className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    300m Shoreline
                  </h4>
                  <p className="text-[11px] text-slate-500">Uninterrupted beach vistas</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button href="/about-us" variant="secondary" size="lg">
                About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ACCOMMODATION PREVIEW SECTION
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400">
              Luxurious Island Living
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight font-display">
              Accommodation Preview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Immerse yourself in modern coastal sanctuaries equipped with
              authentic Filipino finishes, smart TVs, and plush amenities.
            </p>
          </div>

          {/* Room Cards Stack */}
          <div className="flex flex-col gap-8">
            {/* Standard Room */}
            <RoomCard
              title="Standard Room"
              image="assets/images/homepage/home2.png"
              occupancy="2 Adults (Standard)"
              size="21 sqm"
              bedType="Queen or Twin Setup"
              description='Experience a memorable stay in our 21 sqm wide room, a well-appointed guestroom with a touch of Filipino authenticity, equipped with a 43" Smart TV. Can accommodate 2 adults (standard occupancy). Extra mattress available upon request, subject to surcharge.'
              exploreHref="/accommodation/standard-room"
              onBookNow={() => handleOpenBooking("Standard Room")}
            />

            {/* Superior Family Room */}
            <RoomCard
              title="Superior Family Room"
              image="assets/images/homepage/home3.png"
              occupancy="4 Adults (Standard)"
              size="56 sqm"
              bedType="2 King-Sized Beds"
              description='Experience a memorable stay in our well-appointed guestroom with a touch of Filipino authenticity, which is 56 sqm wide with 2 king-sized beds. It has a 43-inch Smart TV and can accommodate 4 adults (standard occupancy)...'
              exploreHref="/accommodation/standard-room"
              onBookNow={() => handleOpenBooking("Superior Family Room")}
            />
          </div>

          {/* Global CTA */}
          <div className="text-center pt-4">
            <Button
              href="/accommodation/standard-room"
              variant="primary"
              size="lg"
              className="px-10"
            >
              View Accommodations
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FACILITIES AUTO-SCROLL GALLERY SECTION (GSAP)
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-400">
              Endless Entertainment
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight font-display">
              Resort Facilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              From our world-class inflatable waterparks and pools to manicured
              beachfront teambuilding grounds and grand event ballrooms.
            </p>
          </div>

          <div>
            <Button href="/facilities" variant="gold" size="md">
              Explore Facilities
            </Button>
          </div>
        </div>

        {/* GSAP Auto-scrolling marquee gallery */}
        <AutoScrollGallery items={FACILITY_ITEMS} speed={45} />
      </section>

      {/* =========================================================================
          TESTIMONIALS SECTION
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header with Tripadvisor Branding */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              <div className="relative w-6 h-6 flex-shrink-0">
                <ResortImage
                  src="assets/icon/tripadvisor_icon.png"
                  alt="Tripadvisor Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                Philippine Tourism Awards 2024 – Resort of the Year
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight font-display">
              What Clients Say?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Read real impressions from guests who experienced the Whiterock
              brand of warm Filipino hospitality and seaside adventure.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition duration-300"
              >
                <div className="space-y-4">
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                  </div>

                  <p className="text-sm sm:text-base italic text-slate-700 dark:text-slate-200 leading-relaxed">
                    “{item.review}”
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </h4>
                    <span className="text-xs text-slate-500">{item.location}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-sky-900 via-sky-950 to-slate-950 text-white p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-sky-800/50">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-xl sm:text-2xl font-bold font-display">
                Ready for your unforgettable beach vacation?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Book direct for the guaranteed best rates, exclusive waterpark
                privileges, and 24/7 dedicated guest support.
              </p>
            </div>
            <Button
              onClick={() => handleOpenBooking("Standard Room")}
              variant="gold"
              size="lg"
              className="flex-shrink-0"
            >
              Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialRoom={selectedRoomForBooking || "Standard Room"}
      />
    </div>
  );
}
