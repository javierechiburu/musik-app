# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) cuando trabaja con código en este repositorio.

## Resumen del Proyecto

Esta es una plataforma de distribución musical y análisis (FADER Records - Musik App) construida con Next.js 15, TypeScript y Tailwind CSS v4. Es un dashboard integral para que los artistas gestionen su distribución musical, vean análisis, manejen facturación y rastreen campañas de marketing. La aplicación se integra con Supabase para autenticación/base de datos, usa TanStack Query para obtención de datos, y se conecta a APIs externas como Chartmetric para análisis musicales.

## Comandos de Desarrollo

- `npm run dev` - Iniciar servidor de desarrollo con Turbopack (recomendado para builds más rápidos)
- `npm run build` - Construir la aplicación para producción
- `npm run start` - Iniciar servidor de producción
- `npm run lint` - Ejecutar ESLint con configuraciones de Next.js y TypeScript

## Arquitectura

### Stack de Frameworks
- **Next.js 15** con App Router (estructura de directorio src/app)
- **React 19** con TypeScript en modo estricto
- **Tailwind CSS v4** con configuración de tema inline
- **Supabase** para autenticación y base de datos
- **TanStack Query** para manejo de estado del servidor
- **Zustand** para manejo de estado del cliente
- **Axios** con interceptores personalizados para llamadas a API
- **Resend** para servicios de email

### Autenticación y Autorización
- Supabase Auth con autenticación email/contraseña
- Control de acceso basado en roles (roles user/admin)
- AuthContext proporciona estado de usuario y métodos de autenticación
- Middleware para protección de rutas
- Tokens JWT manejados automáticamente por el cliente de Supabase

### Manejo de Estado
- **AuthContext** - Estado global de autenticación y manejo de roles de usuario
- **TanStack Query** - Estado del servidor, caché y sincronización de datos de API
- **Zustand** - Manejo de estado del lado del cliente para estado de UI
- **Local Storage** - Persistencia de rol de usuario y preferencias de sesión

### Integración de APIs
- **Instancia Personalizada de Axios** - Cliente HTTP centralizado con timeout de 50s
- **Interceptores de Request/Response** - Inyección automática de tokens y manejo de errores
- **API de Chartmetric** - Análisis musical y datos de streaming (ver docs/api-*.md)
- **Rutas API Internas** - Rutas API de Next.js para operaciones backend

### Estructura del Proyecto
```
src/
  app/
    api/              # Rutas API de Next.js
    home/             # Páginas principales del dashboard (protegidas)
    login/            # Páginas de autenticación
    layout.tsx        # Layout raíz con providers
  components/         # Componentes UI reutilizables organizados por funcionalidad
    billetera/        # Componentes de billetera/facturación
    canciones/        # Componentes de canciones/tracks
    home/             # Componentes del dashboard
    marketing/        # Componentes de campañas de marketing
    perfil/           # Componentes de gestión de perfil
    ui/               # Componentes UI genéricos
  config/             # Archivos de configuración
    axios/            # Configuración de Axios e interceptores
    supabase/         # Configuración del cliente de Supabase
  contexts/           # Contextos de React para estado global
  apis/               # Capas de servicio API para integraciones externas
```

### Patrones Clave
- Organización de componentes basada en funcionalidades
- Custom hooks para obtención de datos con TanStack Query
- Interceptores de Axios para inyección automática de tokens de autenticación
- Rutas protegidas usando middleware y contexto de auth
- Alias de rutas TypeScript (`@/*` mapea a `./src/*`)
- Boundaries de error y estados de carga en toda la app
- Diseño responsivo con Tailwind CSS

### Flujo de Datos
1. **Autenticación**: Supabase maneja auth, AuthContext gestiona estado
2. **Llamadas API**: Instancia de Axios con interceptores maneja todas las requests HTTP
3. **Manejo de Estado**: TanStack Query cachea datos del servidor, Zustand para estado UI
4. **APIs Externas**: Chartmetric para análisis musical, Resend para emails
5. **Base de Datos**: Supabase PostgreSQL con políticas RLS

### Variables de Entorno Requeridas
- `NEXT_PUBLIC_SUPABASE_URL` - URL del proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clave anónima de Supabase
- Claves API adicionales para Chartmetric y otros servicios externos

### Despliegue
- Configurado para despliegue en Netlify con `@netlify/plugin-nextjs`
- Usa pnpm como administrador de paquetes en producción