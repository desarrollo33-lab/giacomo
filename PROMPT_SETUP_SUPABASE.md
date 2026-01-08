# PROMPT - Configuración de Supabase para Giacomo (DCR Motors)

**Objetivo:** Configurar el backend de Supabase paso a paso para el proyecto Giacomo

**Ubicación del Proyecto:** `C:\Users\56930\dyad-apps\giacomo`

---

## Instrucciones Generales

1. **Abordar UNA tarea a la vez**
2. **Confirmar completitud antes de pasar a la siguiente**
3. **Reportar errores si ocurren**
4. **Esperar confirmación del usuario antes de continuar**

---

## Tarea 1: Crear archivo .env desde ENV_EXAMPLE.md

**Objetivo:** Crear el archivo `.env` en la raíz del proyecto con las variables de entorno necesarias.

**Instrucciones:**
1. Lee el archivo `ENV_EXAMPLE.md` ubicado en `C:/Users/56930/dyad-apps/giacomo/`
2. Crea un nuevo archivo `.env` en `C:/Users/56930/dyad-apps/giacomo/`
3. Copia el contenido de `ENV_EXAMPLE.md` al archivo `.env`
4. Indica al usuario que debe editar las siguientes variables con sus credenciales reales de Supabase:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

**Confirmación esperada:**
- Archivo `.env` creado exitosamente
- Lista de variables que el usuario debe editar manualmente

**No continúes a la Tarea 2 hasta recibir confirmación.**

---

## Tarea 2: Leer Documentación SQL de Supabase

**Objetivo:** Localizar y leer la documentación SQL necesaria para crear la estructura de la base de datos.

**Instrucciones:**
1. Busca en el proyecto cualquier archivo con extensión `.sql` o documentación relacionada con Supabase
2. Si no existe, busca en `README_GIACOMO.md` o documentación similar
3. Identifica las 10 tablas que necesitan ser creadas:
   - users
   - roles
   - user_roles
   - vehicles
   - raffles
   - sticker_tiers
   - user_stickers
   - influencers
   - promo_codes
   - client_storage_units

**Confirmación esperada:**
- Lista de tablas encontradas en la documentación
- Estructura general de cada tabla (columnas principales)

**No continúes a la Tarea 3 hasta recibir confirmación.**

---

## Tarea 3: Generar Prompt SQL para Supabase Editor

**Objetivo:** Crear un prompt SQL completo que el usuario pueda ejecutar en el editor SQL de Supabase.

**Instrucciones:**
1. Basándote en la documentación leída en la Tarea 2, crea un archivo `SUPABASE_SQL_PROMPT.md`
2. El archivo debe contener:
   - **CREATE TABLE statements** para las 10 tablas
   - **Row Level Security (RLS)** policies para multi-tenancy
   - **Triggers** para timestamps automáticos (created_at, updated_at)
   - **Índices** para optimización de consultas
   - **Datos semilla (seed data)** para roles iniciales y stickers tiers

**Formato del SQL:**
```sql
-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view available vehicles
CREATE POLICY "Public vehicles are viewable by everyone"
ON vehicles FOR SELECT
USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
```

**Confirmación esperada:**
- Archivo `SUPABASE_SQL_PROMPT.md` creado
- SQL válido y listo para ejecutar en Supabase
- Estimación de líneas de código SQL generadas

**No continúes a la Tarea 4 hasta recibir confirmación.**

---

## Tarea 4: Verificar Conexión con Supabase

**Objetivo:** Probar que el archivo `.env` está correctamente configurado y que la app puede conectar con Supabase.

**Instrucciones:**
1. Verifica que el archivo `.env` tiene las credenciales correctas
2. Inicia el servidor de desarrollo:
   ```bash
   cd C:/Users/56930/dyad-apps/giacomo
   pnpm dev
   ```
3. Abre el navegador en `http://localhost:5173`
4. Abre la consola del navegador (F12) y busca errores de conexión con Supabase
5. Si hay errores de autenticación, indica al usuario que verifique:
   - `VITE_SUPABASE_URL` (debe ser: https://xxx.supabase.co)
   - `VITE_SUPABASE_ANON_KEY` (debe ser una larga string JWT)

**Confirmación esperada:**
- Servidor de desarrollo iniciado sin errores
- Sin errores de conexión en la consola del navegador
- App renderizada correctamente

**No continúes a la Tarea 5 hasta recibir confirmación.**

---

## Tarea 5: Ejecutar SQL en Supabase Editor

**Objetivo:** Guiar al usuario para que ejecute el SQL generado en la Tarea 3 en el editor de Supabase.

**Instrucciones:**
1. Indica al usuario que abra su proyecto en Supabase: https://app.supabase.com
2. Navega a SQL Editor (en el menú lateral)
3. Copia el contenido de `SUPABASE_SQL_PROMPT.md`
4. Pega en el editor SQL de Supabase
5. Ejecuta el SQL (botón "Run" o Ctrl+Enter)
6. Verifica que todas las tablas se crearon correctamente en Table Editor

**Confirmación esperada:**
- Todas las 10 tablas creadas exitosamente
- RLS policies activadas
- Datos semilla insertados correctamente
- Índices creados

**No continúes a la Tarea 6 hasta recibir confirmación.**

---

## Tarea 6: Verificar Integración Frontend-Backend

**Objetivo:** Probar que el frontend puede leer datos de Supabase correctamente.

**Instrucciones:**
1. En `src/pages/Index.tsx`, agrega un componente de prueba que use los hooks de Supabase:
   ```tsx
   import { useVehicles } from '@/hooks/useSupabase';
   
   // Dentro del componente Index
   const { data: vehicles, isLoading, error } = useVehicles();
   
   console.log('Vehicles from Supabase:', vehicles);
   console.log('Error:', error);
   ```
2. Recarga la página `http://localhost:5173`
3. Verifica en la consola que:
   - Los datos de vehículos se muestran (inicialmente vacío, pero sin errores)
   - No hay errores de autenticación o permisos
4. Si hay errores de RLS, indica que verifique las policies en Supabase

**Confirmación esperada:**
- Sin errores en la consola del navegador
- Hooks de Supabase funcionando correctamente
- Datos consultando exitosamente (aunque estén vacíos inicialmente)

**No continúes hasta recibir confirmación.**

---

## Tarea 7: Insertar Datos de Prueba

**Objetivo:** Poblar la base de datos con datos de prueba iniciales para verificar el funcionamiento completo.

**Instrucciones:**
1. Crea un archivo SQL adicional: `SUPABASE_TEST_DATA.md`
2. Agrega INSERT statements para:
   - **3 vehículos** (Porsche 911, Ferrari 488, Lamborghini Huracán)
   - **1 sorteo activo** (con premio de uno de los vehículos)
   - **3 sticker tiers** ($50, $120, $350)
   - **1 influencer** (de prueba)

3. Indica al usuario que ejecute este SQL en el editor de Supabase
4. Verifica que los datos aparecen en Table Editor

**Confirmación esperada:**
- Datos de prueba insertados correctamente
- Visible en Table Editor de Supabase
- Frontend puede leer los datos a través de los hooks

---

## Tarea 8: Verificar Funcionalidad End-to-End

**Objetivo:** Probar el flujo completo de datos desde Supabase hasta el frontend.

**Instrucciones:**
1. En `src/pages/Index.tsx`, reemplaza los vehículos hardcodeados con datos de Supabase:
   ```tsx
   const { data: vehicles } = useVehicles();
   const { data: raffles } = useActiveRaffles();
   ```
2. Verifica que los vehículos y sorteos aparezcan en la UI
3. Prueba la navegación entre secciones
4. Verifica que no haya errores en la consola

**Confirmación esperada:**
- Vehículos de Supabase mostrados en el Home
- Sorteos activos mostrados correctamente
- Sin errores en consola
- UI responsiva y funcional

---

## Tarea 9: Documentar Configuración Final

**Objetivo:** Crear una guía de configuración para futuros desarrolladores.

**Instrucciones:**
1. Actualiza `README_GIACOMO.md` con:
   - Instrucciones para configurar Supabase
   - Link al prompt SQL que deben ejecutar
   - Pasos para verificar la integración
   - Troubleshooting común (errores de conexión, RLS, etc.)

2. Crea un archivo `SETUP_GUIDE.md` con pasos detallados para:
   - Clonar el proyecto
   - Instalar dependencias
   - Configurar Supabase
   - Ejecutar el SQL
   - Iniciar el servidor

**Confirmación esperada:**
- `README_GIACOMO.md` actualizado
- `SETUP_GUIDE.md` creado
- Guía clara y reproducible

---

## Tarea 10: Limpieza y Preparación para Producción

**Objetivo:** Preparar el proyecto para el siguiente fase de desarrollo.

**Instrucciones:**
1. Verifica que no haya hardcoded credentials en el código
2. Asegura que `.env` esté en `.gitignore`
3. Verifica que el build de producción funcione:
   ```bash
   pnpm run build
   ```
4. Prueba el preview de producción:
   ```bash
   pnpm run preview
   ```
5. Crea un checklist de features implementadas vs pendientes

**Confirmación esperada:**
- Build de producción exitoso
- Preview funcionando correctamente
- Checklist de features actualizado
- Proyecto listo para fase de desarrollo de features

---

## FINALIZACIÓN

Al completar todas las tareas:
- **Resumen:** Reporta el número de tareas completadas
- **Tiempo:** Tiempo total invertido
- **Errores:** Errores encontrados y solucionados
- **Próximos Pasos:** Recomendaciones para la fase de desarrollo

---

**IMPORTANTE:** Abordar UNA tarea a la vez y esperar confirmación antes de continuar.
