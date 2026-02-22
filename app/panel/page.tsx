'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Panel() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('panel_auth') !== 'true') {
      router.push('/panel/giris')
      return
    }
    const fetchCustomers = async () => {
      const { data } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })
      setCustomers(data || [])
      setLoading(false)
    }
    fetchCustomers()
  }, [])

  const cikisYap = () => {
    localStorage.removeItem('panel_auth')
    router.push('/panel/giris')
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-white">Isletme Paneli</h1>
          <button onClick={cikisYap} className="text-gray-400 text-sm">Cikis Yap</button>
        </div>
        <p className="text-gray-400 mb-6">Yalova Ink - Musteri Yonetimi</p>
        <div className="grid grid-cols-1 gap-3 mb-8">
          <a href="/panel/yeni-musteri" className="bg-orange-500 text-white text-lg font-bold py-4 rounded-2xl text-center block">Yeni Musteri Ekle</a>
          <a href="/panel/randevular" className="bg-gray-800 text-white text-lg font-bold py-4 rounded-2xl text-center block">Randevular</a>
          <a href="/panel/bildirim" className="bg-gray-800 text-white text-lg font-bold py-4 rounded-2xl text-center block">Bildirim Gonder</a>
          <a href="/panel/qr" className="bg-gray-800 text-white text-lg font-bold py-4 rounded-2xl text-center block">QR Kod Olustur</a>
        </div>
        <h2 className="text-xl font-bold text-white mb-4">Son Musteriler</h2>
        {loading && <p className="text-gray-400">Yukleniyor...</p>}
        {customers.map(c => (
          <div key={c.id} className="bg-gray-800 rounded-2xl p-4 mb-3">
            <p className="text-white text-lg font-semibold">{c.name}</p>
            <p className="text-gray-400">{c.phone}</p>
            {c.email && <p className="text-gray-500 text-sm">{c.email}</p>}
            <p className="text-gray-600 text-sm mt-1">{new Date(c.created_at).toLocaleDateString('tr-TR')}</p>
          </div>
        ))}
        {!loading && customers.length === 0 && <p className="text-gray-500">Henuz musteri yok</p>}
      </div>
    </main>
  )
}