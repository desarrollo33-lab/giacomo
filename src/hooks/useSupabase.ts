import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];
type Raffle = Database['public']['Tables']['raffles']['Row'];

export function useUserRoles() {
  return useQuery({
    queryKey: ['user-roles'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_roles')
        .select('role_id, roles(name)')
        .eq('user_id', user.id);

      if (error) throw error;
      return data?.map(d => (d.roles as { name: string } | null)?.name).filter(Boolean) as string[] || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Vehicle[];
    },
  });
}

export function useActiveRaffles() {
  return useQuery({
    queryKey: ['active-raffles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('raffles')
        .select(`
          *,
          prize_vehicle:vehicles!raffles_prize_vehicle_id_fkey (
            brand,
            model
          )
        `)
        .in('status', ['Active', 'Upcoming'])
        .order('end_date', { ascending: true });

      if (error) throw error;
      return data as (Raffle & { prize_vehicle?: { brand: string; model: string } })[];
    },
  });
}