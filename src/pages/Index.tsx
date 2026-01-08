/**
 * Index Page (Home)
 * DCR Motors - Giacomo Project
 * 
 * Main landing page showcasing the DCR Motors brand
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVehicles, useActiveRaffles } from "@/hooks";

export default function Index() {
  const { data: vehicles, isLoading: isLoadingVehicles } = useVehicles();
  const { data: raffles, isLoading: isLoadingRaffles } = useActiveRaffles();

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary" />
            <h1 className="text-xl font-bold tracking-tight">DCR MOTORS</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <a href="#collection">Collection</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#raffles">Raffles</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#storage">Storage</a>
            </Button>
            <Button>Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold tracking-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
            Luxury in Motion.
            <br />
            <span className="text-primary">Precision in Every Detail.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover exclusive motorcycles and automobiles. Participate in our innovative sticker raffles.
            Experience the future of luxury vehicle collecting.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="rounded-none">
              Explore Collection
            </Button>
            <Button size="lg" variant="outline" className="rounded-none">
              View Raffles
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section id="collection" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold tracking-tight mb-8">Featured Vehicles</h3>
          
          {isLoadingVehicles ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading vehicles...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles?.slice(0, 6).map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    {vehicle.image_url ? (
                      <img 
                        src={vehicle.image_url} 
                        alt={vehicle.model}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground">No Image</span>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="tracking-tight">
                      {vehicle.brand} {vehicle.model}
                    </CardTitle>
                    <CardDescription>
                      {vehicle.year} • {vehicle.edition_type || 'Standard Edition'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">HP:</span>
                        <span className="font-medium">{vehicle.horsepower || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">
                          {vehicle.current_price 
                            ? new Intl.NumberFormat('es-CL', { 
                                style: 'currency', 
                                currency: 'CLP' 
                              }).format(vehicle.current_price)
                            : 'Contact us'}
                        </span>
                      </div>
                      {vehicle.profitability_percentage !== null && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ROI:</span>
                          <span className={`font-medium ${vehicle.profitability_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {vehicle.profitability_percentage.toFixed(2)}%
                          </span>
                        </div>
                      )}
                    </div>
                    <Button className="w-full mt-4 rounded-none" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Active Raffles */}
      <section id="raffles" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold tracking-tight mb-8">Active Raffles</h3>
          
          {isLoadingRaffles ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading raffles...
            </div>
          ) : raffles && raffles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {raffles.map((raffle) => (
                <Card key={raffle.id} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="tracking-tight">{raffle.title}</CardTitle>
                    <CardDescription>{raffle.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-none ${
                          raffle.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {raffle.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">End Date</span>
                        <span className="text-sm font-medium">
                          {new Date(raffle.end_date).toLocaleDateString()}
                        </span>
                      </div>
                      {raffle.prize_vehicle && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-2">Prize:</p>
                          <p className="font-medium">{raffle.prize_vehicle.brand} {raffle.prize_vehicle.model}</p>
                        </div>
                      )}
                      <Button className="w-full rounded-none">
                        Participate Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No active raffles at the moment. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 DCR Motors. All rights reserved.</p>
          <p className="mt-2">Luxury in Motion. Precision in Every Detail.</p>
        </div>
      </footer>
    </div>
  );
}
