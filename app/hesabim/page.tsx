'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Hesabim() {
  const [musteri, setMusteri] = useState<any>(null)
  const [hizmetler, setHizmetler] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [emailGoster, setEmailGoster] = useState(false)
  const [emailKaydedildi, setEmailKaydedildi] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem('customer_id')
    if (!id) {
      router.push('/giris')
      return
    }
    const fetchData = async () => {
      const { data: m } = await supabase.from('customers').select('*').eq('id', id).single()
      setMusteri(m)
      if (m?.email) setEmailKaydedildi(true)
      const { data: h } = await supabase.from('services').select('*').eq('customer_id', id).order('created_at', { ascending: false })
      setHizmetler(h || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const emailEkle = async () => {
    if (!email) return
    const id = localStorage.getItem('customer_id')
    await supabase.from('customers').update({ email }).eq('id', id)
    setEmailKaydedildi(true)
    setEmailGoster(false)
  }

  const cikis = () => {
    localStorage.removeItem('customer_id')
    localStorage.removeItem('customer_name')
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-6">
          <a href="/" className="text-orange-400 text-lg">Geri</a>
          <button onClick={cikis} className="text-gray-400 text-sm">Cikis Yap</button>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1">Hosgeldiniz!</h1>
        <p className="text-orange-400 text-lg font-semibold mb-6">{musteri?.name}</p>

        <div className="bg-orange-500 rounded-2xl p-4 mb-4">
          <p className="text-white font-semibold">Sonraki hizmetinizde</p>
          <p className="text-white text-2xl font-bold">%10 indirim!</p>
          <p className="text-orange-200 text-sm mt-1">Kayitli uye avantajiniz</p>
        </div>

        {!emailKaydedildi && !emailGoster && (
          <div className="bg-gray-800 border border-orange-500 rounded-2xl p-4 mb-6">
            <p className="text-white font-semibold mb-1">Kampanyalardan haberdar olun!</p>
            <p className="text-gray-400 text-sm mb-3">E-posta adresinizi ekleyin, happy hours ve ozel indirimlerden ilk siz haberdar olun.</p>
            <button onClick={() => setEmailGoster(true)} className="bg-orange-500 text-white font-bold px-4 py-3 rounded-xl w-full">
              E-posta Adresimi Ekle
            </button>
          </div>
        )}

        {emailGoster && (
          <div className="bg-gray-800 rounded-2xl p-4 mb-6">
            <label className="text-gray-300 text-base mb-2 block">E-posta Adresiniz</label>
            <input
              type="email"
              placeholder="ornek@email.com"
              className="w-full bg-gray-900 text-white text-lg p-4 rounded-2xl outline-none mb-3"
              onChange={e => setEmail(e.target.value)}
            />
            <button onClick={emailEkle} className="bg-orange-500 text-white font-bold py-3 rounded-xl w-full">Kaydet</button>
          </div>
        )}

        {emailKaydedildi && (
          <div className="bg-green-900 rounded-2xl p-4 mb-6">
            <p className="text-green-300 font-semibold">E-posta bildirimlerine kayitlisiniz!</p>
          </div>
        )}

        <a href="/randevu" className="bg-gray-800 text-white text-xl font-bold py-5 rounded-2xl w-full block text-center mb-6">
          Randevu Al
        </a>

        <h2 className="text-xl font-bold text-white mb-4">Hizmet Gecmisiniz</h2>
        {loading && <p className="text-gray-400">Yukleniyor...</p>}
        {!loading && hizmetler.length === 0 && (
          <div className="bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-gray-400">Henuz hizmet kaydiniz yok</p>
          </div>
        )}
        {hizmetler.map(h => (
          <div key={h.id} className="bg-gray-800 rounded-2xl p-4 mb-3">
            <div className="flex justify-between">
              <p className="text-white font-semibold">{h.service_type}</p>
              <p className="text-gray-500 text-sm">{new Date(h.service_date).toLocaleDateString('tr-TR')}</p>
            </div>
            {h.body_area && <p className="text-orange-400 text-sm">{h.body_area}</p>}
            {h.description && <p className="text-gray-400 text-sm">{h.description}</p>}
            {h.artist_name && <p className="text-gray-600 text-sm">Sanatci: {h.artist_name}</p>}
          </div>
        ))}
      </div>
    </main>
  )
}