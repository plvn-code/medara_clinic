import Link from "next/link";
import { Fragment } from "react";

export function Logo() {
  return (
    <span className="logo" aria-label="MEDARA CLINIC">
      <span className="logo-word">MEDARA</span>
      <span className="logo-sub">clinic</span>
    </span>
  );
}

/** Heading whose lines slide up from a mask on first sight. "\n" splits lines, *word* is tinted. */
export function Lines({ text, as: Tag = "h2", className, delay = 0 }: { text: string; as?: "h1" | "h2" | "h3" | "p"; className?: string; delay?: number }) {
  return (
    <Tag className={className} data-reveal="lines" style={{ ["--d" as string]: `${delay}s` }}>
      {text.split("\n").map((line, i) => (
        <span key={i} className="ln" style={{ ["--i" as string]: i }}>
          <span>
            {line.split(/(\*[^*]+\*)/).map((p, j) => (p.startsWith("*") ? <b key={j}>{p.slice(1, -1)}</b> : <Fragment key={j}>{p}</Fragment>))}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <ol className="crumbs">
      {items.map((it) => (
        <li key={it.label}>{it.href ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}</li>
      ))}
    </ol>
  );
}

export function PageHero({ label, title, lead, crumbs, children }: { label: string; title: string; lead?: string; crumbs: { href?: string; label: string }[]; children?: React.ReactNode }) {
  return (
    <section className="ph">
      <div className="wrap">
        <Crumbs items={crumbs} />
        <p className="lbl" data-reveal>
          {label}
        </p>
        <Lines as="h1" className="h1" text={title} />
        {lead && (
          <p className="lead" data-reveal style={{ ["--d" as string]: ".15s" }}>
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">
        {[...items, ...items].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
