# SUPABASE SQL SETUP - DCR Motors Giacomo Project
# Ejecutar este SQL completo en el SQL Editor de Supabase

-- ============================================
-- CLEANUP (Remove existing tables if any)
-- ============================================

DROP TABLE IF EXISTS client_storage_units CASCADE;
DROP TABLE IF EXISTS user_stickers CASCADE;
DROP TABLE IF EXISTS promo_codes CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS influencers CASCADE;
DROP TABLE IF EXISTS raffles CASCADE;
DROP TABLE IF EXISTS sticker_tiers CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- EXTENSIONS
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to auto-set created_at and updated_at
CREATE OR REPLACE FUNCTION set_created_at_and_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = NOW();
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- TABLE: roles
-- ============================================

CREATE TABLE roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER roles_set_timestamps
    BEFORE INSERT ON roles
    FOR EACH ROW
    EXECUTE FUNCTION set_created_at_and_updated_at();

CREATE TRIGGER roles_update_timestamp
    BEFORE UPDATE ON roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS for roles
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "roles_read_policy" ON roles 
FOR SELECT TO authenticated USING (true);

CREATE POLICY "roles_insert_policy" ON roles 
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "roles_update_policy" ON roles 
FOR UPDATE TO authenticated WITH CHECK (true);

CREATE POLICY "roles_delete_policy" ON roles 
FOR DELETE TO authenticated USING (true);

-- ============================================
-- TABLE: users
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    phone_number TEXT,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT users_email_unique UNIQUE(email)
);

CREATE TRIGGER users_set_timestamps
    BEFORE INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_created_at_and_updated_at();

CREATE TRIGGER users_update_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_users_email ON users(email);

-- RLS for users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_policy" ON users 
FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "users_insert_policy" ON users 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_policy" ON users 
FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "users_delete_policy" ON users 
FOR DELETE TO authenticated USING (auth.uid() = id);

-- ============================================
-- TABLE: user_roles
-- ============================================

CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, role_id)
);

-- Indexes
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);

-- RLS for user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_roles_select_policy" ON user_roles 
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "user_roles_insert_policy" ON user_roles 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_roles_delete_policy" ON user_roles 
FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============================================
-- TABLE: influencers
-- ============================================

CREATE TABLE influencers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    contact_info TEXT,
    commission_rate NUMERIC(5, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER influencers_set_timestamps
    BEFORE INSERT ON influencers
    FOR EACH ROW
    EXECUTE FUNCTION set_created_at_and_updated_at();

CREATE TRIGGER influencers_update_timestamp
    BEFORE UPDATE ON influencers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_influencers_email ON influencers(email);

-- RLS for influencers
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "influencers_read_policy" ON influencers 
FOR SELECT TO authenticated USING (true);

CREATE POLICY "influencers_insert_policy" ON influencers 
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "influencers_update_policy" ON influencers 
FOR UPDATE TO authenticated WITH CHECK (true);

CREATE POLICY "influencers_delete_policy" ON influencers 
FOR DELETE TO authenticated USING (true);

-- ============================================
-- TABLE: sticker_tiers
-- ============================================

CREATE TABLE sticker_tiers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    number_of_entries INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER sticker_tiers_set_timestamps
    BEFORE INSERT ON sticker_tiers
    FOR EACH ROW
    EXECUTE FUNCTION set_created_at_and_updated_at();

CREATE TRIGGER sticker_tiers_update_timestamp
    BEFORE UPDATE ON sticker_tiers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS for sticker_tiers
ALTER TABLE sticker_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sticker_tiers_read_policy" ON sticker_tiers 
FOR SELECT TO authenticated USING (true);

CREATE POLICY "sticker_tiers_insert_policy" ON sticker_tiers 
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "sticker_tiers_update_policy" ON sticker_tiers 
FOR UPDATE TO authenticated WITH CHECK (true);

CREATE POLICY "sticker_tiers_delete_policy" ON sticker_tiers 
FOR DELETE TO authenticated USING (true);

-- ============================================
-- TABLE: vehicles
-- ============================================

CREATE TABLE vehicles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
    status TEXT CHECK (status IN ('Available', 'Sold', 'In Storage', 'Prize', 'Reserved')) NOT NULL DEFAULT 'Available',
    highlights TEXT,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER vehicles_set_timestamps
    BEFORE INSERT ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION set_created_at_and_updated_at();

CREATE TRIGGER vehicles_update_timestamp
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_vehicles_brand ON vehicles(brand);
CREATE INDEX idx_vehicles_model ON vehicles(model);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_slug ON vehicles(slug);

-- RLS for vehicles
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vehicles_public_read_policy" ON vehicles 
FOR SELECT USING (true);

CREATE POLICY "vehicles_insert_policy" ON vehicles 
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "vehicles_update_policy" ON vehicles 
FOR UPDATE TO authenticated USING (true);

CREATE POLICY "vehicles_delete_policy" ON vehicles 
FOR DELETE TO authenticated USING (true);

-- ============================================
-- TABLE: raffles
-- ============================================

CREATE TABLE raffles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    prize_vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT CHECK (status IN ('Upcoming', 'Active', 'Drawing', 'Completed', 'Cancelled')) NOT NULL DEFAULT 'Upcoming',
    winner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER raffles_set_timestamps
    BEFORE INSERT ON raffles
    FOR EACH ROW
    EXECUTE FUNCTION set_created_at_and_updated_at();

CREATE TRIGGER raffles_update_timestamp
    BEFORE UPDATE ON raffles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_raffles_status ON raffles(status);
CREATE INDEX idx_raffles_dates ON raffles(start_date, end_date);
CREATE INDEX idx_raffles_prize_vehicle_id ON raffles(prize_vehicle_id);

-- RLS for raffles
ALTER TABLE raffles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "raffles_public_read_policy" ON raffles 
FOR SELECT USING (true);

CREATE POLICY "raffles_insert_policy" ON raffles 
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "raffles_update_policy" ON raffles 
FOR UPDATE TO authenticated WITH CHECK (true);

CREATE POLICY "raffles_delete_policy" ON raffles 
FOR DELETE TO authenticated USING (true);

-- ============================================
-- TABLE: promo_codes
-- ============================================

CREATE TABLE promo_codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    influencer_id UUID REFERENCES influencers(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER promo_codes_set_timestamps
    BEFORE INSERT ON promo_codes
    FOR EACH ROW
    EXECUTE FUNCTION set_created_at_and_updated_at();

CREATE TRIGGER promo_codes_update_timestamp
    BEFORE UPDATE ON promo_codes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_promo_codes_code ON promo_codes(code);
CREATE INDEX idx_promo_codes_influencer_id ON promo_codes(influencer_id);
CREATE INDEX idx_promo_codes_is_active ON promo_codes(is_active);

-- RLS for promo_codes
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "promo_codes_read_policy" ON promo_codes 
FOR SELECT TO authenticated USING (true);

CREATE POLICY "promo_codes_insert_policy" ON promo_codes 
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "promo_codes_update_policy" ON promo_codes 
FOR UPDATE TO authenticated WITH CHECK (true);

CREATE POLICY "promo_codes_delete_policy" ON promo_codes 
FOR DELETE TO authenticated USING (true);

-- ============================================
-- TABLE: user_stickers
-- ============================================

CREATE TABLE user_stickers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    raffle_id UUID NOT NULL REFERENCES raffles(id) ON DELETE CASCADE,
    sticker_tier_id UUID NOT NULL REFERENCES sticker_tiers(id) ON DELETE CASCADE,
    promo_code_id UUID REFERENCES promo_codes(id) ON DELETE SET NULL,
    purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    transaction_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER user_stickers_set_timestamps
    BEFORE INSERT ON user_stickers
    FOR EACH ROW
    EXECUTE FUNCTION set_created_at_and_updated_at();

CREATE TRIGGER user_stickers_update_timestamp
    BEFORE UPDATE ON user_stickers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_user_stickers_user_id ON user_stickers(user_id);
CREATE INDEX idx_user_stickers_raffle_id ON user_stickers(raffle_id);
CREATE INDEX idx_user_stickers_sticker_tier_id ON user_stickers(sticker_tier_id);
CREATE INDEX idx_user_stickers_promo_code_id ON user_stickers(promo_code_id);

-- RLS for user_stickers
ALTER TABLE user_stickers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_stickers_select_policy" ON user_stickers 
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "user_stickers_insert_policy" ON user_stickers 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_stickers_delete_policy" ON user_stickers 
FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============================================
-- TABLE: client_storage_units
-- ============================================

CREATE TABLE client_storage_units (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    storage_contract_id TEXT,
    start_date TIMESTAMP WITH TIME ZONE,
    status TEXT CHECK (status IN ('Active', 'Pending', 'Completed')) DEFAULT 'Pending',
    access_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER client_storage_units_set_timestamps
    BEFORE INSERT ON client_storage_units
    FOR EACH ROW
    EXECUTE FUNCTION set_created_at_and_updated_at();

CREATE TRIGGER client_storage_units_update_timestamp
    BEFORE UPDATE ON client_storage_units
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_client_storage_units_user_id ON client_storage_units(user_id);
CREATE INDEX idx_client_storage_units_vehicle_id ON client_storage_units(vehicle_id);
CREATE INDEX idx_client_storage_units_status ON client_storage_units(status);

-- RLS for client_storage_units
ALTER TABLE client_storage_units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client_storage_units_select_policy" ON client_storage_units 
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "client_storage_units_insert_policy" ON client_storage_units 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "client_storage_units_update_policy" ON client_storage_units 
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "client_storage_units_delete_policy" ON client_storage_units 
FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============================================
-- SEED DATA
-- ============================================

-- Seed roles
INSERT INTO roles (name) VALUES 
    ('admin'),
    ('registered_user'),
    ('client');

-- Seed sticker tiers
INSERT INTO sticker_tiers (name, price, number_of_entries, description) VALUES 
    ('Pack Starter', 50.00, 5, 'Ideal para comenzar a participar en sorteos'),
    ('Pack Pro', 120.00, 15, 'Más stickers, más chances de ganar'),
    ('Pack Elite', 350.00, 50, 'Máxima probabilidad de ganar con beneficios VIP');

-- Seed influencers
INSERT INTO influencers (name, email, contact_info, commission_rate) VALUES 
    ('Auto Crítico', 'autocritic@example.com', '@autocritic', 10.00),
    ('DCR Motors', 'dcrmotors@example.com', '@dcrmotors', 0.00),
    ('Tugana', 'tugana@example.com', '@tugana', 5.00);

-- Seed promo codes
INSERT INTO promo_codes (code, influencer_id, is_active) VALUES 
    ('AUTOCRITIC10', (SELECT id FROM influencers WHERE name = 'Auto Crítico'), true),
    ('DCRSTART', (SELECT id FROM influencers WHERE name = 'DCR Motors'), true),
    ('TUGANA5', (SELECT id FROM influencers WHERE name = 'Tugana'), true);

-- ============================================
-- HELPER VIEWS
-- ============================================

-- View for active raffles with vehicle details
CREATE VIEW active_raffles_view AS
SELECT 
    r.id,
    r.title,
    r.description,
    r.start_date,
    r.end_date,
    r.status,
    v.brand,
    v.model,
    v.year,
    v.image_url,
    v.current_price as prize_value,
    COUNT(us.id) as tickets_sold,
    (SELECT number_of_entries FROM sticker_tiers WHERE id = us.sticker_tier_id LIMIT 1) as entries_per_tier
FROM raffles r
LEFT JOIN vehicles v ON r.prize_vehicle_id = v.id
LEFT JOIN user_stickers us ON r.id = us.raffle_id
WHERE r.status IN ('Active', 'Upcoming')
GROUP BY r.id, v.brand, v.model, v.year, v.image_url, v.current_price;

-- ============================================
-- COMPLETION
-- ============================================

-- Verify tables were created
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.table_constraints tc 
     WHERE tc.table_name = t.table_name AND constraint_type = 'FOREIGN KEY') as fk_count,
    (SELECT COUNT(*) FROM pg_policies pp 
     WHERE pp.tablename = t.table_name) as rls_policies_count
FROM information_schema.tables t
WHERE table_schema = 'public'
ORDER BY table_name;

-- Message
SELECT '✅ Database setup completed successfully!' as status;
SELECT 'Tables created: 10' as info;
SELECT 'RLS policies enabled: All tables' as info;
SELECT 'Seed data inserted: roles, sticker_tiers, influencers, promo_codes' as info;