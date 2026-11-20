const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowUp: "M7 17 17 7M8 7h9v9",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  check: "m5 12.5 4.5 4.5L19 7.5",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 8h16M4 16h16",
  chevron: "m6 9 6 6 6-6",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-4-4",
  pin: "M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2",
  phone: "M6.6 3.5 9.3 4l1.2 4-2 1.6a13 13 0 0 0 5.9 5.9l1.6-2 4 1.2.5 2.7a2 2 0 0 1-2 2.1A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2.1-2Z",
  car: "M5 16V11l2-5h10l2 5v5M3.5 16h17M7 19.5a1.5 1.5 0 1 0 0-.1M17 19.5a1.5 1.5 0 1 0 0-.1M5 11h14",
  shield: "M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6zM9 12l2 2 4-4",
  lens: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm9.5 3-4.8-4.8M10.5 7.5v6M7.5 10.5h6",
  flask: "M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3M7 15h10",
  doc: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  chat: "M4 5h16v11H9l-5 4z",
  video: "M3 7h12v10H3zM15 10.5 21 7v10l-6-3.5",
  calendar: "M4 6h16v14H4zM4 10h16M9 3v5M15 3v5",
  sparkle: "M12 3c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7Z",
  list: "M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01",
  play: "M8 5v14l11-7z",
  drop: "M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, stroke = 1.5, className }: { name: IconName; size?: number; stroke?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={paths[name]} />
    </svg>
  );
}

export function Brand({ name, size = 18 }: { name: "instagram" | "whatsapp" | "threads"; size?: number }) {
  const d = {
    instagram: "M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm4.5 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm5-9.5h.01",
    whatsapp: "M4 20l1.3-3.9A8 8 0 1 1 8 18.8zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1a5 5 0 0 1-2.4-2.4l1-1-1-2z",
    threads: "M16.5 11.2c-.3-2.6-2-3.9-4.4-3.9-2.1 0-3.6 1-4 2.6M12 21c-5 0-8-3.4-8-9s3-9 8-9c4.3 0 7 2.4 7.8 6.3M9 14.3c0 1.3 1.2 2.2 2.8 2.2 2.4 0 3.8-1.6 3.8-5.2-1.4-.4-6.6-1.1-6.6 3z",
  }[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
