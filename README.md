# 🧁 Dulce Sabor - Comunidad de Reposteros

Una plataforma donde los reposteros comparten sus experiencias, retos y soluciones, y los amantes de la repostería aprenden de ellos.

🔗 **Demo en vivo:** https://pasteleria-dulce-sabor.vercel.app

---

## 📸 Capturas de pantalla

| Página de inicio | Listado de experiencias | Dashboard de repostero |
|------------------|-------------------------|------------------------|
| ![Inicio](/screenshots/inicio.png) | ![Experiencias](/screenshots/experiencias.png) | ![Dashboard](/screenshots/dashboard.png) |

---

## 🛠️ Stack tecnológico

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth
- **Mutaciones:** Server Actions
- **API externa:** TheMealDB
- **Despliegue:** Vercel
- **Control de versiones:** Git + GitHub

---

## 👥 Roles de usuario

| Rol | Permisos |
|-----|----------|
| **Cliente** | Ver experiencias, ver detalles, explorar recetas externas, buscar experiencias |
| **Repostero** | Todo lo del cliente + crear, editar y eliminar sus propias experiencias |

---

## 👤 Credenciales de prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Cliente | `clienteprueba@gmail.com` | `123456` |
| Repostero | `reposteroprueba@gmail.com` | `987456` |

---

## 📊 Modelo de datos

### Tablas en Supabase

**profiles**
- `id` (UUID, PK) - Referencia a auth.users
- `nombre_completo` (TEXT)
- `rol` (TEXT) - `cliente` o `repostero`
- `created_at` (TIMESTAMP)

**categorias**
- `id` (BIGSERIAL, PK)
- `nombre` (TEXT, UNIQUE)

**postres**
- `id` (BIGSERIAL, PK)
- `nombre` (TEXT)
- `descripcion` (TEXT)
- `dificultad` (TEXT) - `Fácil`, `Media`, `Difícil`
- `tiempo_preparacion` (TEXT)
- `experiencia` (TEXT)
- `solucion` (TEXT)
- `imagen_url` (TEXT)
- `user_id` (UUID, FK → auth.users)
- `categoria_id` (BIGINT, FK → categorias)
- `created_at` (TIMESTAMP)

### Relaciones
- Un usuario (repostero) → muchas experiencias
- Una categoría → muchas experiencias

---

## 🔐 Variables de entorno

Crear un archivo `.env.local` con:

NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase

---

## 🚀 Instalación local

# Clonar el repositorio
git clone https://github.com/ivonmartinez0201-pixel/pasteleria-dulce-sabor.git
cd pasteleria-dulce-sabor

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Completar con tus claves de Supabase

# Ejecutar en desarrollo
npm run dev

✅ Funcionalidades implementadas
Autenticación (registro, login, logout)
Protección de rutas con middleware
2 roles de usuario (cliente/repostero)
CRUD completo con Server Actions
API externa (TheMealDB) con fetch
Buscador con useState
Notificaciones de éxito
Experiencias de reposteros con dificultad y soluciones
Diseño responsive
Despliegue en Vercel

🎥 Video de defensa
[Enlace al video de defensa](https://ister-my.sharepoint.com/:v:/g/personal/ivon_martinez_ister_edu_ec/IQBTiSR8EGr0QbJo0mINl4ckAS7emjPMnAJOSCHFvB_W2GI?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=XoVWN4)

👩‍💻 Autor
Ivon Martinez
GitHub: @ivonmartinez0201-pixel

📅 Proyecto Integrador - Segundo Parcial - Aplicaciones Web