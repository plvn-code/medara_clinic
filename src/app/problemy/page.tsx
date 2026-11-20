import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { PageHero } from "@/components/Shared";
import { concerns } from "@/lib/concerns";
import { getGroup, priceFrom } from "@/lib/prices";
import { tg } from "@/lib/format";

export const metadata: Metadata = {
  title: "Проблемы кожи",
  description: "Акне, розацеа, пятна постакне, рубцы, качество кожи, волосы и кожа головы, образования на коже — как с этим работают дерматологи MEDARA CLINIC в Алматы.",
  alternates: { canonical: "/problemy" },
};

export default function Problemy() {
  return (
    <>
      <PageHero
        label="Проблемы кожи"
        title={"С чем мы\n*работаем*"}
        lead="Выберите, что беспокоит, — расскажем, почему так происходит, как мы это лечим и какие процедуры помогают."
        crumbs={[{ href: "/", label: "Главная" }, { label: "Проблемы кожи" }]}
      />
      <section className="sec-tight">
        <div className="wrap pt" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {concerns.map((c, i) => {
            const p = c.prices.find((id) => id !== "konsultacii") ?? "konsultacii";
            return (
              <Link key={c.slug} href={`/problemy/${c.slug}`} data-reveal style={{ ["--d" as string]: `${(i % 3) * 0.06}s`, minHeight: 260 }}>
                <small>0{i + 1}</small>
                <b style={{ fontSize: 34 }}>{c.title}</b>
                <span>
                  {c.short}
                  <br />
                  <span className="muted">
                    {getGroup(p)?.title} — от {tg(priceFrom(p))}
                  </span>
                </span>
                <Icon name="arrowUp" size={22} />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
