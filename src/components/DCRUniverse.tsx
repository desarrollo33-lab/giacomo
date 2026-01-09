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
 * - Collection tab shows VehicleTable with vehicles
 * - Sales/Storage tabs show promotional content
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
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              DCR <span style={{ color: '#f7c01d' }}>UNIVERSE</span>
            </h2>
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
              <h3 className="text-6xl font-bold text-foreground mb-6 leading-tight">
                {activeContent.title.split(' ').map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </h3>
              
              {/* Border-right decorative line */}
              <div className="relative inline-block w-full">
                <div className="absolute right-0 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#f7c01d' }} />
                <div className="pr-6">
                  <p className="text-sm text-muted-foreground leading-relaxed" style={{ color: '#798086' }}>
                    {activeTab === 'COLLECTION' && 'Vehículos disponibles para venta inmediata.'}
                    {activeTab === 'SALES' && 'Vende tu vehículo con garantía y confianza.'}
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
            ) : (
              <>
                {/* Image + Badges + CTA */}
                <div className="relative bg-secondary rounded-none overflow-hidden" style={{ backgroundColor: '#f1f2f4' }}>
                  {/* Large Emoji/Image */}
                  <div className="w-full h-96 flex items-center justify-center">
                    <div className="text-9xl">{activeContent.image}</div>
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-8">
                    <div className="w-full">
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {activeTab === 'SALES' && 'Proceso de Venta Transparente'}
                        {activeTab === 'STORAGE' && 'Instalaciones de Alta Seguridad'}
                      </h4>
                      <p className="text-muted-foreground mb-6" style={{ color: '#798086' }}>
                        {activeTab === 'SALES' && 'Nuestro equipo de expertos te guía en cada paso del proceso de venta, garantizando transparencia y el mejor valor del mercado.'}
                        {activeTab === 'STORAGE' && 'Nuestras instalaciones cuentan con seguridad 24/7, sistemas de climatización y mantenimiento preventivo continuo.'}
                      </p>
                      <Button
                        className="rounded-none font-semibold"
                        style={{ backgroundColor: '#f7c01d', color: '#181f25' }}
                      >
                        {activeTab === 'SALES' ? 'Vender Mi Vehículo' : 'Más Información'}
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