"use client";

import { useState } from 'react';
import { LayoutDashboard, FolderKanban, Users, Settings, LogOut, Copy, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  
  // Form State
  const [clientName, setClientName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Web Tasarım');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [coverImage, setCoverImage] = useState('/images/projects/new-work.webp');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  
  // Output State
  const [generatedJSON, setGeneratedJSON] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSlugify = (text: string) => {
    const trMap: { [key: string]: string } = {
      'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
      'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
    };
    const slugified = text.replace(/[çğıöşüÇĞİÖŞÜ]/g, match => trMap[match])
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    setSlug(slugified);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if(!clientName || !slug || !shortDesc) {
      alert("Lütfen Müşteri Adı, Slug ve Kısa Açıklamayı doldurun.");
      return;
    }

    const newProject = {
      id: Date.now(),
      slug,
      client_name: clientName,
      category,
      year,
      cover_image: coverImage,
      description: shortDesc,
      longDescription: longDesc
    };

    setGeneratedJSON(JSON.stringify(newProject, null, 2) + ',');
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 z-50 min-h-screen bg-slate-50 flex">
      {/* Sidebar - SaaS Style */}
      <aside className="w-72 bg-[#0A0F1C] text-slate-300 flex flex-col h-screen sticky top-0 border-r border-[#1F2937]">
        <div className="h-20 flex items-center px-8 border-b border-[#1F2937]">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 mr-3 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">KRT Admin</span>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-2 font-medium">
          <button className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'hover:bg-slate-800/50 hover:text-white border border-transparent'}`}>
            <LayoutDashboard className="w-5 h-5" /> Kontrol Paneli
          </button>
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border border-indigo-500' : 'hover:bg-slate-800/50 hover:text-white border border-transparent'}`}>
            <FolderKanban className="w-5 h-5" /> Referans Üretici
          </button>
          <button className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeTab === 'leads' ? 'bg-indigo-600 text-white border border-indigo-500' : 'hover:bg-slate-800/50 hover:text-white border border-transparent'}`}>
            <Users className="w-5 h-5" /> Gelen Talepler
          </button>
        </nav>
        <div className="p-4 border-t border-[#1F2937]">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" /> Çıkış
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#F8FAFC] overflow-y-auto w-full">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-10 sticky top-0 z-10 shadow-sm">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Referans & JSON Jeneratörü</h1>
        </header>

        <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">1</span>
              Yeni Referans Bilgileri
            </h2>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Müşteri / Proje Adı</label>
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      handleSlugify(e.target.value);
                    }}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700 placeholder:font-normal"
                    placeholder="Örn: TechStart Bilişim"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">SEO Slug (URL Uzantısı)</label>
                  <input 
                    type="text" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Kategori</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700">
                    <option>Web Tasarım</option>
                    <option>SEO</option>
                    <option>Kurumsal Kimlik</option>
                    <option>Sosyal Medya</option>
                    <option>Google Ads</option>
                    <option>PR & İletişim</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Yıl</label>
                  <input 
                    type="text" 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Görsel Yolu (Cover Image)</label>
                <input 
                  type="text" 
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700"
                  placeholder="/images/projects/your-image.webp"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Kısa Açıklama (Grid Spotu)</label>
                <textarea 
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none font-medium text-slate-700"
                  placeholder="Seo altyapısına sahip yenilikçi web arayüzü..."
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Uzun Açıklama (Detay Sayfa İzi)</label>
                <textarea 
                  value={longDesc}
                  onChange={(e) => setLongDesc(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-y font-medium text-slate-700"
                  placeholder="Bu projenin başarı hikayesini anlatan kapsamlı metin..."
                ></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl font-black transition-colors shadow-lg shadow-indigo-600/30">
                 ⚡ JSON Kodu Üret
              </button>
            </form>
          </div>

          {/* Right Column / Results */}
          <div className="space-y-10">
            {/* Visual Preview */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
               <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">2</span>
                Görsel Önizleme
              </h2>
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shadow-inner">
                {coverImage ? (
                  <>
                    <img src={coverImage} alt="Preview" className="object-cover w-full h-full opacity-60 mix-blend-multiply" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80">
                      <span className="text-indigo-300 font-bold text-xs uppercase mb-1 drop-shadow-md">{category}</span>
                      <h4 className="text-white font-black text-2xl drop-shadow-md">{clientName || 'Proje Adı'}</h4>
                    </div>
                  </>
                ) : (
                  <span className="text-slate-400 font-bold">Görsel Yolu Gerekli</span>
                )}
              </div>
            </div>

            {/* Generated JSON Output */}
            {generatedJSON && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 relative">
                 <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">3</span>
                    Üretilen JSON Çıktısı
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-sm font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl transition-colors text-slate-700"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Kopyalandı!' : 'Kopyala'}
                  </button>
                </h2>
                
                <p className="text-sm text-slate-500 mb-4 font-medium">
                  Bu kodu kopyalayıp <code className="bg-slate-100 text-slate-800 font-bold px-2 py-1 rounded">src/content/projects.json</code> dosyasındaki dizinin <strong>(array listesinin) sonuna</strong> yapıştırabilirsiniz.
                </p>

                <div className="bg-[#0A0F1C] rounded-2xl p-6 overflow-x-auto shadow-inner border border-slate-800">
                  <pre className="text-sm font-mono text-emerald-400/90 leading-relaxed">
                    {generatedJSON}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
