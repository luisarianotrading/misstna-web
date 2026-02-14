# 🚀 MissTNA Web Platform

Plataforma web profesional para MissTNA Trading. Dashboard en tiempo real de 3 bots de trading automatizados.

## 📋 Requisitos Previos

- **Node.js** v18+ (tienes v25.6.1 ✓)
- **npm** v11+ (tienes disponible ✓)
- **Python** 3.8+ (para la API local)
- **PostgreSQL** 12+ (para producción en Vercel)

## 🏗️ Estructura del Proyecto

```
misstna-web/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (public)/     # Páginas públicas
│   │   ├── (auth)/       # Login / Register
│   │   ├── (protected)/ # Dashboard (requiere auth)
│   │   ├── api/          # API Routes
│   ├── components/       # React Components
│   ├── lib/              # Utilities & libs
│   ├── styles/           # CSS Global
│   └── layout.tsx        # Root Layout
├── prisma/               # Schema de DB
├── public/               # Assets estáticos
├── local_api.py          # API local Python (sincroniza bots)
├── .env.local            # Variables de entorno
├── package.json          # Dependencias
└── README.md             # Este archivo
```

## ⚙️ Setup Inicial

### 1️⃣ Instalar Dependencias

```bash
cd misstna-web
npm install
```

### 2️⃣ Configurar Variables de Entorno

Editar `.env.local`:

```env
# Database (Para producción Vercel)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Local API (Tu máquina con los bots)
LOCAL_API_URL="http://localhost:5000"
LOCAL_API_KEY="your-api-key"

# Redis (opcional, para caching)
REDIS_URL="redis://..."
```

### 3️⃣ Inicializar Base de Datos (Opcional)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 🚀 Desarrollo Local

### Terminal 1: Next.js Frontend

```bash
npm run dev
```

Abre: **http://localhost:3000**

### Terminal 2: API Local (Python)

Primero instala dependencias Python:

```bash
pip install fastapi uvicorn python-dotenv pydantic
```

Luego ejecuta:

```bash
python local_api.py
```

Se ejecutará en: **http://localhost:5000**

### Terminal 3: Verifica que todo funciona

```bash
curl -H "Authorization: Bearer your-api-key" http://localhost:5000/health
```

Deberías ver:
```json
{
  "status": "online",
  "timestamp": "...",
  "bots": {...}
}
```

## 🔑 Autenticación

### Crear Usuario de Prueba

Usa directamente **Prisma Studio**:

```bash
npx prisma studio
```

O crea un usuario con un script:

```typescript
// En src/lib/create-user.ts
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const user = await prisma.user.create({
  data: {
    email: 'admin@misstna.app',
    password: await bcrypt.hash('password123', 10),
    name: 'Admin',
    role: 'ADMIN',
    status: 'active'
  }
});
```

### Roles Disponibles

- **PUBLIC**: Solo acceso a landing page
- **PREMIUM**: Acceso al dashboard completo
- **ADMIN**: Dashboard + Panel de administración

## 📊 API Endpoints

### Datos de Bots

```
GET /api/data/bots
- Obtiene datos unificados de los 3 bots
- Requiere: Autenticación (Premium/Admin)
```

### Streaming en Tiempo Real (SSE)

```
GET /api/stream/dashboard
- Server-Sent Events para datos en vivo
- Actualiza cada 60 segundos
- Requiere: Autenticación
```

### Sincronización

```
POST /api/sync/etfs
POST /api/sync/spy
POST /api/sync/stocks
- Fuerza sincronización con API local
```

## 📱 Páginas Principales

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Landing page | Público |
| `/about` | Información | Público |
| `/services` | Servicios | Público |
| `/contact` | Contacto | Público |
| `/login` | Ingresar | Público |
| `/register` | Solicitar acceso | Público |
| `/dashboard` | Dashboard principal | Premium/Admin |
| `/dashboard/etfs` | Bot ETFs | Premium/Admin |
| `/dashboard/spy` | Bot SPY | Premium/Admin |
| `/dashboard/stocks` | Bot Stocks | Premium/Admin |
| `/admin` | Panel admin | Admin Only |
| `/admin/users` | Gestión usuarios | Admin Only |
| `/admin/analytics` | Estadísticas | Admin Only |

## 🎨 Branding

### Colores MissTNA

- **Gold**: `#D4AF37` / var(--gold)
- **Dark Blue**: `#003366` / var(--dark-blue)
- **Turquoise**: `#00CED1` / var(--turquoise)
- **Dark**: `#1a1a1a` / var(--dark)
- **Light**: `#f5f5f5` / var(--light)

Clase utilities:
- `.btn-primary` - Botón principal (gold gradient)
- `.btn-secondary` - Botón secundario (outline turquoise)
- `.card` - Tarjeta estiló
- `.gradient-text` - Texto con gradiente
- `.badge-*` - Badges de estado

## 🔄 Integración Local ↔ Vercel

### Flujo de Datos

```
Máquina Local (Windows)
    ↓
    Bots generan JSON
    ↓
Local API (Python)
    ↓
Next.js API Routes (Vercel)
    ↓
Frontend React
```

### Fallbacks si API Local no está disponible

1. Intenta conectar a `http://localhost:5000`
2. Si falla, usa caché Redis (si existe)
3. Si no, muestra datos históricos
4. Si none, muestra error amigable

## 📦 Deployment en Vercel

### 1. Conectar Repositorio

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo
git push -u origin main
```

### 2. Crear Proyecto en Vercel

```bash
npm i -g vercel
vercel
```

### 3. Configurar Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL = (PostgreSQL Vercel)
NEXTAUTH_SECRET = (generar: openssl rand -base64 32)
NEXTAUTH_URL = https://misstna.vercel.app
LOCAL_API_URL = http://your-machine-ip:5000
LOCAL_API_KEY = your-api-key
```

### 4. Deploy

```bash
vercel --prod
```

## 🐛 Troubleshooting

### "Cannot find module 'next'"

```bash
rm -rf node_modules package-lock.json
npm install
```

### "Database connection error"

Verificar que `DATABASE_URL` está correcto en `.env.local`

### "Local API not responding"

1. ¿Está corriendo `python local_api.py`?
2. ¿El puerto 5000 está disponible?
3. ¿`LOCAL_API_KEY` coincide en ambos lados?

### "Dashboard sin datos"

1. Verifica que `dashboard_data.json` existe en MissTNA_Bot
2. Prueba manualmente: `curl http://localhost:5000/data/etfs`
3. Revisa la consola del dashboard para errores

## 📝 Scripts Útiles

```bash
# Desarrollo
npm run dev              # Inicia dev server

# Compilación
npm run build            # Build para producción
npm run start            # Start servidor producción

# Base de Datos
npx prisma db push      # Sincroniza schema con DB
npx prisma migrate dev  # Crea migration
npx prisma studio      # Abre Prisma Studio

# Linting
npm run lint            # ESLint check
```

## 🔐 Seguridad

- ✅ Autenticación NextAuth.js con JWT
- ✅ Roles basados en acceso
- ✅ CORS configurado (solo Vercel)
- ✅ Validación de API keys en local API
- ✅ Password hashing con bcryptjs
- ✅ Env variables no committeadas

## 📞 Soporte

Para problemas o preguntas:

1. Revisa la consola del navegador (F12)
2. Revisa los logs del servidor: `npm run dev` terminal
3. Revisa los logs de Python API: `python local_api.py` terminal
4. Contacta a Luisa Riaño

## 📄 Licencia

© 2026 MissTNA Trading. Todos los derechos reservados.

---

**Última actualización**: 13 Febrero 2026
**Versión**: 1.0.0 Beta
