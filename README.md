# NutriFighters 🥦🍊

## 🖥️ Backend — NutriFighters API

El backend está desarrollado con **NestJS** (TypeScript), siguiendo arquitectura modular y buenas prácticas REST.

### **Principales módulos y estructura:**
src/
├── alimentos/ # CRUD de alimentos, DTOs, servicio y controlador
│ └── dto/
├── auth/ # Autenticación y autorización JWT, roles
├── common/ # Filtros y middlewares comunes
├── entidades/ # Entidades de base de datos: alimentos, recetas, usuarios
├── recetas/ # CRUD de recetas, DTOs, servicio y controlador
├── Usuarios/ # CRUD de usuarios, DTOs, servicio y controlador
├── test/ # Pruebas unitarias y e2e (Jest)
├── app.controller.ts # Controlador raíz
├── app.module.ts # Módulo principal de NestJS
└── main.ts # Entry point de la aplicación

### **Principales funcionalidades:**
- **CRUD de alimentos** (crear, consultar, actualizar, borrar).
- **CRUD de recetas**.
- **Gestión de usuarios** (registro, login, perfil).
- **Autenticación JWT** y control de roles.
- **Filtros de errores HTTP** y logs de middleware.
- **Pruebas unitarias y de integración** con Jest.
- **Arquitectura modular, DTOs y entidades para validación y tipado fuerte.**

### **Tecnologías:**
- [NestJS](https://nestjs.com/) (TypeScript)
- JWT para autenticación
- TypeORM (o el ORM que uses) para gestión de entidades y base de datos
- Jest para testing

---

### **Cómo ejecutar el backend en local**

1. Clona el repositorio y accede a la carpeta:
   git clone https://github.com/TU_USUARIO/nutrifighters-backend.git
   cd nutrifighters-backend
   
2. Instala dependencias:
npm install

Crea el archivo .env con las variables de entorno necesarias (puerto, conexión DB, JWT_SECRET, etc.).

4. Inicia el servidor de desarrollo:
npm run start:dev
La API estará disponible en http://localhost:3000 (por defecto).

Esta API está pensada para trabajar junto con el frontend de NutriFighters.


**Aplicación web desarrollada con React + TypeScript para gestionar alimentos y recetas saludables.**  

## 🚀 Funcionalidades principales

- **Listado de alimentos** y detalles nutricionales.
- **Buscador** y paginación de alimentos.
- **Creación y edición de alimentos** (formulario validado).
- **Listado y creación de recetas**.
- **Detalle de recetas** con ingredientes y pasos.
- **Cálculo de IMC** (Índice de Masa Corporal).
- **Login y registro** de usuario.
- **Página de perfil**.
- **Páginas de aviso legal y política de privacidad**.
- Navegación SPA (React Router), transiciones visuales (Framer Motion), interfaz moderna y responsive.

---

## 🛠️ Tecnologías utilizadas

- **React** con **TypeScript**
- **Vite** (o CRA, según tu caso)
- **Tailwind CSS** para estilos rápidos y responsivos
- **Framer Motion** para animaciones
- **React Router** para navegación de páginas
- **Axios** para peticiones a API (si aplica)
- **Lucide-react** para iconos SVG

----


## 📄 Cómo probar el proyecto en local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/nutrifighters-frontend.git
   cd nutrifighters-frontend
   Instala dependencias:

2. Instala dependencias:
npm install

3.Arranca el servidor de desarrollo:
npm run dev
Accede a http://localhost:5173 (o el puerto que indique la terminal).

🧑‍💻 Autora
Zahara Mora Barajas

Email: zary.mb@gmail.com

📚 Licencia
MIT License

