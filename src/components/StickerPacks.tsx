import React, { useState } from 'react';
import { Check, Ticket, UserPlus, MousePointerClick, Trophy, FileText, Download, ShieldCheck, Cpu, Lock, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PACKAGES = [
  { id: 1, name: 'Pack Starter', count: 5, price: 50, popular: false },
  { id: 2, name: 'Pack Pro', count: 15, price: 120, popular: true },
  { id: 3, name: 'Pack Elite', count: 50, price: 350, popular: false },
];

const STEPS = [
  {
    icon: <UserPlus size={32} />,
    title: "1. ELIGE TU PACK",
    desc: "Selecciona la cantidad de Stickers que deseas. Mientras más stickers, más probabilidades matemáticas tienes de ganar."
  },
  {
    icon: <MousePointerClick size={32} />,
    title: "2. RECIBE TUS NÚMEROS",
    desc: "Una vez confirmado el pago, recibirás tus números de folio únicos en tu correo electrónico de manera instantánea."
  },
  {
    icon: <Trophy size={32} />,
    title: "3. ESPERA EL SORTEO",
    desc: "El sorteo se realizará en vivo ante notario público. Si tu número coincide, el premio es tuyo."
  }
];

const StickerPacks: React.FC = () => {
  const [selectedPkg, setSelectedPkg] = useState<number>(2);

  const selectedPackage = PACKAGES.find(p => p.id === selectedPkg);

  return (
    <section id="paquetes" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#181f25' }}>
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            PARTICIPA DEL <span style={{ color: '#f7c01d' }}>SORTEO</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#afb3b6' }}>
            COMPRA TUS STICKERS
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12 mb-24">
          
          {/* Left Column - Image + Info */}
          <div className="xl:col-span-4 order-1">
            <div className="mb-6 overflow-hidden relative group aspect-video xl:aspect-auto xl:h-64" style={{ border: '1px solid #364049' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img 
                src="https://imgs.search.brave.com/E6h3VRa8Ga7_cxO0W1WEB2uoHXW77azdvKE9rb7xiN4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXV0b2Jsb2cu/Y29tLy5pbWFnZS93XzM4/NDAscV9hdXRvOmdv/b2QsY19saW1pdC9N/akE1TURnNU5ESTRN/elkzTWpnM09USXcw/RHVjYXRpJTIwU3Ry/ZWV0ZmlnaHRlciUy/MFY0JTIwTGFtYm9y/Z2hpbmkuanBn" 
                alt="Ducati Streetfighter Detail" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110" 
                loading="lazy"
                style={{ filter: 'grayscale(100%)' }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#f7c01d' }}>
                  Ducati Streetfighter V4
                </span>
              </div>
            </div>

            <div className="mt-4 hidden xl:block">
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter" style={{ color: '#f7c01d' }}>
                {selectedPackage?.name}
              </h3>
              <p className="text-sm font-medium mb-8 leading-relaxed" style={{ color: '#afb3b6' }}>
                Al adquirir este paquete, aseguras tu participación en el sorteo oficial.
                Cada sticker representa un folio único certificado.
              </p>
            </div>
          </div>

          {/* Center Column - Package Cards */}
          <div className="xl:col-span-8 xl:row-span-2 order-3 xl:order-2 h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-full content-start">
                {PACKAGES.map((pkg) => {
                const isSelected = selectedPkg === pkg.id;
                return (
                    <div 
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg.id)}
                    className={`
                        relative p-6 sm:p-8 transition-all duration-300 cursor-pointer group flex flex-col justify-between
                        ${isSelected 
                        ? '' 
                        : 'hover:opacity-80'}
                    `}
                    style={{
                      backgroundColor: isSelected ? '#272e35' : 'transparent',
                      border: isSelected ? '1px solid #f7c01d' : '1px solid #364049'
                    }}
                    >
                      {pkg.popular && (
                        <div className="absolute top-0 right-0 bg-[#f7c01d] text-[#181f25] text-[10px] font-black uppercase px-3 py-1 tracking-wider">
                          Popular
                        </div>
                      )}
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-6xl sm:text-7xl font-black" style={{ color: '#f7c01d' }}>
                            {pkg.count}
                          </span>
                          <Ticket className="w-12 h-12" style={{ color: '#364049' }} />
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-2" style={{ color: '#ffffff' }}>
                          {pkg.name}
                        </h3>
                        <p className="text-sm" style={{ color: '#798086' }}>
                          {pkg.count} stickers únicos
                        </p>
                      </div>

                      <div>
                        <div className="text-3xl font-black mb-4" style={{ color: '#f7c01d' }}>
                          ${pkg.price}
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs" style={{ color: '#798086' }}>
                          {isSelected ? (
                            <>
                              <Check className="w-4 h-4 text-[#f7c01d]" />
                              <span className="text-[#f7c01d] font-bold">SELECCIONADO</span>
                            </>
                          ) : (
                            <span>CLICK PARA SELECCIONAR</span>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute inset-0 border-2 pointer-events-none" style={{ borderColor: '#f7c01d' }} />
                      )}
                    </div>
                );
                })}
            </div>
          </div>

          {/* Right Column - Payment Panel */}
          <div className="xl:col-span-4 xl:col-start-9 order-2 xl:order-3 h-fit xl:sticky xl:top-24">
            <div className="backdrop-blur-sm" style={{ border: '1px solid #364049', backgroundColor: 'rgba(39, 46, 53, 0.5)' }}>
              <div className="p-6 backdrop-blur-sm" style={{ border: '1px solid #364049', backgroundColor: 'rgba(39, 46, 53, 0.3)' }}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#798086' }}>Total a pagar</span>
                  <span className="text-3xl font-black text-white tracking-tighter">
                    ${selectedPackage?.price.toLocaleString()}
                  </span>
                </div>
                <div className="w-full my-4" style={{ height: '1px', backgroundColor: '#364049' }} />
                <Button 
                  className="mb-4 rounded-none w-full"
                  style={{ backgroundColor: '#f7c01d', color: '#181f25' }}
                >
                  PROCEDER AL PAGO
                </Button>
                
                {/* PAYMENT METHODS LOGOS - FLOW EXCLUSIVE */}
                <div className="mt-6 pt-5 text-center" style={{ borderTop: '1px solid rgba(54, 64, 73, 0.6)' }}>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#798086' }}>
                    Pago Seguro Vía
                  </p>
                  <div className="flex justify-center items-center">
                    {/* Flow - Official Blue Logo transformed to white via CSS, restores color on hover */}
                    <div 
                      className="px-4 py-2 transition-all duration-300 hover:opacity-100"
                      style={{ 
                        opacity: 0.7,
                        filter: 'brightness(0) invert(1)' // White filter
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.filter = 'none'}
                      onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(0) invert(1)'}
                    >
                      <svg 
                        width="80" 
                        height="24" 
                        viewBox="0 0 80 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text 
                          x="0" 
                          y="18" 
                          fontSize="16" 
                          fontWeight="900" 
                          fill="currentColor"
                          className="tracking-tight"
                        >
                          FLOW
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* SECURITY BADGES */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-[10px]" style={{ color: '#798086' }}>
                    <Lock className="w-4 h-4" />
                    <span>Pago encriptado SSL 256-bit</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px]" style={{ color: '#798086' }}>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Transacción segura certificada</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px]" style={{ color: '#798086' }}>
                    <Server className="w-4 h-4" />
                    <span>Servidores de nivel empresarial</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TUGANA TECH MODULE */}
            <div className="mt-6 p-5 text-center" style={{ border: '1px solid #364049', backgroundColor: 'rgba(39, 46, 53, 0.3)' }}>
              <div className="flex justify-center items-center gap-2 mb-3">
                <Cpu className="w-5 h-5" style={{ color: '#f7c01d' }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#f7c01d' }}>
                  Powered by
                </span>
              </div>
              <p className="text-2xl font-black text-white tracking-tight mb-4">
                TUGANA TECH
              </p>
              <div className="grid grid-cols-3 gap-3 text-[10px]">
                <div className="text-center" style={{ color: '#798086' }}>
                  <div className="font-bold text-white mb-1">SHA-256</div>
                  <div>Encriptación</div>
                </div>
                <div className="text-center" style={{ color: '#798086' }}>
                  <div className="font-bold text-white mb-1">256-bit</div>
                  <div>SSL Secure</div>
                </div>
                <div className="text-center" style={{ color: '#798086' }}>
                  <div className="font-bold text-white mb-1">99.9%</div>
                  <div>Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS SECTION */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿CÓMO <span style={{ color: '#f7c01d' }}>FUNCIONA</span>?
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: '#798086' }}>
              Proceso simple y transparente en 3 pasos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, index) => (
              <div key={index} className="relative">
                <div className="mb-6" style={{ color: '#f7c01d' }}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#afb3b6' }}>
                  {step.desc}
                </p>
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-2xl font-black" style={{ color: '#364049' }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mt-24 text-center pb-12">
          <p className="text-lg mb-8" style={{ color: '#afb3b6' }}>
            ¿Listo para participar?
          </p>
          <Button 
            size="lg"
            className="px-12 py-6 text-lg font-black rounded-none transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#f7c01d', color: '#181f25' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            COMPRAR STICKERS AHORA
          </Button>
          <p className="text-xs mt-6" style={{ color: '#798086' }}>
            ✓ Sorteo oficial ante notario • ✓ Pagos seguros • ✓ Entrega inmediata de números
          </p>
        </div>
      </div>
    </section>
  );
};

export default StickerPacks;
