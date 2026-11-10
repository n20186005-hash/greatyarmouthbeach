'use client';
import {useTranslations,useMessages} from 'next-intl';
import {useState,useEffect} from 'react';
export default function Gallery(){
 const t=useTranslations('gallery'),m=useMessages() as unknown as {gallery:{captions:string[]}};
 const [index,setIndex]=useState(0),[open,setOpen]=useState(false);
 const photos=m.gallery.captions.map((alt,i)=>({alt,src:`/gallery/optimized/image-${i+1}.webp`,original:`/gallery/images (${i+1}).jpg`}));
 function move(n:number){setIndex(i=>(i+n+photos.length)%photos.length);setOpen(true);}
 useEffect(()=>{if(!open)return;const h=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);if(e.key==='ArrowRight')setIndex(i=>(i+1)%15);if(e.key==='ArrowLeft')setIndex(i=>(i+14)%15);};document.addEventListener('keydown',h);return()=>document.removeEventListener('keydown',h);},[open]);
 return <section id="gallery" className="section-padding" style={{background:'var(--bg-secondary)'}}><div className="max-w-6xl mx-auto"><h2 className="font-display text-3xl sm:text-4xl mb-3">{t('title')}</h2><p className="mb-8">{t('subtitle')}</p><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{photos.slice(0,8).map((p,i)=><button key={p.src} className="gallery-item text-left" onClick={()=>{setIndex(i);setOpen(true);}} aria-label={`${t('open')}: ${p.alt}`}><img src={p.src} alt={p.alt} width="400" height="280" loading="lazy" className="w-full h-40 sm:h-48 object-cover"/><span className="block text-xs py-3 px-2 leading-relaxed">{p.alt}</span></button>)}</div><div className="flex justify-center gap-5 mt-6"><button className="source-link" onClick={()=>move(-1)}>{t('previous')}</button><button className="source-link" onClick={()=>move(1)}>{t('next')}</button></div></div>
 {open&&<div role="dialog" aria-modal="true" aria-label={t('title')} className="fixed inset-0 z-[80] bg-black/95 flex flex-col items-center justify-center p-4 gap-4 text-white"><button className="absolute top-4 right-4 p-3 bg-black rounded-full" onClick={()=>setOpen(false)} aria-label={t('close')}>✕</button><img src={photos[index].src} alt={photos[index].alt} className="max-w-full max-h-[65vh] object-contain"/><p className="text-center text-sm">{photos[index].alt} · {index+1} / {photos.length}</p><div className="flex gap-6"><button onClick={()=>move(-1)}>{t('previous')}</button><button onClick={()=>move(1)}>{t('next')}</button></div><a href={photos[index].original} className="underline text-sm" target="_blank" rel="noopener noreferrer">{t('original')}</a></div>}
 </section>;
}
