"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export { tg } from "./format";

export type PlanItem = { key: string; group: string; name: string; price: number };

type Ctx = {
  items: PlanItem[];
  total: number;
  ready: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  has: (key: string) => boolean;
  toggle: (it: PlanItem) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const PlanContext = createContext<Ctx | null>(null);
const KEY = "medara-plan-v1";

/**
 * «Мой план»: procedures picked from the price list. Not a cart — the visitor sends the list to the clinic in WhatsApp,
 * the doctor confirms the protocol at the consultation. Lives in localStorage.
 */
export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);
  useEffect(() => {
    document.documentElement.classList.toggle("lock", open);
  }, [open]);

  const toggle = useCallback((it: PlanItem) => setItems((xs) => (xs.some((x) => x.key === it.key) ? xs.filter((x) => x.key !== it.key) : [...xs, it])), []);
  const remove = useCallback((key: string) => setItems((xs) => xs.filter((x) => x.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<Ctx>(
    () => ({ items, total: items.reduce((n, x) => n + x.price, 0), ready, open, setOpen, has: (k) => items.some((x) => x.key === k), toggle, remove, clear }),
    [items, ready, open, toggle, remove, clear],
  );
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const c = useContext(PlanContext);
  if (!c) throw new Error("usePlan outside PlanProvider");
  return c;
}

/** Opens the booking sheet from anywhere; `concern` / `note` prefill it. */
export const openBooking = (detail: { concern?: string; note?: string } = {}) => window.dispatchEvent(new CustomEvent("open-booking", { detail }));
