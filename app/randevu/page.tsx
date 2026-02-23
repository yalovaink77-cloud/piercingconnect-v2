'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Randevu() {
  const [form, setForm] = useState({ name: '', phone: '', service_type: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.service_type) {
      setError('Ad soyad, telefon ve hizmet turu zorunludur')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.from('appointments').insert([{
      name: form.name,
      phone: form.phone,
      notes: form.notes,
      service_type: form.service_type,
      status: 'bekliyor'
    }])
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
          <h1 className="text-2xl font-bold text-white mb-2">Talebiniz Alindi!</h1>
          <p className="text-gray-400 mb-6">En kisa surede sizi arayacagiz</p>
          <a href="/" className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl block">Ana Sayfaya Don</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto">
        <a href="/" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-2">Randevu Al</h1>
        <p className="text-gray-400 mb-6">Bilgilerinizi doldurun, sizi arayalim</p>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-300 text-base mb-2 block">Adiniz Soyadiniz</label>
            <input type="text" placeholder="Ornek: Ahmet Yilmaz" className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none" onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <label className="text-gray-300 text-base mb-2 block">Telefon Numaraniz</label>
            <input type="tel" placeholder="05XX XXX XX XX" className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none" onChange={e => setForm({...form, phone: e.target.value})} />
          </div>
          <div>
            <label className="text-gray-300 text-base mb-2 block">Hizmet Turu</label>
            <select className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none" onChange={e => setForm({...form, service_type: e.target.value})}>
              <option value="">Seciniz...</option>
              <option value="dovme">Dovme</option>
              <option value="piercing">Piercing</option>
            </select>
          </div>
          <div>
            <label className="text-gray-300 text-base mb-2 block">Notunuz (istege bagli)</label>
            <textarea placeholder="Istediginiz hizmet hakkinda bilgi verin..." rows={4} className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none resize-none" onChange={e => setForm({...form, notes: e.target.value})} />
          </div>
          <button onClick={handleSubmit} disabled={loading} className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl mt-2">
            {loading ? 'Gonderiliyor...' : 'Randevu Talep Et'}
          </button>
        </div>
      </div>
    </main>
  )
}