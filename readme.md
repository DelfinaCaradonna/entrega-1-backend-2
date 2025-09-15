# 🚀 Entrega N1 - Backend II: Diseño y Arquitectura Backend

## 📋 Descripción del Proyecto

Este proyecto es la **primera entrega** del curso **Backend II: Diseño y Arquitectura Backend** de Coderhouse. Se trata de una aplicación web completa que implementa un sistema de autenticación y autorización robusto utilizando las tecnologías más modernas del ecosistema Node.js.

## 🎯 Objetivos del Proyecto

- Implementar un sistema de autenticación seguro con JWT
- Manejar autorización de usuarios con diferentes roles
- Utilizar cookies firmadas para mayor seguridad
- Integrar Passport para gestión de autenticación
- Crear una arquitectura escalable y mantenible

## 🔐 Funcionalidades Implementadas

### **Autenticación**
- ✅ **Registro de usuarios** con validación de datos
- ✅ **Login seguro** con verificación de credenciales
- ✅ **Logout completo** con limpieza de cookies
- ✅ **Recuperación de contraseña** con actualización segura

### **Autorización**
- ✅ **Middleware de autenticación** con Passport.js
- ✅ **Protección de rutas** sensibles
- ✅ **Sistema de roles** (admin/user)
- ✅ **Verificación JWT** en cada request

### **Seguridad**
- ✅ **Encriptación de contraseñas** con bcrypt
- ✅ **Cookies firmadas** para mayor seguridad
- ✅ **Tokens JWT** con expiración
- ✅ **Validación de datos** en todos los endpoints

## 📱 Uso de la Aplicación

### **Flujo de Usuario**

1. **Registro**
   - Ir a `/register`
   - Completar formulario con datos personales
   - Sistema valida email único y crea usuario

2. **Login**
   - Ir a `/` (página principal)
   - Ingresar email y contraseña
   - Sistema valida credenciales y genera JWT

3. **Acceso a Contenido Protegido**
   - Después del login, redirige a `/products`
   - Vista protegida que muestra datos del usuario
   - Solo accesible con token JWT válido

4. **Logout**
   - Hacer clic en logout
   - Sistema limpia cookies y redirige al login

### **Usuarios de Prueba**

- **Admin**: `adminCoder@coder.com` (rol: admin)
- **Usuario regular**: Cualquier email registrado (rol: user)

<div align="center">

### Gracias por revisar mi proyecto! 🌟

*Desarrollado con ❤️ para el curso de Coderhouse*

</div>