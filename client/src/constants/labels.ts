import type { Category, Credibility, Era, SortOption } from "../types/legend";

export const CATEGORY_LABELS: Record<Category, string> = {
  ghosts: "Призраци",
  tunnels: "Подземия и тунели",
  curses: "Проклятия",
  mysteries: "Мистерии",
  myths: "Градски митове",
};

export const ERA_LABELS: Record<Era, string> = {
  ancient: "Сердика (Античност)",
  medieval: "Средновековие",
  ottoman: "Османски период",
  kingdom: "Царство (1878–1946)",
  socialism: "Социализъм",
  modern: "Съвременност",
};

export const CREDIBILITY_LABELS: Record<Credibility, string> = {
  confirmed: "Исторически факт",
  partial: "Частично вярно",
  legend: "Само легенда",
};

export const SORT_LABELS: Record<SortOption, string> = {
  title: "Заглавие (А–Я)",
  "-title": "Заглавие (Я–А)",
  scariness: "Най-малко страшни",
  "-scariness": "Най-страшни",
  newest: "Най-нови",
};