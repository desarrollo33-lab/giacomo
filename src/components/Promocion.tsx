import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Gauge, Weight, Wind, Car } from 'lucide-react';

const Promocion: React.FC = () => {
  return (
    <div className="w-full">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[70vh] w-full overflow-hidden flex flex-col justify-end pb-16" style={{ backgroundColor: '#181f25' }}>
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#181f25] via-[#181f25]/60 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=2000" 
            alt="Ducati Streetfighter V4" 
            className="w-full h-full object-cover scale-105 opacity-60"
          />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-12 relative z-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-4xl">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest" style={{ backgroundColor: '#f7c01d', color: '#181f25' }}>
                  Multi-Prize Event 2026
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-6 text-white">
                GRAN PREMIO <br/>
                <span style={{ color: '#f7c01d' }}>
                  DCR MOTORS
                </span>
              </h1>
              <p className="max-w-xl text-white/70 text-base md:text-lg font-medium leading-relaxed border-l-2 pl-6" style={{ borderColor: '#f7c01d' }}>
                Desde la ingeniería italiana de Ducati hasta la exclusividad de MV Agusta y el poder de Mercedes-AMG. 
                Tres niveles de victoria, un solo evento.
              </p>
            </div>
            
            {/* Total Value Badge */}
            <div className="hidden md:block">
              <div className="w-32 h-32 border-2 border-white/20 rounded-none flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
                <span className="text-3xl font-black text-white">3</span>
                <div className="text-[9px] font-black text-white/60 uppercase tracking-widest text-center mt-1">
                  Premios <br/> Principales
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FIRST PRIZE: DUCATI STREETFIGHTER V4 */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-12">
          
          {/* Section Header */}
          <div className="mb-16 border-b pb-8 flex justify-between items-end" style={{ borderColor: '#e3e6e8' }}>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 block" style={{ color: '#f7c01d' }}>
                1st Prize // The Masterpiece
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none" style={{ color: '#181f25' }}>
                DUCATI <br/> STREETFIGHTER V4
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#798086' }}>Valor Estimado: $85,000 USD</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-medium mb-8 leading-relaxed text-lg" style={{ color: '#798086' }}>
                Inspirada en el Lamborghini Huracán STO, esta máquina (Unidad 142/630) redefine la exclusividad con fibra de carbono expuesta y una librea exclusiva "Citrea Green". 
                La naked más radical de Ducati.
              </p>
              
              {/* Mini Specs Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 border-l-2" style={{ backgroundColor: '#f1f2f4', borderColor: '#181f25' }}>
                  <span className="block text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#798086' }}>Potencia</span>
                  <span className="text-xl font-black uppercase" style={{ color: '#181f25' }}>208 HP</span>
                </div>
                <div className="p-4 border-l-2" style={{ backgroundColor: '#f1f2f4', borderColor: '#181f25' }}>
                  <span className="block text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#798086' }}>Torque</span>
                  <span className="text-xl font-black uppercase" style={{ color: '#181f25' }}>123 NM</span>
                </div>
                <div className="p-4 border-l-2" style={{ backgroundColor: '#f1f2f4', borderColor: '#181f25' }}>
                  <span className="block text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#798086' }}>Peso</span>
                  <span className="text-xl font-black uppercase" style={{ color: '#181f25' }}>178 KG</span>
                </div>
                <div className="p-4 border-l-2" style={{ backgroundColor: '#f1f2f4', borderColor: '#181f25' }}>
                  <span className="block text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#798086' }}>Motor</span>
                  <span className="text-xl font-black uppercase" style={{ color: '#181f25' }}>1103 CC</span>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 border-2 opacity-30 z-0 transition-transform duration-500" style={{ borderColor: '#f7c01d' }}></div>
              <img 
                src="https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&q=80&w=1000" 
                alt="Ducati Streetfighter V4" 
                className="relative z-10 w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl"
              />
              <div className="absolute bottom-4 right-4 px-3 py-1 text-[9px] font-black uppercase tracking-widest z-20" style={{ backgroundColor: '#181f25', color: '#f7c01d' }}>
                Unit 142 Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECOND PRIZE: MV AGUSTA RUSH 1000 */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#181f25' }}>
        {/* Subtle Glow Background */}
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-10 blur-[100px] pointer-events-none" style={{ backgroundColor: '#f7c01d' }}></div>
        
        <div className="container mx-auto px-4 md:px-12 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Image Side */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 border border-white/10"></div>
                <div className="absolute inset-4 border border-white/5"></div>
                
                <img 
                  src="https://images.unsplash.com/photo-1558981033-0f0309284409?auto=format&fit=crop&q=80&w=800" 
                  alt="MV Agusta Rush 1000" 
                  className="absolute inset-0 w-full h-full object-contain hover:scale-110 transition-transform duration-700"
                />
                
                {/* Floating Label */}
                <div className="absolute top-10 left-0 px-3 py-1 backdrop-blur-md border" style={{ backgroundColor: 'rgba(24, 31, 37, 0.8)', borderColor: '#f7c01d' }}>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">Carbon Fiber Chassis</span>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: '#f7c01d' }}>
                  2nd Prize // The Exclusive
                </span>
                <div className="h-[1px] w-12" style={{ backgroundColor: '#364049' }}></div>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2 text-white">
                MV AGUSTA <br/> RUSH 1000
              </h2>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-8" style={{ color: '#798086' }}>
                Limited Edition Hyper Naked
              </h3>

              <p className="font-medium leading-relaxed mb-10 border-l pl-6" style={{ color: '#afb3b6', borderColor: '#364049' }}>
                Solo 300 unidades en el mundo. La moto más exclusiva y potente de MV Agusta. 
                Motor de 4 cilindros en línea de 998 CC, tecnología de competición y diseño italiano puro.
                Una obra de arte sobre dos ruedas.
              </p>

              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                <div className="flex items-center gap-4 group">
                  <Zap className="transition-colors" size={24} style={{ color: '#798086' }} />
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-widest" style={{ color: '#798086' }}>Potencia</span>
                    <span className="text-sm font-black uppercase text-white">208 HP</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <Wind className="transition-colors" size={24} style={{ color: '#798086' }} />
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-widest" style={{ color: '#798086' }}>Velocidad Máx</span>
                    <span className="text-sm font-black uppercase text-white">299 KM/H</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <Weight className="transition-colors" size={24} style={{ color: '#798086' }} />
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-widest" style={{ color: '#798086' }}>Peso</span>
                    <span className="text-sm font-black uppercase text-white">185 KG</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <Gauge className="transition-colors" size={24} style={{ color: '#798086' }} />
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-widest" style={{ color: '#798086' }}>Torque</span>
                    <span className="text-sm font-black uppercase text-white">125 NM</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. THIRD PRIZE: MERCEDES BENZ ML63 AMG */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-12">
          
          <div className="mb-16 border-b pb-8" style={{ borderColor: '#e3e6e8' }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: '#f7c01d' }}>
                3rd Prize // The Power
              </span>
              <div className="h-[1px] w-12" style={{ backgroundColor: '#e3e6e8' }}></div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4" style={{ color: '#181f25' }}>
              MERCEDES-BENZ <br/> ML63 AMG
            </h2>
            <p className="text-lg font-medium max-w-3xl" style={{ color: '#798086' }}>
              El SUV de lujo definitivo. Combinando elegancia, espacio y potencia brutal.
              Un V8 Biturbo que redefine el segmento de los SUVs de alto rendimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-4 border-2 opacity-20 z-0 transition-all duration-500 group-hover:skew-x-2" style={{ borderColor: '#f7c01d' }}></div>
              <img 
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000" 
                alt="Mercedes Benz ML63 AMG" 
                className="relative z-10 w-full h-auto object-cover shadow-xl"
              />
              <div className="absolute top-4 left-4 px-3 py-1 text-[9px] font-black uppercase tracking-widest z-20" style={{ backgroundColor: '#f7c01d', color: '#181f25' }}>
                AMG Performance
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <p className="font-medium mb-8 leading-relaxed text-lg" style={{ color: '#798086' }}>
                El ML63 AMG representa el punto máximo en la evolución de los SUVs deportivos. 
                Con su motor V8 Biturbo de 5.5 litros, transmisión 7G-TRONIC y tracción 4MATIC, 
                ofrece una experiencia de conducción incomparable.
              </p>
              
              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 border-l-2" style={{ backgroundColor: '#f1f2f4', borderColor: '#181f25' }}>
                  <span className="block text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#798086' }}>Motor</span>
                  <span className="text-base font-black uppercase" style={{ color: '#181f25' }}>V8 5.5L Biturbo</span>
                </div>
                <div className="p-4 border-l-2" style={{ backgroundColor: '#f1f2f4', borderColor: '#181f25' }}>
                  <span className="block text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#798086' }}>Potencia</span>
                  <span className="text-base font-black uppercase" style={{ color: '#181f25' }}>518 HP</span>
                </div>
                <div className="p-4 border-l-2" style={{ backgroundColor: '#f1f2f4', borderColor: '#181f25' }}>
                  <span className="block text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#798086' }}>Torque</span>
                  <span className="text-base font-black uppercase" style={{ color: '#181f25' }}>700 NM</span>
                </div>
                <div className="p-4 border-l-2" style={{ backgroundColor: '#f1f2f4', borderColor: '#181f25' }}>
                  <span className="block text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#798086' }}>0-100 KM/H</span>
                  <span className="text-base font-black uppercase" style={{ color: '#181f25' }}>4.8 SEG</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4" style={{ backgroundColor: '#f1f2f4' }}>
                <Car size={32} style={{ color: '#181f25' }} />
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-widest" style={{ color: '#798086' }}>Tracción</span>
                  <span className="text-sm font-black uppercase" style={{ color: '#181f25' }}>4MATIC Permanente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Promocion;
