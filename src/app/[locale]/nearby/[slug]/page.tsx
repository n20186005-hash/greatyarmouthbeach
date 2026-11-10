import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {guideSet,guideSlugs} from '@/content/guides';
import {localPath,pageMetadata,siteUrl} from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props={params:Promise<{locale:string;slug:string}>};
export function generateStaticParams(){return guideSlugs.map(slug=>({slug}));}
export async function generateMetadata({params}:Props){const {locale,slug}=await params;const g=guideSet(locale).guides.find(g=>g.slug===slug);return g?pageMetadata(locale,`/nearby/${slug}`,g.title,g.description):{robots:{index:false,follow:false}};}
export default async function NearbyPage({params}:Props){
  const {locale,slug}=await params;setRequestLocale(locale);
  const {labels:l,guides}=guideSet(locale);const g=guides.find(x=>x.slug===slug);if(!g)notFound();
  const map='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(g.name+' '+g.address);
  const jsonld={'@context':'https://schema.org','@graph':[
    {'@type':'Article',headline:g.title,description:g.description,inLanguage:locale,dateModified:'2026-11-10',author:{'@type':'Organization',name:'Great Yarmouth Beach'},mainEntityOfPage:siteUrl+localPath(locale,`/nearby/${slug}`)},
    {'@type':'FAQPage',mainEntity:g.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}
  ]};
  return <><Header/><main><article>
    <header className="guide-hero"><div className="max-w-4xl mx-auto"><a href={localPath(locale)} className="underline">Great Yarmouth Beach</a><p className="mt-8 text-sm uppercase tracking-wide">{l.nearby}</p><h1 className="font-display text-4xl sm:text-5xl leading-tight mt-4 mb-6">{g.title}</h1><p className="text-lg leading-relaxed">{g.intro}</p><p className="mt-7 text-sm opacity-80">{l.checked}</p></div></header>
    <div className="guide-body max-w-4xl mx-auto px-6 py-12">
      <section><h2>{l.facts}</h2><dl className="facts"><div><dt>{l.address}</dt><dd>{g.address}</dd></div><div><dt>{l.visit}</dt><dd>{g.visit}</dd></div></dl><a className="source-link" href={map} target="_blank" rel="noopener noreferrer">{l.map} ↗</a></section>
      {g.sections.map(([heading,body])=><section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      <section><h2>{l.route}</h2><ol className="list-decimal pl-6 space-y-3">{g.steps.map(s=><li key={s}>{s}</li>)}</ol></section>
      <section><h2>{l.faq}</h2>{g.faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
      <section><h2>{l.sources}</h2><p className="text-sm mb-5">{l.checked}</p><ul className="space-y-3">{g.sources.map(([name,url])=><li key={url}><a className="source-link" href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a></li>)}</ul></section>
      <aside><h2>{l.related}</h2><ul className="grid sm:grid-cols-2 gap-4"><li><a className="source-link" href={localPath(locale)}>Great Yarmouth Beach</a></li>{guides.filter(x=>x.slug!==slug).map(x=><li key={x.slug}><a className="source-link" href={localPath(locale,`/nearby/${x.slug}`)}>{x.name}</a></li>)}</ul></aside>
    </div><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonld).replace(/</g,'\\u003c')}}/>
  </article></main><Footer/></>;
}
