# 🛠️ Librería Utileria.js

**Autor:** [Jordi Moises Alvarez Mora]  
**Materia:** Programacion Web  

---

## 📌 Descripcion y Problema que Resuelve
`utileria.js` es una librería ligera en JavaScript puro (Vanilla JS) diseñada para solucionar de forma eficiente y reutilizable la validación de formularios, cálculo de fechas y formateo de datos en aplicaciones web, sin depender de librerías externas ni frameworks pesados.

---

## 🚀 Instalacion

Incluye el archivo `utileria.js` antes de cerrar la etiqueta `</body>` en tu proyecto HTML:

```html
<script src="js/utileria.js"></script>
```

---

## 💻 Uso con Ejemplos de Codigo

### 1. Validar Correo Electrónico
```javascript
console.log(validarCorreo("usuario@dominio.com")); 
console.log(validarCorreo("correo_invalido.com")); 
```

### 2. Solo Letras
```javascript
console.log(soloLetras("Juan Pérez")); 
console.log(soloLetras("Usuario123")); 
```

### 3. Validar Longitud de Número / Cadena
```javascript
console.log(validarLongitud("12345", 5)); 
console.log(validarLongitud("123456", 5)); 
```

### 4. Calcular Edad y Mayoría de Edad
```javascript
console.log(calcularEdad("2000-05-15"));
console.log(esMayorDeEdad("2010-01-01")); 
```

### 5. Validar Contraseña Segura
```javascript
console.log(validarPassword("Password123!")); 
console.log(validarPassword("12345"));
```

### 6. CURP Valida
```javascript
// Validar CURP (18 caracteres)
console.log(validarCURP("ABCD000101HDFXXX00")); 

// Validar Código Postal (5 dígitos)
console.log(validarCP("01000"));
```

---

## 📸 Capturas de Pantalla

### 1. Pruebas en Consola 

![Validación en Consola](img/img1.jpg)

---

### 2. Formulario de Registro y Modal Integrado (`index.html`)

![Formulario correcto](img/img2.jpg)
![Formulario incorrecto](img/img3.jpg)

---

### 3. Página de Inicio de Sesión (`login.html`)
Validación del formulario de acceso utilizando de forma conjunta las funciones `validarCorreo` y `validarPassword`.

![Login correcto](img/img4.jpg)
![Login incorrecto](img/img5.jpg)
---

## 🎥 Video Demonstrativo 
(https://youtube.com/shorts/iwQ01n1Yf4Q?feature=share)