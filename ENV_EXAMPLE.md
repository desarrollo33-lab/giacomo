# Environment Variables for DCR Motors - Giacomo Project

# Supabase Configuration
# Get these values from your Supabase project settings:
# https://app.supabase.com/project/_/settings/api
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Supabase Service Role Key (NEVER expose this in client-side code)
# This is only for server-side operations and Edge Functions
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Application Configuration
VITE_APP_URL=http://localhost:5173
VITE_APP_NAME=DCR Motors

# Classic.com API (for price synchronization)
# Get your API key from: https://classic.com/api
# CLASSIC_COM_API_KEY=your_classic_com_api_key_here

# Payment Gateway (Stripe/Webpay)
# For future implementation
# VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
# STRIPE_SECRET_KEY=your_stripe_secret_here

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_INFLUENCER_DASHBOARD=true
