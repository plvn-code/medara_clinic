"use client";

import { useEffect, useMemo, useState } from "react";
import { tg, usePlan } from "@/lib/plan";
import type { PriceGroup, PriceItem } from "@/lib/prices";
import { Icon } from "./Icons";

const fold = (s: string) => s.toLowerCase().replace(/ё/g, "е").replace(/[^\p{L}\p{N}]+/gu, " ").trim();

/** Full price list: search across groups and items, sticky contents with scroll-spy, «+» adds an item to «Мой план». */
export function PriceList({ groups, notes }: { groups: PriceGroup[]; notes: string[] }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(groups[0]?.id);
  const plan = usePlan();

  const list = useMemo(() => {
    const w = fold(q).split(" ").filter(Boolean);
    if (!w.length) return groups;
    const hit = (s: string) => w.every((x) => fold(s).includes(x));
    return groups
      .map((g) => {
        if (hit(`${g.title} ${g.lead}`)) return g;
        const items = g.items.filter((i) => hit(`${g.title} ${i.name}`));
        const sub = g.sub?.map((s) => ({ ...s, items: s.items.filter((i) => hit(`${g.title} ${s.title} ${i.name}`)) })).filter((s) => s.items.length);
        return items.length || sub?.length ? { ...g, items, sub } : null;
      })
      .filter((g): g is PriceGroup => Boolean(g));
  }, [q, groups]);

  useEffect(() => {
    const els = list.map((g) => document.getElementById(g.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-30% 0px -60% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [list]);

  const row = (g: PriceGroup, it: PriceItem, sub?: string) => {
    const key = `${g.id}:${sub ?? ""}:${it.name}`;
    const on = plan.ready && plan.has(key);
    const name = sub ? `${sub} — ${it.name}` : it.name;
    return (
      <li key={key} className="pr">
        <span className="pr-name">
          <span>{it.name}</span>
          {it.note && <small>{it.note}</small>}
        </span>
        <span className="pr-price">{tg(it.price)}</span>
        <button type="button" className={`pr-add ${on ? "on" : ""}`} onClick={() => plan.toggle({ key, group: g.title, name, price: it.price })} aria-pressed={on} aria-label={on ? `Убрать из плана: ${name}` : `Добавить в план: ${name}`}>
          <Icon name={on ? "check" : "plus"} size={16} stroke={1.8} />
        </button>
      </li>
    );
  };

  return (
    <div className="pl">
      <aside className="pl-side">
        <label className="pl-search">
          <Icon name="search" size={18} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Процедура или препарат" aria-label="Поиск по прайсу" />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Очистить">
              <Icon name="close" size={16} />
            </button>
          )}
        </label>
        <nav className="pl-toc" aria-label="Разделы прайса">
          {list.map((g) => (
            <a key={g.id} href={`#${g.id}`} className={active === g.id ? "on" : ""}>
              {g.title} <small>{g.items.length + (g.sub?.reduce((n, s) => n + s.items.length, 0) ?? 0)}</small>
            </a>
          ))}
        </nav>
        <div className="pl-notes">
          {notes.map((n, i) => (
            <p key={i}>
              0{i + 1} · {n}
            </p>
          ))}
        </div>
      </aside>
      <div>
        {list.length === 0 && <p className="pl-empty">Ничего не нашли. Напишите нам в WhatsApp — подскажем, есть ли такая процедура.</p>}
        {list.map((g) => (
          <section key={g.id} id={g.id} className="pg">
            <div className="pg-head">
              <h2>{g.title}</h2>
              <p>{g.lead}</p>
              <span>от {tg(Math.min(...[...g.items, ...(g.sub?.flatMap((s) => s.items) ?? [])].map((i) => i.price)))}</span>
            </div>
            {g.items.length > 0 && <ul>{g.items.map((it) => row(g, it))}</ul>}
            {g.sub?.map((s) => (
              <div key={s.title}>
                <p className="pg-sub">{s.title}</p>
                <ul>{s.items.map((it) => row(g, it, s.title))}</ul>
              </div>
            ))}
            {g.note && <p className="pg-note">{g.note}</p>}
          </section>
        ))}
      </div>
    </div>
  );
}
