import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface UseVehiclesProps {
  status?: Vehicle['status'];
  enabled?: boolean;
}

export function useVehicles({ status = 'Available', enabled = true }: UseVehiclesProps = {}) {
  return useQuery({
    queryKey: ['vehicles', status],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Vehicle[];
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
