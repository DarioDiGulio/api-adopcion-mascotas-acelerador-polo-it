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

## Despliegue en Render

1. Sube tu repo a GitHub (o GitLab).
2. Crea una base de datos Postgres en Render (Dashboard → Databases → Create Database). Copia la conexión.
3. Crea un nuevo Web Service en Render (Dashboard → New → Web Service):
   - Conecta tu repo y rama.
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node
4. En la sección Environment → Environment Variables añade:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` (usa los valores de la DB de Render)
   - `PORT` (puedes dejarlo vacío; Render establece `PORT` automáticamente, pero tu app usa `process.env.PORT || 3000`)
   - `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET` (si usas Cloudinary)
5. Render ejecutará `npm install` y `npm run build`, y lanzará `npm start`.

### Usando Docker en Render

Render detecta `Dockerfile` si está presente. El `Dockerfile` actual instala dependencias, construye TypeScript y ejecuta `npm start`.

Si quieres que `dist/` no esté en el repo (recomendado), añade `dist/` a `.gitignore`. Render ejecutará la build en el servidor.

## Ignorar `dist` (recomendado)

Si quieres que lo haga automáticamente desde este repo, confírmame y haré:

- Añadir `dist/` a `.gitignore` (si no está)
- Ejecutar `git rm -r --cached dist` si ya está trackeado
- Hacer commit y push con el cambio

---

Si quieres, puedo también crear en Render el servicio (si me proporcionas acceso), o guiarte paso a paso con capturas de pantalla.
