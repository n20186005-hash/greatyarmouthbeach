import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import InfoSection from '@/components/InfoSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import Recommendations from '@/components/Recommendations';
import Footer from '@/components/Footer';
import VisitDetails from '@/components/VisitDetails';
import { pageMetadata } from '@/lib/site';
import {routing} from '@/i18n/routing';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as typeof routing.locales[number])) return {robots:{index:false}};
  const m = (await import(`@/messages/${locale}.json`)).default;
  return pageMetadata(locale, '', m.meta.title, m.meta.description);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <InfoSection />
        <VisitDetails />
        <Gallery />
        <Recommendations />
        <Reviews />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}

