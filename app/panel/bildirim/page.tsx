'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Bildirim() {
  const [mesaj, setMesaj] = useState('')
  const [baslik, setBaslik] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [musteriler, setMusteriler] = useState<any[]>([])
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

  const emailliMusteriler = musteriler.filter(m => m.email)

  const gonder = async () => {
    if (!baslik || !mesaj) return
    setLoading(true)
    for (const musteri of emailliMusteriler) {
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
    setLoading(false)
    setSuccess(true)
    setBaslik('')
    setMesaj('')
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto">
        <a href="/panel" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-2">Bildirim Gonder</h1>
        <p className="text-gray-400 mb-6">E-posta giren kayitli musterilere mesaj gonder</p>

        {success && (
          <div className="bg-green-800 rounded-2xl p-4 mb-4">
            <p className="text-green-300 font-semibold">{emailliMusteriler.length} musteriye e-posta gonderildi!</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800 rounded-2xl p-4">
            <p className="text-gray-400 text-sm">Toplam kayitli musteri</p>
            <p className="text-white text-2xl font-bold">{musteriler.length}</p>
            <p className="text-orange-400 text-sm mt-1">E-posta giren: {emailliMusteriler.length}</p>
          </div>
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
          <button
            onClick={gonder}
            disabled={loading || !baslik || !mesaj || emailliMusteriler.length === 0}
            className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl"
          >
            {loading ? 'Gonderiliyor...' : `${emailliMusteriler.length} Musteriye Gonder`}
          </button>
        </div>
      </div>
    </main>
  )
}