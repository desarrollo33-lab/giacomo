import { useState } from 'react';
import { Search, ArrowUpDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface VehicleTableProps {
  vehicles: Vehicle[];
}

const brandColors: Record<string, string> = {
  'Porsche': '#11998e',      // turquoise
  'Ferrari': '#dc2626',      // red
  'Lamborghini': '#f59e0b',  // amber
  'McLaren': '#7c3aed',      // violet
  'Aston Martin': '#0ea5e9', // sky
  'Mercedes-AMG': '#3b82f6', // blue
  'Audi RS': '#ec4899',      // pink
  'BMW M': '#8b5cf6',        // purple
  'Chevrolet': '#ef4444'     // red
};

const statusColors: Record<string, string> = {
  'Available': 'bg-green-500/20 text-green-700 border-green-500/30',
  'Sold': 'bg-red-500/20 text-red-700 border-red-500/30',
  'In Storage': 'bg-blue-500/20 text-blue-700 border-blue-500/30'
};

export function VehicleTable({ vehicles }: VehicleTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key as keyof Vehicle];
    const bValue = b[sortConfig.key as keyof Vehicle];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar por marca o modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 h-10 bg-card border-border text-foreground rounded-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-border rounded-none shadow-sm">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              {['Marca', 'Modelo', 'Año', 'Precio', 'Estado'].map((column) => (
                <th
                  key={column}
                  onClick={() => handleSort(column.toLowerCase() === 'año' ? 'year' : column.toLowerCase())}
                  className="px-4 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {column}
                    <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedVehicles.length > 0 ? (
              sortedVehicles.map((vehicle, index) => (
                <tr
                  key={vehicle.id}
                  className={`border-t border-border transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-card' : 'bg-muted/10'
                  } hover:bg-muted/20 group`}
                >
                  <td className="px-4 py-3">
                    <span
                      className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-none"
                      style={{ backgroundColor: brandColors[vehicle.brand] || '#f7c01d' }}
                    >
                      {vehicle.brand}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground font-medium">{vehicle.model}</td>
                  <td className="px-4 py-3 text-foreground tabular-nums">{vehicle.year}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#f7c01d' }}>
                    {formatPrice(vehicle.current_price)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-xs font-medium border rounded-none whitespace-nowrap ${statusColors[vehicle.status]}`}>
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  No se encontraron vehículos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edition Type Tag */}
      {sortedVehicles.length > 0 && sortedVehicles.some(v => v.edition_type !== 'Official') && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Ediciones especiales:</span>
          {Array.from(new Set(sortedVehicles.map(v => v.edition_type))).filter(type => type !== 'Official').map(type => (
            <span
              key={type}
              className="px-3 py-1 text-xs font-semibold bg-card border-2 rounded-none"
              style={{ borderColor: '#f7c01d', color: '#f7c01d' }}
            >
              {type}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
