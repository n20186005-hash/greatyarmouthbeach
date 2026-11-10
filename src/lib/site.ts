import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export const siteUrl = 'https://www.greatyarmouthbeach.com';
export function localPath(locale: string, path = '') {
  return `${locale === 'it' ? '' : `/${locale}`}${path}` || '/';
}
export function pageMetadata(locale: string, path: string, title: string, description: string): Metadata {
  const url = siteUrl + localPath(locale, path);
  return {
    title, description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries([...routing.locales.map(l => [l, siteUrl + localPath(l, path)]), ['x-default', siteUrl + localPath('it', path)]])
    },
    openGraph: { title, description, url, siteName: 'Great Yarmouth Beach', type: 'website', locale: locale === 'zh-Hant' ? 'zh_TW' : locale },
  };
}
