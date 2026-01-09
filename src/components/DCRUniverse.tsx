import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VehicleTable } from '@/components/VehicleTable';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  current_price: number;
  status: 'Available' | 'Sold' | 'In Storage';
  edition_type: 'Official' | 'Special' | 'Limited';
  image_url: string;
  profitability_percentage?: number;
}

interface DCRUniverseProps {
  vehicles: Vehicle[];
}

type UniverseTab = 'COLLECTION' | 'SALES' | 'STORAGE';

interface TabContent {
  subtitle: string;
  title: string;
  description: string;
  badges: string[];
  image: string;
}

/**
 * DCRUniverse Component
 * 
 * A premium tabbed section showcasing the DCR Motors ecosystem.
 * Three tabs: COLLECTION, SALES, STORAGE
 * 
 * Features:
 * - Tabbed interface with 3 sections
 * - Collection and Sales tabs show VehicleTable
 * - Storage tab shows promotional content
 * - Layout 35/65 (left title, right content)
 * - DCR Yellow accent color (#f7c01d)
 * - Flat design aesthetic (rounded-none)
 */

const DCRUniverse: React.FC<DCRUniverseProps> = ({ vehicles }) => {
  const [activeTab, setActiveTab] = useState<UniverseTab>('COLLECTION');

  const contentConfig: Record<UniverseTab, TabContent> = {
    COLLECTION: {
      subtitle: 'EXCLUSIVIDAD',
      title: 'COLLECTION',
      description: 'Descubre nuestra colección exclusiva de vehículos deportivos y de lujo. Cada pieza ha sido cuidadosamente seleccionada y certificada.',
      badges: ['Autenticidad Garantizada', 'Certificación Oficial', 'Procedencia Verificada'],
      image: '🏎️'
    },
    SALES: {
      subtitle: 'COMPRA Y VENTA',
      title: 'SALES',
      description: 'Compramos y vendemos vehículos de alta gama. Proceso transparente, evaluación experta y el mejor valor del mercado.',
      badges: ['Evaluación Gratuita', 'Pago Inmediato', 'Gestión Completa'],
      image: '🤝'
    },
    STORAGE: {
      subtitle: 'CUSTODIA PREMIUM',
      title: 'STORAGE',
      description: 'Servicio de custodia profesional para tu vehículo de colección. Instalaciones de seguridad, mantenimiento y cuidado especializado.',
      badges: ['Seguridad 24/7', 'Mantenimiento Incluido', 'Climatización Controlada'],
      image: '🏛️'
    }
  };

  const activeContent = contentConfig[activeTab];

  // Mock sales data for the Sales table
  const salesVehicles: Vehicle[] = [
    {
      id: 's1',
      brand: 'Porsche',
      model: '911 GT3',
      year: 2022,
      current_price: 245000000,
      status: 'Sold',
      edition_type: 'Official',
      image_url: '/porsche-gt3.jpg',
      profitability_percentage: 12.5
    },
    {
      id: 's2',
      brand: 'Ferrari',
      model: 'F8 Tributo',
      year: 2021,
      current_price: 380000000,
      status: 'Sold',
      edition_type: 'Special',
      image_url: '/ferrari-f8.jpg',
      profitability_percentage: 8.3
    },
    {
      id: 's3',
      brand: 'Lamborghini',
      model: 'Huracán Evo',
      year: 2022,
      current_price: 295000000,
      status: 'Sold',
      edition_type: 'Official',
      image_url: '/lambo-huracan.jpg',
      profitability_percentage: 15.2
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
          {/* Left - Title */}
          <div className="md:w-2/3">
            <Badge className="mb-4 bg-background border-2" style={{ borderColor: '#f7c01d', color: '#f7c01d' }}>
              {activeContent.subtitle}
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6">
              DCR <span style={{ color: '#f7c01d' }}>UNIVERSE</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl" style={{ color: '#798086' }}>
              {activeContent.description}
            </p>
          </div>

          {/* Right - Tabs */}
          <div className="md:w-1/3 flex md:justify-end gap-8 mt-6 md:mt-0">
            {['COLLECTION', 'SALES', 'STORAGE'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as UniverseTab)}
                className="relative pb-2 text-sm font-semibold tracking-wide transition-colors hover:text-foreground"
                style={{
                  color: activeTab === tab ? '#f7c01d' : '#798086'
                }}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#f7c01d' }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section - Layout 35/65 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Title & Badges (35% = 4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="text-right">
              <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {activeContent.title.split(' ').map((word, i) => (
                  <h3 key={i}>{word}</h3>
                ))}
              </h3>
              
              {/* Border-right decorative line */}
              <div className="relative inline-block w-full">
                <div className="absolute right-0 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#f7c01d' }} />
                <div className="pr-6">
                  <p className="text-sm text-muted-foreground leading-relaxed" style={{ color: '#798086' }}>
                    {activeTab === 'COLLECTION' && 'Vehículos disponibles para venta inmediata.'}
                    {activeTab === 'SALES' && 'Vehículos vendidos recientemente.'}
                    {activeTab === 'STORAGE' && 'Custodia profesional con seguridad máxima.'}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-8 space-y-3">
                {activeContent.badges.map((badge, index) => (
                  <div key={index} className="inline-block">
                    <Badge variant="outline" className="rounded-none text-xs" style={{ borderColor: '#e3e6e8', color: '#181f25' }}>
                      {badge}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Content (65% = 8 cols) */}
          <div className="lg:col-span-8">
            {activeTab === 'COLLECTION' ? (
              <VehicleTable vehicles={vehicles} />
            ) : activeTab === 'SALES' ? (
              <VehicleTable vehicles={salesVehicles} />
            ) : (
              <>
                {/* Image + Badges + CTA (only for STORAGE) */}
                <div className="relative bg-secondary rounded-none overflow-hidden" style={{ backgroundColor: '#f1f2f4' }}>
                  {/* Large Emoji/Image */}
                  <div className="w-full h-96 flex items-center justify-center">
                    <div className="text-9xl">{activeContent.image}</div>
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-8">
                    <div className="w-full">
                      <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                        Instalaciones de Alta Seguridad
                      </h2>
                      <p className="text-muted-foreground mb-6" style={{ color: '#798086' }}>
                        Nuestras instalaciones cuentan con seguridad 24/7, sistemas de climatización y mantenimiento preventivo continuo.
                      </p>
                      <Button
                        className="rounded-none font-semibold"
                        style={{ backgroundColor: '#f7c01d', color: '#181f25' }}
                      >
                        Más Información
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DCRUniverse;