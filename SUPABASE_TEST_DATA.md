# SUPABASE TEST DATA - Giacomo Project (DCR Motors)

**Fecha:** 8 de Enero 2026
**Propósito:** Insertar datos de prueba para verificar la integración

---

## 📋 INSTRUCCIONES

1. Abrir tu proyecto en Supabase: https://app.supabase.com
2. Ir a **SQL Editor** en el menú lateral
3. Crear un **New Query**
4. Copiar y pegar TODO el contenido de este archivo
5. Ejecutar (botón "Run" o Ctrl+Enter)
6. Verificar en **Table Editor** que los datos fueron insertados

---

## 🗄️ SQL DE DATOS DE PRUEBA

```sql
-- ============================================================================
-- GIACOMO PROJECT - TEST DATA
-- Datos de prueba para verificar la integración
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. INSERT VEHICLES (3 vehículos de prueba)
-- ----------------------------------------------------------------------------

INSERT INTO vehicles (
  slug, brand, model, year, edition_type,
  horsepower, torque, weight_kgs, mileage_kms,
  purchase_price, current_price, profitability_percentage,
  status, highlights, image_url, description
) VALUES
(
  'porsche-911-gt3-2024',
  'Porsche',
  '911 GT3',
  2024,
  'GT3',
  502,
  469,
  1435,
  0,
  250000.00,
  280000.00,
  12.00,
  'Available',
  '4.0L Flat-6, PDK, Weissach Package',
  'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
  'El Porsche 911 GT3 2024 es la máxima expresión de performance de Porsche. Con su motor 4.0L de atmósfera que entrega 502 HP, transmisión PDK de 7 velocidades y el paquete Weissach, este auto está diseñado para la pista pero es legal en calle.'
),
(
  'ferrari-488-pista-2023',
  'Ferrari',
  '488 Pista',
  2023,
  'Pista',
  720,
  770,
  1380,
  1200,
  320000.00,
  360000.00,
  12.50,
  'Available',
  'Twin-Turbo V8, F1-DCT, Carbon Fiber',
  'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800',
  'La Ferrari 488 Pista representa lo mejor del DNA de Ferrari en carretera. Basada en el 488 Challenge, este superdeportivo de 720 HP combina tecnología F1 con un enfoque extremo en peso reducido.'
),
(
  'lamborghini-huracan-evo-2024',
  'Lamborghini',
  'Huracán Evo',
  2024,
  'Evo',
  640,
  600,
  1422,
  500,
  280000.00,
  310000.00,
  10.71,
  'Available',
  'V10 NA, LDVI, ALA System',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
  'El Lamborghini Huracán Evo combina el icónico motor V10 de aspiración natural con la última tecnología de Lamborghini. Con sistema LDVI y aerodinámica activa ALA, ofrece una experiencia de conducción incomparable.'
);

-- ----------------------------------------------------------------------------
-- 2. INSERT ACTIVE RAFFLE (1 sorteo activo)
-- ----------------------------------------------------------------------------

INSERT INTO raffles (
  title,
  description,
  prize_vehicle_id,
  start_date,
  end_date,
  status
) VALUES (
  'Gana un Porsche 911 GT3 2024',
  'Participa por este increíble Porsche 911 GT3 2024 valorado en $280,000 USD. Solo 1000 tickets disponibles. ¡Compra tu pack de stickers y aumenta tus chances de ganar!',
  (SELECT id FROM vehicles WHERE slug = 'porsche-911-gt3-2024' LIMIT 1),
  '2026-01-08 00:00:00+00',
  '2026-02-28 23:59:59+00',
  'Active'
);

-- ----------------------------------------------------------------------------
-- 3. INSERT INFLUENCER (1 influencer de prueba)
-- ----------------------------------------------------------------------------

INSERT INTO influencers (
  name,
  email,
  contact_info,
  commission_rate
) VALUES (
  'AutoCritic',
  'critic@dcrmotors.com',
  'YouTube: @autocritic | Instagram: @autocritic_official',
  0.05
);

-- ----------------------------------------------------------------------------
-- 4. CREATE PROMO CODE FOR INFLUENCER
-- ----------------------------------------------------------------------------

INSERT INTO promo_codes (
  code,
  influencer_id,
  is_active
) VALUES (
  'AUTOCRITIC10',
  (SELECT id FROM influencers WHERE name = 'AutoCritic' LIMIT 1),
  true
);

-- ----------------------------------------------------------------------------
-- 5. VERIFICATION QUERIES
-- ----------------------------------------------------------------------------

-- Verify vehicles
SELECT 
  brand,
  model,
  year,
  status,
  current_price
FROM vehicles
ORDER BY created_at;

-- Verify raffles
SELECT 
  title,
  status,
  start_date,
  end_date,
  (SELECT brand FROM vehicles WHERE id = raffles.prize_vehicle_id) as prize_brand,
  (SELECT model FROM vehicles WHERE id = raffles.prize_vehicle_id) as prize_model
FROM raffles;

-- Verify influencers
SELECT 
  name,
  email,
  commission_rate,
  (SELECT COUNT(*) FROM promo_codes WHERE influencer_id = influencers.id) as promo_codes_count
FROM influencers;

-- Verify promo codes
SELECT 
  code,
  is_active,
  (SELECT name FROM influencers WHERE id = promo_codes.influencer_id) as influencer_name
FROM promo_codes;
```

---

## ✅ VERIFICACIÓN

Después de ejecutar el SQL, verifica en **Table Editor**:

### Vehicles (3 filas)
1. ✅ Porsche 911 GT3 2024 - $280,000
2. ✅ Ferrari 488 Pista 2023 - $360,000
3. ✅ Lamborghini Huracán Evo 2024 - $310,000

### Raffles (1 fila)
1. ✅ "Gana un Porsche 911 GT3 2024" - Status: Active

### Influencers (1 fila)
1. ✅ AutoCritic - Commission: 5%

### Promo Codes (1 fila)
1. ✅ AUTOCRITIC10 - Active

---

## 🎯 PRÓXIMO PASO

1. Iniciar el servidor de desarrollo: `pnpm dev`
2. Abrir http://localhost:5173
3. Verificar que los datos de Supabase aparecen en la aplicación
4. Revisar la consola del navegador para confirmar que no hay errores

---

**Versión:** 1.0
**Fecha:** 8 de Enero 2026
**Para:** DCR Motors - Giacomo Project
