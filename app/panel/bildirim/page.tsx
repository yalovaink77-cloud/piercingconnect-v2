'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Musteri = {
  id: string
  name: string
  email: string
  phone: string
}

type Secim = {
  email: boolean
  sms: boolean
}

export default function Bildirim() {
  const [mesaj, setMesaj] = useState('')
  const [baslik, setBaslik] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [musteriler, setMusteriler] = useState<Musteri[]>([])
  const [secimler, setSecimler] = useState<Record<string, Secim>>({})
  const [acik, setAcik] = useState<string | null>(null)
  const [hizmetler, setHizmetler] = useState<Record<string, any[]>>({})
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('panel_auth') !== 'true') {
      router.push('/panel/giris')
      return
    }
    const fetchMusteriler = async () => {
      const { data } = await supabase.from('customers').select('*')
      setMusteriler(data || [])
    }
    fetchMusteriler()
  }, [])

  const toggleAcik = async (id: string) => {
    if (acik === id) {
      setAcik(null)
      return
    }
    setAcik(id)
    if (!hizmetler[id]) {
      const { data } = await supabase.from('services').select('*').eq('customer_id', id).order('created_at', { ascending: false })
      setHizmetler(prev => ({ ...prev, [id]: data || [] }))
    }
  }

  const toggleKanal = (id: string, kanal: 'email' | 'sms') => {
    setSecimler(prev => ({
      ...prev,
      [id]: {
        email: kanal === 'email' ? !(prev[id]?.email ?? false) : (prev[id]?.email ?? false),
        sms: kanal === 'sms' ? !(prev[id]?.sms ?? false) : (prev[id]?.sms ?? false),
      }
    }))
  }

  const seciliSayisi = Object.values(secimler).filter(s => s.email || s.sms).length

  const gonder = async () => {
    if (!baslik || !mesaj || seciliSayisi === 0) return
    setLoading(true)

    for (const [id, secim] of Object.entries(secimler)) {
      const musteri = musteriler.find(m => m.id === id)
      if (!musteri) continue

      if (secim.email && musteri.email) {
        await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: musteri.email,
            subject: baslik,
            message: mesaj
          })
        })
      }

      if (secim.sms) {
        // SMS entegrasyonu buraya gelecek (Netgsm)
        console.log(`SMS gonderilecek: ${musteri.phone} - ${mesaj}`)
      }
    }

    setLoading(false)
    setSuccess(true)
    setSecimler({})
    setBaslik('')
    setMesaj('')
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto">
        <a href="/panel" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-2">Bildirim Gonder</h1>
        <p className="text-gray-400 mb-4">Musteri secin ve gonderim kanalini belirleyin</p>

        {success && (
          <div className="bg-green-800 rounded-2xl p-4 mb-4">
            <p className="text-green-300 font-semibold">Bildirimler gonderildi!</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-300 text-base mb-2 block">Baslik</label>
            <input
              type="text"
              placeholder="Ornek: Happy Hours, Kampanya"
              value={baslik}
              className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none"
              onChange={e => setBaslik(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-300 text-base mb-2 block">Mesaj</label>
            <textarea
              placeholder="Ornek: Bugun saat 15-18 arasi tum piercinglerde %20 indirim!"
              rows={4}
              value={mesaj}
              className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none resize-none"
              onChange={e => setMesaj(e.target.value)}
            />
          </div>

          <div className="bg-gray-800 rounded-2xl p-4">
            <p className="text-white font-semibold mb-3">Musteriler ({musteriler.length})</p>
            {musteriler.map(m => (
              <div key={m.id} className="bg-gray-900 rounded-xl mb-2 overflow-hidden">
                <div
                  className={`flex items-center justify-between p-3 cursor-pointer ${secimler[m.id]?.email || secimler[m.id]?.sms ? 'border-l-4 border-orange-500' : ''}`}
                  onClick={() => toggleAcik(m.id)}
                >
                  <div>
                    <p className="text-white text-sm font-semibold">{m.name}</p>
                    <p className="text-gray-500 text-xs">{m.phone}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {secimler[m.id]?.email && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-lg">📧</span>}
                    {secimler[m.id]?.sms && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-lg">📱</span>}
                    <span className="text-gray-400 ml-1">{acik === m.id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {acik === m.id && (
                  <div className="px-3 pb-3 border-t border-gray-700 pt-3">
                    {m.email && <p className="text-gray-400 text-xs mb-1">📧 {m.email}</p>}
                    <p className="text-gray-400 text-xs mb-3">📞 {m.phone}</p>

                    {hizmetler[m.id]?.length > 0 ? (
                      <div className="mb-3">
                        <p className="text-gray-500 text-xs mb-1">Hizmetler:</p>
                        {hizmetler[m.id].map(h => (
                          <p key={h.id} className="text-orange-400 text-xs">
                            {h.service_type} {h.body_area ? `- ${h.body_area}` : ''} ({new Date(h.service_date).toLocaleDateString('tr-TR')})
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-xs mb-3">Hizmet kaydi yok</p>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleKanal(m.id, 'email') }}
                        disabled={!m.email}
                        className={`flex-1 py-2 rounded-xl text-sm font-semibold ${secimler[m.id]?.email ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'} ${!m.email ? 'opacity-30' : ''}`}
                      >
                        📧 E-posta
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleKanal(m.id, 'sms') }}
                        className={`flex-1 py-2 rounded-xl text-sm font-semibold ${secimler[m.id]?.sms ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                      >
                        📱 SMS
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={gonder}
            disabled={loading || !baslik || !mesaj || seciliSayisi === 0}
            className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl"
          >
            {loading ? 'Gonderiliyor...' : `${seciliSayisi} Musteriye Gonder`}
          </button>
        </div>
      </div>
    </main>
  )
}