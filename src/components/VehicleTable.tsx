import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Car, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Database } from '@/lib/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

type SortField = 'brand' | 'model' | 'year' | 'current_price';
type SortOrder = 'asc' | 'desc';

interface VehicleTableProps {
  vehicles: Vehicle[];
}

/**
 * VehicleTable Component - Rediseñado
 * 
 * Tabla minimalista con menos campos y más tags de colores.
 * - Bordes gris claro #e3e6e8 (igual que tabs DCR Universe)
 * - Solo 4 campos: Marca, Modelo, Año, Precio
 * - Tags de colores para Brand y Edition Type
 * - Status badges con colores vibrantes
 * - Fondo blanco con filas alternadas
 */
const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('year');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Filter vehicles by search term
  const filteredVehicles = useMemo(() => {
    if (!searchTerm) return vehicles;
    
    const term = searchTerm.toLowerCase();
    return vehicles.filter((vehicle) => 
      vehicle.brand?.toLowerCase().includes(term) ||
      vehicle.model?.toLowerCase().includes(term) ||
      vehicle.year?.toString().includes(term) ||
      vehicle.edition_type?.toLowerCase().includes(term)
    );
  }, [vehicles, searchTerm]);

  // Sort vehicles
  const sortedVehicles = useMemo(() => {
    const sorted = [...filteredVehicles].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      if (sortOrder === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
    
    return sorted;
  }, [filteredVehicles, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'Sold':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Reserved':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'In Storage':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Prize':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getBrandTagColor = (brand: string) => {
    const colors: Record<string, string> = {
      'Porsche': 'bg-slate-800 text-white border-slate-900',
      'Ferrari': 'bg-red-600 text-white border-red-700',
      'Lamborghini': 'bg-orange-600 text-white border-orange-700',
      'McLaren': 'bg-orange-500 text-white border-orange-600',
      'Aston Martin': 'bg-emerald-700 text-white border-emerald-800',
      'Bugatti': 'bg-blue-700 text-white border-blue-800',
      'Mercedes-Benz': 'bg-slate-700 text-white border-slate-800',
      'BMW': 'bg-blue-600 text-white border-blue-700',
      'Audi': 'bg-slate-600 text-white border-slate-700',
    };
    return colors[brand] || 'bg-gray-700 text-white border-gray-800';
  };

  const formatPrice = (price: number | null) => {
    if (!price) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#798086' }} />
          <Input
            type="text"
            placeholder="Buscar por marca, modelo, año..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 h-10 rounded-none"
            style={{ 
              backgroundColor: '#ffffff',
              border: '1px solid #e3e6e8',
              color: '#181f25'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors rounded-none focus:outline-none"
              style={{ color: '#798086' }}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div 
        className="overflow-x-auto rounded-none shadow-sm"
        style={{ 
          backgroundColor: '#ffffff',
          border: '1px solid #e3e6e8'
        }}
      >
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr style={{ borderBottom: '1px solid #e3e6e8', backgroundColor: '#f8f9fa' }}>
              <th className="p-4 text-left">
                <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#798086' }}>
                  Imagen
                </span>
              </th>
              {[
                { field: 'brand' as SortField, label: 'Marca' },
                { field: 'model' as SortField, label: 'Modelo' },
                { field: 'year' as SortField, label: 'Año' },
                { field: 'current_price' as SortField, label: 'Precio' },
              ].map((col) => (
                <th key={col.field} className="p-4 text-left">
                  <button
                    onClick={() => handleSort(col.field)}
                    className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-wider transition-colors rounded-none focus:outline-none"
                    style={{ color: '#798086' }}
                    aria-label={`Sort by ${col.label}`}
                  >
                    <span style={{ color: sortField === col.field ? '#181f25' : '#798086' }}>
                      {col.label}
                    </span>
                    <ArrowUpDown
                      className="w-3 h-3 transition-colors"
                      style={{ color: sortField === col.field ? '#f7c01d' : '#798086' }}
                    />
                  </button>
                </th>
              ))}
              <th className="p-4 text-left">
                <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#798086' }}>
                  Estado
                </span>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {sortedVehicles.map((vehicle, index) => (
              <tr
                key={vehicle.id}
                className={`transition-all duration-150 ${
                  index % 2 === 0 
                    ? 'hover:bg-gray-50' 
                    : 'bg-gray-50/50 hover:bg-gray-50'
                } group`}
                style={{ borderBottom: index !== sortedVehicles.length - 1 ? '1px solid #e3e6e8' : 'none' }}
              >
                {/* Thumbnail */}
                <td className="p-4">
                  <div 
                    className="w-16 h-12 overflow-hidden flex items-center justify-center rounded-none transition-colors"
                    style={{ backgroundColor: '#f1f2f4', border: '1px solid #e3e6e8' }}
                  >
                    {vehicle.image_url ? (
                      <img
                        src={vehicle.image_url}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Car className="w-6 h-6" style={{ color: '#c0c4c8' }} />
                    )}
                  </div>
                </td>

                {/* Brand with Color Tag */}
                <td className="p-4">
                  <Badge
                    variant="outline"
                    className={`text-[9px] px-2 py-0.5 font-semibold rounded-none whitespace-nowrap ${getBrandTagColor(vehicle.brand || '')}`}
                  >
                    {vehicle.brand || '—'}
                  </Badge>
                </td>

                {/* Model with Edition Tag */}
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold" style={{ color: '#181f25' }}>
                      {vehicle.model || '—'}
                    </span>
                    {vehicle.edition_type && (
                      <Badge
                        variant="outline"
                        className="text-[8px] px-1.5 py-0 font-medium rounded-none w-fit"
                        style={{ 
                          backgroundColor: '#f7c01d',
                          color: '#181f25',
                          border: 'none'
                        }}
                      >
                        {vehicle.edition_type}
                      </Badge>
                    )}
                  </div>
                </td>

                {/* Year */}
                <td className="p-4">
                  <span className="text-xs font-mono tabular-nums" style={{ color: '#181f25' }}>
                    {vehicle.year || '—'}
                  </span>
                </td>

                {/* Price - Changed from yellow to black for WCAG AA compliance */}
                <td className="p-4">
                  <span className="text-xs font-mono font-bold tabular-nums" style={{ color: '#181f25' }}>
                    {formatPrice(vehicle.current_price)}
                  </span>
                </td>

                {/* Status Badge */}
                <td className="p-4">
                  <Badge
                    variant="outline"
                    className={`text-[9px] px-2 py-0.5 font-semibold rounded-none whitespace-nowrap border ${getStatusColor(vehicle.status || '')}`}
                  >
                    {vehicle.status || 'Unknown'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {sortedVehicles.length === 0 && (
          <div className="py-16 px-4 text-center">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-none mb-4"
              style={{ backgroundColor: '#f1f2f4', border: '1px solid #e3e6e8' }}
            >
              <Car className="w-8 h-8" style={{ color: '#c0c4c8' }} />
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: '#181f25' }}>
              {searchTerm ? 'No se encontraron vehículos' : 'No hay vehículos disponibles'}
            </p>
            <p className="text-xs" style={{ color: '#798086' }}>
              {searchTerm ? 'Prueba con otros términos de búsqueda' : 'Añade vehículos a tu inventario'}
            </p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="mt-4 flex items-center justify-between text-[10px]" style={{ color: '#798086' }}>
        <span className="font-medium">
          Mostrando <strong style={{ color: '#181f25' }}>{sortedVehicles.length}</strong> de{' '}
          <strong style={{ color: '#181f25' }}>{vehicles.length}</strong> vehículos
        </span>
        {searchTerm && (
          <>
            {/* Clear button - Changed from yellow to gray with hover */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm('')}
              className="h-auto py-1.5 px-3 rounded-none transition-colors focus-visible:ring-0"
              style={{ color: '#798086' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#181f25'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#798086'}
            >
              <X className="w-3 h-3 mr-1.5" />
              Limpiar búsqueda
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleTable;
