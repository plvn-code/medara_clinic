"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { openBooking, tg, usePlan } from "@/lib/plan";
import { site, wa } from "@/lib/site";
import { Brand, Icon } from "./Icons";

/** Letters rise, a sage line runs like a scan, the curtain lifts. Shown once per session on the home page only. */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-in">
        <div className="intro-word">
          {"MEDARA".split("").map((c, i) => (
            <span key={i} style={{ ["--i" as string]: i }}>
              {c}
            </span>
          ))}
        </div>
        <div className="intro-bar">
          <i />
        </div>
        <p className="intro-sub">clinic · almaty</p>
      </div>
    </div>
  );
}

/** Phone bar: WhatsApp, call, book. Hides while scrolling down. */
export function MobileBar() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY;
      if (Math.abs(y - last) > 6) setHide(y > last && y > 300);
      last = y;
    };
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={`mb ${hide ? "hide" : ""}`} aria-label="Быстрые действия">
      <a href={wa("Здравствуйте! Хочу записаться на консультацию.")} target="_blank" rel="noopener noreferrer">
        <Brand name="whatsapp" size={18} /> WhatsApp
      </a>
      <a href={site.phoneHref}>
        <Icon name="phone" size={17} /> Звонок
      </a>
      <button type="button" className="mb-main" onClick={() => openBooking()}>
        Записаться
      </button>
    </nav>
  );
}

/** «Мой план»: floating summary + drawer with the chosen procedures. */
export function PlanUI() {
  const { items, total, ready, open, setOpen, remove, clear } = usePlan();
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname, setOpen]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open, setOpen]);
  const n = ready ? items.length : 0;
  return (
    <>
      <div className={`plan-pill ${n && !open ? "on" : ""}`} role="status" aria-live="polite">
        <span>
          <b>Мой план · {n}</b> <span>{tg(total)}</span>
        </span>
        <button type="button" className="btn btn-light" onClick={() => setOpen(true)}>
          Открыть
        </button>
      </div>
      <div className={`drawer ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Мой план" inert={!open}>
        <div className="scrim" onClick={() => setOpen(false)} />
        <aside className="drawer-panel">
          <div className="drawer-head">
            <h2>Мой план</h2>
            <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Закрыть">
              <Icon name="close" size={20} />
            </button>
          </div>
          {n ? (
            <>
              <ul className="drawer-body">
                {items.map((x) => (
                  <li key={x.key}>
                    <span>
                      <small>{x.group}</small>
                      <b>{x.name}</b>
                    </span>
                    <span className="num">{tg(x.price)}</span>
                    <button type="button" className="icon-btn" onClick={() => remove(x.key)} aria-label={`Убрать: ${x.name}`}>
                      <Icon name="close" size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="drawer-foot">
                <div className="drawer-total">
                  <span>Ориентировочно</span>
                  <b>{tg(total)}</b>
                </div>
                <p className="legal">Окончательный протокол, объём препарата и стоимость определяет врач после консультации.</p>
                <button type="button" className="btn btn-lg btn-block" onClick={() => (setOpen(false), openBooking())}>
                  Записаться с этим планом
                </button>
                <button type="button" className="btn btn-line btn-block" onClick={clear}>
                  Очистить
                </button>
              </div>
            </>
          ) : (
            <div className="drawer-empty">
              <Icon name="list" size={36} stroke={1.2} />
              <p>Отмечайте процедуры в прайсе — здесь соберётся план и ориентировочная сумма.</p>
              <Link href="/ceny" className="btn">
                К ценам
              </Link>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
