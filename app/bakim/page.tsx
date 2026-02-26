'use client'
import { useState } from 'react'

const bakimlar = [
  {
    baslik: 'Kulak Memesi (Lobe)',
    iyilesme: '4-6 hafta',
    temizlik: [
      'Günde 2 kez tuzlu su ile temizle',
      'Anti bakteriyel sabun ile nazikçe temizle',
      'Takıyı döndürme, sadece temizle',
    ],
    kacin: [
      'İlk 4-6 hafta takıyı çıkarma',
      'Saç spreyi, parfüm piercinge değmesin',
      'Kulaklık kullanırken baskı yapma',
      'Piercing üzerine yatma',
    ],
  },
  {
    baslik: 'Kulak Kıkırdağı (Helix, Tragus, Daith)',
    iyilesme: '3-6 ay',
    temizlik: [
      'Günde 2 kez serum fizyolojik kullan',
      'Gerektiğinde serum fizyolojik ile hafifçe temizle',
      'Kağıt havlu ile kurula',
    ],
    kacin: [
      '3-6 ay boyunca takıyı değiştirme',
      'Şapka, bere ile sürtünme',
      'Saç kurutma makinesi direkt ısı',
      'Telefonla uzun süre konuşma',
    ],
  },
  {
    baslik: 'Burun (Nostril, Septum)',
    iyilesme: 'Nostril 2-4 ay, Septum 2-3 ay',
    temizlik: [
      'Günde 2-3 kez serum fizyolojik ile nazikçe temizle',
      'Burun içini temizlerken pamuklu çubuk kullanma',
    ],
    kacin: [
      'Burun temizliği yaparken takıyı çekiştirme',
      'Makyaj malzemeleri piercinge değmesin',
      'Yüz temizleme ürünlerinden uzak tut',
      'Nezle olursan nazikçe sil',
    ],
  },
  {
    baslik: 'Dudak (Labret, Monroe, Medusa)',
    iyilesme: '6-8 hafta',
    temizlik: [
      'Dıştan: Günde 2 serum fizyolojik ile temizle',
      'İçten: Her yemekten sonra alkolsüz ağız gargarası',
      'Bol su iç, ağzını nemli tut',
    ],
    kacin: [
      'İlk 2 hafta öpüşme, oral temas',
      'Baharatlı, asitli, çok sıcak yiyecekler',
      'Sigara ve alkol',
      'Ruj, dudak parlatıcısı',
    ],
  },
  {
    baslik: 'Dil (Tongue)',
    iyilesme: '4-6 hafta',
    temizlik: [
      'Her yemekten sonra ağzını tuzlu suyla çalkala',
      'Alkolsüz ağız gargarası günde 2 kez',
      'Bol bol soğuk su iç',
    ],
    kacin: [
      'Sıcak, baharatlı, asitli yiyecekler',
      'Sigara ve alkol',
      'Öpüşme, oral temas (ilk 2 hafta)',
      'Sakız çiğneme',
    ],
    ekbilgi: 'İlk 3-5 gün yumuşak ve soğuk yiyecekler ye. Dondurma şişliği azaltır!',
  },
  {
    baslik: 'Göbek (Navel)',
    iyilesme: '6-12 ay',
    temizlik: [
      'Günde 2 kez serum fizyolojik ile temizle',
      'Duş sonrası kağıt havlu ile kurula',
      'Gevşek kıyafetler giy, hava alsın',
    ],
    kacin: [
      'Dar pantolon, kemer baskı yapmasın',
      'Havuz, deniz, küvet (ilk 2-3 ay)',
      'Mekik, karın egzersizleri (ilk ay)',
      'Yüzüstü yatma',
    ],
  },
  {
    baslik: 'Meme Ucu (Nipple)',
    iyilesme: '6-12 ay',
    temizlik: [
      'Günde 2 kez serum fizyolojik ile nazikçe temizle',
      'Duş altında ılık su ile durula',
      'Yumuşak kağıt havlu ile kurula',
    ],
    kacin: [
      'Sıkı sütyen, sürtünen kıyafetler',
      'Havuz, jakuzi, deniz (ilk 3 ay)',
      'Parfümlü vücut losyonları',
    ],
    ekbilgi: 'Çok hassas bölge, enfeksiyon riski yüksek. Dikkatli ol!',
  },
  {
    baslik: 'Dermal (Yüzeysel Piercing)',
    iyilesme: '2-3 ay',
    temizlik: [
      'Günde 2 kez steril serum fizyolojik ile temizle',
      'Nazikçe, baskı yapmadan temizle',
      'Kesinlikle takıya dokunma, çekme',
    ],
    kacin: [
      'Kıyafet sürtünmesi',
      'Yüzme (ilk 2 ay)',
      'Aşırı güneş maruziyeti',
      'Takıyı oynatma, döndürme',
    ],
    ekbilgi: 'Vücut piercingi reddedebilir. Düzenli takip önemli!',
  },
]

export default function Bakım() {
  const [acik, setAcik] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-lg mx-auto">
        <a href="/" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-2">Bakım Talimatlari</h1>
        <p className="text-gray-400 mb-6">Piercing türünüze göre detayli bakım rehberi</p>

        <div className="bg-gray-800 rounded-2xl p-4 mb-6">
          <h2 className="text-white font-bold mb-3">Genel Bakim Kurallari</h2>
          <ul className="space-y-2">
            <li className="text-gray-300 text-sm">✅ Günde 2 kez tuzlu su ile temizle</li>
            <li className="text-gray-300 text-sm">✅ Her temizlik öncesi elleri yıka</li>
            <li className="text-gray-300 text-sm">✅ Kağıt havlu ile kurula</li>
            <li className="text-red-400 text-sm">❌ Alkol, Batikon, oksijenli su kullanma</li>
            <li className="text-red-400 text-sm">❌ Havuz, deniz, hamama gitme (ilk 2 ay)</li>
            <li className="text-red-400 text-sm">❌ Takiyi gereksiz hareket ettirme</li>
          </ul>
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Piercing Türüne Göre Bakım</h2>

        {bakimlar.map((item, index) => (
          <div key={index} className="mb-3">
            <button
              onClick={() => setAcik(acik === index ? null : index)}
              className="w-full bg-gray-800 rounded-2xl p-4 text-left flex justify-between items-center"
            >
              <div>
                <p className="text-white font-semibold">{item.baslik}</p>
                <p className="text-orange-400 text-sm">İyileşme: {item.iyilesme}</p>
              </div>
              <span className="text-gray-400 text-xl">{acik === index ? '▲' : '▼'}</span>
            </button>

            {acik === index && (
              <div className="bg-gray-900 rounded-b-2xl p-4 -mt-1">
                {item.ekbilgi && (
                  <div className="bg-orange-900 rounded-xl p-3 mb-3">
                    <p className="text-orange-200 text-sm">⚠️ {item.ekbilgi}</p>
                  </div>
                )}
                <h3 className="text-green-400 font-semibold mb-2">Temizlik</h3>
                <ul className="mb-4 space-y-1">
                  {item.temizlik.map((t, i) => (
                    <li key={i} className="text-gray-300 text-sm">✅ {t}</li>
                  ))}
                </ul>
                <h3 className="text-red-400 font-semibold mb-2">Kaçinilmasi Gerekenler</h3>
                <ul className="space-y-1">
                  {item.kacin.map((k, i) => (
                    <li key={i} className="text-gray-300 text-sm">❌ {k}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        <div className="bg-gray-800 rounded-2xl p-4 mt-4">
          <h2 className="text-white font-bold mb-2">Enfeksiyon Belirtileri</h2>
          <p className="text-gray-400 text-sm mb-2">Şu belirtileri görürsen piercering yapan kişi ile iletişim kur:</p>
          <ul className="space-y-1">
            <li className="text-red-400 text-sm">🔴 Giderek artan kızarıklık</li>
            <li className="text-red-400 text-sm">🔥 Ateş (38°C üzeri)</li>
            <li className="text-red-400 text-sm">💧 Sari-yeşil akıntı</li>
            <li className="text-red-400 text-sm">😫 Şiddetli ağri</li>
            <li className="text-gray-400 text-sm">✅ Normal: Ilk günler hafif kızarıklık ve berrak akıntı</li>
          </ul>
        </div>
      </div>
    </main>
  )
}