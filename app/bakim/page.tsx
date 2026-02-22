export default function Bakim() {
  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto">
        <a href="/" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-6">Bakim Talimatlari</h1>

        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h2 className="text-orange-400 text-lg font-bold mb-3">Dovme Bakimi</h2>
          <ul className="text-gray-300 text-base space-y-2">
            <li>Ilk 3 gun dovmeyi su ile temas ettirmeyin</li>
            <li>Gunde 2 kez nemlendirici surun</li>
            <li>Dövmeyi kaşımayın ve ovalamayın</li>
            <li>Direkt gunes isigından koruyun</li>
            <li>Havuz ve denizden 4 hafta uzak durun</li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h2 className="text-orange-400 text-lg font-bold mb-3">Piercing Bakimi</h2>
          <ul className="text-gray-300 text-base space-y-2">
            <li>Gunde 2 kez tuzlu su ile temizleyin</li>
            <li>Elleri yikamadan dokunmayin</li>
            <li>Havuz ve denizden 6 hafta uzak durun</li>
            <li>Takilari erken degistirmeyin</li>
            <li>Kirmizilik veya sis varsa bize gelin</li>
          </ul>
        </div>

        <div className="bg-orange-500 rounded-2xl p-5">
          <p className="text-white text-base font-semibold">Sorulariniz icin bizi arayin:</p>
          <p className="text-white text-xl font-bold mt-1">0535 741 07 10</p>
        </div>
      </div>
    </main>
  )
}