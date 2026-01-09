import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { useVehicles } from '@/hooks/useVehicles';
import type { Database } from '@/lib/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

/**
 * DCRUniverse Component
 * 
 * Diseño basado en wireframe específico del usuario:
 * - Layout: 5 columnas izquierda / 7 columnas derecha
 * - 3 tabs horizontales arriba a la derecha (COLLECTION, SALES, STORAGE)
 * - Tab inicial: COLLECTION abierto por defecto
 * - COLLECTION: Muestra tabla de vehículos con búsqueda
 * - SALES/STORAGE: Muestran imagen + badges + botón CTA
 * 
 * DCR Design System:
 * - Primary: #f7c01d (DCR Yellow)
 * - Background: #ffffff (light mode)
 * - Flat design: border-radius: 0rem
 * - Typography: Inter + tracking-widest uppercase
 */

type UniverseTab = 'COLLECTION' | 'SALES' | 'STORAGE';

const DCRUniverse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UniverseTab>('COLLECTION');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch vehicles with status 'Available' for collection
  const { data: vehicles, isLoading, error } = useVehicles({
    status: 'Available',
    enabled: activeTab === 'COLLECTION',
  });

  // Filter vehicles based on search term
  const filteredVehicles = vehicles?.filter(vehicle => {
    const searchLower = searchTerm.toLowerCase();
    return (
      vehicle.brand?.toLowerCase().includes(searchLower) ||
      vehicle.model?.toLowerCase().includes(searchLower) ||
      vehicle.year?.toString().includes(searchLower)
    );
  }) || [];

  const tabs: UniverseTab[] = ['COLLECTION', 'SALES', 'STORAGE'];

  return (
    <section id="dcr-universe" className="relative bg-white py-12 lg:py-20 overflow-x-hidden">
      {/* Giant Background Watermark */}
      <div className="fixed bottom-0 left-0 pointer-events-none select-none z-0 opacity-10 dark:opacity-5 leading-none">
        <span className="font-bold text-[30vw] text-slate-400 dark:text-slate-600 tracking-tighter">
          DCR
        </span>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column - 5/12 (41.67%) */}
          <div className="lg:col-span-5 flex flex-col space-y-8 lg:space-y-12">
            {/* Header */}
            <div>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-slate-500 mb-2">
                DCR Ecosystem
              </p>
              <div className="flex flex-wrap items-center font-bold text-5xl lg:text-6xl tracking-tight">
                <span className="text-slate-900 mr-1">DCR</span>
                <span className="bg-[#f7c01d] text-white px-2 py-1 leading-none transform -skew-x-6">
                  UNIVERSE
                </span>
              </div>
            </div>

            {/* Tab Navigation - Horizontal, Top Right of Left Column */}
            <nav className="border-b border-slate-200 dark:border-slate-700">
              <ul className="flex space-x-6 lg:space-x-8 overflow-x-auto">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <li key={tab} className="pb-3 flex-shrink-0">
                      <button
                        onClick={() => setActiveTab(tab)}
                        className={`text-[10px] md:text-sm font-bold tracking-widest uppercase transition-colors ${
                          isActive 
                            ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 border-b-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        {tab === 'COLLECTION' && '// '}
                        {tab}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Dynamic Content Based on Active Tab */}
            <div className="space-y-6 lg:space-y-8">
              <h1 className="font-bold text-4xl lg:text-5xl uppercase leading-[0.9]">
                {activeTab === 'COLLECTION' && (
                  <>
                    Premium<br/>Collection
                  </>
                )}
                {activeTab === 'SALES' && (
                  <>
                    Exclusive<br/>Sales
                  </>
                )}
                {activeTab === 'STORAGE' && (
                  <>
                    Technical<br/>Storage
                  </>
                )}
              </h1>

              <div className="border-l-4 border-[#f7c01d] pl-6 py-1">
                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
                  {activeTab === 'COLLECTION' && 
                    "Descubre nuestra curaduría de vehículos de colección. Desde superdeportivos europeos hasta muscle cars americanos, cada vehículo es seleccionado por su exclusividad, historia y potencial de inversión."
                  }
                  {activeTab === 'SALES' && 
                    "Adquire el vehículo de tus sueños a través de nuestra red global. Compra directa, subastas privadas y servicio de corretaje especializado en autos de colección con verificación completa."
                  }
                  {activeTab === 'STORAGE' && 
                    "Custodia de grado inversión en Santiago. Protocolos aeroespaciales de mantenimiento, control climático de precisión y seguridad biométrica avanzada para proteger tu inversión."
                  }
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeTab === 'COLLECTION' && (
                  <>
                    <div className="border border-slate-300 dark:border-slate-700 p-6 flex flex-col items-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <span className="text-3xl mb-3 text-slate-800 dark:text-white group-hover:text-[#f7c01d] transition-colors">
                        🏎️
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Categoría
                      </span>
                      <span className="font-bold text-sm uppercase">
                        Exóticos & Clásicos
                      </span>
                    </div>
                    <div className="border border-slate-300 dark:border-slate-700 p-6 flex flex-col items-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <span className="text-3xl mb-3 text-slate-800 dark:text-white group-hover:text-[#f7c01d] transition-colors">
                        🏆
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Calidad
                      </span>
                      <span className="font-bold text-sm uppercase">
                        Certificación Premium
                      </span>
                    </div>
                  </>
                )}
                {activeTab === 'SALES' && (
                  <>
                    <div className="border border-slate-300 dark:border-slate-700 p-6 flex flex-col items-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <span className="text-3xl mb-3 text-slate-800 dark:text-white group-hover:text-[#f7c01d] transition-colors">
                        🔨
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Formato
                      </span>
                      <span className="font-bold text-sm uppercase">
                        Venta Directa & Subastas
                      </span>
                    </div>
                    <div className="border border-slate-300 dark:border-slate-700 p-6 flex flex-col items-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <span className="text-3xl mb-3 text-slate-800 dark:text-white group-hover:text-[#f7c01d] transition-colors">
                        🛡️
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Transparencia
                      </span>
                      <span className="font-bold text-sm uppercase">
                        Inspección Completa
                      </span>
                    </div>
                  </>
                )}
                {activeTab === 'STORAGE' && (
                  <>
                    <div className="border border-slate-300 dark:border-slate-700 p-6 flex flex-col items-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <span className="text-3xl mb-3 text-slate-800 dark:text-white group-hover:text-[#f7c01d] transition-colors">
                        🌡️
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Clima
                      </span>
                      <span className="font-bold text-sm uppercase">
                        Control de Precisión
                      </span>
                    </div>
                    <div className="border border-slate-300 dark:border-slate-700 p-6 flex flex-col items-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <span className="text-3xl mb-3 text-slate-800 dark:text-white group-hover:text-[#f7c01d] transition-colors">
                        🔐
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Seguridad
                      </span>
                      <span className="font-bold text-sm uppercase">
                        Biométrica 24/7
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* CTA */}
              <div>
                <a 
                  className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white hover:text-[#f7c01d] dark:hover:text-[#f7c01d] transition-colors group"
                  href={`#${activeTab.toLowerCase()}`}
                >
                  {activeTab === 'COLLECTION' && 'Explorar Colección Completa'}
                  {activeTab === 'SALES' && 'Ver Vehículos Disponibles'}
                  {activeTab === 'STORAGE' && 'Solicitar Custodia'}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - 7/12 (58.33%) */}
          <div className="lg:col-span-7 flex flex-col pt-8 lg:pt-24">
            {activeTab === 'COLLECTION' ? (
              // Vehicle Table for COLLECTION
              <div className="w-full">
                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white bg-transparent dark:bg-slate-800/30 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#f7c01d] focus:border-[#f7c01d] sm:text-sm transition-all"
                      placeholder="Buscar por marca, modelo, año..."
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                        aria-label="Clear search"
                      >
                        <span className="text-lg">×</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Vehicle Table */}
                <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800">
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider" scope="col">
                          Imagen
                        </th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider" scope="col">
                          Marca
                        </th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider" scope="col">
                          Modelo
                        </th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider" scope="col">
                          Año
                        </th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider" scope="col">
                          Precio
                        </th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider" scope="col">
                          HP
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-transparent divide-y divide-slate-200 dark:divide-slate-700">
                      {isLoading ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                            Cargando vehículos...
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-red-500">
                            Error al cargar vehículos
                          </td>
                        </tr>
                      ) : filteredVehicles.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                            {searchTerm ? 'No se encontraron vehículos' : 'No hay vehículos disponibles'}
                          </td>
                        </tr>
                      ) : (
                        filteredVehicles.map((vehicle) => (
                          <tr 
                            key={vehicle.id}
                            className="hover:bg-blue-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="h-12 w-20 overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600">
                                {vehicle.image_url ? (
                                  <img
                                    src={vehicle.image_url}
                                    alt={`${vehicle.brand} ${vehicle.model}`}
                                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-slate-400">
                                    🏎️
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">
                              {vehicle.brand?.toUpperCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-900 dark:text-white font-medium">
                                {vehicle.model}
                              </div>
                              {vehicle.edition_type && (
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  {vehicle.edition_type}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                              {vehicle.year}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">
                              ${vehicle.current_price?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                              {vehicle.horsepower} <span className="text-[10px]">HP</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Results Counter */}
                <div className="mt-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Mostrando {filteredVehicles.length} de {vehicles?.length || 0} vehículos
                  </p>
                </div>
              </div>
            ) : (
              // Image for SALES and STORAGE tabs
              <div className="w-full aspect-[4/5] relative group overflow-hidden shadow-2xl">
                {/* Visual Accent Borders */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#f7c01d]/30 z-20"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#f7c01d]/30 z-20"></div>
                
                <div className="w-full h-full overflow-hidden bg-slate-900 relative">
                  {activeTab === 'SALES' && (
                    <img
                      src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&q=80&w=1200"
                      alt="Sales Context"
                      className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                  )}
                  {activeTab === 'STORAGE' && (
                    <img
                      src="https://images.unsplash.com/photo-1502744691472-dc077b10058e?auto=format&fit=crop&q=80&w=1200"
                      alt="Storage Context"
                      className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Technical Label Overlay */}
                <div className="absolute bottom-10 right-10 z-30 flex flex-col items-end">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#f7c01d] bg-slate-950 px-6 py-2 border border-slate-800">
                    {activeTab} VISUAL_ID
                  </span>
                  <div className="h-1 w-20 bg-[#f7c01d] mt-4"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export { DCRUniverse };
export default DCRUniverse;
