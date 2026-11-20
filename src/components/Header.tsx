"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { openBooking, usePlan } from "@/lib/plan";
import { nav, site, wa } from "@/lib/site";
import { Brand, Icon } from "./Icons";
import { Logo } from "./Shared";

type C = { slug: string; title: string; short: string };

/** Pages whose first screen is the dark video hero: the header starts light-on-dark there. */
const DARK = ["/"];

export function Header({ concerns }: { concerns: C[] }) {
  const pathname = usePathname();
  const { items, setOpen, ready } = usePlan();
  const [solid, setSolid] = useState(false);
  const [hide, setHide] = useState(false);
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);
  const t = useRef(0);

  useEffect(() => {
    let last = scrollY;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = scrollY;
        setSolid(y > 30);
        setHide((h) => (y > 500 && y > last + 4 ? true : y < last - 4 ? false : h));
        last = y;
      });
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setMega(false);
    setMenu(false);
  }, [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("lock", menu);
  }, [menu]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && (setMega(false), setMenu(false));
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);

  const open = () => {
    clearTimeout(t.current);
    setMega(true);
  };
  const close = () => {
    t.current = window.setTimeout(() => setMega(false), 160);
  };
  const dark = DARK.includes(pathname);
  const count = ready ? items.length : 0;

  return (
    <>
      <header className={`hd ${solid || mega ? "solid" : ""} ${dark ? "dark" : ""} ${hide && !mega && !menu ? "hide" : ""} ${menu ? "menu" : ""}`} onMouseLeave={close}>
        <div className="wrap hd-in">
          <Link href="/" aria-label="MEDARA CLINIC — на главную">
            <Logo />
          </Link>
          <button type="button" className="icon-btn burger" onClick={() => setMenu((v) => !v)} aria-label={menu ? "Закрыть меню" : "Открыть меню"} aria-expanded={menu}>
            <Icon name={menu ? "close" : "menu"} size={22} />
          </button>
          <nav className="hd-nav" aria-label="Главное меню">
            {nav.map((n, i) =>
              i === 0 ? (
                <button key={n.href} type="button" className={pathname.startsWith("/problemy") ? "on" : ""} onMouseEnter={open} onFocus={open} onClick={() => setMega((v) => !v)} aria-expanded={mega} aria-controls="mega">
                  {n.label}
                </button>
              ) : (
                <Link key={n.href} href={n.href} className={pathname.startsWith(n.href) ? "on" : ""} onMouseEnter={close}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>
          <div className="hd-act">
            <a className="hd-wa" href={wa("Здравствуйте! Хочу записаться на консультацию.")} target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp">
              <Brand name="whatsapp" size={19} />
              <span>{site.phone}</span>
            </a>
            <button type="button" className="icon-btn plan-btn" onClick={() => setOpen(true)} aria-label={`Мой план${count ? `: ${count}` : ""}`}>
              <Icon name="list" size={20} />
              {count > 0 && <span className="pill">{count}</span>}
            </button>
            <button type="button" className="btn" onClick={() => openBooking()}>
              Записаться
            </button>
          </div>
        </div>
        <div id="mega" className={`mega ${mega ? "open" : ""}`} onMouseEnter={open} inert={!mega}>
          <div className="mega-in">
            {concerns.map((c, i) => (
              <Link key={c.slug} href={`/problemy/${c.slug}`}>
                <small>0{i + 1}</small>
                <b>{c.title}</b>
                <span>{c.short}</span>
              </Link>
            ))}
            <Link href="/problemy" className="mega-cta">
              <small>Не знаете, с чего начать?</small>
              <b>Консультация дерматолога</b>
              <span>Диагноз и план лечения · 20 000 ₸</span>
            </Link>
          </div>
        </div>
      </header>

      <nav className={`mm ${menu ? "open" : ""}`} aria-label="Мобильное меню" inert={!menu}>
        <ul className="mm-list">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>{n.label}</Link>
            </li>
          ))}
        </ul>
        <div className="mm-sub">
          {concerns.map((c) => (
            <Link key={c.slug} href={`/problemy/${c.slug}`}>
              {c.title} — <span className="muted">{c.short.toLowerCase()}</span>
            </Link>
          ))}
        </div>
        <div className="hero-cta" style={{ marginTop: 28 }}>
          <button type="button" className="btn" onClick={() => (setMenu(false), openBooking())}>
            Записаться
          </button>
          <a className="btn btn-line" href={site.instagram} target="_blank" rel="noopener noreferrer">
            <Brand name="instagram" /> Instagram
          </a>
        </div>
      </nav>
    </>
  );
}
