import { useTranslations, useMessages } from 'next-intl';

export default function InfoSection() {
  const t = useTranslations('knowledge');
  const messages = useMessages() as any;
  const sections = (messages?.knowledge?.sections || []) as Array<{ id: string; title: string; content: string }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        {/* Trip.com Ad 2 */}
        <div className="mb-12 flex justify-center w-full">
          <div className="w-full max-w-[728px] overflow-hidden rounded-lg shadow-sm bg-white dark:bg-gray-800 flex justify-center">
            <iframe
              src="https://www.trip.com/partners/ad/SB15306370?Allianceid=7974128&SID=300882170&trip_sub1=%E6%BF%B1%E6%B5%B7%E6%B3%A2%E5%88%A9%E5%B0%BC%E4%BA%9E%E8%AB%BE"
              style={{ width: '728px', height: '90px', border: 'none' }}
              scrolling="no"
              id="SB15306370"
              title="Trip.com Ad 2"
            />
          </div>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <div 
              key={section.id} 
              className={`flex flex-col md:flex-row gap-6 items-start ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full bg-white/5 p-8 rounded-2xl border border-white/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: 'var(--accent)', color: 'white' }}>
                    {index + 1}
                  </div>
                  <h3
                    className="font-display text-2xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {section.title}
                  </h3>
                </div>
                <p
                  className="text-lg leading-relaxed ml-14"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
