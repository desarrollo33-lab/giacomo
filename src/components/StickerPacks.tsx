import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Shield, Zap, Lock, ArrowRight } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: 'starter',
    name: 'STARTER PACK',
    price: 50,
    currency: 'USD',
    features: [
      '10 Stickers Digitales',
      '2 Badges Exclusivos',
      'Acceso a Comunidad',
      'Updates Mensuales'
    ]
  },
  {
    id: 'pro',
    name: 'PRO PACK',
    price: 120,
    currency: 'USD',
    popular: true,
    features: [
      '25 Stickers Digitales',
      '5 Badges Exclusivos',
      'Acceso VIP a Comunidad',
      'Updates Semanales',
      'Descuentos en Sorteos',
      'Soporte Prioritario'
    ]
  },
  {
    id: 'elite',
    name: 'ELITE PACK',
    price: 350,
    currency: 'USD',
    features: [
      '50 Stickers Digitales',
      '10 Badges Exclusivos',
      'Acceso ELITE a Comunidad',
      'Updates Diarios',
      'Descuentos Premium',
      'Soporte 24/7',
      'Stickers Personalizados',
      'Acceso Anticipado'
    ]
  }
];

export function StickerPacks() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSelect = (packageId: string) => {
    setSelectedPackage(packageId === selectedPackage ? null : packageId);
  };

  const selected = packages.find(pkg => pkg.id === selectedPackage);

  return (
    <section className="py-24" style={{ backgroundColor: '#181f25' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#ffffff' }}>
            COMPRA <span style={{ color: '#f7c01d' }}>PACKS</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#afb3b6' }}>
            Elige el pack que mejor se adapte a tus necesidades y comienza a coleccionar stickers exclusivos de DCR
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="relative cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              onClick={() => handleSelect(pkg.id)}
              style={{
                borderRadius: '0rem',
                border: selectedPackage === pkg.id ? '2px solid #f7c01d' : '1px solid #364049',
                backgroundColor: '#272e35'
              }}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 text-center py-2" style={{ backgroundColor: '#f7c01d' }}>
                  <span className="text-sm font-bold" style={{ color: '#181f25' }}>
                    MÁS POPULAR
                  </span>
                </div>
              )}

              <CardHeader className={pkg.popular ? 'pt-12' : ''}>
                <CardTitle className="text-xl" style={{ color: '#ffffff' }}>
                  {pkg.name}
                </CardTitle>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-bold" style={{ color: '#f7c01d' }}>
                    ${pkg.price}
                  </span>
                  <span style={{ color: '#798086' }}>
                    {pkg.currency}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3" style={{ color: '#afb3b6' }}>
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#f7c01d' }} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full mt-6 font-semibold"
                  style={{
                    backgroundColor: selectedPackage === pkg.id ? '#f7c01d' : 'transparent',
                    color: selectedPackage === pkg.id ? '#181f25' : '#f7c01d',
                    border: selectedPackage === pkg.id ? 'none' : '1px solid #f7c01d',
                    borderRadius: '0rem'
                  }}
                >
                  {selectedPackage === pkg.id ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      SELECCIONADO
                    </>
                  ) : (
                    'SELECCIONAR'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
              CÓMO <span style={{ color: '#f7c01d' }}>FUNCIONA</span>
            </h3>
            <p style={{ color: '#798086' }}>
              Sigue estos 3 simples pasos para comenzar a coleccionar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                step: '01',
                title: 'Elige tu Pack',
                description: 'Selecciona el pack que mejor se adapte a tus necesidades y presupuesto'
              },
              {
                icon: '💳',
                step: '02',
                title: 'Paga de forma Segura',
                description: 'Realiza el pago a través de nuestra plataforma 100% segura y encriptada'
              },
              {
                icon: '🎁',
                step: '03',
                title: 'Recibe tus Stickers',
                description: 'Accede inmediatamente a tus stickers digitales y comienza a compartirlos'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="text-center p-8"
                style={{ 
                  backgroundColor: '#272e35',
                  borderRadius: '0rem',
                  border: '1px solid #364049'
                }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div 
                  className="text-6xl font-bold mb-4"
                  style={{ 
                    color: '#f7c01d',
                    opacity: 0.3
                  }}
                >
                  {item.step}
                </div>
                <h4 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>
                  {item.title}
                </h4>
                <p className="text-sm" style={{ color: '#798086' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Powered By Tugana Section */}
        <div 
          className="max-w-5xl mx-auto p-8"
          style={{ 
            backgroundColor: '#272e35',
            borderRadius: '0rem',
            border: '1px solid #364049'
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8" style={{ color: '#f7c01d' }} />
                <h4 className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                  Powered by Tugana
                </h4>
              </div>
              <p className="mb-4" style={{ color: '#798086' }}>
                Tecnología de última generación para garantizar transacciones seguras y confiables
              </p>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#afb3b6' }}>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>SSL 256-bit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>SHA-256 Encryption</span>
                </div>
              </div>
            </div>

            <Button
              className="flex items-center gap-2 font-semibold"
              style={{
                backgroundColor: '#f7c01d',
                color: '#181f25',
                borderRadius: '0rem'
              }}
            >
              DESCARGAR BASES LEGALES
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sticky Payment Panel */}
        {selected && (
          <div 
            className="fixed bottom-0 left-0 right-0 p-6 z-50"
            style={{ 
              backgroundColor: '#272e35',
              borderTop: '2px solid #f7c01d'
            }}
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f7c01d' }}>
                  <Check className="w-6 h-6" style={{ color: '#181f25' }} />
                </div>
                <div>
                  <p className="font-bold" style={{ color: '#ffffff' }}>
                    {selected.name}
                  </p>
                  <p className="text-sm" style={{ color: '#798086' }}>
                    Total a pagar: <span className="font-bold" style={{ color: '#f7c01d' }}>${selected.price} USD</span>
                  </p>
                </div>
              </div>

              <Button
                className="font-semibold"
                style={{
                  backgroundColor: '#f7c01d',
                  color: '#181f25',
                  borderRadius: '0rem'
                }}
              >
                PROCEDER AL PAGO
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
