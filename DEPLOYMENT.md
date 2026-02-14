# 🚀 Deployment a Vercel

Guía completa para desplegar MissTNA Web Platform en Vercel.

## 📋 Requisitos

- ✅ Proyecto Next.js creado
- ✅ Repositorio Git (GitHub, GitLab, Bitbucket)
- ✅ Cuenta Vercel (gratuita)
- ✅ PostgreSQL Database (Vercel Postgres)

## 🔗 Paso 1: Conectar Repositorio Git

### En tu máquina local

```powershell
cd "$env:USERPROFILE\OneDrive\Escritorio\misstna-web"

# Inicializar git
git init
git add .
git commit -m "Initial commit: MissTNA Web Platform"

# Agregar repositorio remoto
git remote add origin https://github.com/tu-usuario/misstna-web.git

# Push a main branch
git branch -M main
git push -u origin main
```

## 🌐 Paso 2: Crear Proyecto en Vercel

### Opción A: Desde Vercel Dashboard

1. Ve a <https://vercel.com/dashboard>
2. Click en "Add New..." → "Project"
3. Selecciona "Import Git Repository"
4. Pega: `https://github.com/tu-usuario/misstna-web`
5. Click "Import"

### Opción B: Desde CLI

```powershell
npm i -g vercel

# Deploy
vercel
```

Sigue las instrucciones interactivas.

## ⚙️ Paso 3: Configurar Variables de Entorno

En Vercel Dashboard:

1. Proyecto → Settings → Environment Variables

Agregar:

```
DATABASE_URL = postgresql://...
NEXTAUTH_SECRET = (generar: openssl rand -base64 32)
NEXTAUTH_URL = https://misstna.vercel.app (o tu dominio)
LOCAL_API_URL = http://your-machine-ip:5000
LOCAL_API_KEY = your-api-key-here
REDIS_URL = (si usas Redis)
```

## 🗄️ Paso 4: Configurar Base de Datos PostgreSQL

### Opción A: Vercel Postgres (Recomendado)

```powershell
vercel env pull  # Descarga vars de Vercel localmente

# Crear PostgreSQL en Vercel
# Dashboard → Storage → Create Database → Postgres

# La DATABASE_URL se agregará automáticamente
```

### Opción B: Base de Datos Externa

Si tienes BD propia:

```
DATABASE_URL=postgresql://username:password@host:port/database
```

## 🗄️ Paso 5: Ejecutar Migraciones

Vercel ejecuta scripts automáticamente, pero puedes hacerlo manualmente:

```powershell
# Migrations iniciales
npx prisma migrate deploy

# O sincronizar schema
npx prisma db push
```

## 🔐 Paso 6: Configurar NextAuth

1. En `.env.local` (local) y Vercel Dashboard:

```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<value from: openssl rand -base64 32>
```

1. Verificar que el secret es el MISMO en ambos lados

## 📱 Paso 7: Conectar Dominio (Opcional)

### Si tienes dominio propio (ej: misstna.com)

1. Dashboard Vercel → Settings → Domains
2. Agregar dominio
3. Seguir instrucciones de DNS
4. Cambiar en variables:
   - NEXTAUTH_URL = <https://misstna.com>
   - VERCEL_PROJECT_URL = <https://misstna.com>

## 🎯 Paso 8: Primer Deploy

```powershell
# Desde rama main
git push origin main

# Vercel desplegará automáticamente
# Puedes ver el progreso en Dashboard
```

## 🧪 Paso 9: Verificar Deployment

1. Abre: <https://misstna.vercel.app> (o tu dominio)
2. Verifica que carga correctamente
3. Intenta login
4. Accede al dashboard

## 🔌 Paso 10: Sincronizar Datos Locales

En tu máquina Windows, la API local DEBE estar corriendo:

```powershell
python local_api.py
```

Para que Vercel pueda acceder desde internet:

### Opción A: Usar ngrok (Fácil)

```powershell
# Instalar ngrok
choco install ngrok

# O descargar desde https://ngrok.com/download

# Ejecutar
ngrok http 5000

# Copiar URL pública (ej: https://abc123.ngrok.io)

# Actualizar en Vercel:
LOCAL_API_URL = https://abc123.ngrok.io
```

### Opción B: Port Forward en Router (Avanzado)

1. Router settings → Port Forwarding
2. Forward puerto 5000 a tu máquina
3. Usar IP pública: LOCAL_API_URL = <http://miip:5000>
4. Seguridad: Firewall + API Key fuerte

### Opción C: API Híbrida (Recomendado)

Si no quieres exponer tu máquina:

1. Crear endpoint en Vercel que llame a tu API local
2. Usar un worker/cron que sincronice datos
3. Almacenar datos en PostgreSQL

```typescript
// api/sync/cron.ts - Ejecuta cada 5 minutos
export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const localData = await fetch(`${process.env.LOCAL_API_URL}/data/bots`, {
    headers: { 'Authorization': `Bearer ${process.env.LOCAL_API_KEY}` }
  }).then(r => r.json());

  // Guardar en DB
  await prisma.botMetrics.upsert({
    where: { id: 'latest' },
    create: { botName: 'all', rawData: localData },
    update: { rawData: localData }
  });

  res.json({ synced: true });
}
```

## 📊 Monitoreo en Vercel

### Analytics

Dashboard → Analytics

- Métricas de performance
- Errores
- Uptime
- Requests

### Logs

```powershell
# Ver logs en tiempo real
vercel logs
```

### Función Health Check

```powershell
vercel env list  # Ver vars configuradas
vercel deploy    # hacer deploy manual
vercel inspect   # Info del deployment actual
```

## 🚨 Troubleshooting Deployment

### "Build failed"

```powershell
# Ver logs detallados
vercel logs --tail
```

### "Database connection error"

1. Verificar DATABASE_URL está correcta
2. Probar localmente:

   ```powershell
   npx prisma db execute --stdin < test.sql
   ```

### "API local unreachable"

- ¿Está corriendo `python local_api.py`?
- ¿Usar ngrok o port-forward?
- ¿API_KEY correcta?

### "NextAuth sessions not persisting"

- Verificar NEXTAUTH_SECRET es identical (local vs Vercel)
- Limpiar cookies (F12 → Application → Cookies)

## 🔄 Actualizaciones Continuas

Después del primer deploy, todo es automático:

```powershell
# Hacer cambios localmente
git add .
git commit -m "Fix: dashboard update"
git push origin main

# Vercel detecta y redeploya automáticamente
```

## 📈 Próximos Pasos

1. ✅ Mejorar landing page
2. ✅ Agregar más gráficos/charts
3. ✅ Perfeccionar SSE streaming
4. ✅ Crear panel admin completo
5. ✅ Agregar notificaciones por email
6. ✅ Auto-scaling de recursos

## 💬 Soporte

- Vercel Docs: <https://vercel.com/docs>
- Next.js Docs: <https://nextjs.org/docs>
- Prisma Docs: <https://www.prisma.io/docs>

---

**Última actualización**: 13 Febrero 2026
