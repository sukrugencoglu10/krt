"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import servicesData from '@/content/services.json';
import siteData from '@/content/site-data.json';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: ''
  });
  
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Success Animation Trigger
    setIsSuccess(true);
    
    // WhatsApp Redirection Logic
    const message = `Merhaba, ben ${formData.name}. ${formData.company ? `${formData.company} firması için ` : ''}${formData.service ? `${formData.service} konusunda ` : ''}görüşmek istiyorum.`;
    const cleanPhone = siteData.contact.phone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('90') ? cleanPhone : '90' + cleanPhone}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSuccess(false);
      setFormData({ name: '', email: '', phone: '', company: '', service: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="iletisim" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-8">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-indigo-600 font-bold tracking-widest text-sm uppercase mb-3">İletişim</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Projeyi Başlatalım</h3>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
                Aklınızdaki fikri gerçeğe dönüştürmek için hazırız. Formu doldurun, uzman ekibimiz sizinle hemen iletişime geçsin.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg mb-1">Telefon & WhatsApp</h4>
                  <a href={`tel:${siteData.contact.phone.replace(/\s+/g,'')}`} className="text-slate-600 font-medium hover:text-indigo-600 transition-colors">
                    {siteData.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg mb-1">E-Posta</h4>
                  <a href={`mailto:${siteData.contact.email}`} className="text-slate-600 font-medium hover:text-indigo-600 transition-colors">
                    {siteData.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg mb-1">Merkez Ofis</h4>
                  <address className="text-slate-600 font-medium not-italic leading-relaxed">
                    {siteData.contact.address}
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-3">
            <div className="bg-slate-50 p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-indigo-600 z-20 flex flex-col items-center justify-center text-white p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <CheckCircle2 className="w-24 h-24 mb-6 text-indigo-200" />
                    </motion.div>
                    <h3 className="text-3xl font-black mb-4">Mesajınız Alındı!</h3>
                    <p className="text-lg text-indigo-100 font-medium max-w-sm">
                      Daha hızlı iletişim için WhatsApp'a yönlendiriliyorsunuz. Lütfen bekleyin...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-slate-700">Adınız Soyadınız *</label>
                    <input 
                      id="name"
                      name="name"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700 placeholder:font-normal"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-bold text-slate-700">Şirketiniz (Opsiyonel)</label>
                    <input 
                      id="company"
                      name="company"
                      type="text" 
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700"
                      placeholder="TechStart Inc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-slate-700">E-Posta Adresiniz *</label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-slate-700">Telefon Numaranız *</label>
                    <input 
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700"
                      placeholder="0555 555 55 55"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-bold text-slate-700">İlgilendiğiniz Hizmet</label>
                  <div className="relative">
                    <select 
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700 appearance-none">
                      <option value="">Detaylı bilgi almak istediğiniz alanı seçin...</option>
                      {servicesData.map((s, i) => (
                        <option key={i} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="m6 9 6 6 6-6"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-3 group border border-transparent">
                     Hemen Teklif İste <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
