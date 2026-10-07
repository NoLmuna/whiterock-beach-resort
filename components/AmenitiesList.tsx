import React from "react";
import ResortImage from "./ResortImage";

export interface Amenity {
  name: string;
  icon: string;
}

export const SHARED_AMENITIES: Amenity[] = [
  { name: "Bathroom", icon: "assets/icon/Bathroom.png" },
  { name: "Air Conditioner", icon: "assets/icon/Air-Conditioner.png" },
  { name: "Shower", icon: "assets/icon/Shower.png" },
  { name: "Telephone", icon: "assets/icon/Telephone.png" },
  { name: "TV", icon: "assets/icon/TV.png" },
  { name: "Non-Smoking", icon: "assets/icon/804_non_smoking_room.png" },
];

export interface AmenitiesListProps {
  compact?: boolean;
  className?: string;
}

export default function AmenitiesList({
  compact = false,
  className = "",
}: AmenitiesListProps) {
  if (compact) {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {SHARED_AMENITIES.map((amenity) => (
          <div
            key={amenity.name}
            title={amenity.name}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300"
          >
            <div className="relative w-3.5 h-3.5 flex-shrink-0">
              <ResortImage
                src={amenity.icon}
                alt={amenity.name}
                fill
                className="object-contain"
              />
            </div>
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 ${className}`}
    >
      {SHARED_AMENITIES.map((amenity) => (
        <div
          key={amenity.name}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center gap-2 hover:border-amber-500/50 transition"
        >
          <div className="relative w-6 h-6 flex-shrink-0">
            <ResortImage
              src={amenity.icon}
              alt={amenity.name}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            {amenity.name}
          </span>
        </div>
      ))}
    </div>
  );
}
