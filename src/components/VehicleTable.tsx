import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
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
  profitability_percentage?: number;
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

export function VehicleTable({ vehicles }: VehicleTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const sortedVehicles = [...vehicles].sort((a, b) => {
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

  const formatROI = (roi?: number) => {
    if (roi === undefined || roi === null) return '-';
    return `${roi > 0 ? '+' : ''}${roi}%`;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto border border-border rounded-none shadow-sm">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              {['Marca', 'Modelo', 'Año', 'ROI'].map((column) => (
                <th
                  key={column}
                  onClick={() => {
                    if (column === 'ROI') {
                      handleSort('profitability_percentage');
                    } else if (column === 'Año') {
                      handleSort('year');
                    } else {
                      handleSort(column.toLowerCase());
                    }
                  }}
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
                  <td className="px-4 py-3 font-semibold">
                    <span
                      className={vehicle.profitability_percentage && vehicle.profitability_percentage > 0 
                        ? 'text-green-600' 
                        : vehicle.profitability_percentage && vehicle.profitability_percentage < 0
                        ? 'text-red-600'
                        : 'text-muted-foreground'
                      }
                    >
                      {formatROI(vehicle.profitability_percentage)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                  No se encontraron vehículos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}