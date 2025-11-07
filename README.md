# 🧩 Aplicativo: Calidad de Software

Este proyecto es una aplicación interactiva desarrollada con **React** y **TailwindCSS** que permite comprender y evaluar la **calidad del software** de manera teórica y práctica.

Incluye secciones informativas sobre **conceptos, normas, modelos, estándares** y un módulo de **evaluación cuantitativa**, con persistencia local mediante `localStorage`.

---

## 🚀 Tecnologías utilizadas

- ⚛️ **React** (Create React App)
- 💨 **TailwindCSS** para estilos
- 💾 **localStorage** para persistencia de datos
- 📄 **JavaScript (ES6)**

---

## 🧠 Conceptos implementados en la app

### ✅ ¿Qué es la calidad de software?

La **calidad de software** es el grado en que un producto de software cumple con los requisitos funcionales y no funcionales establecidos, y satisface las necesidades y expectativas del cliente o usuario final.

**Aspectos clave:**
- Cumplimiento de requisitos funcionales.
- Satisfacción de las expectativas del usuario.
- Características no funcionales (usabilidad, rendimiento, seguridad, mantenibilidad, portabilidad).
- Mejora continua del producto y proceso.

**Beneficios:**
- Menor cantidad de errores y fallos.
- Mayor satisfacción y confianza del usuario.
- Reducción de costos de mantenimiento.
- Mayor mantenibilidad y escalabilidad del software.
- Mejor alineación con los objetivos del negocio.

---

## 📘 Normas de calidad de software

Las **normas** son marcos internacionales que definen criterios, procesos y características para garantizar la calidad del software y sus procesos.

### Principales normas:

#### 🔹 ISO/IEC 25010 (Modelo de Calidad de Producto)
Define ocho características principales:  
**Adecuación funcional, Fiabilidad, Usabilidad, Eficiencia del rendimiento, Mantenibilidad, Portabilidad, Compatibilidad y Seguridad.**

#### 🔹 ISO/IEC 9126
Norma predecesora de la 25010, que definió las primeras métricas de evaluación de calidad del software.

#### 🔹 ISO/IEC 15504 (SPICE)
Marco de referencia para la **evaluación y mejora de procesos de desarrollo de software.**

#### 🔹 ISO/IEC 5055
Mide la calidad interna del software a nivel estructural, analizando código fuente (seguridad, mantenibilidad, fiabilidad).

#### 🔹 ISO 9001 (Gestión de la Calidad)
Establece requisitos para implementar un **sistema de gestión de calidad (SGC)** aplicable a cualquier organización, incluyendo aquellas que desarrollan software.

**Beneficios de aplicar ISO 9001:**
- Mejora continua en procesos y resultados.  
- Mayor satisfacción del cliente.  
- Control y documentación de procesos.  
- Certificación reconocida internacionalmente.  
- Enfoque en la eficiencia y la calidad de entrega.

---

## 🧮 Modelos de calidad de software

Los **modelos de calidad** ofrecen marcos teóricos para evaluar, organizar y comparar atributos de calidad.

### Modelos más conocidos:

#### 🧱 Modelo de McCall (1977)
Agrupa la calidad en tres categorías:
- **Operación del producto:** corrección, fiabilidad, eficiencia, integridad, usabilidad.  
- **Revisión del producto:** mantenibilidad, flexibilidad, testabilidad.  
- **Transición del producto:** portabilidad, reutilización, interoperabilidad.  

#### 🧩 Modelo de Boehm (1978)
Plantea características de alta, media y baja jerarquía para medir la calidad, considerando confiabilidad, seguridad y usabilidad.

#### ⚙️ Modelo FURPS (de Hewlett-Packard)
Define cinco atributos:  
**Funcionalidad, Usabilidad, Fiabilidad, Rendimiento y Soportabilidad.**

#### 🌐 Modelo ISO/IEC 25010
El más actualizado y adoptado internacionalmente, utilizado en procesos de auditoría y certificación de calidad de software.

---

## 📏 Estándares de calidad de software

Los **estándares** establecen prácticas y métricas específicas para garantizar que el software cumpla criterios objetivos de calidad.

### Ejemplos:

- **ISO/IEC 90003:** Guía para aplicar ISO 9001 al desarrollo de software.  
- **IEEE 829:** Estándar para documentación de pruebas.  
- **IEEE 730:** Estándar para planes de aseguramiento de calidad.  
- **ISO/IEC 25000 (SQuaRE):** Marco integral de evaluación de calidad del software.

| Tipo | Propósito | Ejemplo |
|------|------------|----------|
| **Norma** | Define marcos globales de gestión o evaluación | ISO/IEC 25010, ISO 9001 |
| **Modelo** | Describe cómo medir o clasificar la calidad | McCall, Boehm, ISO 25010 |
| **Estándar** | Define prácticas concretas y documentos requeridos | IEEE 829, ISO/IEC 90003 |

---

## 🧾 Módulo de evaluación

La aplicación permite registrar y calificar atributos de calidad en una escala de **0 a 5**, aplicando pesos personalizados y mostrando una **puntuación final ponderada** junto con una **calificación cualitativa** (“Excelente”, “Bueno”, “Aceptable”, etc.).

### Funcionalidades:
- Modificar valores y pesos de métricas.  
- Guardar evaluaciones en `localStorage`.  
- Exportar resultados en formato **JSON** o **CSV**.  
- Copiar resultados al portapapeles.  
- Revisar evaluaciones guardadas.

### Métricas predeterminadas:
- Funcionalidad  
- Confiabilidad  
- Usabilidad  
- Eficiencia  
- Mantenibilidad  
- Portabilidad  

---

## 🧰 Scripts disponibles

En el directorio del proyecto puedes ejecutar:

### `npm start`
Ejecuta la aplicación en modo desarrollo.  
Abre [http://localhost:3000](http://localhost:3000).

### `npm run build`
Construye la aplicación optimizada para producción.

### `npm test`
Ejecuta pruebas unitarias.

---

## 📊 Evaluación y mejoras futuras

Este proyecto puede ampliarse agregando:
- Módulos de **pruebas automatizadas**.
- **Integración continua (CI/CD)**.  
- Evaluaciones de código mediante **análisis estático (ESLint, SonarQube)**.
- Exportación de reportes en PDF.  
- Versionado colaborativo en **GitHub Pages, Netlify o Vercel**.

---

## 👩‍💻 Autor

**Valentina Pérez**  
Proyecto académico — Calidad de Software  
Universidad / Curso 54430  
© 2025

---

## 📸 Vista previa

![Interfaz de evaluación de calidad de software](https://i.imgur.com/xpV4o8y.png)
*(Ejemplo de la interfaz del aplicativo con pestañas y métricas evaluables)*

---
© 2025 – Todos los derechos reservados