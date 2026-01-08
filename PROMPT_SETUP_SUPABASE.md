# PROMPT - Configuración de Supabase para Giacomo (DCR Motors)

**Para:** Editor de Código Externo (DIE)
**Proyecto:** Giacomo - DCR Motors
**Ubicación:** `C:\Users\56930\dyad-apps\giacomo`
**Fecha:** 8 de Enero 2026

---

## 🎯 OBJETIVO

Configurar el backend de Supabase paso a paso mediante **10 tareas cortas e independientes**.

**REGLA CRÍTICA:** Ejecutar UNA tarea a la vez, confirmar completitud, y ESPERAR confirmación del usuario antes de continuar a la siguiente.

---

## 📋 TAREA 1 - Crear archivo .env

**INSTRUCCIONES:**
1. Lee el archivo `C:/Users/56930/dyad-apps/giacomo/ENV_EXAMPLE.md`
2. Crea el archivo `C:/Users/56930/dyad-apps/giacomo/.env`
3. Copia TODO el contenido de ENV_EXAMPLE.md al archivo .env
4. NO edites los valores aún (el usuario los editará después)

**VERIFICACIÓN:**
- [ ] Archivo `.env` creado en la raíz del proyecto
- [ ] Contenido copiado desde ENV_EXAMPLE.md
- [ ] Variables pendientes de editar: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY

**OUTPUT ESPERADO:**
```
✅ Archivo .env creado
⚠️  El usuario debe editar manualmente:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
```

**⏸️ DETENER AQUÍ - ESPERAR CONFIRMACIÓN DEL USUARIO**

---

## 📋 TAREA 2 - Localizar documentación SQL

**INSTRUCCIONES:**
1. Busca archivos SQL o documentación de Supabase en el proyecto:
   - `*.sql` files
   - `README_GIACOMO.md`
   - `GIACOMO_SUPABASE.md` (si existe)
2. Extrae la estructura de las **10 tablas principales**:
   - users, roles, user_roles
   - vehicles, raffles
   - sticker_tiers, user_stickers
   - influencers, promo_codes
   - client_storage_units
3. Para cada tabla, lista:
   - Nombre
   - Columnas principales (tipos de datos)
   - Relaciones con otras tablas (foreign keys)

**VERIFICACIÓN:**
- [ ] Documentación SQL localizada
- [ ] Lista de 10 tablas con columnas principales
- [ ] Relaciones identificadas

**OUTPUT ESPERADO:**
```markdown
## Tablas Encontradas:

1. **users**
   - id: uuid
   - email: text
   - ... (otras columnas)

2. **roles**
   - id: uuid
   - name: text
   - ...

[... continuar con las 10 tablas]

## Relaciones:
- users ↔ user_roles ↔ roles
- raffles ↔ vehicles
[... listar todas las relaciones]
```

**⏸️ DETENER AQUÍ - ESPERAR CONFIRMACIÓN DEL USUARIO**

---

## 📋 TAREA 3 - Generar SQL completo para Supabase

**INSTRUCCIONES:**
1. Crea el archivo `C:/Users/56930/dyad-apps/giacomo/SUPABASE_SQL_PROMPT.md`
2. Genera SQL completo con:

### a) CREATE TABLE statements (10 tablas)
```sql
-- Ejemplo de formato esperado:
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### b) Row Level Security (RLS) policies
```sql
-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);
```

### c) Triggers para timestamps
```sql
-- Trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to each table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### d) Índices para optimización
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_raffles_status ON raffles(status);
CREATE INDEX idx_user_stickers_user_id ON user_stickers(user_id);
```

### e) Datos semilla (seed data)
```sql
-- Insert roles iniciales
INSERT INTO roles (name) VALUES 
('admin'),
('user'),
('influencer');

-- Insert sticker tiers
INSERT INTO sticker_tiers (name, quantity, price_usd) VALUES
('Starter', 5, 50),
('Pro', 15, 120),
('Elite', 50, 350);
```

**VERIFICACIÓN:**
- [ ] Archivo SUPABASE_SQL_PROMPT.md creado
- [ ] 10 CREATE TABLE statements
- [ ] RLS policies para cada tabla
- [ ] Triggers de updated_at
- [ ] Índices de optimización
- [ ] Datos semilla insertados
- [ ] SQL válido y listo para ejecutar

**OUTPUT ESPERADO:**
```
✅ SUPABASE_SQL_PROMPT.md creado
📊 Estadísticas:
   - Tablas: 10
   - Policies: ~20
   - Triggers: 10
   - Índices: ~15
   - Seed data: roles + sticker tiers
   - Total líneas: ~500 líneas SQL
```

**⏸️ DETENER AQUÍ - ESPERAR CONFIRMACIÓN DEL USUARIO**

---

## 📋 TAREA 4 - Verificar conexión con Supabase

**INSTRUCCIONES:**
1. Verifica que el archivo `.env` tenga credenciales válidas (si el usuario ya las editó)
2. Inicia el servidor de desarrollo:
   ```bash
   cd C:/Users/56930/dyad-apps/giacomo
   pnpm dev
   ```
3. Deja el servidor corriendo y reporta el output
4. Indica al usuario que abra `http://localhost:5173`
5. Instrucciones para el usuario:
   - Abrir DevTools del navegador (F12)
   - Ir a la pestaña Console
   - Buscar errores relacionados con Supabase
   - Reportar si hay errores de autenticación

**VERIFICACIÓN:**
- [ ] Servidor iniciado sin errores
- [ ] Puerto 5173 accesible
- [ ] App cargada en navegador
- [ ] Consola del navegador revisada

**OUTPUT ESPERADO:**
```markdown
✅ Servidor de desarrollo iniciado
🌐 URL: http://localhost:5173

🔍 Revisión de consola:
- Sin errores de conexión ❌ / ✅
- Sin errores de autenticación ❌ / ✅
- App renderizada correctamente ❌ / ✅

❌ Si hay errores, el usuario debe verificar:
   1. VITE_SUPABASE_URL formato: https://xxx.supabase.co
   2. VITE_SUPABASE_ANON_KEY formato: eyJhbGc... (JWT largo)
   3. Recargar página después de editar .env
```

**⏸️ DETENER AQUÍ - ESPERAR CONFIRMACIÓN DEL USUARIO**

---

## 📋 TAREA 5 - Ejecutar SQL en Supabase Editor

**INSTRUCCIONES:**
1. Proporcionar al usuario las instrucciones paso a paso:

### Paso 1: Abrir Supabase
- Ir a: https://app.supabase.com
- Seleccionar el proyecto Giacomo

### Paso 2: Abrir SQL Editor
- En el menú lateral, hacer clic en "SQL Editor"
- Hacer clic en "New Query"

### Paso 3: Copiar SQL
- Abrir el archivo: `C:/Users/56930/dyad-apps/giacomo/SUPABASE_SQL_PROMPT.md`
- Copiar TODO el contenido SQL

### Paso 4: Ejecutar
- Pegar en el SQL Editor de Supabase
- Hacer clic en "Run" (o presionar Ctrl+Enter)
- Esperar a que se ejecute completamente

### Paso 5: Verificar
- Ir a "Table Editor" en el menú lateral
- Verificar que las 10 tablas aparezcan:
  - users, roles, user_roles
  - vehicles, raffles
  - sticker_tiers, user_stickers
  - influencers, promo_codes
  - client_storage_units
- Verificar que los datos semilla estén presentes:
  - Tabla `roles`: 3 filas (admin, user, influencer)
  - Tabla `sticker_tiers`: 3 filas (Starter, Pro, Elite)

**VERIFICACIÓN:**
- [ ] SQL ejecutado en Supabase
- [ ] 10 tablas creadas en Table Editor
- [ ] RLS policies activadas
- [ ] Datos semilla insertados
- [ ] Índices creados

**OUTPUT ESPERADO:**
```
✅ SQL ejecutado exitosamente
📊 Tablas creadas: 10/10
📋 Datos semilla:
   - roles: 3 filas ✅
   - sticker_tiers: 3 filas ✅

🔒 RLS policies: Activadas
📈 Índices: Creados
```

**⏸️ DETENER AQUÍ - ESPERAR CONFIRMACIÓN DEL USUARIO**

---

## 📋 TAREA 6 - Verificar integración Frontend-Backend

**INSTRUCCIONES:**
1. Modificar `src/pages/Index.tsx` para agregar logging de Supabase:
   ```tsx
   // Agregar al inicio del componente Index
   import { useVehicles, useActiveRaffles } from '@/hooks/useSupabase';
   
   export function Index() {
     const { data: vehicles, isLoading, error } = useVehicles();
     const { data: raffles } = useActiveRaffles();
     
     // Logging para verificación
     console.log('🚗 Vehicles from Supabase:', vehicles);
     console.log('🎫 Raffles from Supabase:', raffles);
     console.log('❌ Error:', error);
     console.log('⏳ Loading:', isLoading);
     
     // ... resto del componente
   }
   ```

2. Recargar la página `http://localhost:5173`

3. Revisar la consola del navegador:
   - Debería mostrar:
     - `Vehicles from Supabase: []` (array vacío inicialmente)
     - `Raffles from Supabase: []` (array vacío inicialmente)
     - `Error: null` o `undefined`
   - NO debería mostrar errores de autenticación o permisos

4. Si hay errores de RLS:
   - Reportar el error exacto
   - Sugerir verificar policies en Supabase

**VERIFICACIÓN:**
- [ ] Logging agregado a Index.tsx
- [ ] Página recargada
- [ ] Consola del navegador revisada
- [ ] Sin errores de autenticación
- [ ] Hooks funcionando correctamente

**OUTPUT ESPERADO:**
```markdown
✅ Logging agregado a Index.tsx
📊 Console output:
   🚗 Vehicles from Supabase: []
   🎫 Raffles from Supabase: []
   ❌ Error: undefined
   ⏳ Loading: false

✅ Integración verificada - Sin errores
```

**⏸️ DETENER AQUÍ - ESPERAR CONFIRMACIÓN DEL USUARIO**

---

## 📋 TAREA 7 - Insertar datos de prueba

**INSTRUCCIONES:**
1. Crear el archivo `C:/Users/56930/dyad-apps/giacomo/SUPABASE_TEST_DATA.md`
2. Generar SQL INSERT statements para:

### Vehículos (3 autos)
```sql
INSERT INTO vehicles (brand, model, year, price_usd, status, image_url, description) VALUES
('Porsche', '911 GT3', 2024, 250000, 'Available', 'https://example.com/porsche.jpg', 'El último 911 GT3'),
('Ferrari', '488 Pista', 2023, 320000, 'Available', 'https://example.com/ferrari.jpg', 'Ferrari 488 Pista Spider'),
('Lamborghini', 'Huracán Evo', 2024, 280000, 'Available', 'https://example.com/lambo.jpg', 'Huracán Evo 2024');
```

### Sorteo Activo (1)
```sql
INSERT INTO raffles (title, description, prize_vehicle_id, start_date, end_date, ticket_price_usd, total_tickets, status)
SELECT 
  'Gana un Porsche 911 GT3',
  'Participa por este increíble deportivo',
  (SELECT id FROM vehicles WHERE brand = 'Porsche' AND model = '911 GT3' LIMIT 1),
  '2026-01-08',
  '2026-02-28',
  50,
  1000,
  'Active';
```

### Influencer de prueba (1)
```sql
INSERT INTO influencers (name, email, social_media_handle, commission_rate, is_active)
VALUES
('AutoCritic', 'critic@example.com', '@autocritic', 0.05, true);
```

**VERIFICACIÓN:**
- [ ] Archivo SUPABASE_TEST_DATA.md creado
- [ ] SQL válido para 3 vehículos
- [ ] SQL válido para 1 sorteo
- [ ] SQL válido para 1 influencer
- [ ] Ready para ejecutar en Supabase

**OUTPUT ESPERADO:**
```
✅ SUPABASE_TEST_DATA.md creado
📊 Datos a insertar:
   - Vehículos: 3
   - Sorteos: 1
   - Influencers: 1

⚡ El usuario debe ejecutar este SQL en Supabase Editor
```

**⏸️ DETENER AQUÍ - ESPERAR CONFIRMACIÓN DEL USUARIO**

---

## 📋 TAREA 8 - Verificar funcionalidad End-to-End

**INSTRUCCIONES:**
1. Asegurarse de que los datos de prueba fueron insertados (el usuario ejecutó Tarea 7)
2. Recargar `http://localhost:5173`
3. Revisar la consola del navegador:
   - Debería mostrar ahora:
     - `Vehicles from Supabase: [{ id: '...', brand: 'Porsche', ... }]`
     - `Raffles from Supabase: [{ id: '...', title: 'Gana un Porsche 911 GT3', ... }]`
4. Verificar en la UI:
   - Los datos de Supabase deberían fluir hacia la interfaz
   - Secciones de vehículos y sorteos deberían mostrar datos reales

**VERIFICACIÓN:**
- [ ] Datos de prueba insertados en Supabase
- [ ] Página recargada
- [ ] Consola muestra datos reales
- [ ] UI muestra datos de Supabase
- [ ] Sin errores en consola

**OUTPUT ESPERADO:**
```markdown
✅ Datos de prueba insertados
📊 Console output:
   🚗 Vehicles from Supabase: [3 vehículos]
   🎫 Raffles from Supabase: [1 sorteo]

✅ Frontend-Backend conectado exitosamente
🎯 Datos fluyen de Supabase → Frontend
```

**⏸️ DETENER AQUÍ - ESPERAR CONFIRMACIÓN DEL USUARIO**

---

## 📋 TAREA 9 - Documentar configuración

**INSTRUCCIONES:**
1. Actualizar `README_GIACOMO.md` agregando sección:

```markdown
## Configuración de Supabase

### 1. Crear archivo .env
Copiar ENV_EXAMPLE.md a .env y editar:
```bash
cp ENV_EXAMPLE.md .env
```

### 2. Ejecutar SQL en Supabase
1. Abrir https://app.supabase.com
2. Ir a SQL Editor
3. Copiar y ejecutar el contenido de SUPABASE_SQL_PROMPT.md
4. Verificar que las 10 tablas se crearon

### 3. Insertar datos de prueba
Ejecutar SUPABASE_TEST_DATA.md en SQL Editor

### 4. Verificar integración
```bash
pnpm dev
# Abrir http://localhost:5173
# Verificar consola del navegador
```

### Troubleshooting

**Error: Invalid API key**
- Verificar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env
- Recargar el servidor (Ctrl+C y pnpm dev)

**Error: RLS policy violations**
- Verificar policies en Supabase SQL Editor
- Ejecutar SELECT * FROM pg_policies WHERE tablename = 'users';

**Error: Tables not found**
- Verificar que SQL se ejecutó correctamente
- Revisar Table Editor en Supabase
```

2. Crear archivo `SETUP_GUIDE.md`:

```markdown
# Guía de Configuración - Giacomo (DCR Motors)

## Requisitos Previos
- Node.js 18+
- pnpm
- Cuenta de Supabase (https://supabase.com)

## Paso 1: Clonar e Instalar
```bash
cd C:/Users/56930/dyad-apps/giacomo
pnpm install
```

## Paso 2: Configurar Supabase
1. Crear proyecto en https://supabase.com
2. Copiar URL y anon key a .env
3. Ejecutar SUPABASE_SQL_PROMPT.md en SQL Editor
4. Ejecutar SUPABASE_TEST_DATA.md en SQL Editor

## Paso 3: Iniciar Desarrollo
```bash
pnpm dev
```
Abrir http://localhost:5173

## Verificación
- Sin errores en consola del navegador
- Datos de Supabase visibles en la app
- 3 tablas creadas: vehicles, raffles, sticker_tiers
```

**VERIFICACIÓN:**
- [ ] README_GIACOMO.md actualizado
- [ ] SETUP_GUIDE.md creado
- [ ] Sección Troubleshooting agregada
- [ ] Guías claras y reproducibles

**OUTPUT ESPERADO:**
```
✅ Documentación actualizada
📄 Archivos modificados:
   - README_GIACOMO.md (sección Supabase agregada)
   - SETUP_GUIDE.md (creado)

📚 Guías disponibles para futuros developers
```

**⏸️ DETENER AQUÍ - ESPERAR CONFIRMACIÓN DEL USUARIO**

---

## 📋 TAREA 10 - Limpieza y preparación para producción

**INSTRUCCIONES:**
1. Verificar que `.env` esté en `.gitignore`:
   ```bash
   # En .gitignore debería incluir:
   .env
   .env.local
   .env.production
   ```

2. Buscar hardcoded credentials en el código:
   ```bash
   # Buscar strings sospechosas
   rg "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" src/
   rg "https://.*supabase" src/
   ```

3. Build de producción:
   ```bash
   cd C:/Users/56930/dyad-apps/giacomo
   pnpm run build
   ```

4. Preview de producción:
   ```bash
   pnpm run preview
   ```
   Abrir http://localhost:4173

5. Crear checklist de features:

```markdown
# Features Checklist - Giacomo

## Fase 1: Foundation ✅
- [x] Setup del proyecto
- [x] Sistema de diseño DCR
- [x] Componentes UI base
- [x] Cliente Supabase
- [x] Hooks personalizados
- [x] Routing
- [x] Landing page (9 secciones)
- [x] Configuración de Supabase

## Fase 2: Core Features (Pendiente)
- [ ] Sistema de autenticación
- [ ] Dashboard de usuario
- [ ] Página Collection completa
- [ ] Página Raffles con tickets
- [ ] Página Sales
- [ ] Página Storage
- [ ] Dashboard de admin
- [ ] Dashboard de influencers

## Fase 3: Advanced Features (Pendiente)
- [ ] Integración Classic.com API
- [ ] Pasarela de pago (Stripe/Webpay)
- [ ] Sistema de notificaciones
- [ ] Analytics dashboard
- [ ] SEO optimization
```

**VERIFICACIÓN:**
- [ ] .env en .gitignore
- [ ] Sin hardcoded credentials
- [ ] Build de producción exitoso
- [ ] Preview funcionando
- [ ] Checklist de features creado

**OUTPUT ESPERADO:**
```markdown
✅ Preparación para producción completada

🔒 Seguridad:
   - .env en .gitignore ✅
   - Sin hardcoded credentials ✅

📦 Build:
   - pnpm run build ✅
   - pnpm run preview ✅
   - URL: http://localhost:4173

📋 Features Checklist creado
🚀 Proyecto listo para Fase 2 de desarrollo
```

**⏸️ DETENER AQUÍ - ESPERAR CONFIRMACIÓN DEL USUARIO**

---

## 🎉 FINALIZACIÓN

Al completar las 10 tareas, generar reporte final:

```markdown
# Reporte Final - Configuración de Supabase

## Resumen
✅ Tareas completadas: 10/10
⏱️ Tiempo total: [X minutos/horas]
❌ Errores encontrados: [X errores solucionados]
📊 Archivos creados: X archivos

## Archivos Creados
1. .env (variables de entorno)
2. SUPABASE_SQL_PROMPT.md (SQL completo)
3. SUPABASE_TEST_DATA.md (datos de prueba)
4. SETUP_GUIDE.md (guía de configuración)

## Logs Importantes
- [Tarea X]: [detalle de error/solución]
- [Tarea Y]: [detalle importante]

## Próximos Pasos Recomendados
1. Implementar sistema de autenticación
2. Crear dashboard de usuario
3. Desarrollar página Collection completa
4. Integrar pasarela de pago

🚀 Giacomo está listo para la Fase 2 de desarrollo!
```

---

## 📌 NOTAS PARA EL EDITOR EXTERNO

1. **UNA TAREA A LA VEZ** - No ejecutar múltiples tareas simultáneamente
2. **CONFIRMACIÓN REQUERIDA** - Esperar confirmación del usuario antes de continuar
3. **REPORTAR ERRORES** - Si algo falla, reportar inmediatamente con detalles
4. **VERIFICACIÓN** - Cada tarea tiene checklist de verificación
5. **OUTPUT CLARO** - Proporcionar output estructurado y fácil de leer

---

**Versión:** 1.0
**Fecha:** 8 de Enero 2026
**Para:** Editor de Código Externo (DIE)
**Proyecto:** Giacomo - DCR Motors
