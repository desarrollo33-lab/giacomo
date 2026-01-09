import Hero from '@/components/Hero'
import DCRUniverse from '@/components/DCRUniverse'
import { VehicleTable } from '@/components/VehicleTable'
import { Promocion } from '@/components/Promocion'
import { StickerPacks } from '@/components/StickerPacks'
import { DCRHub } from '@/components/DCRHub'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'

// Mock vehicles data for VehicleTable
const mockVehicles = [
  {
    id: '1',
    brand: 'Porsche',
    model: '911 GT3 RS',
    year: 2024,
    current_price: 350000000,
    status: 'Available' as const,
    edition_type: 'Official' as const,
    image_url: '/porsche-gt3.jpg'
  },
  {
    id: '2',
    brand: 'Ferrari',
    model: 'F8 Tributo',
    year: 2023,
    current_price: 420000000,
    status: 'Available' as const,
    edition_type: 'Special' as const,
    image_url: '/ferrari-f8.jpg'
  },
  {
    id: '3',
    brand: 'Lamborghini',
    model: 'Huracán Evo',
    year: 2024,
    current_price: 380000000,
    status: 'Sold' as const,
    edition_type: 'Official' as const,
    image_url: '/lambo-huracan.jpg'
  },
  {
    id: '4',
    brand: 'McLaren',
    model: '720S',
    year: 2023,
    current_price: 295000000,
    status: 'In Storage' as const,
    edition_type: 'Limited' as const,
    image_url: '/mclaren-720s.jpg'
  }
];

export function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. GLOBAL HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-tight" style={{ color: '#f7c01d' }}>
              DCR MOTORS
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#collection" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" style={{ color: '#798086' }}>
                Collection
              </a>
              <a href="#sales" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" style={{ color: '#798086' }}>
                Sales
              </a>
              <a href="#storage" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" style={{ color: '#798086' }}>
                Storage
              </a>
            </nav>

            {/* CTA Button */}
            <Button className="rounded-none font-semibold" style={{ backgroundColor: '#f7c01d', color: '#181f25' }}>
              Mis Stickers
            </Button>
          </div>
        </div>
      </header>

      {/* Spacing for fixed header */}
      <div className="h-20" />

      {/* 2. HERO SECTION - Improved with YouTube Video Background */}
      <Hero />

      {/* 3. DCR UNIVERSE SECTION - Premium Tabbed Component */}
      <DCRUniverse vehicles={mockVehicles} />

      {/* 4. PROMOCION SECTION */}
      <Promocion />

      {/* 5. STICKER PACKS SECTION */}
      <StickerPacks />

      {/* 6. DCR HUB SECTION */}
      <DCRHub />

      {/* 7. GLOBAL FOOTER */}
      <Footer />
    </div>
  )
}
