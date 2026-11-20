import type { Metadata } from "next";
import { BookButton } from "@/components/Buttons";
import { Compare } from "@/components/Media";
import { PageHero } from "@/components/Shared";
import { cases } from "@/lib/cases";
import { legal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Результаты лечения",
  description: "Фото до и после лечения акне у дерматологов MEDARA CLINIC в Алматы. Реальные пациенты, глаза скрыты.",
  alternates: { canonical: "/rezultaty" },
};

export default function Rezultaty() {
  return (
    <>
      <PageHero
        label="До и после"
        title={"Результаты\n*пациентов*"}
        lead="Потяните ползунок на фото, чтобы сравнить. Снимки опубликованы клиникой в Instagram, глаза пациентов скрыты."
        crumbs={[{ href: "/", label: "Главная" }, { label: "Результаты" }]}
      />
      <section className="sec-tight">
        <div className="wrap">
          <div className="res">
            {cases.map((c, i) => (
              <figure key={c.id} data-reveal style={{ ["--d" as string]: `${(i % 4) * 0.06}s` }}>
                <Compare id={c.id} label={c.title} />
                <figcaption className="cmp-cap">
                  <b>{c.title}</b>
                  <p>{c.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="legal" style={{ marginTop: 40 }}>
            {legal}
          </p>
          <div style={{ marginTop: 30 }}>
            <BookButton className="btn btn-lg">Хочу такой же результат</BookButton>
          </div>
        </div>
      </section>
    </>
  );
}
