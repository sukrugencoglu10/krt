import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-slate-50">
      <div className="text-center">
        <h1 className="text-9xl font-black text-indigo-100 mb-4 select-none">404</h1>
        <h2 className="text-4xl font-black text-slate-900 mb-4">Proje Bulunamadı</h2>
        <p className="text-xl text-slate-600 mb-10 max-w-md mx-auto">
          İncelemek istediğiniz proje yayından kaldırılmış veya URL bağlantısı değişmiş olabilir. 
        </p>
        <Link 
          href="/" 
          className="inline-flex px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-xl shadow-indigo-600/20"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
