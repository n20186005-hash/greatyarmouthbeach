import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {guideSlugs} from '@/content/guides';
import {siteUrl,localPath} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{
  const paths=['','/privacy-policy','/terms-of-service','/cookie-settings',...guideSlugs.map(s=>`/nearby/${s}`)];
  return paths.flatMap(path=>routing.locales.map(locale=>({url:siteUrl+localPath(locale,path),lastModified:'2026-11-10',alternates:{languages:Object.fromEntries(routing.locales.map(l=>[l,siteUrl+localPath(l,path)]))}})));
}
