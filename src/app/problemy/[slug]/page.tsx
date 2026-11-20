import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookButton } from "@/components/Buttons";
import { Icon } from "@/components/Icons";
import { Compare } from "@/components/Media";
import { Crumbs, Lines } from "@/components/Shared";
import { getCases } from "@/lib/cases";
import { concerns, getConcern } from "@/lib/concerns";
import { tg } from "@/lib/format";
import { getGroup, priceFrom } from "@/lib/prices";
import { legal } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => concerns.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getConcern((await params).slug);
  if (!c) return {};
  return { title: `${c.title} — лечение у дерматолога в Алматы`, description: c.lead, alternates: { canonical: `/problemy/${c.slug}` } };
}

export default async function ConcernPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getConcern((await params).slug);
  if (!c) notFound();
  const cs = getCases(c.cases);
  const idx = concerns.indexOf(c);
  const next = concerns[(idx + 1) % concerns.length];
  const groups = c.prices.map((id) => getGroup(id)!).filter(Boolean);
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <section className="ph">
        <div className="wrap">
          <Crumbs items={[{ href: "/", label: "Главная" }, { href: "/problemy", label: "Проблемы кожи" }, { label: c.title }]} />
          <div className="cp-hero">
            <div>
              <p className="lbl" data-reveal>
                0{idx + 1} — {c.short}
              </p>
              <Lines as="h1" className="h1" text={c.title} />
              <p className="lead" style={{ marginTop: 24 }} data-reveal>
                {c.lead}
              </p>
              <div className="hero-cta" style={{ marginTop: 30 }} data-reveal>
                <BookButton className="btn btn-lg" concern={c.slug}>
                  Записаться на консультацию <Icon name="arrow" size={18} />
                </BookButton>
                <Link href="#ceny" className="btn btn-line btn-lg">
                  Цены
                </Link>
              </div>
            </div>
            {cs[0] ? (
              <figure data-reveal>
                <Compare id={cs[0].id} label={cs[0].title} />
                <figcaption className="cmp-cap">
                  <b>{cs[0].title}</b>
                  <p>{cs[0].text}</p>
                </figcaption>
              </figure>
            ) : (
              <div className="split-media" data-reveal="clip" style={{ aspectRatio: "4 / 4.4" }}>
                <img src={idx % 2 ? "/img/consult-poster.webp" : "/img/diagnostics-poster.webp"} alt="" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="sec-tight sec-ivory">
        <div className="wrap cp-cols">
          <div className="cp-box" data-reveal>
            <h3>Как проявляется</h3>
            <ul className="dots">
              {c.signs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="cp-box" data-reveal style={{ ["--d" as string]: ".08s" }}>
            <h3>Почему возникает</h3>
            <ul className="dots">
              {c.causes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap">
          <div className="head">
            <p className="lbl">Как мы лечим</p>
            <Lines className="h2" text={"План из четырёх\n*шагов*"} />
          </div>
          <ol className="steps4">
            {c.approach.map((s, i) => (
              <li key={s.title} data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
                <b>{s.title}</b>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" id="ceny">
        <div className="wrap">
          <div className="head">
            <p className="lbl">Процедуры и цены</p>
            <Lines className="h2" text={"Что может\n*помочь*"} />
            <p className="lead" data-reveal>
              Конкретные процедуры и их порядок врач подберёт после осмотра. {legal}
            </p>
          </div>
          <div className="pt">
            {groups.map((g, i) => (
              <Link key={g.id} href={`/ceny#${g.id}`} data-reveal style={{ ["--d" as string]: `${(i % 4) * 0.06}s` }}>
                <small>{g.lead}</small>
                <b>{g.title}</b>
                <span>
                  от <em>{tg(priceFrom(g.id))}</em>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {cs.length > 1 && (
        <section className="sec-tight">
          <div className="wrap">
            <div className="head">
              <p className="lbl">Результаты</p>
              <Lines className="h2" text={"Пациенты\n*клиники*"} />
            </div>
            <div className="res">
              {cs.slice(1, 5).map((x) => (
                <figure key={x.id} data-reveal>
                  <Compare id={x.id} label={x.title} />
                  <figcaption className="cmp-cap">
                    <b>{x.title}</b>
                    <p>{x.text}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec sec-ivory">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div>
            <p className="lbl">Вопросы</p>
            <Lines className="h2" text={`${c.title}:\n*вопросы*`} />
          </div>
          <div className="faq">
            {c.faq.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span>
                    <Icon name="plus" size={18} />
                  </span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          <Link href={`/problemy/${next.slug}`} className="next-link">
            <span className="lbl">Следующая тема</span>
            <span className="h2">
              {next.title} <Icon name="arrow" size={48} stroke={1} />
            </span>
          </Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
