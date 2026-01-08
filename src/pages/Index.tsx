import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function Index() {
  const [activeTab, setActiveTab] = useState<'collection' | 'sales' | 'storage'>('collection')

  return (
    <div className="min-h-screen bg-slate-950">
      {/* 1. GLOBAL HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-tight text-primary">
              DCR MOTORS
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#collection" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">
                Collection
              </a>
              <a href="#sales" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">
                Sales
              </a>
              <a href="#storage" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">
                Storage
              </a>
            </nav>

            {/* CTA Button */}
            <Button className="bg-primary text-slate-950 hover:bg-primary/90 rounded-none font-semibold">
              Mis Stickers
            </Button>
          </div>
        </div>
      </header>

      {/* Spacing for fixed header */}
      <div className="h-20" />

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID&controls=0&showinfo=0&rel=0"
            title="DCR Motors Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">
            DCR <span className="text-primary">MOTORS</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            exclusividad. pasión. adrenalina.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-primary text-slate-950 hover:bg-primary/90 rounded-none font-semibold text-lg px-8">
              Explorar Collection
            </Button>
            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 rounded-none font-semibold text-lg px-8">
              Ver Sorteos Activos
            </Button>
          </div>
        </div>
      </section>

      {/* 3. DCR UNIVERSE SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              DCR <span className="text-primary">UNIVERSE</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Descubre las tres dimensiones de DCR Motors
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={activeTab === 'collection' ? 'default' : 'outline'}
              onClick={() => setActiveTab('collection')}
              className={activeTab === 'collection' 
                ? 'bg-primary text-slate-950 rounded-none' 
                : 'border-slate-300 text-slate-700 hover:bg-slate-100 rounded-none'}
            >
              Collection
            </Button>
            <Button
              variant={activeTab === 'sales' ? 'default' : 'outline'}
              onClick={() => setActiveTab('sales')}
              className={activeTab === 'sales' 
                ? 'bg-primary text-slate-950 rounded-none' 
                : 'border-slate-300 text-slate-700 hover:bg-slate-100 rounded-none'}
            >
              Sales
            </Button>
            <Button
              variant={activeTab === 'storage' ? 'default' : 'outline'}
              onClick={() => setActiveTab('storage')}
              className={activeTab === 'storage' 
                ? 'bg-primary text-slate-950 rounded-none' 
                : 'border-slate-300 text-slate-700 hover:bg-slate-100 rounded-none'}
            >
              Storage
            </Button>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeTab === 'collection' && (
              <>
                <Card className="rounded-none border-slate-200 shadow-md">
                  <CardHeader>
                    <CardTitle>Supercars</CardTitle>
                    <CardDescription>Colección exclusiva</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Vehículos de alta gama disponibles</p>
                  </CardContent>
                </Card>
                <Card className="rounded-none border-slate-200 shadow-md">
                  <CardHeader>
                    <CardTitle>Classic Cars</CardTitle>
                    <CardDescription>Piezas históricas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Automóviles clásicos restaurados</p>
                  </CardContent>
                </Card>
                <Card className="rounded-none border-slate-200 shadow-md">
                  <CardHeader>
                    <CardTitle>Limited Edition</CardTitle>
                    <CardDescription>Ediciones limitadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Modelos exclusivos y únicos</p>
                  </CardContent>
                </Card>
              </>
            )}
            {activeTab === 'sales' && (
              <>
                <Card className="rounded-none border-slate-200 shadow-md">
                  <CardHeader>
                    <CardTitle>Auction</CardTitle>
                    <CardDescription>Subastas en vivo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Participa en subastas exclusivas</p>
                  </CardContent>
                </Card>
                <Card className="rounded-none border-slate-200 shadow-md">
                  <CardHeader>
                    <CardTitle>Direct Sales</CardTitle>
                    <CardDescription>Venta directa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Compra directamente vehículos</p>
                  </CardContent>
                </Card>
                <Card className="rounded-none border-slate-200 shadow-md">
                  <CardHeader>
                    <CardTitle>Brokerage</CardTitle>
                    <CardDescription>Servicio de corretaje</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Te ayudamos a encontrar tu auto</p>
                  </CardContent>
                </Card>
              </>
            )}
            {activeTab === 'storage' && (
              <>
                <Card className="rounded-none border-slate-200 shadow-md">
                  <CardHeader>
                    <CardTitle>Premium Storage</CardTitle>
                    <CardDescription>Almacenamiento premium</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Instalaciones de última generación</p>
                  </CardContent>
                </Card>
                <Card className="rounded-none border-slate-200 shadow-md">
                  <CardHeader>
                    <CardTitle>Maintenance</CardTitle>
                    <CardDescription>Mantenimiento experto</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Cuidado profesional de tu vehículo</p>
                  </CardContent>
                </Card>
                <Card className="rounded-none border-slate-200 shadow-md">
                  <CardHeader>
                    <CardTitle>Logistics</CardTitle>
                    <CardDescription>Logística completa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Transporte y gestión documental</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. PROMOCION SECTION */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              PREMIOS <span className="text-primary">EXCLUSIVOS</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Participa en nuestros sorteos y gana vehículos exclusivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-none border-slate-800 bg-slate-900 shadow-md">
              <CardHeader>
                <div className="w-full h-48 bg-slate-800 mb-4 flex items-center justify-center">
                  <span className="text-slate-600">Porsche 911 GT3</span>
                </div>
                <CardTitle className="text-white">Porsche 911 GT3</CardTitle>
                <CardDescription className="text-slate-400">Sorteo Activo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tickets vendidos</span>
                  <span className="text-primary font-semibold">847/1000</span>
                </div>
                <Button className="w-full mt-4 bg-primary text-slate-950 hover:bg-primary/90 rounded-none">
                  Comprar Tickets
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-none border-slate-800 bg-slate-900 shadow-md">
              <CardHeader>
                <div className="w-full h-48 bg-slate-800 mb-4 flex items-center justify-center">
                  <span className="text-slate-600">Ferrari 488 Pista</span>
                </div>
                <CardTitle className="text-white">Ferrari 488 Pista</CardTitle>
                <CardDescription className="text-slate-400">Próximo Sorteo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Inicio</span>
                  <span className="text-primary font-semibold">15 Ene 2026</span>
                </div>
                <Button className="w-full mt-4 border-slate-700 text-white hover:bg-slate-800 rounded-none" variant="outline">
                  Notificarme
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-none border-slate-800 bg-slate-900 shadow-md">
              <CardHeader>
                <div className="w-full h-48 bg-slate-800 mb-4 flex items-center justify-center">
                  <span className="text-slate-600">Lamborghini Huracán</span>
                </div>
                <CardTitle className="text-white">Lamborghini Huracán</CardTitle>
                <CardDescription className="text-slate-400">Próximo Sorteo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Inicio</span>
                  <span className="text-primary font-semibold">1 Feb 2026</span>
                </div>
                <Button className="w-full mt-4 border-slate-700 text-white hover:bg-slate-800 rounded-none" variant="outline">
                  Notificarme
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. COMPRA DE PACKS SECTION */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              COMPRA <span className="text-primary">PACKS</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Elige tu pack de stickers y aumenta tus chances de ganar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="rounded-none border-slate-700 bg-slate-800 shadow-md">
              <CardHeader>
                <CardTitle className="text-white">Pack Starter</CardTitle>
                <CardDescription className="text-slate-400">5 Stickers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">$50</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="text-slate-300">✓ 5 stickers digitales</li>
                  <li className="text-slate-300">✓ Acceso a sorteos</li>
                  <li className="text-slate-300">✓ Soporte básico</li>
                </ul>
                <Button className="w-full bg-primary text-slate-950 hover:bg-primary/90 rounded-none">
                  Comprar Pack
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-none border-primary bg-slate-800 shadow-md relative">
              <div className="absolute top-0 left-0 right-0 bg-primary text-slate-950 text-center text-sm font-semibold py-1">
                MÁS POPULAR
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="text-white">Pack Pro</CardTitle>
                <CardDescription className="text-slate-400">15 Stickers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">$120</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="text-slate-300">✓ 15 stickers digitales</li>
                  <li className="text-slate-300">✓ Doble de chances</li>
                  <li className="text-slate-300">✓ Acceso VIP</li>
                  <li className="text-slate-300">✓ Soporte prioritario</li>
                </ul>
                <Button className="w-full bg-primary text-slate-950 hover:bg-primary/90 rounded-none">
                  Comprar Pack
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-none border-slate-700 bg-slate-800 shadow-md">
              <CardHeader>
                <CardTitle className="text-white">Pack Elite</CardTitle>
                <CardDescription className="text-slate-400">50 Stickers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">$350</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="text-slate-300">✓ 50 stickers digitales</li>
                  <li className="text-slate-300">✓ Máximas chances</li>
                  <li className="text-slate-300">✓ Acceso VIP Elite</li>
                  <li className="text-slate-300">✓ Soporte dedicado</li>
                  <li className="text-slate-300">✓ Bonificaciones exclusivas</li>
                </ul>
                <Button className="w-full bg-primary text-slate-950 hover:bg-primary/90 rounded-none">
                  Comprar Pack
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. CÓMO FUNCIONA SECTION */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              CÓMO <span className="text-primary">FUNCIONA</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              En 3 simples pasos puedes participar y ganar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary text-slate-950 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Compra</h3>
              <p className="text-slate-400">
                Adquiere stickers digitales en packs de 5, 15 o 50 unidades. Cada sticker es una oportunidad de ganar.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary text-slate-950 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Participa</h3>
              <p className="text-slate-400">
                Asigna tus stickers a los sorteos activos. Más stickers = más chances de ganar el vehículo de tus sueños.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary text-slate-950 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Gana</h3>
              <p className="text-slate-400">
                El ganador se selecciona de forma transparente a través de nuestro motor de sorteos certificado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. POWERED BY SECTION */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              POWERED BY <span className="text-primary">TUGANA</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12">
              Nuestro motor de sorteos garantiza transparencia, seguridad y confianza en cada sorteo
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="rounded-none border-slate-700 bg-slate-800 shadow-md">
                <CardHeader>
                  <CardTitle className="text-white">Algoritmo Certificado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Sistema de selección aleatoria verificado por terceros. Totalmente transparente y auditable.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-none border-slate-700 bg-slate-800 shadow-md">
                <CardHeader>
                  <CardTitle className="text-white">Seguridad Avanzada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Encriptación de extremo a extremo. Protección de datos con estándares bancarios.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-none border-slate-700 bg-slate-800 shadow-md">
                <CardHeader>
                  <CardTitle className="text-white">Transparencia Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Todos los sorteos son públicos y verificables. Historial completo disponible.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DCR HUB SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              DCR <span className="text-primary">HUB</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Contenido exclusivo de nuestros influencers y partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-none border-slate-200 shadow-md overflow-hidden">
              <div className="w-full h-48 bg-slate-800 flex items-center justify-center">
                <span className="text-slate-600">Video Thumbnail</span>
              </div>
              <CardHeader>
                <CardTitle className="text-slate-900">Review: Porsche 911 GT3</CardTitle>
                <CardDescription className="text-slate-600">@autocritic</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Análisis completo del último modelo de Porsche
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-none border-slate-200 shadow-md overflow-hidden">
              <div className="w-full h-48 bg-slate-800 flex items-center justify-center">
                <span className="text-slate-600">Video Thumbnail</span>
              </div>
              <CardHeader>
                <CardTitle className="text-slate-900">DCR Collection Tour</CardTitle>
                <CardDescription className="text-slate-600">@dcrmotors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Tour exclusivo por nuestra colección
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-none border-slate-200 shadow-md overflow-hidden">
              <div className="w-full h-48 bg-slate-800 flex items-center justify-center">
                <span className="text-slate-600">Video Thumbnail</span>
              </div>
              <CardHeader>
                <CardTitle className="text-slate-900">Sorteo en Vivo</CardTitle>
                <CardDescription className="text-slate-600">@tugana</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Transmisión del sorteo mensual
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 9. GLOBAL FOOTER */}
      <footer className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">DCR MOTORS</h3>
              <p className="text-slate-400 text-sm">
                Exclusividad, pasión y adrenalina en cada vehículo.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2">
                <li><a href="#collection" className="text-slate-400 hover:text-primary text-sm">Collection</a></li>
                <li><a href="#sales" className="text-slate-400 hover:text-primary text-sm">Sales</a></li>
                <li><a href="#storage" className="text-slate-400 hover:text-primary text-sm">Storage</a></li>
                <li><a href="#raffles" className="text-slate-400 hover:text-primary text-sm">Sorteos</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li className="text-slate-400 text-sm">info@dcrmotors.com</li>
                <li className="text-slate-400 text-sm">+56 9 1234 5678</li>
                <li className="text-slate-400 text-sm">Santiago, Chile</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <div className="space-y-2">
                <Input 
                  placeholder="Tu email" 
                  className="bg-slate-800 border-slate-700 text-white rounded-none"
                />
                <Button className="w-full bg-primary text-slate-950 hover:bg-primary/90 rounded-none">
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border-t border-slate-800 pt-12 mb-8">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white text-center mb-6">Contáctanos</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Nombre" 
                    className="bg-slate-800 border-slate-700 text-white rounded-none"
                  />
                  <Input 
                    placeholder="Email" 
                    className="bg-slate-800 border-slate-700 text-white rounded-none"
                  />
                </div>
                <Input 
                  placeholder="Asunto" 
                  className="bg-slate-800 border-slate-700 text-white rounded-none"
                />
                <Textarea 
                  placeholder="Mensaje" 
                  rows={4}
                  className="bg-slate-800 border-slate-700 text-white rounded-none"
                />
                <Button className="w-full bg-primary text-slate-950 hover:bg-primary/90 rounded-none">
                  Enviar Mensaje
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-600 text-sm">
              © 2026 DCR Motors. Todos los derechos reservados. Powered by Tugana.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
