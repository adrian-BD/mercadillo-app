import { useState } from 'react';
import { Hero } from './components/Hero';
import { Calendario } from './components/Calendario';
import { MapSection } from './components/MapSection';
import { VendorDirectory } from './components/VendorDirectory';
import { FlashOffers } from './components/FlashOffers';
import { ContactSection } from './components/ContactSection';
import { BottomNav } from './components/BottomNav';
import { AdminPanel } from './components/AdminPanel';
import { Plus } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <Hero />
      <Calendario /> 
      <MapSection />
      <VendorDirectory />
      <FlashOffers />
      <ContactSection />

      <div className="pb-20"></div>

      <BottomNav activeSection={activeSection} onNavigate={setActiveSection} />

      <button
        onClick={() => setShowAdminPanel(true)}
        className="fixed bottom-24 right-6 bg-[#E2725B] hover:bg-[#d66550] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 z-40"
        aria-label="Agregar oferta"
      >
        <Plus className="w-6 h-6" />
      </button>

      <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />
    </div>
  );
}

export default App;
