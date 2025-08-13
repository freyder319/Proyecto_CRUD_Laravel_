# 📦 Gestor de Inventario, Catálogo Virtual y Punto de Venta (POS)

Aplicación web desarrollada con **Angular** (frontend) y **Laravel** (backend), que permite administrar productos, clientes y ventas.  
Incluye funcionalidades de **CRUD completo** (Crear, Leer, Actualizar, Eliminar) para productos, clientes.

---

## 🚀 Características principales
- Gestión de productos con imágenes, precios y stock.
- Administración de clientes.
- Actualización automática del inventario.
- Interfaz moderna y responsiva con Angular.

---

## 🛠️ Instalación y configuración

### Backend (Laravel)
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/freyder319/Proyecto_CRUD_Laravel_.git
   cd Proyecto_CRUD_Laravel_
   ```
2. Instalar dependencias:
   ```bash
   composer install
   ```
3. Configurar el archivo `.env` con los datos de la base de datos.
4. Ejecutar migraciones:
   ```bash
   php artisan migrate
   ```
5. Levantar el servidor:
   ```bash
   php artisan serve
   ```
   El backend estará disponible en: `http://localhost:8000`

---

### Frontend (Angular)
1. Clonar el repositorio del frontend:
   ```bash
   git clone <URL-del-repositorio-frontend>
   cd <carpeta-del-frontend>
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar las URLs de la API en los servicios Angular (por defecto `http://localhost:8000/api`).
4. Iniciar el servidor de desarrollo:
   ```bash
   ng serve
   ```
5. Abrir en el navegador:
   ```
   http://localhost:4200
   ```

---

## 📋 Uso de la aplicación
1. **Inventario**
   - Ver la lista de productos.
   - Agregar nuevos productos con el botón **"Agregar Producto"**.
   - Editar o eliminar productos desde el modal de edición.
3. **Clientes**
   - Crear, modificar o eliminar clientes.

---

## 📌 Notas
- Este proyecto es una **prueba de concepto** para un sistema CRUD usando **Angular** y **Laravel**.
- Si el enlace al repositorio no funciona, puede contactarse al teléfono: **📞 318 482 8051**

---

## 📄 Licencia
Este proyecto está bajo la licencia MIT. Puedes usarlo y modificarlo libremente.
