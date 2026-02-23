export default function Fiyatlar() {
  const fiyatlar = [
    { isim: 'Kulak Memesi', fiyat: 150 },
    { isim: 'Kıkırdak / Helix', fiyat: 450 },
    { isim: 'Hızma, Burun', fiyat: 450 },
    { isim: 'Dudak', fiyat: 450 },
    { isim: 'Çene', fiyat: 450 },
    { isim: 'Kaş', fiyat: 500 },
    { isim: 'Tragus', fiyat: 450 },
    { isim: 'Smiley', fiyat: 500 },
    { isim: 'Daith', fiyat: 450 },
    { isim: 'Conch', fiyat: 450 },
    { isim: 'Snug', fiyat: 500 },
    { isim: 'Rook', fiyat: 500 },
    { isim: 'Flat', fiyat: 450 },
    { isim: 'Göbek / Belly', fiyat: 650 },
    { isim: 'Septum', fiyat: 500 },
    { isim: 'Nipple', fiyat: 750 },
    { isim: 'Dil / Tongue', fiyat: 650 },
    { isim: 'Industrial / Köprü', fiyat: 650 },
    { isim: 'Surface', fiyat: 990 },
    { isim: 'Yardım, Değişim, Bakım, Sökme, Takma', fiyat: 100 },
  ]

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto">
        <a href="/" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-2">Piercing Fiyatları</h1>
        <p className="text-orange-400 mb-6 font-semibold">Nakitte %10 öğrenci indirimi</p>

        <div className="rounded-2xl overflow-hidden">
          {fiyatlar.map((item, index) => (
            <div key={index} className={`flex justify-between items-center px-4 py-3 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
              <span className="text-white text-base">{item.isim}</span>
              <span className="text-orange-400 font-bold text-base">{item.fiyat} ₺</span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-orange-500 rounded-2xl p-4 text-center">
          <p className="text-white font-bold text-lg">Randevu için bizi arayın</p>
          <p className="text-white text-xl font-bold mt-1">05357410710</p>
        </div>
      </div>
    </main>
  )
}