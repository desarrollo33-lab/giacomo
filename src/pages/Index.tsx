import { useEffect, useState } from 'react';
import supabase from '@/integrations/supabase/client';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  edition_type: string;
  horsepower: number;
  purchase_price: number;
  current_price: number;
  profitability_percentage: number;
  status: string;
  image_url: string;
  highlights: string;
  description: string;
}

const Index = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching vehicles:', error);
      } else {
        setVehicles(data || []);
      }
      setLoading(false);
    };

    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">DCR Motors</h1>
          <p className="text-xl text-slate-300">Activos de inversión exclusivos & Sorteos premium</p>
        </div>

        {loading ? (
          <div className="text-center text-white text-xl">Cargando inventario...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 hover:border-amber-500 transition-all duration-300">
                {vehicle.image_url ? (
                  <img
                    src={vehicle.image_url}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <span className="text-slate-500 text-sm">Sin imagen</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">{vehicle.brand}</span>
                      <h2 className="text-2xl font-bold text-white">{vehicle.model}</h2>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      vehicle.status === 'Available' ? 'bg-green-500/20 text-green-400' :
                      vehicle.status === 'Sold' ? 'bg-red-500/20 text-red-400' :
                      'bg-slate-600 text-slate-300'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-slate-400 mb-4">
                    <p>{vehicle.year} • {vehicle.edition_type}</p>
                    <p className="mt-1">{vehicle.horsepower} HP • {vehicle.torque} Nm</p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400 text-sm">Precio Mercado</span>
                      <span className="text-white font-bold text-lg">
                        ${(vehicle.current_price / 1000000).toFixed(2)}M CLP
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Rentabilidad</span>
                      <span className={`font-semibold ${
                        vehicle.profitability_percentage >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {vehicle.profitability_percentage >= 0 ? '+' : ''}{vehicle.profitability_percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">{vehicle.description}</p>
                  
                  {vehicle.highlights && (
                    <p className="text-amber-500 text-xs italic mb-4">✨ {vehicle.highlights}</p>
                  )}

                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {vehicles.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-xl">No hay vehículos disponibles en este momento</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;