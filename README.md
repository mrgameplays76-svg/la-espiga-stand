# La Espiga — página interactiva de práctica de Trabajo Social

Sitio web estático para un stand educativo de **Constanza Torres Soto** y **Tais Morales Bobadilla**, con información entregada para la experiencia de práctica de Trabajo Social en la Escuela Especial Diferencial La Espiga.

## Cómo abrirlo

Abre `index.html` con cualquier navegador. No usa frameworks, cuentas, bases de datos, rastreadores ni bibliotecas externas. El audio usa la voz de lectura disponible en el navegador y puede variar por dispositivo.

## Cómo publicarlo con GitHub Pages

1. En GitHub crea un repositorio **público** llamado, por ejemplo, `la-espiga-stand`. En GitHub Free la publicación de Pages desde repositorios privados no está disponible.
2. Sube **el contenido de esta carpeta** al directorio raíz del repositorio: `index.html`, `styles.css`, `script.js`, `assets/`, `.nojekyll` y este README. Si subes un ZIP sin extraer o una carpeta contenedora, Pages no verá `index.html`.
3. En el repositorio abre **Settings > Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona **main** y **/(root)**, luego **Save**.
6. Espera la publicación. El enlace normalmente será `https://TU-USUARIO.github.io/la-espiga-stand/`, pero usa la dirección real mostrada en Pages.
7. Abre el enlace desde un teléfono, prueba los botones y recién entonces crea un QR a partir de esa URL exacta. Prueba una impresión antes del stand.

Documentación oficial: https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Accesibilidad

- Tamaño de texto ajustable, alto contraste, resumen en lectura fácil y opción de lectura en voz alta cuando el navegador la admite.
- Actividades de exploración emocional y convivencia con botones grandes, explicaciones sencillas, navegación por teclado y mensajes anunciados mediante `aria-live`.
- Sin cronómetros, puntuaciones, audio que se reproduzca solo ni animaciones necesarias para entender.
- Apartados académicos y fuentes bibliográficas desplegables para quienes desean profundizar.

## Fotografías y privacidad

**No se han publicado fotografías de estudiantes**. El PDF de origen tiene imágenes con personas que podrían ser menores de edad: antes de usar fotos se debe tener autorización válida de la escuela y los responsables cuando corresponda. Evita documentos, datos personales, identificaciones y rostros sin permiso.

La página es pública cuando habilitas GitHub Pages, aunque el QR se distribuya solo en el stand.

## Estructura

- `index.html`: información y actividades.
- `styles.css`: estilos accesibles y diseño adaptable.
- `script.js`: funcionalidad sin dependencias.
- `assets/`: escudos del material proporcionado y favicon.
- `fotografias-autorizadas/`: instrucciones; no incluye fotografías de estudiantes.
- `.nojekyll`: indica a GitHub Pages que sirva el HTML directamente.
