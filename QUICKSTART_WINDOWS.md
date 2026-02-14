# ┌─────────────────────────────────────────────────────┐

# │     GUÍA RÁPIDA: INICIAR MISSTNA WEB EN WINDOWS     │

# └─────────────────────────────────────────────────────┘

## PASO 1: Verificar Requisitos

✓ Node.js v18+
✓ npm v11+  
✓ Python 3.8+ (opcional, para API local)
✓ Visual Studio Code (recomendado)

## PASO 2: Abrir Terminal PowerShell

Abre PowerShell como Administrador y navega a:

```powershell
cd "$env:USERPROFILE\OneDrive\Escritorio\misstna-web"
```

## PASO 3: Instalar Dependencias (Primera vez)

```powershell
npm install
```

Espera 2-3 minutos...

## PASO 4: Configurar Variables de Entorno

1. Haz un copy de `.env.example` a `.env.local`
2. Edita `.env.local` con los valores:

```
LOCAL_API_URL="http://localhost:5000"
LOCAL_API_KEY="tu-clave-segura"
```

## PASO 5A: Iniciar Frontend (Terminal 1)

En PowerShell:

```powershell
npm run dev
```

Espera a que aparezca:

```
  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
```

Abre en navegador: **<http://localhost:3000>**

## PASO 5B: Iniciar API Local (Terminal 2)

Abre OTRA terminal PowerShell en la misma carpeta:

```powershell
# Instalar depenendencias Python (primera vez)
pip install -r requirements.txt

# Ejecutar API
python local_api.py
```

Deberías ver:

```
INFO:     Uvicorn running on http://0.0.0.0:5000
```

## PASO 6: Testear Conexión

Abre OTRA terminal PowerShell:

```powershell
curl -H "Authorization: Bearer your-api-key-here" http://localhost:5000/health
```

Deberías ver JSON con estado "online"

## PASO 7: Ingresar al Dashboard

En navegador <http://localhost:3000>:

1. Click en "Ingresar"
2. Email: <admin@misstna.app>
3. Contraseña: password123

Si no funciona, crea un usuario en Prisma Studio:

```powershell
npx prisma studio
```

## 🎯 Troubleshooting

### "npm: El término no se reconoce"

→ Reinicia PowerShell o agrega Node.js a PATH

### "python: El término no se reconoce"

→ pip install --upgrade pip
→ python -m pip install -r requirements.txt

### "Puerto 3000 ya en uso"

→ Cambia en .env: NEXTAUTH_URL="<http://localhost:3001>"
→ Ejecuta: npm run dev -- -p 3001

### "No hay datos en dashboard"

→ ¿Está corriendo python local_api.py?
→ ¿El archivo dashboard_data.json existe en MissTNA_Bot?

## 📝 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `.env.local` | Variables de entorno (NO commitear) |
| `src/app/` | Páginas y rutas |
| `src/components/` | Componentes React |
| `src/lib/` | Utilities y funciones |
| `prisma/schema.prisma` | Definición de BD |
| `local_api.py` | API Python para sincronizar bots |

## 🚀 Próxima: Deploy en Vercel

```powershell
npm i -g vercel
vercel
```

## 📞 Ayuda

Lee README.md para documentación completa
