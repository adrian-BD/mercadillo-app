import { Home, Map, Zap, Phone } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Inicio', icon: Home, href: '#' },
  { id: 'mapa', label: 'Mapa', icon: Map, href: '#mapa' },
  { id: 'puestos', label: 'Puestos', icon: Zap, href: '#puestos' },
  { id: 'contacto', label: 'Contacto', icon: Phone, href: '#contacto' },
];

export function BottomNav({ activeSection, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 pb-safe">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
                if (item.href !== '#') {
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? 'text-[#1E3A8A]'
                  : 'text-gray-500 hover:text-[#1E3A8A]'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
