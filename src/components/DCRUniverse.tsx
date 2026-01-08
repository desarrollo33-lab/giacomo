import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, Gavel, Warehouse, Trophy, Shield, Loader2 } from 'lucide-react';
import { useVehicles } from '@/hooks/useVehicles';
import type { Database } from '@/lib/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

/**
 * DCRUniverse Component
 * 
 * A premium tabbed section showcasing the DCR Motors ecosystem.
 * Three tabs: COLLECTION, SALES, STORAGE
 * 
 * Features:
 * - Tabbed interface with 3 sections
 * - Collection tab shows dynamic vehicle list from Supabase
 * - Responsive design with mobile-first approach
 * - Smooth animations and transitions
 * - DCR Yellow accent color (#f7c01d)
 * - Flat design aesthetic (rounded-none)
 */

type UniverseTab = 'COLLECTION' | 'SALES' | 'STORAGE';

interface TabContent {
  subtitle: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image?: string;
  specs: Array<{
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

const DCRUniverse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UniverseTab>('COLLECTION');

  // Fetch vehicles with status 'Available' for collection
  const { data: vehicles, isLoading: isLoadingVehicles, error: vehiclesError } = useVehicles({
    status: 'Available',
    enabled: activeTab === 'COLLECTION',
  });

  const contentConfig: Record<UniverseTab, TabContent> = {
    COLLECTION: {
      subtitle: "Exclusive Vehicle Portfolio",
      title: "PREMIUM \nCOLLECTION",
      description: "Descubre nuestra curaduría de vehículos de colección. Desde superdeportivos europeos hasta muscle cars americanos, cada vehículo es seleccionado por su exclusividad, historia y potencial de inversión.",
      cta: "Explorar Colección Completa",
      href: "#/collection",
      specs: [
        { label: 'Categoría', value: 'Exóticos & Clásicos', icon: Car },
        { label: 'Calidad', value: 'Certificación Premium', icon: Trophy },
      ]
    },
    SALES: {
      subtitle: "Acquisition & Brokerage",
      title: "EXCLUSIVE \nSALES",
      description: "Adquire el vehículo de tus sueños a través de nuestra red global. Compra directa, subastas privadas y servicio de corretaje especializado en autos de colección con verificación completa.",
      cta: "Ver Vehículos Disponibles",
      href: "#/sales",
      image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&q=80&w=1200",
      specs: [
        { label: 'Formato', value: 'Venta Directa & Subastas', icon: Gavel },
        { label: 'Transparencia', value: 'Inspección Completa', icon: Shield },
      ]
    },
    STORAGE: {
      subtitle: "Professional Asset Custody",
      title: "TECHNICAL \nSTORAGE",
      description: "Custodia de grado inversión en Santiago. Protocolos aeroespaciales de mantenimiento, control climático de precisión y seguridad biométrica avanzada para proteger tu inversión.",
      cta: "Solicitar Custodia",
      href: "#/storage",
      image: "https://images.unsplash.com/photo-1502744691472-dc077b10058e?auto=format&fit=crop&q=80&w=1200",
      specs: [
        { label: 'Clima', value: 'Control de Precisión', icon: Trophy },
        { label: 'Seguridad', value: 'Biométrica 24/7', icon: Warehouse },
      ]
    }
  };

  const tabs: UniverseTab[] = ['COLLECTION', 'SALES', 'STORAGE'];

  return (
    <section id="dcr-universe" className="bg-white text-slate-900 py-24 relative overflow-hidden">
      {/* Giant Watermark Background */}
      <div className="absolute -left-20 bottom-0 text-[18rem] leading-none font-black text-yellow-50 select-none z-0 opacity-60 uppercase tracking-tighter">
        DCR
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Column - Content */}
          <div className="w-full lg:w-1/2 pt-8">
            {/* Section Header */}
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  DCR Ecosystem
                </span>
                <div className="h-[1px] flex-grow bg-slate-100"></div>
              </div>
              <h3 className="text-4xl md:text-7xl font-black uppercase leading-none tracking-tighter mb-6">
                DCR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary">
                  UNIVERSE
                </span>
              </h3>
              <div className="w-16 h-1 bg-primary" />
            </div>

            {/* Tab Navigation */}
            <div className="w-full mb-12">
              <div className="flex border-b border-slate-100 overflow-x-auto">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative flex-shrink-0 px-6 py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                        isActive ? 'text-slate-900' : 'text-slate-300 hover:text-slate-400'
                      }`}
                    >
                      <span className={`absolute top-1/2 -translate-y-1/2 left-0 text-primary transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}>
                        //
                      </span>
                      {tab}
                      {isActive && (
                        <div className="absolute -bottom-px left-0 w-full h-[2px] bg-slate-900">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-slate-900"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="animate-fade-in min-h-[420px] flex flex-col justify-between">
              <div>
                <h4 className="text-4xl font-black uppercase mb-6 whitespace-pre-line leading-[0.9] tracking-tighter">
                  {contentConfig[activeTab].title}
                </h4>
                
                <p className="text-slate-600 font-medium leading-relaxed max-w-md border-l-2 border-primary pl-8 mb-10">
                  {contentConfig[activeTab].description}
                </p>

                {/* Dynamic Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {contentConfig[activeTab].specs.map((spec, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 hover:border-primary/30 transition-colors"
                    >
                      {spec.icon && <spec.icon className="w-[18px] h-[18px] text-primary flex-shrink-0" />}
                      <div>
                        <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                          {spec.label}
                        </span>
                        <span className="text-[10px] font-black uppercase">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  className="bg-primary text-slate-950 hover:bg-primary/90 rounded-none font-semibold flex items-center gap-4 w-full sm:w-auto justify-center group"
                >
                  <a href={contentConfig[activeTab].href}>
                    {contentConfig[activeTab].cta}
                    <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Dynamic Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end">
            {activeTab === 'COLLECTION' ? (
              // Vehicle List for Collection Tab
              <div className="w-full max-w-[540px] space-y-4 max-h-[700px] overflow-y-auto pr-2">
                {isLoadingVehicles ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : vehiclesError ? (
                  <div className="text-center py-20">
                    <p className="text-red-500">Error al cargar vehículos</p>
                  </div>
                ) : vehicles && vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <div 
                      key={vehicle.id}
                      className="group relative bg-slate-50 border border-slate-200 hover:border-primary/50 transition-all overflow-hidden"
                    >
                      <div className="flex gap-4 p-4">
                        {/* Thumbnail */}
                        <div className="w-32 h-24 flex-shrink-0 bg-slate-900 overflow-hidden">
                          {vehicle.image_url ? (
                            <img 
                              src={vehicle.image_url} 
                              alt={`${vehicle.brand} ${vehicle.model}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Car className="w-8 h-8 text-slate-700" />
                            </div>
                          )}
                        </div>

                        {/* Vehicle Info */}
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h5 className="text-lg font-black uppercase tracking-tighter text-slate-900">
                                {vehicle.brand} {vehicle.model}
                              </h5>
                              <p className="text-xs text-slate-500 font-medium">
                                {vehicle.year && `${vehicle.year} • `}
                                {vehicle.edition_type || 'Standard Edition'}
                              </p>
                            </div>
                            <div className="text-right">
                              {vehicle.current_price && (
                                <p className="text-lg font-black text-primary">
                                  ${vehicle.current_price.toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Highlights */}
                          {vehicle.highlights && (
                            <p className="text-[10px] text-slate-600 line-clamp-2 mt-2">
                              {vehicle.highlights}
                            </p>
                          )}

                          {/* Stats */}
                          <div className="flex gap-3 mt-2">
                            {vehicle.horsepower && (
                              <span className="text-[8px] bg-white px-2 py-1 border border-slate-200 font-semibold uppercase">
                                {vehicle.horsepower} HP
                              </span>
                            )}
                            {vehicle.mileage_kms && (
                              <span className="text-[8px] bg-white px-2 py-1 border border-slate-200 font-semibold uppercase">
                                {vehicle.mileage_kms.toLocaleString()} KM
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Hover Accent Border */}
                      <div className="absolute bottom-0 left-0 h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <Car className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No hay vehículos disponibles en este momento</p>
                  </div>
                )}
              </div>
            ) : (
              // Image for SALES and STORAGE tabs
              <div className="w-full max-w-[540px] aspect-[4/5] relative group overflow-hidden shadow-2xl">
                {/* Visual Accent Borders */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-primary/30 z-20"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-primary/30 z-20"></div>
                
                <div className="w-full h-full overflow-hidden bg-slate-900 relative">
                  <img 
                    key={activeTab}
                    src={contentConfig[activeTab].image} 
                    alt={`${activeTab} Context`} 
                    className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Technical Label Overlay */}
                <div className="absolute bottom-10 right-10 z-30 flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-slate-950 px-6 py-2 border border-slate-800">
                    {activeTab} VISUAL_ID
                  </span>
                  <div className="h-1 w-20 bg-primary mt-4"></div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DCRUniverse;
