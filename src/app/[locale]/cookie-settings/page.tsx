import {pageMetadata} from '@/lib/site';
import {routing} from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
 const {locale}=await params;
 if (!routing.locales.includes(locale as typeof routing.locales[number])) return {robots:{index:false}};
 const m=(await import(`@/messages/${locale}.json`)).default;
 return pageMetadata(locale,'/cookie-settings',m.cookieSettings.title+' | Great Yarmouth Beach',m.cookieSettings.description || m.cookieSettings.title+' · Great Yarmouth Beach');
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}

