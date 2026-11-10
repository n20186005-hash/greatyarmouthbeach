'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { localPath } from '@/lib/site';
export default function Header() {
 const t=useTranslations('header'),locale=useLocale();
 const [scrolled,setScrolled]=useState(false),[open,setOpen]=useState(false);
 useEffect(()=>{const h=()=>setScrolled(window.scrollY>30);h();window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h);},[]);
 const links=['nearby','gallery','reviews','map'] as const;
 return <header className="site-header fixed top-0 left-0 right-0 z-50" style={{background:scrolled||open?'var(--bg-secondary)':'#102b43',color:scrolled||open?'var(--text-primary)':'white',borderBottom:'1px solid var(--border-color)'}}>
 <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-16 flex items-center justify-between gap-2"><a href={localPath(locale)} className="font-display font-semibold text-sm md:text-lg leading-tight max-w-[40%] md:max-w-none">Great Yarmouth Beach</a><nav className="hidden md:flex gap-5 text-sm" aria-label={t('navigation')}>{links.map(s=><a key={s} href={`${localPath(locale)}#${s}`}>{t(s)}</a>)}</nav><div className="flex items-center gap-1 shrink-0"><ThemeToggle/><LanguageToggle/><button className="md:hidden p-2" aria-label={t('menu')} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)}>☰</button></div></div>
 {open&&<nav id="mobile-nav" className="md:hidden px-6 py-5 grid gap-4" aria-label={t('navigation')}>{links.map(s=><a key={s} href={`${localPath(locale)}#${s}`} onClick={()=>setOpen(false)}>{t(s)}</a>)}</nav>}</header>;
}
