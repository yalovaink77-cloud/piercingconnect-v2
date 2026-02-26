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
  const [secili, setSecili] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('panel_auth') !== 'true') {
      router.push('/panel/giris')
      return
    }
    const fetchMusteriler = async () => {
      const { data } = await supabase.from('customers').select('*').not('email', 'is', null)
      setMusteriler(data || [])
    }
    fetchMusteriler()
  }, [])

  const toggleSecim = (id: string) => {
    setSecili(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const tumunuSec = () => {
    if (secili.length === musteriler.length) {
      setSecili([])
    } else {
      setSecili(musteriler.map(m => m.id))
    }
  }

  const gonder = async () => {
    if (!baslik || !mesaj || secili.length === 0) return
    setLoading(true)
    const hedefler = musteriler.filter(m => secili.includes(m.id))
    for (const musteri of hedefler) {
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
    setSecili([])
    setBaslik('')
    setMesaj('')
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto">
        <a href="/panel" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-2">Bildirim Gonder</h1>
        <p className="text-gray-400 mb-4">Gondermek istediginiz musterileri secin</p>

        {success && (
          <div className="bg-green-800 rounded-2xl p-4 mb-4">
            <p className="text-green-300 font-semibold">E-postalar gonderildi!</p>
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
            <div className="flex justify-between items-center mb-3">
              <p className="text-white font-semibold">Musteriler ({musteriler.length})</p>
              <button onClick={tumunuSec} className="text-orange-400 text-sm">
                {secili.length === musteriler.length ? 'Secimi Kaldir' : 'Tumunu Sec'}
              </button>
            </div>
            {musteriler.length === 0 && (
              <p className="text-gray-500 text-sm">E-posta giren musteri yok</p>
            )}
            {musteriler.map(m => (
              <div
                key={m.id}
                onClick={() => toggleSecim(m.id)}
                className={`flex items-center gap-3 p-3 rounded-xl mb-2 cursor-pointer ${secili.includes(m.id) ? 'bg-orange-900' : 'bg-gray-900'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${secili.includes(m.id) ? 'bg-orange-500 border-orange-500' : 'border-gray-500'}`}>
                  {secili.includes(m.id) && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{m.name}</p>
                  <p className="text-gray-400 text-xs">{m.email}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={gonder}
            disabled={loading || !baslik || !mesaj || secili.length === 0}
            className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl"
          >
            {loading ? 'Gonderiliyor...' : `${secili.length} Musteriye Gonder`}
          </button>
        </div>
      </div>
    </main>
  )
}