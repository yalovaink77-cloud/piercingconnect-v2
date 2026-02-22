export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Yalova Ink</h1>
        <p className="text-gray-400 mb-10">Dovme ve Piercing Studyosu</p>
        <div className="flex flex-col gap-4">
          <a href="/bakim" className="bg-white text-gray-900 text-xl font-semibold py-5 rounded-2xl block">Bakim Talimatlari</a>
          <a href="/fiyatlar" className="bg-yellow-500 text-gray-900 text-xl font-semibold py-5 rounded-2xl block">Piercing Fiyatlari</a>
          <a href="/randevu" className="bg-orange-500 text-white text-xl font-semibold py-5 rounded-2xl block">Randevu Al</a>
          <a href="/giris" className="bg-gray-800 text-white text-xl font-semibold py-5 rounded-2xl block">Giris Yap / Kayit Ol</a>
        </div>
      </div>
    </main>
  )
}