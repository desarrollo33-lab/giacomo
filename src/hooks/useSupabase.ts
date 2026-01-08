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
      
      // Supabase devuelve roles como un array, tomamos el primer elemento
      return data?.map(d => {
        const rolesArray = d.roles as unknown;
        if (
          Array.isArray(rolesArray) && 
          rolesArray.length > 0 && 
          typeof rolesArray[0] === 'object' && 
          rolesArray[0] !== null &&
          'name' in rolesArray[0] &&
          typeof rolesArray[0].name === 'string'
        ) {
          return rolesArray[0].name;
        }
        return null;
      }).filter((name): name is string => name !== null) || [];
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

export function useVehicle(id: string | undefined) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      if (!id) throw new Error('Vehicle ID is required');
      
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Vehicle;
    },
    enabled: !!id,
  });
}

export function useAvailableVehicles() {
  return useQuery({
    queryKey: ['available-vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'Available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Vehicle[];
    },
  });
}

export function useRaffles() {
  return useQuery({
    queryKey: ['raffles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('raffles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Raffle[];
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

export function useRaffle(id: string | undefined) {
  return useQuery({
    queryKey: ['raffle', id],
    queryFn: async () => {
      if (!id) throw new Error('Raffle ID is required');
      
      const { data, error } = await supabase
        .from('raffles')
        .select(`
          *,
          prize_vehicle:vehicles!raffles_prize_vehicle_id_fkey (*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Raffle & { prize_vehicle?: Vehicle };
    },
    enabled: !!id,
  });
}

export function useStickerTiers() {
  return useQuery({
    queryKey: ['sticker-tiers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sticker_tiers')
        .select('*')
        .order('price_usd', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}

export function useUserStickers() {
  return useQuery({
    queryKey: ['user-stickers'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_stickers')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
  });
}

export function useInfluencers() {
  return useQuery({
    queryKey: ['influencers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('influencers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useInfluencerStats(influencerId: string | undefined) {
  return useQuery({
    queryKey: ['influencer-stats', influencerId],
    queryFn: async () => {
      if (!influencerId) throw new Error('Influencer ID is required');

      // Calcular stats basados en user_stickers referidos
      const { data, error } = await supabase
        .from('user_stickers')
        .select('quantity')
        .eq('referred_by', influencerId);

      if (error) throw error;
      
      const totalStickers = data?.reduce((sum, s) => sum + (s.quantity || 0), 0) || 0;
      
      return {
        influencer_id: influencerId,
        total_referrals: data?.length || 0,
        total_stickers_sold: totalStickers,
      };
    },
    enabled: !!influencerId,
  });
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    },
  });
}

export function useHasRole(requiredRole: string) {
  const { data: roles, isLoading } = useUserRoles();
  
  return {
    hasRole: roles?.includes(requiredRole) ?? false,
    isLoading,
  };
}
