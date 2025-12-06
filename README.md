🛍️ TesloShop — E-Commerce UI + API
Adaptación personalizada del proyecto del curso de Angular de Fernando Herrera

TesloShop es una tienda online completamente funcional construida con Angular 17, NestJS, PostgreSQL y Cloud Run (Google Cloud).
Esta versión ha sido rediseñada y extendida para ser un e-commerce moderno, elegante, modular y totalmente reutilizable para cualquier tipo de negocio.

Incluye:

🧩 Custom UI completa (Tailwind + DaisyUI + animaciones)

🛒 Carrito de compras 100% funcional (Reactive Signals)

🔐 Autenticación JWT

📦 Módulo de productos CRUD

🖼️ Gestión de imágenes estáticas desde el backend

🚀 Deploy en Cloud Run + Angular en producción

🧪 Arquitectura limpia y modular


Características principales
🎨 Diseño personalizado

La interfaz fue reconstruida adaptándolo a mi manera:

Diseño limpio y minimalista

Animaciones sutiles con transform y transiciones

Hover effects con escalado dinámico

Sistema de tarjetas responsivo

Layout orientado a conversión (UX comercial)

🛒 Carrito de compras con Signals

Carrito de compras implementado usando el nuevo sistema de Angular Signals:

Añadir productos

Persistencia local

Botón dinámico “Añadir / En carrito”

Integración lista para conectar Stripe, PayPal o cualquier pasarela

🔐 Sistema de autenticación completo

Backend listo para producción con:

JWT

Roles (Admin / User)

Guardias

Protección de endpoints

Registro, Login, Check-Status

📦 Administrador de productos

Módulo CRUD profesional:

Crear productos

Editar

Actualizar imágenes

Filtrar por categoría o género

Tags dinámicos

Stock, tallas, precios…

🖼️ Gestión de imágenes desde el backend

El backend sirve imágenes estáticas desde:

static/products


¡Listo para servir imágenes de forma eficiente en producción!

 Backend NestJS desplegado en Cloud Run

El backend funciona en contenedores Docker, desplegado en Google Cloud:

Cloud Run (serverless containers)

Artifact Registry

PostgreSQL en producción

SSL, CORS, env vars

CI/CD manual y auto-deploy

⚙️ Frontend Angular optimizado

Compilado y deployado en hosting estático (Netlify), con:

Lazy Loading

Modularización por features

Custom Pipes

Responsive UI

Buen rendimiento en Lighthouse

🧱 Tecnologías principales
Frontend

Angular 19

Angular Signals

TailwindCSS

DaisyUI

TypeScript

RxJS

Router + Standalone Components

Backend

NestJS

TypeORM

PostgreSQL

JWT + Guards

Static Files

Docker

Cloud Run / Google Cloud

¿Para qué sirve este proyecto?

Este proyecto está diseñado como una base sólida para cualquier tienda online profesional, no solo para productos Tesla.
Puedes adaptarlo rápidamente a:

Ropa

Electrónica

Servicios

Productos digitales

Tiendas pequeñas o medianas

El código es modular, escalable y preparado para integrar pagos, dashboards y analíticas.

Arranque local
Frontend
cd frontend
ng serve


http://localhost:4200

Backend
cd backend
yarn start:dev

📦 Build producción
ng build --configuration production

🛠️ Estructura del proyecto (simplificada)
frontend/
  src/
    app/
      products/
      shared/
      cart/
      auth/
      core/
    assets/
backend/
  src/
    products/
    files/
    auth/
    common/
    static/
      products/
Dockerfile

 Autor

Sime (SimeDev)
Desarrollador Web Full-Stack
