import Link from 'next/link';
import servicesData from '@/content/services.json';
import { ArrowRight, Code, Presentation, Search, PenTool, LayoutTemplate, Palette } from 'lucide-react';

const getIconForTitle = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('sosyal medya')) return <Presentation className="w-7 h-7 text-indigo-600" />;
  if (lowerTitle.includes('web')) return <Code className="w-7 h-7 text-indigo-600" />;
  if (lowerTitle.includes('seo')) return <Search className="w-7 h-7 text-indigo-600" />;
  if (lowerTitle.includes('reklam')) return <LayoutTemplate className="w-7 h-7 text-indigo-600" />;
  if (lowerTitle.includes('kurumsal')) return <PenTool className="w-7 h-7 text-indigo-600" />;
  return <Palette className="w-7 h-7 text-indigo-600" />;
};

export default function Services() {
  return (
    <section id="hizmetler" className="py-32 bg-slate-50 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-indigo-600 font-bold tracking-widest text-sm uppercase mb-3">Çözümlerimiz</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Markanızı Geleceğe Taşıyacak Dijital Çözümler</h3>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">Her projenin benzersiz olduğuna inanıyor, işletmenizin hedeflerine özel yenilikçi çözümler sunuyoruz.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform">
                  {getIconForTitle(service.title)}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">{service.title}</h4>
                <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed relative z-10">{service.description}</p>
              </div>
              <Link href={service.slug} className="group-hover:text-indigo-700 inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition-colors relative z-10 w-fit">
                Daha Fazla Bilgi Al <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-50/50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors z-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
