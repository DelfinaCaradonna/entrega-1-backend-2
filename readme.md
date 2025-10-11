# 🚀 Entrega Final - Backend II: Sistema Completo de E-commerce

## 📋 Descripción del Proyecto

Este proyecto es la **entrega final** del curso **Backend II: Diseño y Arquitectura Backend** de Coderhouse. Se trata de una aplicación web completa que implementa:

- **Autenticación y autorización** robusta con JWT y Passport.js
- **Gestión de usuarios** con roles (admin/user)
- **Gestión de productos** (CRUD)
- **Carrito de compras** con persistencia en MongoDB
- **Sistema de compras** con tickets y control de stock
- **Recuperación de contraseña** vía correo con Nodemailer
- Arquitectura escalable con **DAO, Repository y DTO**
- **CORS** configurado para permitir requests desde el frontend

La estructura de carpetas está organizada para **facilitar el mantenimiento, escalabilidad y separación de responsabilidades**.

---

## 🎯 Objetivos del Proyecto

- Implementar un **sistema de autenticación seguro** con JWT
- Gestionar **roles y permisos** de usuarios
- Manejar **cookies firmadas** para seguridad adicional
- Integrar **Passport.js** para autenticación
- Crear **endpoints RESTful** para productos y carrito
- Implementar **procesamiento de compras** con tickets y stock
- Aplicar **patrones de diseño** (DAO, Repository, DTO)
- Habilitar **CORS** para requests desde el frontend

---

## 🔐 Funcionalidades Implementadas

### **Usuarios**

- ✅ Registro de usuarios con validación y hash de contraseñas
- ✅ Login seguro y creación de JWT
- ✅ Logout y limpieza de cookies
- ✅ Recuperación de contraseña mediante correo con Nodemailer y token seguro

### **Autorización y Seguridad**

- ✅ Middleware de autenticación con Passport.js
- ✅ Protecciones de rutas sensibles según rol (`USER` / `ADMIN`)
- ✅ Tokens JWT con expiración
- ✅ Cookies firmadas
- ✅ Validación de datos en todos los endpoints

### **Productos**

- ✅ Crear, actualizar, eliminar y listar productos (solo admin)
- ✅ Consultar productos por ID o listar todos (admin y usuario)

### **Carrito de Compras**

- ✅ Agregar productos al carrito
- ✅ Modificar cantidad de productos
- ✅ Eliminar productos del carrito
- ✅ Vaciar carrito completo
- ✅ Comprar carrito: genera ticket y actualiza stock

### **Arquitectura y Diseño**

- ✅ Uso de **DAO** para acceso a la base de datos
- ✅ Uso de **Repository** y **DTO** para manipular datos y mantener la capa de negocio separada
- ✅ Estructura de carpetas modular y escalable
- ✅ Integración con **Nodemailer** para recuperación de contraseña
- ✅ Configuración de **CORS** para permitir requests externas

### **Flujo de Usuario**

1. **Registro**

   - Ir a `/register`
   - Completar formulario
   - Usuario creado con rol `USER` o `ADMIN` si es `adminCoder@coder.com`

2. **Login**

   - Ir a `/` (página principal)
   - Ingresar email y contraseña
   - JWT generado y cookie firmada creada

3. **Acceso a Contenido Protegido**

   - Redirige a `/current` o `/products` según rol
   - Solo accesible con token JWT válido

4. **Gestión de Productos** (solo admin)

   - Crear, actualizar o eliminar productos mediante `/api/products`

5. **Carrito y Compras**
   - Agregar productos al carrito
   - Modificar cantidad o eliminar productos
   - Comprar carrito genera ticket y actualiza stock

---

### **Usuarios de Prueba**

- **Admin**: `adminCoder@coder.com` / contraseña usada al registrar
- **Usuario regular**: cualquier email registrado

---

<div align="center">

### Gracias por revisar mi proyecto! 🌟

_Desarrollado con ❤️ para el curso de Coderhouse_

</div>
