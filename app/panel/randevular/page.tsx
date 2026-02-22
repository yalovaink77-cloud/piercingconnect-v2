'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Randevular() {
  const [randevular, setRandevular] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('panel_auth') !== 'true') {
      router.push('/panel/giris')
      return
    }
    const fetch = async () => {
      const { data } = await supabase.from('appointments').select('*').order('created_at', { ascending: false })
      setRandevular(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  const guncelle = async (id: string, durum: string) => {
    await supabase.from('appointments').update({ status: durum }).eq('id', id)
    setRandevular(randevular.map(r => r.id === id ? { ...r, status: durum } : r))
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-2xl mx-auto">
        <a href="/panel" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-6">Randevu Talepleri</h1>
        {loading && <p className="text-gray-400">Yukleniyor...</p>}
        {randevular.map(r => (
          <div key={r.id} className="bg-gray-800 rounded-2xl p-4 mb-3">
            <div className="flex justify-between items-start mb-2">
              <p className="text-white text-lg font-semibold">{r.service_type}</p>
              <span className={r.status === 'onaylandi' ? 'text-green-400 text-sm' : r.status === 'iptal' ? 'text-red-400 text-sm' : 'text-yellow-400 text-sm'}>
                {r.status}
              </span>
            </div>
            {r.notes && <p className="text-gray-400 text-sm mb-3">{r.notes}</p>}
            <p className="text-gray-600 text-sm mb-3">{new Date(r.created_at).toLocaleDateString('tr-TR')}</p>
            {r.status === 'bekliyor' && (
              <div className="flex gap-2">
                <button onClick={() => guncelle(r.id, 'onaylandi')} className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm flex-1">Onayla</button>
                <button onClick={() => guncelle(r.id, 'iptal')} className="bg-red-800 text-white px-4 py-2 rounded-xl text-sm flex-1">Iptal Et</button>
              </div>
            )}
          </div>
        ))}
        {!loading && randevular.length === 0 && <p className="text-gray-500">Henuz randevu yok</p>}
      </div>
    </main>
  )
}