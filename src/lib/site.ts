/**
 * Clinic facts from Instagram @medara_clinic (bio, highlights «ГРАФИК», «АДРЕС», licence post), checked 2026-11-20.
 */
export const site = {
  name: "MEDARA CLINIC",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3026",
  description:
    "MEDARA CLINIC — дерматологическая клиника доказательной медицины в Алматы. Лечение акне, розацеа, постакне и рубцов, трихология, эстетическая косметология. Онлайн и офлайн консультации дерматолога.",
  city: "Алматы",
  address: "ул. Желтоксан, 138",
  addressNote: "Между пр. Абылай хана и ул. Кабанбай батыра. Своя бесплатная парковка — предупредите о ней заранее.",
  whatsapp: "77012833392",
  phone: "+7 701 283 33 92",
  phoneHref: "tel:+77012833392",
  instagram: "https://www.instagram.com/medara_clinic/",
  handle: "@medara_clinic",
  followers: "256K",
  threads: "https://www.threads.com/@medara_clinic",
  twogis: "https://2gis.kz/almaty/search/%D0%96%D0%B5%D0%BB%D1%82%D0%BE%D0%BA%D1%81%D0%B0%D0%BD%20138",
  gmaps: "https://www.google.com/maps/search/?api=1&query=%D0%96%D0%B5%D0%BB%D1%82%D0%BE%D0%BA%D1%81%D0%B0%D0%BD+138+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B",
  licence: { number: "20017397", date: "19.11.2020", scope: "Дерматовенерология (дерматокосметология)" },
  hours: "Пн–Сб 11:00–17:00, по записи",
};

/** wa.me link with a prefilled message. */
export const wa = (text?: string) => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const nav = [
  { href: "/problemy", label: "Проблемы кожи" },
  { href: "/ceny", label: "Услуги и цены" },
  { href: "/rezultaty", label: "Результаты" },
  { href: "/vrachi", label: "Врачи" },
  { href: "/kontakty", label: "Контакты" },
];

/** Days: 0 = Monday … 6 = Sunday. */
export const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export type Doctor = { id: string; name: string; mono: string; role: string; about: string; photo?: string; days: number[]; hours?: string; byAppointment?: boolean };

export const team: Doctor[] = [
  {
    id: "anara",
    name: "Анара Мейрамовна Долек",
    mono: "АД",
    role: "Дерматолог · трихолог · акне-эксперт",
    about: "Основатель MEDARA CLINIC. Доказательная медицина и опыт более 10 лет: лечение акне, розацеа и пятен постакне, онлайн- и офлайн-консультации.",
    days: [0, 1, 3, 4, 5],
    hours: "11:00–17:00",
  },
  {
    id: "aknur",
    name: "Акнур",
    mono: "Ак",
    role: "Дерматолог",
    about: "Ведёт пациентов с акне — в том числе на системной терапии, с контролем анализов и результата.",
    days: [1, 3, 5],
    hours: "12:00–15:00",
  },
  {
    id: "dinara",
    name: "Динара Миятбековна",
    mono: "ДМ",
    role: "Дерматолог-косметолог",
    about: "Работает с розацеа, качеством кожи и эстетическими протоколами — от наружной терапии до инъекционных методик.",
    photo: "/img/dinara.webp",
    days: [],
    byAppointment: true,
  },
];

export const legal =
  "Имеются противопоказания. Необходима консультация специалиста. Результат индивидуален и зависит от исходного состояния кожи.";
