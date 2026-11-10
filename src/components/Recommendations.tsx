import {useLocale,useTranslations} from 'next-intl';
import {guideSet} from '@/content/guides';
import {localPath} from '@/lib/site';
export default function Recommendations(){const locale=useLocale(),t=useTranslations('recommendations');return <section id="nearby" className="section-padding" style={{background:'var(--bg-secondary)'}}><div className="max-w-5xl mx-auto"><h2 className="font-display text-3xl sm:text-4xl mb-4">{t('title')}</h2><p className="mb-8">{t('description')}</p><div className="grid md:grid-cols-2 gap-5">{guideSet(locale).guides.map(g=><a key={g.slug} className="guide-card" href={localPath(locale,`/nearby/${g.slug}`)}><h3 className="font-display text-xl mb-3">{g.name} →</h3><p>{g.description}</p></a>)}</div></div></section>;}
