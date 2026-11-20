import Link from "next/link";
import { BookButton } from "@/components/Buttons";
import { Brand, Icon } from "@/components/Icons";
import { Contacts } from "@/components/Contacts";
import { Clip, Days, Explorer, HeroLens, Journey, ResultsRail } from "@/components/home/Home";
import { Lines, Marquee } from "@/components/Shared";
import { cases, getCases } from "@/lib/cases";
import { concerns } from "@/lib/concerns";
import { tg } from "@/lib/format";
import { getGroup, itemCount, priceFrom, prices } from "@/lib/prices";
import { site, team } from "@/lib/site";

const journey = [
  { title: "Консультация", text: "Онлайн или в клинике. Расскажете, что беспокоит и что уже пробовали, — врач соберёт анамнез." },
  { title: "Диагностика", text: "Осмотр и дерматоскопия, при необходимости — анализы. Диагноз, а не догадки." },
  { title: "Персональный план", text: "Терапия, домашний уход и процедуры — с порядком, сроками и ориентировочной стоимостью." },
  { title: "Лечение", text: "Медикаментозная терапия и процедуры в клинике по актуальным клиническим протоколам." },
  { title: "Контроль результата", text: "Повторные визиты — 10 000 ₸. Корректируем план, пока кожа не станет стабильной." },
];

const faq = [
  { q: "С чего начать, если не знаю, какая процедура нужна?", a: "С консультации дерматолога. Врач поставит диагноз и составит план: иногда процедуры не нужны вовсе, а иногда без терапии они не дадут результата." },
  { q: "Можно ли получить консультацию онлайн?", a: "Да, онлайн-консультация стоит столько же, сколько очная, — 20 000 ₸. Подойдёт, если вы в другом городе или хотите начать с плана ухода." },
  { q: "Подбираете ли вы домашний уход?", a: "Да, индивидуально каждому пациенту. В клинике можно приобрести французский уход SOTHYS." },
  { q: "Есть ли парковка?", a: "Да, своя бесплатная парковка. Предупредите заранее, что приедете на машине, — покажем, как заехать." },
  { q: "Почему цена в прайсе «от»?", a: "Стоимость зависит от показаний, зоны и объёма препарата. Окончательный протокол определяет врач после консультации." },
];

export default function Home() {
  const explorer = concerns.map((c) => ({
    slug: c.slug,
    title: c.title,
    short: c.short,
    lead: c.lead,
    approach: c.approach.slice(0, 3),
    prices: c.prices.filter((id) => id !== "konsultacii").slice(0, 3).map((id) => ({ id, title: getGroup(id)!.title, from: priceFrom(id) })),
    cases: getCases(c.cases).map(({ id, title }) => ({ id, title })),
  }));
  const teaser = ["konsultacii", "chistka", "pilingi", "subcisiya", "biorevitalizaciya", "pdrn", "botulinoterapiya", "apparatnaya"].map((id) => getGroup(id)!);

  return (
    <>
      <HeroLens>
        <p className="lbl" data-reveal>
          Дерматология · доказательная медицина · Алматы
        </p>
        <Lines as="h1" className="h1" text={"Чистая кожа —\nэто *медицина*"} delay={0.2} />
        <div className="hero-row">
          <div data-reveal style={{ ["--d" as string]: ".5s" }}>
            <p className="hero-lead">Лечим акне, розацеа, постакне и рубцы по клиническим протоколам — с диагнозом, планом и контролем результата. Онлайн и в клинике.</p>
            <div className="hero-cta">
              <BookButton className="btn btn-light btn-lg">
                Записаться <Icon name="arrow" size={18} />
              </BookButton>
              <Link href="/problemy" className="btn btn-line-l btn-lg">
                Что меня беспокоит
              </Link>
            </div>
          </div>
          <div className="hero-stats" data-reveal style={{ ["--d" as string]: ".7s" }}>
            <div>
              <b>
                <span data-count="10">10</span>+
              </b>
              <span>лет опыта в дерматологии</span>
            </div>
            <div>
              <b>
                <span data-count="256">256</span>K
              </b>
              <span>подписчиков доверяют советам</span>
            </div>
            <div>
              <b>2020</b>
              <span>лицензия на дерматокосметологию</span>
            </div>
          </div>
        </div>
      </HeroLens>

      <Marquee items={["Акне", "Розацеа", "Пятна постакне", "Рубцы", "Субцизия", "Биоревитализация", "PDRN", "Трихология", "Онлайн-консультации"]} />

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <p className="lbl">01 — Что вас беспокоит</p>
            <Lines className="h2" text={"Начните с проблемы,\nа не с *процедуры*"} />
            <p className="lead" data-reveal>
              Выберите, что беспокоит, — покажем, как мы с этим работаем, какие процедуры помогают и сколько они стоят.
            </p>
          </div>
          <Explorer items={explorer} fallbackImg="/img/diagnostics-poster.webp" />
        </div>
      </section>

      <section className="diag">
        <div className="diag-media">
          <Clip src="/video/diagnostics.mp4" poster="/img/diagnostics-poster.webp" />
        </div>
        <div className="wrap diag-in">
          <p className="lbl" data-reveal>
            02 — Подход
          </p>
          <Lines className="h2" text={"Сначала диагноз.\nПотом — *лечение*."} />
          <div className="diag-grid">
            {[
              { i: "flask" as const, t: "Доказательная медицина", d: "Назначаем то, эффективность чего подтверждена исследованиями, — без «чудо-средств» и модных схем." },
              { i: "doc" as const, t: "Актуальные протоколы", d: "Лечим акне и розацеа по последним клиническим рекомендациям и объясняем каждое назначение." },
              { i: "shield" as const, t: `Лицензия № ${site.licence.number}`, d: `Медицинская деятельность по дерматовенерологии (дерматокосметологии) с ${site.licence.date}.` },
            ].map((c, k) => (
              <div className="diag-card" key={c.t} data-reveal style={{ ["--d" as string]: `${k * 0.1}s` }}>
                <Icon name={c.i} size={28} stroke={1.2} />
                <b>{c.t}</b>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Journey
        steps={journey}
        head={
          <div className="head" style={{ marginBottom: 0 }}>
            <p className="lbl">03 — Путь пациента</p>
            <Lines className="h2" text={"Пять шагов\nк *спокойной* коже"} />
            <p className="lead" data-reveal>
              Мы не продаём разовые процедуры. Ведём вас от первого визита до стабильного результата.
            </p>
          </div>
        }
      />

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <p className="lbl">04 — Результаты</p>
            <Lines className="h2" text={"Реальные пациенты.\nРеальная *кожа*."} />
            <p className="lead" data-reveal>
              Потяните ползунок, чтобы сравнить «до» и «после». Фото опубликованы клиникой с согласия пациентов, глаза скрыты.
            </p>
          </div>
        </div>
        <ResultsRail items={cases} />
      </section>

      <section className="sec sec-ivory">
        <div className="wrap">
          <div className="head">
            <p className="lbl">05 — Услуги и цены</p>
            <Lines className="h2" text={"Прозрачный\n*прайс*"} />
            <div className="head-act" data-reveal>
              <Link href="/ceny" className="btn">
                Весь прайс · {prices.length} разделов <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>
          <div className="pt">
            {teaser.map((g, i) => (
              <Link key={g.id} href={`/ceny#${g.id}`} data-reveal style={{ ["--d" as string]: `${(i % 4) * 0.06}s` }}>
                <small>
                  0{i + 1} · {itemCount(g)} позиц.
                </small>
                <b>{g.title}</b>
                <span>
                  от <em>{tg(priceFrom(g.id))}</em>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <p className="lbl">06 — Врачи</p>
            <Lines className="h2" text={"Команда\n*дерматологов*"} />
            <div className="head-act" data-reveal>
              <Link href="/vrachi" className="link">
                О врачах и графике <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
          <div className="tm">
            {team.map((d, i) => (
              <article key={d.id} className="tm-card" data-reveal style={{ ["--d" as string]: `${i * 0.1}s` }}>
                <div className="tm-photo">
                  {d.photo ? (
                    <img src={d.photo} alt={d.name} loading="lazy" />
                  ) : (
                    <div className="tm-mono">
                      <span>{d.mono}</span>
                      <i>MEDARA CLINIC</i>
                    </div>
                  )}
                </div>
                <div>
                  <h3>{d.name}</h3>
                  <p className="role">{d.role}</p>
                </div>
                <p>{d.about}</p>
                <Days days={d.days} hours={d.hours} byAppointment={d.byAppointment} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-sage">
        <div className="wrap qt">
          <p className="lbl">07 — Отзыв</p>
          <blockquote data-reveal>
            <p>
              Неделю назад делала у вас микроигольчатый RF и мезовартон. Результат просто супер! Некоторые шрамики ушли полностью, другие стали менее заметными — даже лазерная шлифовка не дала такого эффекта. Жалею только о том, что не пришла раньше.
            </p>
            <footer>
              <span>Пациентка клиники · из переписки в WhatsApp</span>
              <a className="link" href={site.instagram} target="_blank" rel="noopener noreferrer">
                Больше отзывов в Instagram <Icon name="arrowUp" size={14} />
              </a>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div className="split-media" data-reveal="clip">
            <img src="/img/sothys-1.webp" alt="Уход SOTHYS в клинике MEDARA" loading="lazy" />
          </div>
          <div className="split-copy">
            <p className="lbl" data-reveal>
              08 — Домашний уход
            </p>
            <Lines className="h2" text={"Результат\nпродолжается *дома*"} />
            <p className="lead" data-reveal>
              Подбираем уход индивидуально каждому пациенту — под диагноз, терапию и сезон. В клинике можно приобрести профессиональную французскую косметику SOTHYS.
            </p>
            <ul className="ticks" data-reveal>
              {["Схема ухода утром и вечером — письменно", "Средства, совместимые с вашей терапией", "SOTHYS: восстановление барьера, увлажнение, SPF"].map((t) => (
                <li key={t}>
                  <Icon name="check" size={18} /> {t}
                </li>
              ))}
            </ul>
            <BookButton className="btn btn-line" note="Хочу подобрать домашний уход">
              Подобрать уход
            </BookButton>
          </div>
        </div>
      </section>

      <section className="sec sec-ivory">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div>
            <p className="lbl" data-reveal>
              09 — Вопросы
            </p>
            <Lines className="h2" text={"Частые\n*вопросы*"} />
            <p className="lead" style={{ marginTop: 22 }} data-reveal>
              Не нашли ответ? Напишите — ответим в WhatsApp.
            </p>
          </div>
          <div className="faq">
            {faq.map((f) => (
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

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <p className="lbl">10 — Контакты</p>
            <Lines className="h2" text={"Ждём вас\nна *Желтоксан*"} />
          </div>
          <Contacts />
          <div className="cta" style={{ marginTop: 18 }} data-reveal>
            <Clip src="/video/consult.mp4" poster="/img/consult-poster.webp" />
            <div className="cta-in">
              <p className="lbl">Запись</p>
              <p className="h2">Первая консультация — 20 000 ₸</p>
              <p className="lead">Осмотр, дерматоскопия, диагноз и письменный план лечения. Онлайн или в клинике.</p>
              <div className="hero-cta">
                <BookButton className="btn btn-light btn-lg">Записаться</BookButton>
                <a className="btn btn-line-l btn-lg" href={site.instagram} target="_blank" rel="noopener noreferrer">
                  <Brand name="instagram" /> {site.handle}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
