'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function MusteriDetay() {
  const [musteri, setMusteri] = useState<any>(null)
  const [hizmetler, setHizmetler] = useState<any[]>([])
  const [yeniHizmet, setYeniHizmet] = useState({ service_type: '', description: '', body_area: '', artist_name: '' })
  const [hizmetFormu, setHizmetFormu] = useState(false)
  const [silOnay, setSilOnay] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (localStorage.getItem('panel_auth') !== 'true') {
      router.push('/panel/giris')
      return
    }
    const fetchData = async () => {
      const { data: m } = await supabase.from('customers').select('*').eq('id', params.id).single()
      setMusteri(m)
      const { data: h } = await supabase.from('services').select('*').eq('customer_id', params.id).order('created_at', { ascending: false })
      setHizmetler(h || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const hizmetEkle = async () => {
    if (!yeniHizmet.service_type) return
    const { data } = await supabase.from('services').insert([{
      ...yeniHizmet,
      customer_id: params.id,
      service_date: new Date().toISOString().split('T')[0]
    }]).select().single()
    if (data) {
      setHizmetler([data, ...hizmetler])
      setHizmetFormu(false)
      setYeniHizmet({ service_type: '', description: '', body_area: '', artist_name: '' })
    }
  }

  const musteriSil = async () => {
    await supabase.from('services').delete().eq('customer_id', params.id)
    await supabase.from('customers').delete().eq('id', params.id)
    router.push('/panel')
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-2xl mx-auto">
        <a href="/panel" className="text-orange-400 text-lg mb-6 block">Geri</a>

        {musteri && (
          <div className="bg-gray-800 rounded-2xl p-4 mb-6">
            <h1 className="text-2xl font-bold text-white">{musteri.name}</h1>
            <p className="text-gray-400">{musteri.phone}</p>
            {musteri.email && <p className="text-gray-500 text-sm">{musteri.email}</p>}
            <p className="text-gray-600 text-sm">Kayit: {new Date(musteri.created_at).toLocaleDateString('tr-TR')}</p>
            
            {!silOnay ? (
              <button onClick={() => setSilOnay(true)} className="mt-3 text-red-400 text-sm">
                Musteriyi Sil
              </button>
            ) : (
              <div className="mt-3 bg-red-900 rounded-xl p-3">
                <p className="text-white text-sm mb-2">Emin misiniz? Bu islem geri alinamaz.</p>
                <div className="flex gap-2">
                  <button onClick={musteriSil} className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm flex-1">Evet, Sil</button>
                  <button onClick={() => setSilOnay(false)} className="bg-gray-700 text-white px-4 py-2 rounded-xl text-sm flex-1">Iptal</button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Hizmet Gecmisi</h2>
          <button onClick={() => setHizmetFormu(!hizmetFormu)} className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold">
            + Hizmet Ekle
          </button>
        </div>

        {hizmetFormu && (
          <div className="bg-gray-800 rounded-2xl p-4 mb-4">
            <div className="flex flex-col gap-3">
              <select className="w-full bg-gray-900 text-white p-3 rounded-xl outline-none" onChange={e => setYeniHizmet({...yeniHizmet, service_type: e.target.value})}>
                <option value="">Hizmet Turu Secin</option>
                <option value="Dovme">Dovme</option>
                <option value="Piercing">Piercing</option>
              </select>
              <input type="text" placeholder="Bolge (ornek: sol kulak, bilek)" className="w-full bg-gray-900 text-white p-3 rounded-xl outline-none" onChange={e => setYeniHizmet({...yeniHizmet, body_area: e.target.value})} />
              <input type="text" placeholder="Aciklama" className="w-full bg-gray-900 text-white p-3 rounded-xl outline-none" onChange={e => setYeniHizmet({...yeniHizmet, description: e.target.value})} />
              <input type="text" placeholder="Sanatci adi" className="w-full bg-gray-900 text-white p-3 rounded-xl outline-none" onChange={e => setYeniHizmet({...yeniHizmet, artist_name: e.target.value})} />
              <button onClick={hizmetEkle} className="bg-orange-500 text-white font-bold py-3 rounded-xl">Kaydet</button>
            </div>
          </div>
        )}

        {loading && <p className="text-gray-400">Yukleniyor...</p>}
        {!loading && hizmetler.length === 0 && <p className="text-gray-500">Henuz hizmet kaydi yok</p>}
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