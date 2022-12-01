import type { displayItemsLimit, Localization } from "./types";

export const displayItemsLimits: displayItemsLimit[] = [
  { title: 25, value: 25 },
  { title: 50, value: 50 },
  { title: 100, value: 100 },
  { title: 200, value: 200 },
];

export const LOCALIZATION: Localization = {
  count: {
    ru: "Отображать строк:",
    en: "Show rows:",
    es: "Mostrar filas:",
    pt: "Mostrar linhas:",
  },
}