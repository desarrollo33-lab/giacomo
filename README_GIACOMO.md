# 🏎️ DCR Motors - Giacomo Project

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.90-3ECF8E)](https://supabase.com/)
[![Shadcn/ui](https://img.shields.io/badge/Shadcn%2Fui-Latest-black)](https://ui.shadcn.com/)

**DCR Motors** es una plataforma innovadora que fusiona el coleccionismo de vehículos de alta gama con un sistema de sorteos legales basado en "stickers" digitales.

## 🎯 Modelo de Negocio

- **Storage Profesional:** Almacenamiento seguro para colección de motos y autos de lujo
- **Compra/Venta:** Vehículos icónicos con precios transparentes (Classic.com)
- **Sorteos de Stickers:** 4 niveles de participación (Starter, Enthusiast, Collector, Legacy)
- **Marketing de Influencers:** Red de 10 colaboradores con tracking personalizado

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.3** + **Vite 6.3** + **TypeScript 5.5**
- **Shadcn/ui** - Componentes UI premium
- **Tailwind CSS 3.4** - Sistema de diseño utilitario
- **React Router 6.26** - Routing
- **TanStack Query 5.56** - Cache y state management
- **Sonner** - Toast notifications

### Backend
- **Supabase** - PostgreSQL + Auth + Edge Functions
- **Row Level Security (RLS)** - Seguridad granular
- **Deno** - Runtime para Edge Functions

### Diseño
- **PorscheNext** - Tipografía premium (requiere licencia)
- **DCR Yellow** `#f7c01d` - Color primario corporativo
- **Radius 0rem** - Estética técnica/plana
- **OKLCH** - Espacio de color moderno

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd dyad-apps/giacomo
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```bash
# Copia el template
cp ENV_EXAMPLE.md .env
```

Edita `.env` con tus credenciales de Supabase:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Iniciar servidor de desarrollo
```bash
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🗄️ Base de Datos Supabase

### Esquema Completo
El proyecto incluye 10 tablas principales:

1. **vehicles** - Inventario como activos de inversión
2. **raffles** - Sorteos de vehículos
3. **sticker_tiers** - Niveles de participación
4. **user_stickers** - Tickets de usuarios
5. **influencers** - Colaboradores de marketing
6. **promo_codes** - Códigos de seguimiento
7. **users** - Usuarios del sistema
8. **roles** - Roles (admin, registered_user, client)
9. **user_roles** - Asignación de roles
10. **client_storage_units** - Vehículos en storage

### Configuración de Base de Datos
Usa el **prompt inicial para tu editor de Supabase** que se proporcionó anteriormente. Contiene:
- Scripts SQL completos para todas las tablas
- Políticas RLS implementadas
- Índices de optimización
- Triggers y funciones auxiliares
- Datos semilla (seed data)
- Vistas útiles para dashboards

## 🎨 Sistema de Diseño

### Tema DCR (dcr_1)
El proyecto usa un tema personalizado inspirado en Porsche Design System:

#### Características Principales:
- **Tipografía:** PorscheNext (fallback: Inter Var)
- **Color Primario:** `oklch(0.8346 0.1657 87.1358)` ≈ `#f7c01d` (DCR Yellow)
- **Fondo Claro:** `oklch(1.0000 0 0)` ≈ `#ffffff`
- **Fondo Oscuro:** `oklch(0.2342 0.0149 248.4634)` ≈ `#181f25`
- **Radio:** `0rem` (diseño plano/cuadrado)
- **Tracking:** `-0.01em` (letter-spacing premium)

#### Sistema de Sombras
- **Modo Claro:** Sombras sutiles (`hsl(210 20% 12% / 0.05)`)
- **Modo Oscuro:** Sombras dramáticas (`hsl(0 0% 0% / 0.30)`)

### Adaptación de Componentes
Todos los componentes de Shadcn/ui están adaptados a `radius: 0rem`:

```tsx
// Ejemplo: Button con bordes cuadrados
<Button variant="default" className="rounded-none">
  DCR Button
</Button>
```

## 📁 Estructura del Proyecto

```
giacomo/
├── public/
│   └── fonts/              # Archivos de fuente (PorscheNext)
├── src/
│   ├── components/
│   │   └── ui/             # Componentes Shadcn/ui adaptados
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   └── supabase.ts     # Cliente Supabase + tipos
│   ├── pages/              # Páginas de la aplicación
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Componente principal
│   ├── globals.css         # Tema DCR completo
│   └── main.tsx            # Entry point
├── .env.example            # Template de variables de entorno
├── components.json         # Configuración Shadcn/ui
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🔐 Roles y Permisos

### RBAC (Role-Based Access Control)
- **admin:** Control total de la plataforma
- **registered_user:** Compra stickers, participa en sorteos
- **client:** Todo lo anterior + acceso a Storage

### Políticas RLS
- Lectura pública de inventario de vehículos
- Usuarios solo ven sus propios stickers
- Admin gestiona todo el sistema
- Clientes ven sus unidades de storage

## 🚀 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Iniciar servidor de desarrollo
pnpm build            # Build para producción
pnpm build:dev        # Build en modo desarrollo
pnpm preview          # Previsualizar build de producción

# Calidad de código
pnpm lint             # Ejecutar ESLint
```

## 🎯 Próximos Pasos

### Fase 1: Fundación (Completado)
- [x] Configuración inicial del proyecto
- [x] Tema DCR implementado
- [x] Cliente Supabase configurado
- [x] Tipos TypeScript definidos

### Fase 2: Desarrollo
- [ ] Crear componentes base adaptados a radius: 0rem
- [ ] Implementar sistema de autenticación
- [ ] Crear página HOME con secciones
- [ ] Crear página COLLECTION
- [ ] Implementar motor de sorteos

### Fase 3: Integración
- [ ] Integración con Classic.com API
- [ ] Pasarela de pago (Stripe/Webpay)
- [ ] Dashboard de influencers
- [ ] Sistema de códigos promocionales

### Fase 4: Producción
- [ ] Testing completo
- [ ] Optimización de performance
- [ ] Auditoría de accesibilidad
- [ ] Deploy a Vercel

## ⚠️ Importante: Licenciamiento de PorscheNext

**PorscheNext** es un activo corporativo de Porsche AG. Para usarlo en producción:

1. Contactar a Monotype o licenciador oficial
2. Adquirir **Web Font License**
3. Especificar tráfico esperado del sitio
4. Mantener documentación de licencia

**Solución temporal:** El tema usa `Inter Var` como fallback mientras se gestiona la licencia.

## 📚 Documentación Adicional

- [GIACOMO_REPORT.md](../Desarrollo33/Giacomo/GIACOMO_REPORT.md) - Análisis estratégico completo
- [GIACOMO_SUPABASE.md](../Desarrollo33/Giacomo/GIACOMO_SUPABASE.md) - Diseño de base de datos
- [GIACOMO_THEME.md](../Desarrollo33/Giacomo/GIACOMO_THEME.md) - Sistema de diseño técnico

## 🤝 Contribución

Este es un proyecto privado de DCR Motors. Para contribuir:

1. Seguir el código de conducta
2. Respetar la arquitectura establecida
3. Mantener los estándares de código
4. Documentar cambios significativos

## 📞 Soporte

Para preguntas sobre el proyecto, contactar al equipo de desarrollo de DCR Motors.

---

**DCR Motors** - Lujo en movimiento. Precisión en cada detalle.
