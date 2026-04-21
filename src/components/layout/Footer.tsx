import Link from 'next/link';
import Image from 'next/image';
import siteData from '@/content/site-data.json';
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-4 text-slate-400">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-6">
             <Image src="/KRT.png" alt={siteData.agencyName} width={160} height={50} className="object-contain h-12 w-auto invert brightness-200" />
          </Link>
          <p className="max-w-sm text-slate-400 mb-8 leading-relaxed">
            {siteData.description}
          </p>
          <div className="flex gap-5">
            {siteData.socialMedia.instagram && (
              <a href={siteData.socialMedia.instagram} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors">
                <FaInstagram size={24} />
              </a>
            )}
            {siteData.socialMedia.facebook && (
              <a href={siteData.socialMedia.facebook} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors">
                <FaFacebook size={24} />
              </a>
            )}
            {siteData.socialMedia.linkedin && (
              <a href={siteData.socialMedia.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors">
                <FaLinkedin size={24} />
              </a>
            )}
            {siteData.socialMedia.twitter && (
              <a href={siteData.socialMedia.twitter} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors">
                <FaTwitter size={24} />
              </a>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Hızlı Menü</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
            <li><Link href="/#hizmetler" className="hover:text-white transition-colors">Neler Yapıyoruz?</Link></li>
            <li><Link href="/admin" className="hover:text-white transition-colors">Admin Paneli (Gizli)</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-6">İletişim Bilgileri</h3>
          <ul className="space-y-4">
            <li>
              <a href={`tel:${siteData.contact.phone.replace(/\s+/g,'')}`} className="hover:text-white transition-colors block">
                {siteData.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteData.contact.email}`} className="hover:text-white transition-colors block">
                {siteData.contact.email}
              </a>
            </li>
            <li className="leading-relaxed block pt-2 border-t border-slate-800">
              {siteData.contact.address}
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto pt-8 border-t border-slate-900 text-center text-sm font-medium">
        &copy; {new Date().getFullYear()} {siteData.agencyName}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
