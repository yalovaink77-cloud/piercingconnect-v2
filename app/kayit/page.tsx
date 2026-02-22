'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Kayit() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', birth_date: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      setError('Ad soyad ve telefon zorunludur')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.from('customers').insert([form])
    if (error) {
      setError('Bir hata olustu, tekrar deneyin')
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-950 p-6 flex items-center justify-center">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Kayit Tamamlandi!</h1>
          <p className="text-gray-400 mb-6">Sonraki hizmetinizde %10 indirim kazandınız</p>
          <a href="/" className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl block">Ana Sayfaya Don</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto">
        <a href="/giris" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-2">Kayit Ol</h1>
        <p className="text-gray-400 mb-6">Kayit olun, sonraki hizmetinizde %10 indirim kazanin</p>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-300 text-base mb-2 block">Adiniz Soyadiniz *</label>
            <input type="text" placeholder="Ornek: Ahmet Yilmaz" className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none" onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <label className="text-gray-300 text-base mb-2 block">Telefon Numaraniz *</label>
            <input type="tel" placeholder="05XX XXX XX XX" className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none" onChange={e => setForm({...form, phone: e.target.value})} />
          </div>
          <div>
            <label className="text-gray-300 text-base mb-2 block">E-posta</label>
            <input type="email" placeholder="ornek@email.com" className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none" onChange={e => setForm({...form, email: e.target.value})} />
            <div className="bg-orange-500 bg-opacity-20 border border-orange-500 rounded-xl p-3 mt-2">
              <p className="text-white text-sm">E-posta adresinizi girerek kampanya ve happy hours bildirimlerinden ilk siz haberdar olun!</p>
            </div>
          </div>
          <div>
            <label className="text-gray-300 text-base mb-2 block">Dogum Tarihiniz</label>
            <input type="date" className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none" onChange={e => setForm({...form, birth_date: e.target.value})} />
          </div>
          <button onClick={handleSubmit} disabled={loading} className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl mt-2">
            {loading ? 'Kaydediliyor...' : 'Kayit Ol ve %10 Indirim Kazan'}
          </button>
        </div>
      </div>
    </main>
  )
}