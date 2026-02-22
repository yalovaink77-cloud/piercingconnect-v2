export default function Giris() {
  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto">
        <a href="/" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-2">Giris Yap</h1>
        <p className="text-gray-400 mb-6">Hizmet gecmisinizi ve bildirimlerinizi gorun</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-300 text-base mb-2 block">Telefon Numaraniz</label>
            <input
              type="tel"
              placeholder="05XX XXX XX XX"
              className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none"
            />
          </div>

          <button className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl">
            Giris Yap
          </button>

          <div className="text-center">
            <p className="text-gray-500 text-base">Hesabiniz yok mu?</p>
            <a href="/kayit" className="text-orange-400 text-lg font-semibold">
              Kayit Ol
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}