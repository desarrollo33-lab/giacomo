import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Calendar, TrendingUp } from 'lucide-react';

interface Prize {
  id: string;
  name: string;
  brand: string;
  image: string;
  specs: {
    horsepower: string;
    torque: string;
    weight: string;
    topSpeed: string;
    cc: string;
  };
  status: 'active' | 'upcoming' | 'sold';
  endDate?: string;
  startDate?: string;
  ticketsSold?: number;
  ticketsTotal?: number;
}

const prizes: Prize[] = [
  {
    id: '1',
    name: 'Streetfighter V4',
    brand: 'Ducati',
    image: '🏍️',
    specs: {
      horsepower: '208 HP',
      torque: '123 Nm',
      weight: '201 kg',
      topSpeed: '280 km/h',
      cc: '1,103 cc'
    },
    status: 'active',
    endDate: '15 Ene 2026',
    ticketsSold: 847,
    ticketsTotal: 1000
  },
  {
    id: '2',
    name: 'Rush 1000',
    brand: 'MV Agusta',
    image: '🏍️',
    specs: {
      horsepower: '208 HP',
      torque: '125 Nm',
      weight: '185 kg',
      topSpeed: '290 km/h',
      cc: '998 cc'
    },
    status: 'active',
    endDate: '1 Feb 2026',
    ticketsSold: 623,
    ticketsTotal: 1000
  },
  {
    id: '3',
    name: 'ML63 AMG',
    brand: 'Mercedes-Benz',
    image: '🚗',
    specs: {
      horsepower: '585 HP',
      torque: '759 Nm',
      weight: '2,585 kg',
      topSpeed: '250 km/h',
      cc: '5,461 cc'
    },
    status: 'upcoming',
    startDate: '20 Ene 2026',
    endDate: '10 Feb 2026'
  }
];

const brandColors: Record<string, string> = {
  'Ducati': '#dc2626',
  'MV Agusta': '#7c3aed',
  'Mercedes-Benz': '#3b82f6'
};

export function Promocion() {
  return (
    <section className="py-24" style={{ backgroundColor: '#181f25' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" style={{ backgroundColor: 'transparent', border: '2px solid #f7c01d', color: '#f7c01d', borderRadius: '0rem' }}>
            SORTEOS ACTIVOS
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#ffffff' }}>
            PREMIOS <span style={{ color: '#f7c01d' }}>EXCLUSIVOS</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#afb3b6' }}>
            Participa en nuestros sorteos y gana vehículos exclusivos de colección
          </p>
        </div>

        {/* Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {prizes.map((prize) => (
            <Card
              key={prize.id}
              className="group overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              style={{ 
                borderRadius: '0rem',
                border: '1px solid #364049',
                backgroundColor: '#272e35'
              }}
            >
              {/* Image/Emoji */}
              <div className="w-full h-64 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#181f25' }}>
                <div className="text-8xl transform group-hover:scale-110 transition-transform duration-700">
                  {prize.image}
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {prize.status === 'active' && (
                    <Badge className="flex items-center gap-2" style={{ backgroundColor: '#f7c01d', color: '#181f25', borderRadius: '0rem' }}>
                      <TrendingUp className="w-3 h-3" />
                      ACTIVO
                    </Badge>
                  )}
                  {prize.status === 'upcoming' && (
                    <Badge className="flex items-center gap-2" style={{ backgroundColor: '#364049', color: '#ffffff', borderRadius: '0rem' }}>
                      <Calendar className="w-3 h-3" />
                      PRÓXIMO
                    </Badge>
                  )}
                </div>

                {/* Brand Badge */}
                <div className="absolute top-4 right-4">
                  <Badge style={{ 
                    backgroundColor: brandColors[prize.brand] || '#f7c01d', 
                    color: '#ffffff',
                    borderRadius: '0rem'
                  }}>
                    {prize.brand}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: '#ffffff' }}>
                  {prize.name}
                </CardTitle>
                <CardDescription style={{ color: '#798086' }}>
                  {prize.brand}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.entries(prize.specs).map(([key, value]) => (
                    <div 
                      key={key}
                      className="p-3"
                      style={{ 
                        backgroundColor: '#181f25',
                        borderRadius: '0rem'
                      }}
                    >
                      <div className="text-xs mb-1" style={{ color: '#798086' }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm font-semibold" style={{ color: '#ffffff' }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Bar (if active) */}
                {prize.status === 'active' && prize.ticketsSold && prize.ticketsTotal && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-2" style={{ color: '#798086' }}>
                      <span>{prize.ticketsSold} tickets vendidos</span>
                      <span>{Math.round((prize.ticketsSold / prize.ticketsTotal) * 100)}%</span>
                    </div>
                    <div 
                      className="w-full h-2"
                      style={{ backgroundColor: '#181f25', borderRadius: '0rem' }}
                    >
                      <div 
                        className="h-full transition-all duration-500"
                        style={{ 
                          backgroundColor: '#f7c01d',
                          width: `${(prize.ticketsSold / prize.ticketsTotal) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="flex items-center justify-between text-sm mb-4" style={{ color: '#798086' }}>
                  {prize.status === 'active' && (
                    <>
                      <span>📅 Cierre: {prize.endDate}</span>
                    </>
                  )}
                  {prize.status === 'upcoming' && (
                    <>
                      <span>📅 Inicio: {prize.startDate}</span>
                    </>
                  )}
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full font-semibold"
                  style={{
                    backgroundColor: '#f7c01d',
                    color: '#181f25',
                    borderRadius: '0rem'
                  }}
                >
                  {prize.status === 'active' ? 'PARTICIPAR AHORA' : 'NOTIFICARME'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
