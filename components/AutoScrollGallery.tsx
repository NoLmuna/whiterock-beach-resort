"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ResortImage from "./ResortImage";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
  src: string;
  title?: string;
  subtitle?: string;
}

export interface AutoScrollGalleryProps {
  items: GalleryItem[];
  speed?: number; // duration in seconds for one full loop
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export default function AutoScrollGallery({
  items,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: AutoScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items 3 times for a seamless endless loop
  const displayItems = [...items, ...items, ...items];

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 3;

    // Reset initial position
    gsap.set(track, { x: 0 });

    const targetX = direction === "left" ? -totalWidth : totalWidth;

    const tween = gsap.to(track, {
      x: targetX,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const num = parseFloat(x);
          return (num % totalWidth) + "px";
        }),
      },
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, [items, speed, direction]);

  const togglePause = () => {
    if (!tweenRef.current) return;
    if (isPaused) {
      tweenRef.current.play();
      setIsPaused(false);
    } else {
      tweenRef.current.pause();
      setIsPaused(true);
    }
  };

  const nudge = (offset: number) => {
    if (!trackRef.current) return;
    const currentX = gsap.getProperty(trackRef.current, "x") as number;
    gsap.to(trackRef.current, {
      x: currentX + offset,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-4 select-none group ${className}`}
      onMouseEnter={() => {
        if (pauseOnHover && tweenRef.current && !isPaused) {
          tweenRef.current.pause();
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover && tweenRef.current && !isPaused) {
          tweenRef.current.play();
        }
      }}
      onTouchStart={() => {
        if (pauseOnHover && tweenRef.current && !isPaused) {
          tweenRef.current.pause();
        }
      }}
      onTouchEnd={() => {
        if (pauseOnHover && tweenRef.current && !isPaused) {
          tweenRef.current.play();
        }
      }}
    >
      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 md:gap-6 will-change-transform cursor-grab active:cursor-grabbing"
      >
        {displayItems.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className="flex-shrink-0 w-[260px] sm:w-[320px] md:w-[380px] group/item relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <ResortImage
                src={item.src}
                alt={item.title || "Whiterock Resort Feature"}
                fill
                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 380px"
                className="object-cover transition-transform duration-700 ease-out group-hover/item:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            </div>

            {item.title && (
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400 block mb-0.5">
                  Whiterock Attraction
                </span>
                <h4 className="text-base sm:text-lg font-bold leading-tight drop-shadow-sm">
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Controls Overlay for Touch / Desktop */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={() => nudge(280)}
          aria-label="Scroll left"
          className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center hover:bg-amber-600 hover:text-white transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={togglePause}
          aria-label={isPaused ? "Play gallery" : "Pause gallery"}
          className="px-4 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:bg-amber-600 hover:text-white transition"
        >
          {isPaused ? (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => nudge(-280)}
          aria-label="Scroll right"
          className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center hover:bg-amber-600 hover:text-white transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
