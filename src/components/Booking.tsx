"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { tg, usePlan } from "@/lib/plan";
import { legal, site, team, wa } from "@/lib/site";
import { Brand, Icon } from "./Icons";

type C = { slug: string; title: string };

/**
 * Booking sheet. No backend: it composes a tidy message and opens WhatsApp with it, so the request lands
 * in the clinic's chat exactly where patients already write. The procedures from «Мой план» are attached.
 */
export function Booking({ concerns }: { concerns: C[] }) {
  const [open, setOpen] = useState(false);
  const [concern, setConcern] = useState("");
  const [format, setFormat] = useState("offline");
  const [doctor, setDoctor] = useState("any");
  const [note, setNote] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const plan = usePlan();

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ concern?: string; note?: string }>).detail ?? {};
      if (d.concern) setConcern(d.concern);
      if (d.note) setNote(d.note);
      setOpen(true);
    };
    addEventListener("open-booking", on);
    return () => removeEventListener("open-booking", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("lock", open);
    if (!open) return;
    const t = setTimeout(() => box.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus(), 120);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => {
      clearTimeout(t);
      removeEventListener("keydown", k);
    };
  }, [open]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const c = concerns.find((x) => x.slug === concern)?.title;
    const doc = team.find((d) => d.id === doctor)?.name;
    const lines = [
      "Здравствуйте! Хочу записаться в MEDARA CLINIC.",
      f.get("name") ? `Имя: ${f.get("name")}` : null,
      `Формат: ${format === "online" ? "онлайн-консультация" : "приём в клинике"}`,
      c ? `Что беспокоит: ${c}` : null,
      doc ? `Врач: ${doc}` : null,
      f.get("when") ? `Удобное время: ${f.get("when")}` : null,
      note.trim() ? `Комментарий: ${note.trim()}` : null,
      plan.items.length ? `\nИнтересуют процедуры:\n${plan.items.map((x) => `• ${x.group}: ${x.name} — ${tg(x.price)}`).join("\n")}` : null,
    ].filter(Boolean);
    window.open(wa(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`bk ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="bk-title" inert={!open}>
      <div className="scrim" onClick={() => setOpen(false)} />
      <div className="bk-box" ref={box}>
        <button type="button" className="icon-btn bk-x" onClick={() => setOpen(false)} aria-label="Закрыть">
          <Icon name="close" size={20} />
        </button>
        <aside className="bk-aside">
          <div style={{ display: "grid", gap: 16 }}>
            <p className="lbl">Запись</p>
            <p className="h3">Первый шаг — консультация дерматолога</p>
          </div>
          <ul>
            <li>
              <Icon name="lens" size={18} /> Осмотр и дерматоскопия
            </li>
            <li>
              <Icon name="doc" size={18} /> Диагноз и письменный план лечения
            </li>
            <li>
              <Icon name="video" size={18} /> Можно онлайн — из любого города
            </li>
            <li>
              <Icon name="car" size={18} /> Своя бесплатная парковка
            </li>
          </ul>
          <p style={{ fontSize: 13, color: "rgba(251,248,243,.6)" }}>
            Первичная консультация — 20 000 ₸, повторная — 10 000 ₸.
          </p>
        </aside>
        <form className="bk-form" onSubmit={submit}>
          <h2 id="bk-title" className="h3">
            Записаться на приём
          </h2>
          <div className="seg" role="radiogroup" aria-label="Формат">
            {[
              ["offline", "В клинике"],
              ["online", "Онлайн"],
            ].map(([v, l]) => (
              <label key={v}>
                <input type="radio" name="format" value={v} checked={format === v} onChange={() => setFormat(v)} />
                <span>{l}</span>
              </label>
            ))}
          </div>
          <label className="field">
            <span>Как к вам обращаться</span>
            <input name="name" autoComplete="given-name" placeholder="Имя" maxLength={60} />
          </label>
          <label className="field">
            <span>Что беспокоит</span>
            <select value={concern} onChange={(e) => setConcern(e.target.value)}>
              <option value="">Не знаю — нужна консультация</option>
              {concerns.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Врач</span>
            <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
              <option value="any">Любой свободный</option>
              {team.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Удобные дни и время</span>
            <input name="when" placeholder="Например: четверг после 14:00" maxLength={80} />
          </label>
          <label className="field">
            <span>Комментарий</span>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={400} placeholder="Коротко о проблеме, принимаете ли препараты…" />
          </label>
          {plan.items.length > 0 && (
            <p className="bk-note">
              <Icon name="list" size={14} /> К сообщению добавим ваш план: {plan.items.length} процед. на {tg(plan.total)}
            </p>
          )}
          <button type="submit" className="btn btn-lg btn-block">
            <Brand name="whatsapp" size={18} /> Отправить в WhatsApp
          </button>
          <p className="bk-note">
            Откроется WhatsApp с готовым сообщением на номер {site.phone}. {legal}
          </p>
        </form>
      </div>
    </div>
  );
}
