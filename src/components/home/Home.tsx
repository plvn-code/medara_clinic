"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { openBooking, tg } from "@/lib/plan";
import { Icon } from "../Icons";
import { Clip, Compare } from "../Media";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Readouts shown next to the lens as it moves — a nod to the dermatoscope used at every consultation. */
const READOUTS = [
  ["Текстура", "оценка рельефа"],
  ["Поры", "размер и содержимое"],
  ["Тон", "пигмент и сосуды"],
  ["Барьер", "увлажнённость"],
];

/**
 * Hero with a «dermatoscope» lens: a second, 2× copy of the video is revealed in a circle that follows the cursor.
 * Touch screens: the lens drifts on its own. Reduced motion: no lens.
 */
export function HeroLens({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const base = useRef<HTMLVideoElement | null>(null);
  const zoom = useRef<HTMLVideoElement | null>(null);
  const [read, setRead] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el || reduced()) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let x = el.clientWidth * 0.72,
      y = el.clientHeight * 0.42,
      cx = x,
      cy = y,
      raf = 0;
    const t0 = performance.now();
    const R = () => (fine ? Math.min(150, el.clientWidth * 0.16) : Math.min(90, el.clientWidth * 0.22));
    const apply = () => {
      el.style.setProperty("--lx", `${cx.toFixed(1)}px`);
      el.style.setProperty("--ly", `${cy.toFixed(1)}px`);
    };
    const loop = (t: number) => {
      if (!fine) {
        const k = (t - t0) / 1000;
        x = el.clientWidth * (0.6 + Math.sin(k * 0.45) * 0.22);
        y = el.clientHeight * (0.2 + Math.cos(k * 0.6) * 0.06);
      }
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      apply();
      raf = requestAnimationFrame(loop);
    };
    el.style.setProperty("--lr", `${R()}px`);
    raf = requestAnimationFrame(loop);
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      setRead(Math.min(READOUTS.length - 1, Math.floor((x / r.width) * READOUTS.length)));
    };
    const enter = () => el.style.setProperty("--lr", `${R()}px`);
    const leave = () => el.style.setProperty("--lr", "0px");
    if (fine) {
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
    }
    // Keep the zoomed copy in step with the base video.
    const sync = setInterval(() => {
      const a = base.current,
        b = zoom.current;
      if (a && b && Math.abs(a.currentTime - b.currentTime) > 0.08) b.currentTime = a.currentTime;
    }, 400);
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    const onScroll = () => el.style.setProperty("--hp", String(Math.min(1, scrollY / innerHeight)));
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(sync);
      io.disconnect();
      removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="hero-vid">
        <Clip src="/video/hero.mp4" mobile="/video/hero-mobile.mp4" poster="/img/hero-poster.webp" onReady={(v) => (base.current = v)} />
      </div>
      <div className="hero-zoom" aria-hidden="true">
        <Clip src="/video/hero.mp4" mobile="/video/hero-mobile.mp4" poster="/img/hero-poster.webp" onReady={(v) => (zoom.current = v)} />
      </div>
      <div className="lens-ring" aria-hidden="true">
        <span className="lens-tag">
          {READOUTS[read][0]}
          <small>{READOUTS[read][1]}</small>
        </span>
      </div>
      <p className="hero-hint" aria-hidden="true">
        <Icon name="lens" size={16} /> Наведите — как под дерматоскопом
      </p>
      <div className="hero-copy">
        <div className="wrap">{children}</div>
      </div>
    </section>
  );
}

type Concern = { slug: string; title: string; short: string; lead: string; approach: { title: string; text: string }[]; prices: { id: string; title: string; from: number }[]; cases: { id: string; title: string }[] };

/** «Что вас беспокоит?» — pick a concern, see how the clinic treats it, related procedures with prices and a real case. */
export function Explorer({ items, fallbackImg }: { items: Concern[]; fallbackImg: string }) {
  const [cur, setCur] = useState(0);
  const c = items[cur];
  return (
    <div className="cx">
      <div className="cx-tabs" role="tablist" aria-label="Проблемы кожи">
        {items.map((it, i) => (
          <button key={it.slug} type="button" role="tab" aria-selected={i === cur} className={`cx-tab ${i === cur ? "on" : ""}`} onClick={() => setCur(i)}>
            <small>0{i + 1}</small>
            <span>
              <b>{it.title}</b>
              <span>{it.short}</span>
            </span>
            <Icon name="arrow" size={18} />
          </button>
        ))}
      </div>
      <div className="cx-panel" key={c.slug} role="tabpanel">
        <div className="cx-main">
          <p className="lead">{c.lead}</p>
          <ol className="cx-steps">
            {c.approach.map((s) => (
              <li key={s.title}>
                <b>{s.title}</b>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="cx-prices">
            {c.prices.map((p) => (
              <Link key={p.id} href={`/ceny#${p.id}`} className="chip">
                {p.title} <small>от {tg(p.from)}</small>
              </Link>
            ))}
          </div>
          <div className="cx-act">
            <Link href={`/problemy/${c.slug}`} className="btn">
              Подробнее <Icon name="arrow" size={18} />
            </Link>
            <button type="button" className="btn btn-line" onClick={() => openBooking({ concern: c.slug })}>
              Записаться
            </button>
          </div>
        </div>
        <div className="cx-side">
          {c.cases[0] ? (
            <>
              <Compare id={c.cases[0].id} label={c.cases[0].title} />
              <p className="legal">Реальный пациент клиники. Результат индивидуален.</p>
            </>
          ) : (
            <div className="cx-empty">
              <img src={fallbackImg} alt="" loading="lazy" />
              <span>Каждый план начинается с осмотра и дерматоскопии</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Patient journey: pinned and scrolled sideways on desktop; a swipeable row on touch / narrow screens. */
export function Journey({ head, steps }: { head: React.ReactNode; steps: { title: string; text: string }[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const el = root.current,
      tr = track.current;
    if (!el || !tr) return;
    const mq = matchMedia("(min-width: 961px) and (hover: hover)");
    let dist = 0,
      raf = 0;
    const update = () => {
      raf = 0;
      if (!dist) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      tr.style.setProperty("--x", `${(-p * dist).toFixed(1)}px`);
      el.style.setProperty("--jp", p.toFixed(3));
    };
    const measure = () => {
      const on = mq.matches && !reduced();
      setPinned(on);
      if (!on) {
        el.style.height = "";
        dist = 0;
        return;
      }
      dist = Math.max(0, tr.scrollWidth - innerWidth);
      el.style.height = `${innerHeight + dist}px`;
      update();
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    addEventListener("resize", measure);
    addEventListener("scroll", on, { passive: true });
    return () => {
      ro.disconnect();
      removeEventListener("resize", measure);
      removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section className={`jr sec-ivory ${pinned ? "" : "flat"}`} ref={root}>
      <div className="jr-stick">
        <div className="jr-head">{head}</div>
        <div className="jr-track" ref={track}>
          {steps.map((s, i) => (
            <article key={s.title} className="jr-step">
              <span className="jr-n">0{i + 1}</span>
              <div>
                <b>{s.title}</b>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
        {pinned && (
          <div className="jr-bar" aria-hidden="true">
            <i />
          </div>
        )}
      </div>
    </section>
  );
}

/** Horizontal results row with arrow buttons. */
export function ResultsRail({ items }: { items: { id: string; title: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <>
      <div className="res-scroll" ref={ref}>
        {items.map((c) => (
          <figure key={c.id}>
            <Compare id={c.id} label={c.title} />
            <figcaption className="cmp-cap">
              <b>{c.title}</b>
              <p>{c.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
        <div className="res-nav">
          <button type="button" onClick={() => go(-1)} aria-label="Назад">
            <Icon name="arrow" size={20} className="flip" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Вперёд">
            <Icon name="arrow" size={20} />
          </button>
        </div>
        <Link href="/rezultaty" className="link">
          Все результаты <Icon name="arrow" size={16} />
        </Link>
      </div>
    </>
  );
}

/** Weekly schedule chips; today is outlined (computed on the client to avoid a server/client mismatch). */
export function Days({ days, hours, byAppointment }: { days: number[]; hours?: string; byAppointment?: boolean }) {
  const [today, setToday] = useState(-1);
  useEffect(() => setToday((new Date().getDay() + 6) % 7), []);
  const D = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  if (byAppointment)
    return (
      <div className="days">
        <span className="on" style={{ padding: "0 12px" }}>
          По предварительной записи
        </span>
      </div>
    );
  return (
    <div className="days" aria-label={`Приём: ${days.map((d) => D[d]).join(", ")}${hours ? `, ${hours}` : ""}`}>
      {D.map((d, i) => (
        <span key={d} className={`${days.includes(i) ? "on" : ""} ${i === today ? "today" : ""}`}>
          {d}
        </span>
      ))}
      {hours && <em>{hours}</em>}
    </div>
  );
}

export { Clip };
