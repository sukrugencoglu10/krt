import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'src/content/home-content.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
  };
}

export default function Home() {
  const filePath = path.join(process.cwd(), 'src/content/home-content.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContent);

  // We are going to map the frontmatter metadata for SEO, but render a fully custom Hero section.
  return (
    <>
      {/* High-Impact "Growth" Hero Section */}
      <section className="relative overflow-hidden bg-[#0A0F1C] text-white min-h-[90vh] flex items-center justify-center px-4">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] rounded-full bg-indigo-600/20 blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[130px]" />
          <div className="absolute top-[20%] left-[20%] w-[10%] h-[10%] rounded-full bg-indigo-300/30 blur-[80px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="container relative z-10 mx-auto text-center max-w-5xl">
          <div className="inline-flex mb-8 px-5 py-2.5 rounded-full bg-indigo-950/50 border border-indigo-500/20 backdrop-blur-md items-center justify-center">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-3 animate-pulse"></span>
            <span className="bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent font-bold tracking-wider text-xs uppercase">Markanızı Büyütün</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
            Dijital Dünyanın <br/> <span className="bg-gradient-to-br from-indigo-400 via-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-sm">Yeni Nesil Medya</span> Ajansı
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Performans odaklı reklam stratejilerimiz, yaratıcı web tasarımlarımız ve ölçülebilir başarılarla markanızı ait olduğu yere taşıyoruz.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/iletisim" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.6)] flex items-center justify-center gap-2">
               Projeye Başla
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
            <Link href="/#hizmetler" className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all backdrop-blur-md border border-white/10 flex items-center justify-center hover:-translate-y-1">
               Hizmetleri İncele
            </Link>
          </div>
          
          {/* Social Proof Placeholder */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center">
            <p className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-widest">Güvenilen Markalar</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Client Logos will go here, currently text placeholders */}
               <div className="text-xl font-bold opacity-70">Marka 1</div>
               <div className="text-xl font-bold opacity-70">Marka 2</div>
               <div className="text-xl font-bold opacity-70">Marka 3</div>
               <div className="text-xl font-bold opacity-70">Marka 4</div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <Projects />
      <Contact />
    </>
  );
}
