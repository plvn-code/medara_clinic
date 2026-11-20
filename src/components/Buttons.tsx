"use client";

import { openBooking } from "@/lib/plan";

/** A button that opens the booking sheet (usable from server components). */
export function BookButton({ className = "btn", concern, note, children }: { className?: string; concern?: string; note?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => openBooking({ concern, note })}>
      {children}
    </button>
  );
}
