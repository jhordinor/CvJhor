# Portafolio web profesional — Javier Jhordiño

Sitio Flask con foto profesional, código de perfil interactivo y presentación de experiencia, proyectos y habilidades. La imagen que proporcionaste está guardada en `static/img/foto-profesional.webp` y se utiliza directamente en la portada.

## Estructura

```text
PORTAFOLIO_JAVIER_JHORDINO_EJECUTIVO/
├── app.py
├── requirements.txt
├── templates/index.html
└── static/
    ├── css/index.css
    ├── js/index.js
    ├── img/foto-profesional.webp
    └── favicon.svg
```

## Ejecutar en Windows (VS Code / PowerShell)

```powershell
py -m pip install -r requirements.txt
py app.py
```

Abrir `http://127.0.0.1:5000`.

## Publicar en Render

- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`
- Runtime: Python

## Personalización

- `templates/index.html`: textos, experiencia, enlaces y secciones.
- `static/css/index.css`: diseño, colores, responsive.
- `static/js/index.js`: pestañas, modo claro/oscuro, navegación.
- `static/img/foto-profesional.webp`: fotografía del perfil.

El sitio es un CV web, sin botón para descargar PDF. Los períodos de trabajo solo están en la sección Experiencia. Verifica la exactitud de las fechas y aportes antes de hacerlo público. El portafolio no muestra DNI ni domicilio privado. Los mockups de proyectos son representaciones conceptuales.
