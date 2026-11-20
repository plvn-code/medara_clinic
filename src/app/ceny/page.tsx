import type { Metadata } from "next";
import { PriceList } from "@/components/PriceList";
import { PageHero } from "@/components/Shared";
import { priceNotes, prices } from "@/lib/prices";

export const metadata: Metadata = {
  title: "Услуги и цены",
  description: "Прайс MEDARA CLINIC: консультации дерматолога и трихолога, чистки, пилинги, Dermapen, субцизия рубцов, коллагеностимуляторы, биоревитализация, PDRN, ботулинотерапия, RF-лифтинг и IPL. Цены в тенге.",
  alternates: { canonical: "/ceny" },
};

export default function Ceny() {
  return (
    <>
      <PageHero
        label="Прайс-лист · тенге"
        title={"Услуги\nи *цены*"}
        lead="Отмечайте процедуры знаком «+» — соберётся ваш план с ориентировочной суммой, который можно отправить нам при записи."
        crumbs={[{ href: "/", label: "Главная" }, { label: "Услуги и цены" }]}
      />
      <section className="sec-tight">
        <div className="wrap">
          <PriceList groups={prices} notes={priceNotes} />
        </div>
      </section>
    </>
  );
}
