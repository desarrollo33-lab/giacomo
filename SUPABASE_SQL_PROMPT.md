## 🗄️ SQL COMPLETO

```sql
-- ============================================================================
-- GIACOMO PROJECT - DCR MOTORS
-- Supabase Database Schema
-- Fecha: 8 de Enero 2026
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. CREATE TABLES
-- ----------------------------------------------------------------------------

-- Table: users (Extended from Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  phone_number TEXT,
  email_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: roles
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: user_roles (Many-to-Many: users ↔ roles)
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, role_id)
);

-- Table: vehicles
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  edition_type TEXT,
  horsepower INTEGER,
  torque INTEGER,
  weight_kg INTEGER,
  mileage_kms INTEGER,
  purchase_price NUMERIC(12, 2),
  current_price NUMERIC(12, 2),
  profitability_percentage NUMERIC(5, 2),
  parallel_car_model TEXT,
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Sold', 'In Storage', 'Prize', 'Reserved')),
  highlights TEXT,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: raffles
CREATE TABLE IF NOT EXISTS raffles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  prize_vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Active', 'Drawing', 'Completed', 'Cancelled')),
  winner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: sticker_tiers
CREATE TABLE IF NOT EXISTS sticker_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  price NUMERIC(10, 2) NOT NULL,
  number_of_entries INTEGER DEFAULT 1,
  description TEXT
);

-- Table: user_stickers
CREATE TABLE IF NOT EXISTS user_stickers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  raffle_id UUID NOT NULL REFERENCES raffles(id) ON DELETE CASCADE,
  sticker_tier_id UUID NOT NULL REFERENCES sticker_tiers(id) ON DELETE CASCADE,
  promo_code_id UUID REFERENCES promo_codes(id) ON DELETE SET NULL,
  purchase_date TIMESTAMPTZ DEFAULT NOW(),
  transaction_id TEXT
);

-- Table: influencers
CREATE TABLE IF NOT EXISTS influencers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  contact_info TEXT,
  commission_rate NUMERIC(5, 4), -- e.g., 0.0500 for 5%
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: promo_codes
CREATE TABLE IF NOT EXISTS promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  influencer_id UUID NOT NULL REFERENCES influencers(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: client_storage_units
CREATE TABLE IF NOT EXISTS client_storage_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  storage_contract_id TEXT UNIQUE,
  start_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Active', 'Pending', 'Completed')),
  access_instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE raffles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sticker_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stickers ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_storage_units ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Anyone can view roles
CREATE POLICY "Roles are viewable by everyone"
ON roles FOR SELECT
USING (true);

-- Anyone can view user_roles
CREATE POLICY "User roles are viewable by everyone"
ON user_roles FOR SELECT
USING (true);

-- Anyone can view vehicles
CREATE POLICY "Vehicles are viewable by everyone"
ON vehicles FOR SELECT
USING (true);

-- Anyone can view raffles
CREATE POLICY "Raffles are viewable by everyone"
ON raffles FOR SELECT
USING (true);

-- Anyone can view sticker tiers
CREATE POLICY "Sticker tiers are viewable by everyone"
ON sticker_tiers FOR SELECT
USING (true);

-- Users can view their own stickers
CREATE POLICY "Users can view own stickers"
ON user_stickers FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own stickers
CREATE POLICY "Users can insert own stickers"
ON user_stickers FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Anyone can view influencers
CREATE POLICY "Influencers are viewable by everyone"
ON influencers FOR SELECT
USING (true);

-- Anyone can view active promo codes
CREATE POLICY "Active promo codes are viewable by everyone"
ON promo_codes FOR SELECT
USING (is_active = true);

-- Users can view their own storage units
CREATE POLICY "Users can view own storage units"
ON client_storage_units FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own storage units
CREATE POLICY "Users can insert own storage units"
ON client_storage_units FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 3. TRIGGERS FOR UPDATED_AT
-- ----------------------------------------------------------------------------

-- Create trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at column
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_raffles_updated_at
    BEFORE UPDATE ON raffles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_influencers_updated_at
    BEFORE UPDATE ON influencers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 4. INDEXES FOR OPTIMIZATION
-- ----------------------------------------------------------------------------

-- Users indexes
CREATE INDEX idx_users_email ON users(email);

-- Vehicles indexes
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_brand ON vehicles(brand);
CREATE INDEX idx_vehicles_slug ON vehicles(slug);

-- Raffles indexes
CREATE INDEX idx_raffles_status ON raffles(status);
CREATE INDEX idx_raffles_end_date ON raffles(end_date);
CREATE INDEX idx_raffles_prize_vehicle ON raffles(prize_vehicle_id);

-- User stickers indexes
CREATE INDEX idx_user_stickers_user_id ON user_stickers(user_id);
CREATE INDEX idx_user_stickers_raffle_id ON user_stickers(raffle_id);

-- Influencers indexes
CREATE INDEX idx_influencers_email ON influencers(email);

-- Promo codes indexes
CREATE INDEX idx_promo_codes_code ON promo_codes(code);
CREATE INDEX idx_promo_codes_is_active ON promo_codes(is_active);

-- Client storage units indexes
CREATE INDEX idx_client_storage_units_user_id ON client_storage_units(user_id);
CREATE INDEX idx_client_storage_units_status ON client_storage_units(status);

-- ----------------------------------------------------------------------------
-- 5. SEED DATA (Datos Iniciales)
-- ----------------------------------------------------------------------------

-- Insert initial roles
INSERT INTO roles (name) VALUES
('admin'),
('user'),
('influencer')
ON CONFLICT (name) DO NOTHING;

-- Insert sticker tiers
INSERT INTO sticker_tiers (name, price, number_of_entries, description) VALUES
('Starter', 50.00, 5, '5 entries para empezar'),
('Pro', 120.00, 15, '15 entries - Mejor valor'),
('Elite', 350.00, 50, '50 entries - Máximas chances')
ON CONFLICT (name) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 6. HELPER FUNCTIONS
-- ----------------------------------------------------------------------------

-- Function to get user roles
CREATE OR REPLACE FUNCTION get_user_roles(user_uuid UUID)
RETURNS TABLE(role_name TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT r.name
    FROM roles r
    JOIN user_roles ur ON r.id = ur.role_id
    WHERE ur.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ----------------------------------------------------------------------------
-- 7. VERIFICATION QUERIES
-- ----------------------------------------------------------------------------

-- Verify all tables were created
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
    AND table_name IN (
        'users', 'roles', 'user_roles',
        'vehicles', 'raffles', 'sticker_tiers',
        'user_stickers', 'influencers', 'promo_codes',
        'client_storage_units'
    )
ORDER BY table_name;

-- Verify seed data
SELECT 'Roles' as table_name, COUNT(*) as row_count FROM roles
UNION ALL
SELECT 'Sticker Tiers', COUNT(*) FROM sticker_tiers;
```

---

## ✅ VERIFICACIÓN

Después de ejecutar el SQL, verifica en **Table Editor**:

### Tablas Creadas (10)
1. ✅ users
2. ✅ roles
3. ✅ user_roles
4. ✅ vehicles
5. ✅ raffles
6. ✅ sticker_tiers
7. ✅ user_stickers
8. ✅ influencers
9. ✅ promo_codes
10. ✅ client_storage_units

### Datos Semilla
- ✅ roles: 3 filas (admin, user, influencer)
- ✅ sticker_tiers: 3 filas (Starter, Pro, Elite)

### RLS Policies
- ✅ Activadas en todas las tablas
- ✅ Configuradas para seguridad multi-tenant

### Triggers
- ✅ updated_at automático en users, vehicles, raffles, influencers

### Índices
- ✅ 16 índices creados para optimización

---

