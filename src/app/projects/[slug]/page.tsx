import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import projectsData from '@/content/projects.json';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p: any) => p.slug === slug);

  if (!project) {
    return {
      title: 'Proje Bulunamadı | KRT Reklam Bilişim',
    };
  }

  return {
    title: `${project.client_name} | KRT Reklam Bilişim`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p: any) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* Hero Area */}
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden bg-slate-950 flex items-end">
        <Image 
          src={project.cover_image} 
          alt={project.client_name}
          fill
          priority
          className="object-cover opacity-30 object-center hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
        
        <div className="container relative z-10 mx-auto px-4 pb-16">
          <Link href="/#hizmetler" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-bold mb-8 transition-colors group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Örneklere Geri Dön
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                {project.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white">{project.client_name}</h1>
            </div>
            
            <div className="flex items-center gap-6 text-slate-300 bg-white/5 backdrop-blur-xl px-8 py-5 rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-indigo-400" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Yıl</div>
                  <div className="font-semibold text-white">{project.year}</div>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-700"></div>
              <div className="flex items-center gap-3">
                <Tag className="w-6 h-6 text-indigo-400" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Kategori</div>
                  <div className="font-semibold text-white">{project.category}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 mt-16 max-w-4xl relative z-20">
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-lg shadow-slate-200/50 border border-slate-100">
          <h2 className="text-2xl font-black mb-6 text-slate-800 border-b border-slate-100 pb-4 tracking-tight">Proje Özeti</h2>
          <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10">
            {project.description}
          </p>
          
          <h3 className="text-2xl font-black mb-6 text-slate-800 tracking-tight">Kurgulanan Strateji ve İnovatif Sonuçlar</h3>
          <div className="prose prose-lg prose-indigo max-w-none text-slate-600">
            <p className="leading-relaxed">
              {project.longDescription}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
