import type { Metadata } from "next";
import { BookButton } from "@/components/Buttons";
import { Days } from "@/components/home/Home";
import { Icon } from "@/components/Icons";
import { Lines, PageHero } from "@/components/Shared";
import { site, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Врачи и график",
  description: "Дерматологи MEDARA CLINIC: Анара Мейрамовна Долек, Акнур, Динара Миятбековна. График приёма и запись.",
  alternates: { canonical: "/vrachi" },
};

const GALLERY = ["/img/team-1.webp", "/img/team-3.webp", "/img/team-2.webp", "/img/team-4.webp", "/img/team-5.webp"];

export default function Vrachi() {
  return (
    <>
      <PageHero
        label="Врачи"
        title={"Команда\n*дерматологов*"}
        lead="Доказательная медицина, актуальные клинические протоколы и честный разговор о том, что действительно поможет вашей коже."
        crumbs={[{ href: "/", label: "Главная" }, { label: "Врачи" }]}
      />
      <section className="sec-tight">
        <div className="wrap tm">
          {team.map((d, i) => (
            <article key={d.id} className="tm-card" data-reveal style={{ ["--d" as string]: `${i * 0.1}s` }}>
              <div className="tm-photo">
                {d.photo ? (
                  <img src={d.photo} alt={d.name} />
                ) : (
                  <div className="tm-mono">
                    <span>{d.mono}</span>
                    <i>Фото скоро</i>
                  </div>
                )}
              </div>
              <div>
                <h3>{d.name}</h3>
                <p className="role">{d.role}</p>
              </div>
              <p>{d.about}</p>
              <Days days={d.days} hours={d.hours} byAppointment={d.byAppointment} />
              <BookButton className="btn btn-line btn-sm" note={`Хочу к врачу: ${d.name}`}>
                Записаться к врачу
              </BookButton>
            </article>
          ))}
        </div>
      </section>
      <section className="sec-tight">
        <div className="wrap">
          <div className="head">
            <p className="lbl">В кабинете</p>
            <Lines className="h2" text={"Каждый день —\n*с пациентами*"} />
          </div>
        </div>
        <div className="res-scroll">
          {GALLERY.map((src, i) => (
            <div key={src} className="tm-photo" data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
      <section className="sec sec-dark">
        <div className="wrap split">
          <div>
            <p className="lbl">Лицензия</p>
            <Lines className="h2" text={`№ ${site.licence.number}\nот *${site.licence.date}*`} />
          </div>
          <div style={{ display: "grid", gap: 20 }}>
            <p className="lead">
              Медицинская деятельность: амбулаторно-поликлиническая помощь взрослому населению, консультативно-диагностическая помощь по специальности «{site.licence.scope}».
            </p>
            <p className="lead">
              <Icon name="shield" size={18} /> Выдана Управлением предпринимательства и инвестиций города Алматы.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
