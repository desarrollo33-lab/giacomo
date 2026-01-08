/**
 * Supabase Client Configuration
 * DCR Motors - Giacomo Project
 * 
 * This file initializes the Supabase client with environment variables.
 * Ensure you have these in your .env file:
 * - VITE_SUPABASE_URL
 * - VITE_SUPABASE_ANON_KEY
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing env.VITE_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing env.VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Recommended for web apps
  },
});

/**
 * Database types based on the schema
 * These types should be updated when the schema changes
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string;
          slug: string;
          brand: string;
          model: string;
          year: number | null;
          edition_type: string | null;
          horsepower: number | null;
          torque: number | null;
          weight_kg: number | null;
          mileage_kms: number | null;
          purchase_price: number | null;
          current_price: number | null;
          profitability_percentage: number | null;
          parallel_car_model: string | null;
          status: 'Available' | 'Sold' | 'In Storage' | 'Prize' | 'Reserved';
          highlights: string | null;
          image_url: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        }
        Insert: {
          id?: string;
          slug: string;
          brand: string;
          model: string;
          year?: number | null;
          edition_type?: string | null;
          horsepower?: number | null;
          torque?: number | null;
          weight_kg?: number | null;
          mileage_kms?: number | null;
          purchase_price?: number | null;
          current_price?: number | null;
          profitability_percentage?: number | null;
          parallel_car_model?: string | null;
          status?: 'Available' | 'Sold' | 'In Storage' | 'Prize' | 'Reserved';
          highlights?: string | null;
          image_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        }
        Update: {
          id?: string;
          slug?: string;
          brand?: string;
          model?: string;
          year?: number | null;
          edition_type?: string | null;
          horsepower?: number | null;
          torque?: number | null;
          weight_kg?: number | null;
          mileage_kms?: number | null;
          purchase_price?: number | null;
          current_price?: number | null;
          profitability_percentage?: number | null;
          parallel_car_model?: string | null;
          status?: 'Available' | 'Sold' | 'In Storage' | 'Prize' | 'Reserved';
          highlights?: string | null;
          image_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      }
      raffles: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          prize_vehicle_id: string | null;
          start_date: string;
          end_date: string;
          status: 'Upcoming' | 'Active' | 'Drawing' | 'Completed' | 'Cancelled';
          winner_user_id: string | null;
          created_at: string;
          updated_at: string;
        }
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          prize_vehicle_id?: string | null;
          start_date: string;
          end_date: string;
          status?: 'Upcoming' | 'Active' | 'Drawing' | 'Completed' | 'Cancelled';
          winner_user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        }
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          prize_vehicle_id?: string | null;
          start_date?: string;
          end_date?: string;
          status?: 'Upcoming' | 'Active' | 'Drawing' | 'Completed' | 'Cancelled';
          winner_user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      }
      sticker_tiers: {
        Row: {
          id: string;
          name: string;
          price: number;
          number_of_entries: number;
          description: string | null;
        }
        Insert: {
          id?: string;
          name: string;
          price: number;
          number_of_entries?: number;
          description?: string | null;
        }
        Update: {
          id?: string;
          name?: string;
          price?: number;
          number_of_entries?: number;
          description?: string | null;
        }
      }
      user_stickers: {
        Row: {
          id: string;
          user_id: string;
          raffle_id: string;
          sticker_tier_id: string;
          promo_code_id: string | null;
          purchase_date: string;
          transaction_id: string | null;
        }
        Insert: {
          id?: string;
          user_id: string;
          raffle_id: string;
          sticker_tier_id: string;
          promo_code_id?: string | null;
          purchase_date?: string;
          transaction_id?: string | null;
        }
        Update: {
          id?: string;
          user_id?: string;
          raffle_id?: string;
          sticker_tier_id?: string;
          promo_code_id?: string | null;
          purchase_date?: string;
          transaction_id?: string | null;
        }
      }
      influencers: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          contact_info: string | null;
          commission_rate: number | null;
        }
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          contact_info?: string | null;
          commission_rate?: number | null;
        }
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          contact_info?: string | null;
          commission_rate?: number | null;
        }
      }
      promo_codes: {
        Row: {
          id: string;
          code: string;
          influencer_id: string;
          is_active: boolean;
          created_at: string;
        }
        Insert: {
          id?: string;
          code: string;
          influencer_id: string;
          is_active?: boolean;
          created_at?: string;
        }
        Update: {
          id?: string;
          code?: string;
          influencer_id?: string;
          is_active?: boolean;
          created_at?: string;
        }
      }
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          full_name: string | null;
          phone_number: string | null;
          email_verified_at: string | null;
          created_at: string;
          updated_at: string;
        }
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          full_name?: string | null;
          phone_number?: string | null;
          email_verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        }
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          full_name?: string | null;
          phone_number?: string | null;
          email_verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      }
      roles: {
        Row: {
          id: string;
          name: string;
        }
        Insert: {
          id?: string;
          name: string;
        }
        Update: {
          id?: string;
          name?: string;
        }
      }
      user_roles: {
        Row: {
          user_id: string;
          role_id: string;
        }
        Insert: {
          user_id: string;
          role_id: string;
        }
        Update: {
          user_id?: string;
          role_id?: string;
        }
      }
      client_storage_units: {
        Row: {
          id: string;
          user_id: string;
          vehicle_id: string;
          storage_contract_id: string | null;
          start_date: string | null;
          status: 'Active' | 'Pending' | 'Completed';
          access_instructions: string | null;
          created_at: string;
        }
        Insert: {
          id?: string;
          user_id: string;
          vehicle_id: string;
          storage_contract_id?: string | null;
          start_date?: string | null;
          status?: 'Active' | 'Pending' | 'Completed';
          access_instructions?: string | null;
          created_at?: string;
        }
        Update: {
          id?: string;
          user_id?: string;
          vehicle_id?: string;
          storage_contract_id?: string | null;
          start_date?: string | null;
          status?: 'Active' | 'Pending' | 'Completed';
          access_instructions?: string | null;
          created_at?: string;
        }
      }
    }
  }
}
