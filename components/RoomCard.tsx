import React from "react";
import ResortImage from "./ResortImage";
import Button from "./Button";
import AmenitiesList from "./AmenitiesList";
import { Users, Maximize, Bed } from "lucide-react";

export interface RoomCardProps {
  title: string;
  image: string;
  description: string;
  occupancy?: string;
  size?: string;
  bedType?: string;
  exploreHref?: string;
  onBookNow?: () => void;
  className?: string;
}

export default function RoomCard({
  title,
  image,
  description,
  occupancy,
  size,
  bedType,
  exploreHref = "/accommodation/standard-room",
  onBookNow,
  className = "",
}: RoomCardProps) {
  return (
    <article
      className={`group flex flex-col lg:flex-row bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300 ${className}`}
    >
      {/* Image container */}
      <div className="relative w-full lg:w-5/12 aspect-[16/10] lg:aspect-auto min-h-[240px] sm:min-h-[280px] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <ResortImage
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
        <span className="absolute top-4 left-4 bg-amber-600/90 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
          Signature Room
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-6 sm:p-7 lg:w-7/12 gap-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h3>
          </div>

          {/* Quick Specs */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
            {occupancy && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                {occupancy}
              </span>
            )}
            {size && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
                <Maximize className="w-3.5 h-3.5 text-amber-600" />
                {size}
              </span>
            )}
            {bedType && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
                <Bed className="w-3.5 h-3.5 text-amber-600" />
                {bedType}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {description}
          </p>

          {/* Amenities icons */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
              Room Amenities Included
            </span>
            <AmenitiesList compact />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button
            href={exploreHref}
            variant="outline"
            className="w-full sm:w-auto flex-1"
          >
            Explore
          </Button>
          <Button
            onClick={onBookNow}
            href={onBookNow ? undefined : "/contact-us"}
            variant="gold"
            className="w-full sm:w-auto flex-1"
          >
            Book Now
          </Button>
        </div>
      </div>
    </article>
  );
}
