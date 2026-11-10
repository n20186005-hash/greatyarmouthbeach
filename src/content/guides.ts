import data from './guides.json';
import { type Locale } from '@/i18n/routing';

export type Guide = typeof data.en.guides[number];
export function guideSet(locale: string) {
  const set = data[locale as Locale] || data.en;
  return {labels: set.labels, guides: set.guides.map((g,i) => ({...g, sources: data.en.guides[i].sources}))};
}
export const guideSlugs = data.en.guides.map(g => g.slug);
