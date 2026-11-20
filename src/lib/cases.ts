/**
 * Before / after cases published by @medara_clinic (eyes already masked by the clinic). Images: public/img/ba/<id>-b.webp / -a.webp.
 * Captions use only what the clinic itself wrote on the posts; the rest stay generic.
 */
export type Case = { id: string; title: string; text: string; concern: string; ratio: number };

export const cases: Case[] = [
  { id: "66", title: "Акне на лице", text: "Воспалительные элементы на лбу и щеках — комплексное лечение у дерматолога.", concern: "akne", ratio: 0.5 },
  { id: "10", title: "Акне на спине, плечах и груди", text: "Результат комплексной работы с акне в области спины, плеч и груди.", concern: "akne", ratio: 0.82 },
  { id: "11", title: "Папулопустулёзное акне", text: "Уменьшение воспалительных элементов, нормализация состояния кожи и профилактика новых высыпаний.", concern: "akne", ratio: 0.88 },
  { id: "116", title: "Акне и следы постакне", text: "Меньше воспалений, ровнее тон кожи.", concern: "akne", ratio: 0.5 },
  { id: "129", title: "Системные ретиноиды", text: "Когда наружной терапии было недостаточно: результат системного лечения по назначению врача.", concern: "akne", ratio: 0.5 },
  { id: "110", title: "Акне, профиль", text: "Воспалённые элементы на щеке и подбородке — до и после курса лечения.", concern: "akne", ratio: 0.5 },
  { id: "61", title: "Акне и неровный тон", text: "Воспаления ушли, кожа стала ровнее и спокойнее.", concern: "akne", ratio: 0.5 },
  { id: "122", title: "Акне у мужчины", text: "Воспаления на щеке и линии челюсти — до и после лечения.", concern: "akne", ratio: 0.5 },
  { id: "83", title: "Акне на щеке", text: "Активные воспаления — до и после курса лечения.", concern: "akne", ratio: 0.5 },
];

export const getCases = (ids: string[]) => ids.map((id) => cases.find((c) => c.id === id)).filter((c): c is Case => Boolean(c));
