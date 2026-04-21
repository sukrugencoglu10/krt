import Link from 'next/link';
import Image from 'next/image';
import siteData from '@/content/site-data.json';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/KRT.png" alt={siteData.agencyName} width={140} height={45} className="object-contain h-10 w-auto" priority />
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-700">
          <Link href="/#hizmetler" className="hover:text-indigo-600 transition-colors">Hizmetlerimiz</Link>
          <Link href="/admin" className="hover:text-indigo-600 transition-colors">Yönetim Paneli</Link>
        </nav>
        <div className="flex items-center gap-6">
          <a href={`tel:${siteData.contact.phone.replace(/\s+/g,'')}`} className="hidden md:block font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
            {siteData.contact.phone}
          </a>
          <Link href="/#iletisim" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
            Hemen Teklif Al
          </Link>
        </div>
      </div>
    </header>
  );
}
