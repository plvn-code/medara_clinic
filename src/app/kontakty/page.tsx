import type { Metadata } from "next";
import { Contacts } from "@/components/Contacts";
import { PageHero } from "@/components/Shared";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `MEDARA CLINIC: ${site.city}, ${site.address}. WhatsApp ${site.phone}. Бесплатная парковка, приём по записи.`,
  alternates: { canonical: "/kontakty" },
};

export default function Kontakty() {
  return (
    <>
      <PageHero label="Контакты" title={"Как нас\n*найти*"} lead={site.addressNote} crumbs={[{ href: "/", label: "Главная" }, { label: "Контакты" }]} />
      <section className="sec-tight">
        <div className="wrap">
          <Contacts />
        </div>
      </section>
    </>
  );
}
