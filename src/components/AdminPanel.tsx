import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { X, Plus, Loader2, Calendar, Zap, LogOut, Trash2, Edit3, Save, ArrowLeft } from 'lucide-react';

export function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'oferta' | 'evento'>('oferta');
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  // Listados
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [eventos, setEventos] = useState<any[]>([]);

  // Auth y Formularios
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ titulo: '', descripcion: '', fecha: '', price: '', tipo: 'musica' });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) cargarDatos();
    });
  }, [isOpen, activeTab]);

  const cargarDatos = async () => {
    setLoading(true);
    const { data: off } = await (supabase.from('flash_offers') as any).select('*').order('created_at', { ascending: false });
    const { data: eve } = await (supabase.from('eventos') as any).select('*').order('fecha', { ascending: true });
    setOfertas(off || []);
    setEventos(eve || []);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword(loginData);
    if (error) alert("Error: " + error.message);
    else setSession(data.session);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const tabla = activeTab === 'evento' ? 'eventos' : 'flash_offers';
    
    const payload = activeTab === 'evento' 
      ? { titulo: formData.titulo, fecha: formData.fecha, tipo: formData.tipo, descripcion: formData.descripcion }
      : { title: formData.titulo, description: formData.descripcion, price: formData.price, is_active: true };

    const { error } = editingId 
      ? await (supabase.from(tabla) as any).update(payload).eq('id', editingId)
      : await (supabase.from(tabla) as any).insert([payload]);

    if (error) alert(error.message);
    else {
      setEditingId(null);
      setIsCreating(false);
      setFormData({ titulo: '', descripcion: '', fecha: '', price: '', tipo: 'musica' });
      cargarDatos();
    }
    setLoading(false);
  };

  const borrarItem = async (tabla: string, id: string) => {
    if (!window.confirm('¿Eliminar definitivamente?')) return;
    setLoading(true);
    await (supabase.from(tabla) as any).delete().eq('id', id);
    cargarDatos();
  };

  if (!isOpen) return null;

  // 1. SI NO HAY SESIÓN: Mostrar Login
  if (!session) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-[#1E3A8A]">Admin Access</h2>
            <button onClick={onClose}><X /></button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-4 border rounded-2xl" onChange={e => setLoginData({...loginData, email: e.target.value})} required />
            <input type="password" placeholder="Contraseña" className="w-full p-4 border rounded-2xl" onChange={e => setLoginData({...loginData, password: e.target.value})} required />
            <button disabled={loading} className="w-full bg-[#1E3A8A] text-white p-4 rounded-2xl font-bold flex justify-center items-center">
              {loading ? <Loader2 className="animate-spin" /> : 'Entrar al Panel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. SI HAY SESIÓN: Mostrar Panel ABM
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Tabs (Solo se ven en la lista) */}
        {!isCreating && !editingId && (
          <div className="bg-gray-50 p-2 border-b flex gap-2">
            <button onClick={() => setActiveTab('oferta')} className={`flex-1 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 ${activeTab === 'oferta' ? 'bg-white text-[#E2725B] shadow-sm' : 'text-gray-400'}`}>
              <Zap size={16} /> OFERTAS
            </button>
            <button onClick={() => setActiveTab('evento')} className={`flex-1 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 ${activeTab === 'evento' ? 'bg-white text-[#1E3A8A] shadow-sm' : 'text-gray-400'}`}>
              <Calendar size={16} /> EVENTOS
            </button>
          </div>
        )}

        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-[#1E3A8A]">
              {isCreating ? 'Añadir Nuevo' : editingId ? 'Editando' : `Gestión de ${activeTab}`}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={20}/></button>
          </div>

          {isCreating || editingId ? (
            <form onSubmit={handleSave} className="space-y-4">
              <input placeholder="Título" className="w-full p-4 border rounded-2xl" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
              {activeTab === 'evento' && (
                <select 
                  className="w-full p-4 border rounded-2xl bg-white"
                  value={formData.tipo}
                  onChange={e => setFormData({...formData, tipo: e.target.value})}
                  required
                >
                  <option value="musica">🎵 Música</option>
                  <option value="taller">🎨 Taller</option>
                  <option value="demostracion">✨ Demostración</option>
                  <option value="aviso">⚠️ Aviso</option>
                </select>
              )}
              <textarea placeholder="Descripción" className="w-full p-4 border rounded-2xl" rows={3} value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
              
              {activeTab === 'evento' ? (
                <input type="date" className="w-full p-4 border rounded-2xl" value={formData.fecha} onChange={e => setFormData({...formData, fecha: e.target.value})} required />
              ) : (
                <input placeholder="Precio (ej: 10€)" className="w-full p-4 border rounded-2xl" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
              )}

              <div className="flex gap-2 pt-4">
                <button type="submit" disabled={loading} className="flex-1 bg-[#1E3A8A] text-white p-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all active:scale-95">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} Guardar
                </button>
                <button type="button" onClick={() => { setIsCreating(false); setEditingId(null); }} className="p-4 bg-gray-100 text-gray-400 rounded-2xl font-bold"><ArrowLeft size={20}/></button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {loading ? <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-500" /></div> : (
                (activeTab === 'evento' ? eventos : ofertas).map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                    <div className="truncate pr-4">
                      <p className="font-bold text-sm text-gray-800 truncate">{item.titulo || item.title}</p>
                      <p className="text-[10px] text-[#E2725B] font-bold uppercase">{item.fecha || item.price}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => { setEditingId(item.id); setFormData({ ...item, titulo: item.titulo || item.title }); }} className="p-2 text-blue-500 hover:bg-white rounded-xl shadow-sm"><Edit3 size={18} /></button>
                      <button onClick={() => borrarItem(activeTab === 'evento' ? 'eventos' : 'flash_offers', item.id)} className="p-2 text-red-400 hover:bg-white rounded-xl shadow-sm"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))
              )}
              <button onClick={() => setIsCreating(true)} className="w-full py-5 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold flex flex-col items-center gap-2 hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-all mt-6">
                <Plus size={24} /> <span className="text-[10px] tracking-widest">AÑADIR {activeTab.toUpperCase()}</span>
              </button>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 flex justify-center border-t">
          <button onClick={() => { supabase.auth.signOut(); setSession(null); }} className="text-[10px] font-black text-gray-300 hover:text-red-500 flex items-center gap-2 transition-colors">
            <LogOut size={14}/> CERRAR SESIÓN ORGANIZADOR
          </button>
        </div>
      </div>
    </div>
  );
}
