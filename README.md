# API Adopción Mascotas (TypeScript)

Este repo contiene una API Node.js + TypeScript para gestionar mascotas.

## Configuración local

1. Copia el archivo de ejemplo de variables de entorno:

```powershell
copy .env.example .env
```

2. Edita `.env` con tus credenciales (Postgres, Cloudinary, etc.). Si prefieres, en lugar de rellenar `DB_HOST`, `DB_USER`, etc., puedes usar la `DATABASE_URL` que te proporciona Render. En `.env.example` ya incluyo una línea comentada de ejemplo:

```text
# DATABASE_URL=postgres://user:password@host:5432/dbname
```

3. Instala dependencias y ejecuta en modo desarrollo:

```powershell
npm install
npm run build
npm start
```

o para desarrollo con watch:

```powershell
npm install
npm run dev
```

## Variables de entorno (obligatorias)

- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
- PORT (opcional, Render establece automáticamente una variable PORT)
- CLOUDINARY_NAME (opcional)
- CLOUDINARY_KEY (opcional)
- CLOUDINARY_SECRET (opcional)