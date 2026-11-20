"use client";

import { useEffect, useRef, useState } from "react";

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Muted loop that plays only while on screen; with reduced motion the poster stays. `mobile` = lighter portrait file for phones. */
export function Clip({ src, mobile, poster, className, onReady }: { src: string; mobile?: string; poster: string; className?: string; onReady?: (v: HTMLVideoElement) => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced()) return;
    const want = mobile && matchMedia("(max-width: 760px)").matches ? mobile : src;
    if (!v.src.endsWith(want)) v.src = want;
    onReady?.(v);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.02 });
    io.observe(v);
    return () => io.disconnect();
    // onReady is a stable setter from the caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, mobile]);
  return <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-hidden="true" />;
}

/** Before / after: drag (or use arrow keys on the hidden range input) to move the divider. Gently sweeps once on first sight. */
export function Compare({ id, label }: { id: string; label: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  useEffect(() => {
    const el = box.current;
    if (!el || reduced()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || touched.current) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          if (touched.current) return;
          const k = Math.min(1, (t - t0) / 1800);
          setPos(50 + Math.sin(k * Math.PI * 2) * 22 * (1 - k));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="cmp" ref={box} style={{ ["--pos" as string]: `${pos}%` }}>
      <img src={`/img/ba/${id}-b.webp`} alt={`${label} — до лечения`} loading="lazy" />
      <img className="cmp-a" src={`/img/ba/${id}-a.webp`} alt={`${label} — после лечения`} loading="lazy" />
      <div className="cmp-handle" aria-hidden="true" />
      <div className="cmp-tags" aria-hidden="true">
        <span>До</span>
        <span>После</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => {
          touched.current = true;
          setPos(Number(e.target.value));
        }}
        onPointerDown={() => (touched.current = true)}
        aria-label={`Сравнить до и после: ${label}`}
      />
    </div>
  );
}
