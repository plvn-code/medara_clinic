/**
 * Price list transcribed from the pinned Instagram post «PRICE LIST» (6 slides, @medara_clinic, checked 2026-11-20).
 * Prices in tenge. «Стоимость зависит от показаний, зоны и объёма препарата; протокол определяет врач после консультации».
 */
export type PriceItem = { name: string; price: number; note?: string };
export type PriceGroup = { id: string; title: string; lead: string; items: PriceItem[]; sub?: { title: string; items: PriceItem[] }[]; note?: string };

export const prices: PriceGroup[] = [
  {
    id: "konsultacii",
    title: "Консультации",
    lead: "Осмотр, дерматоскопия, диагноз и письменный план лечения и ухода.",
    items: [
      { name: "Онлайн / офлайн консультация дерматолога", price: 20000, note: "повторная — 10 000 ₸" },
      { name: "Консультация трихолога", price: 20000 },
      { name: "Консультация по пептидной терапии", price: 20000 },
    ],
  },
  {
    id: "chistka",
    title: "Чистка лица",
    lead: "Очищение пор и комедонов с маской по типу кожи.",
    items: [
      { name: "Механическая чистка + маска", price: 30000 },
      { name: "Ультразвуковая чистка + маска", price: 25000 },
      { name: "Комбинированная чистка + маска", price: 35000 },
    ],
  },
  {
    id: "pilingi",
    title: "Пилинги",
    lead: "Химическое обновление кожи при акне, постакне и пигментации. Без чистки.",
    items: [
      { name: "TCA CROSS", price: 20000 },
      { name: "BioRePeel", price: 10000 },
      { name: "Миндальный пилинг Mandelag", price: 5000 },
    ],
  },
  {
    id: "dermapen",
    title: "Микроигольчатая терапия",
    lead: "Dermapen: выравнивает текстуру, сужает поры, работает со следами постакне.",
    items: [
      { name: "Baby Skin", price: 35000 },
      { name: "Metox", price: 40000 },
      { name: "New Skin", price: 45000 },
      { name: "Plasma + Dermapen", price: 45000 },
    ],
  },
  {
    id: "subcisiya",
    title: "Субцизия рубцов",
    lead: "Освобождает кожу от фиброзных тяжей, которые втягивают атрофические рубцы.",
    items: [
      { name: "Субцизия иглой NoCor", price: 50000 },
      { name: "Субцизия канюлей", price: 20000 },
      { name: "Субцизия иглой", price: 50000 },
    ],
    note: "Коллагеностимуляция подбирается индивидуально и оплачивается отдельно.",
  },
  {
    id: "kollagen",
    title: "Коллагеностимуляторы",
    lead: "Плотность, упругость и рельеф кожи — за счёт собственного коллагена.",
    items: [
      { name: "Juvelook", price: 200000 },
      { name: "Plenhyage Strong", price: 100000 },
      { name: "Plenhyage Thin", price: 100000 },
      { name: "Radiesse, 1 мл", price: 150000 },
      { name: "Karisma", price: 100000 },
      { name: "Micro Collost", price: 100000 },
      { name: "Collost 7%, 1,5 мл", price: 90000 },
      { name: "Collost 15%, 1,5 мл", price: 100000 },
    ],
  },
  {
    id: "biorevitalizaciya",
    title: "Биоревитализация",
    lead: "Глубокое увлажнение и сияние на гиалуроновой кислоте.",
    items: [
      { name: "Geo, Италия", price: 35000 },
      { name: "Biorejen, 1 мл", price: 30000 },
      { name: "Belotero Revive", price: 90000 },
      { name: "Jalucomplex I / II / III", price: 60000 },
      { name: "Redensity (Швейцария), 1 мл", price: 70000 },
      { name: "Redensity (Швейцария), 3 мл", price: 120000 },
      { name: "Ashanti, 2,5 мл", price: 35000 },
    ],
  },
  {
    id: "pdrn",
    title: "PDRN / репаративная терапия",
    lead: "Полинуклеотиды восстанавливают кожу на клеточном уровне.",
    items: [
      { name: "TwAc 2, 3 мл", price: 100000 },
      { name: "TwAc 3, 3 мл", price: 100000 },
      { name: "TwAc Eyes", price: 50000 },
      { name: "Rejuran Eyes", price: 80000 },
      { name: "Rejuran S", price: 80000 },
      { name: "Rejuran Healer", price: 90000 },
      { name: "Rejuran HB", price: 80000 },
    ],
  },
  {
    id: "guby",
    title: "Процедуры для губ",
    lead: "Увлажнение и деликатный объём без эффекта «перемены лица».",
    items: [
      { name: "Regenyal Lips", price: 60000 },
      { name: "Regenyal Super Lips", price: 65000 },
      { name: "Belotero Balance", price: 100000 },
      { name: "Restylane Kysse", price: 120000 },
    ],
  },
  {
    id: "blansing",
    title: "Бланшинг",
    lead: "Поверхностное введение для свежести и ровного рельефа.",
    items: [
      { name: "Belotero Soft, 1 мл", price: 100000 },
      { name: "Belotero Balance, 1 мл", price: 100000 },
    ],
  },
  {
    id: "mezo",
    title: "Мезотерапия / PRP",
    lead: "Точечная доставка активов в кожу лица и кожу головы.",
    items: [
      { name: "Cortexil PRP", price: 40000 },
      { name: "Мезотерапия при акне", price: 25000 },
      { name: "Radness ID", price: 25000 },
      { name: "Мезотерапия волосистой части головы", price: 25000 },
      { name: "Arrest для волос", price: 50000 },
    ],
  },
  {
    id: "botulinoterapiya",
    title: "Ботулинотерапия",
    lead: "Мимические морщины и гипергидроз. Дозировку определяет врач.",
    items: [],
    sub: [
      { title: "KtoX", items: [{ name: "Full Face, 100 ЕД", price: 60000 }, { name: "Full Face, 200 ЕД", price: 120000 }, { name: "Лицо + шея", price: 120000 }, { name: "Гипергидроз, 100 ЕД", price: 45000 }] },
      { title: "Botulax", items: [{ name: "Full Face, 100 ЕД", price: 90000 }, { name: "Full Face, 200 ЕД", price: 150000 }, { name: "Лицо + шея, 200 ЕД", price: 170000 }, { name: "Гипергидроз, 100 ЕД", price: 80000 }] },
      { title: "Xeomin", items: [{ name: "Full Face, 100 ЕД", price: 150000 }, { name: "Лицо + шея, 200 ЕД", price: 300000 }, { name: "Гипергидроз, 100 ЕД", price: 140000 }] },
    ],
  },
  {
    id: "apparatnaya",
    title: "Аппаратная косметология",
    lead: "Микроигольчатый RF-лифтинг и IPL-терапия для сосудов и пигмента.",
    items: [],
    sub: [
      { title: "Микроигольчатый RF-лифтинг", items: [{ name: "ELLISYS", price: 65000 }, { name: "VIVACE", price: 150000 }, { name: "MORPHEUS8", price: 300000 }] },
      { title: "IPL-терапия", items: [{ name: "IPL (Израиль)", price: 100000 }] },
    ],
  },
];

export const priceNotes = [
  "Стоимость процедуры зависит от индивидуальных показаний, зоны коррекции и необходимого объёма препарата.",
  "Окончательный протокол и объём процедуры определяются врачом после консультации.",
  "Все процедуры выполняются после оценки состояния кожи и при отсутствии противопоказаний.",
];

const all = (g: PriceGroup) => [...g.items, ...(g.sub?.flatMap((s) => s.items) ?? [])];
export const getGroup = (id: string) => prices.find((g) => g.id === id);
/** Lowest price in a group — for «от …» labels. */
export const priceFrom = (id: string) => {
  const g = getGroup(id);
  return g ? Math.min(...all(g).map((i) => i.price)) : 0;
};
export const itemCount = (g: PriceGroup) => all(g).length;
