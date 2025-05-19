# MandyBoarder Web — README (Borrador)

Este README describe la estructura, componentes y recursos visuales de la **página web estática MandyBoarder**, diseñada para un landing interactivo, bilingüe y visualmente atractivo. Cada sección hace referencia a los archivos `.webp` (con canal alfa) organizados en `/WEB_ELEMENTS/SECTIONS/`.

> **Nota:** Este documento es un **borrador** y puede evolucionar según el desarrollo y feedback del proyecto.

---

## Índice de Secciones

1. [Hero (Presentación)](#1-hero-presentación)
2. [HeroPic (Imagen Dual)](#2-heropic-imagen-dual)
3. [HeroBio (Biografía Interactiva)](#3-herobio-biografía-interactiva)
4. [Passport (Pasaporte y Sello)](#4-passport-pasaporte-y-sello)
5. [Why Spanish? (¿Por qué español?)](#5-why-spanish-¿por-qué-español)
6. [Mapa (Mapa de viajes)](#6-mapa-mapa-de-viajes)
7. [Tiers (Planes)](#7-tiers-planes)
8. [Final / Greetings (Cierre y Legales)](#8-final--greetings-cierre-y-legales)

---

## 1. Hero (Presentación)

**Propósito:** Introducir al instructor principal con tres capas visuales superpuestas.

**Archivos:**

* `/WEB_ELEMENTS/SECTIONS/Hero/background.webp`
* `/WEB_ELEMENTS/SECTIONS/Hero/MeetYourInstructor.webp`
* `/WEB_ELEMENTS/SECTIONS/Hero/akaMandy.webp`

**Notas:**

* Contenedor cuadrado.
* Animación inicial: Fade-in secuencial de cada capa.
* Opcional: Parallax en hover para versiones futuras.

---

## 2. HeroPic (Imagen Dual)

**Propósito:** Mostrar las dos facetas de Mandy (surfista y motero) con una máscara deslizante.

**Archivos:**

* `/WEB_ELEMENTS/SECTIONS/HeroPic/wave.webp`
* `/WEB_ELEMENTS/SECTIONS/HeroPic/moto.webp`

**Notas:**

* Contenedor cuadrado.
* Máscara horizontal controlada por posición del cursor (Image Comparison Slider).

---

## 3. HeroBio (Biografía Interactiva)

**Propósito:** Presentar la biografía con un panel que alterna entre inglés y español mediante una animación flip.

**Archivos:**

* `/WEB_ELEMENTS/SECTIONS/HeroBio/HEROBIOeng.webp`
* `/WEB_ELEMENTS/SECTIONS/HeroBio/HEROBIOesp.webp`

**Notas:**

* Panel cuadrado con animación flip horizontal al hacer clic.
* Cara frontal: Biografía en inglés.
* Cara posterior: Biografía en español.
* Transición suave con efecto 3D para mejorar experiencia de usuario.
* Indicador visual que sugiera la interacción (icono de flip).

---

## 4. Passport (Pasaporte y Sello)

**Propósito:** Metáfora visual de "viajar con el español". Un sello animado cae sobre el pasaporte.

**Archivos:**

* `/WEB_ELEMENTS/SECTIONS/Passport/desk.webp`
* `/WEB_ELEMENTS/SECTIONS/Passport/seal.webp`

**Notas:**

* El sello tiene animación de rebote al entrar en viewport (JS/CSS @keyframes).
* Fallback: transición opacidad/escala.

---

## 5. Why Spanish? (¿Por qué español?)

**Propósito:** Panel giratorio con mensaje motivacional en inglés y español.

**Archivos:**

* `/WEB_ELEMENTS/SECTIONS/WhySpanish/WhySpa.webp`
* `/WEB_ELEMENTS/SECTIONS/WhySpanish/PorqueEsp.webp`

**Notas:**

* Card flip horizontal al hacer click.

---

## 6. Mapa (Mapa de viajes)

**Propósito:** Enfatiza el espíritu viajero con un mapa de rutas. El resto de la página se pone en escala de grises al hacer hover sobre esta sección.

**Archivos:**

* `/WEB_ELEMENTS/SECTIONS/Mapa/MAPA.webp`

**Notas:**

* El contenedor se adapta al tamaño de la imagen.
* Canal alfa respetado.

---

## 7. Tiers (Planes)

**Propósito:** Muestra los tres planes con efecto carrusel 3D. El plan activo está al frente; los otros dos, más pequeños y oscuros detrás.

**Archivos:**

* `/WEB_ELEMENTS/SECTIONS/Tiers/BaginnersPack.webp`
* `/WEB_ELEMENTS/SECTIONS/Tiers/TravelTier.webp`
* `/WEB_ELEMENTS/SECTIONS/Tiers/FullProgram.webp`
* `/WEB_ELEMENTS/SECTIONS/Tiers/cursor.webp`

**Notas:**

* Clic a la izquierda o derecha para navegar por los tiers.
* El cursor decorativo flota encima del panel.

---

## 8. Final / Greetings (Cierre y Legales)

**Propósito:** Cierre visual e informativo. Tres tarjetas giratorias: mensaje de bienvenida, política de privacidad inglés y español.

**Archivos:**

* `/WEB_ELEMENTS/SECTIONS/FINAL/Comencemos.webp`
* `/WEB_ELEMENTS/SECTIONS/FINAL/PrivacyPolicy.webp`
* `/WEB_ELEMENTS/SECTIONS/FINAL/PoliticaPrivacidad.webp`

**Notas:**

* Card flip en ciclo con cada click.

---

## Archivos JS sugeridos

* **`/js/hero-fadein.js`**: Controla el fade-in secuencial/parallax de la sección Hero.
* **`/js/slider-mask.js`**: Controla la máscara de deslizamiento en HeroPic.
* **`/js/bio-tooltip.js`**: Renderiza el texto desde JSON y gestiona tooltips de traducción.
* **`/js/stamp-anim.js`**: Dispara la animación de sello en Passport cuando la sección entra en viewport.
* **`/js/flip-card.js`**: Maneja las animaciones de flip (Why Spanish y Final).
* **`/js/grayscale-map.js`**: Activa/desactiva el filtro de escala de grises en el sitio según hover en Mapa.
* **`/js/tiers-carousel.js`**: Lógica de carrusel y animaciones en la sección Tiers.

## Archivos CSS sugeridos

* **`/css/hero.css`**: Estilos y posición de capas del Hero.
* **`/css/slider.css`**: Máscara y transiciones para HeroPic.
* **`/css/bio.css`**: Panel de biografía, fuente Rokkitt SemiBold, tooltips.
* **`/css/passport.css`**: Posicionamiento y animaciones del sello.
* **`/css/flipcard.css`**: Card flip para Why Spanish y Final.
* **`/css/map.css`**: Estilos de mapa y filtro escala de grises.
* **`/css/tiers.css`**: Carrusel con escalado y opacidad, decorativo cursor.

Cada archivo JS y CSS se documentará con ejemplos de uso y dependencias en versiones futuras.

---

**Este README es un borrador y debe ser actualizado a medida que avance el desarrollo visual y funcional.**
