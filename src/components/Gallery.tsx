'use client';
import {useTranslations,useMessages} from 'next-intl';
import {useState,useEffect,useRef} from 'react';
export default function Gallery(){
 const t=useTranslations('gallery'),m=useMessages() as unknown as {gallery:{captions:string[]}};
 const [index,setIndex]=useState(0),[open,setOpen]=useState(false);
 const galleryRef=useRef<HTMLElement>(null),dialogRef=useRef<HTMLDivElement>(null),closeRef=useRef<HTMLButtonElement>(null),triggerRef=useRef<HTMLButtonElement|null>(null);
 const photos=m.gallery.captions.map((alt,i)=>({alt,src:`/gallery/optimized/image-${i+1}.webp`,original:`/gallery/images (${i+1}).jpg`}));
 function openPhoto(n:number,trigger:HTMLButtonElement){triggerRef.current=trigger;setIndex((n+photos.length)%photos.length);setOpen(true);}
 function move(n:number){setIndex(i=>(i+n+photos.length)%photos.length);}
 useEffect(()=>{
  if(!open)return;
  const trigger=triggerRef.current;
  closeRef.current?.focus({preventScroll:true});
  const h=(e:KeyboardEvent)=>{
   if(e.key==='Escape'){e.preventDefault();setOpen(false);}
   if(e.key==='ArrowRight'){e.preventDefault();move(1);}
   if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}
   if(e.key==='Tab'){
    const targets=Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href]')??[]);
    const first=targets[0],last=targets[targets.length-1],active=document.activeElement;
    if(e.shiftKey&&active===first){e.preventDefault();last?.focus({preventScroll:true});}
    else if(!e.shiftKey&&active===last){e.preventDefault();first?.focus({preventScroll:true});}
   }
  };
  document.addEventListener('keydown',h);
  return()=>{
   document.removeEventListener('keydown',h);
   const visible=(button:HTMLButtonElement)=>button.isConnected&&!button.disabled&&button.getClientRects().length>0&&getComputedStyle(button).visibility!=='hidden';
   const gallery=galleryRef.current;
   const candidates=Array.from(gallery?.querySelectorAll<HTMLButtonElement>('button')??[]).filter(button=>!button.closest('[role="dialog"]')&&visible(button));
   const inViewport=(button:HTMLButtonElement)=>{const r=button.getBoundingClientRect();return r.bottom>0&&r.top<window.innerHeight&&r.right>0&&r.left<window.innerWidth;};
   const target=trigger&&visible(trigger)?trigger:candidates.find(inViewport)??candidates[0]??gallery;
   if(target?.isConnected)target.focus({preventScroll:true});
  };
 },[open,photos.length]);
 return <section ref={galleryRef} id="gallery" tabIndex={-1} aria-labelledby="gallery-title" className="section-padding" style={{background:'var(--bg-secondary)'}}><div className="max-w-6xl mx-auto"><h2 id="gallery-title" className="font-display text-3xl sm:text-4xl mb-3">{t('title')}</h2><p className="mb-8">{t('subtitle')}</p><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{photos.slice(0,8).map((p,i)=><button key={p.src} className="gallery-item text-left" onClick={e=>openPhoto(i,e.currentTarget)} aria-label={`${t('open')}: ${p.alt}`}><img src={p.src} alt={p.alt} width="400" height="280" loading="lazy" className="w-full h-40 sm:h-48 object-cover"/><span className="block text-xs py-3 px-2 leading-relaxed">{p.alt}</span></button>)}</div><div className="flex justify-center gap-5 mt-6"><button className="source-link" onClick={e=>openPhoto(index-1,e.currentTarget)}>{t('previous')}</button><button className="source-link" onClick={e=>openPhoto(index+1,e.currentTarget)}>{t('next')}</button></div></div>
 {open&&<div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t('title')} className="fixed inset-0 z-[80] bg-black/95 flex flex-col items-center justify-center p-4 gap-4 text-white"><button ref={closeRef} className="absolute top-4 right-4 p-3 bg-black rounded-full" onClick={()=>setOpen(false)} aria-label={t('close')}>✕</button><img src={photos[index].src} alt={photos[index].alt} className="max-w-full max-h-[65vh] object-contain"/><p className="text-center text-sm">{photos[index].alt} · {index+1} / {photos.length}</p><div className="flex gap-6"><button onClick={()=>move(-1)}>{t('previous')}</button><button onClick={()=>move(1)}>{t('next')}</button></div><a href={photos[index].original} className="underline text-sm" target="_blank" rel="noopener noreferrer">{t('original')}</a></div>}
 </section>;
}
