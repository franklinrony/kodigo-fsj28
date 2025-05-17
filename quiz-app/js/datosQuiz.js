// Datos de las preguntas para cada categoría del quiz
export const datosQuiz = {
  html: {
    nombre: "HTML",
    clase: "icono-html",
    preguntas: [
      {
        pregunta: "¿Qué significa HTML?",
        opciones: [
          "Lenguaje de Marcado de Hipertexto",
          "Lenguaje de Transferencia de Hipertexto",
          "Lenguaje Múltiple de Hipertexto",
          "Lenguaje de Herramientas Múltiples"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Qué etiqueta se usa para crear un hipervínculo?",
        opciones: [
          "<link>",
          "<a>",
          "<href>",
          "<hipervinculo>"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Qué elemento HTML se usa para definir la estructura de una tabla?",
        opciones: [
          "<table>",
          "<tab>",
          "<tr>",
          "<tbl>"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Qué atributo se usa para especificar la URL del recurso vinculado?",
        opciones: [
          "src",
          "link",
          "href",
          "url"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Qué elemento HTML define el título de un documento?",
        opciones: [
          "<header>",
          "<head>",
          "<title>",
          "<top>"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Qué elemento HTML se usa para especificar un pie de página?",
        opciones: [
          "<section>",
          "<bottom>",
          "<footer>",
          "<end>"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "En HTML5, ¿qué etiqueta se usa para insertar un video?",
        opciones: [
          "<media>",
          "<video>",
          "<movie>",
          "<play>"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Qué etiqueta HTML se usa para definir una lista desordenada?",
        opciones: [
          "<ol>",
          "<list>",
          "<ul>",
          "<li>"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Cuál es el HTML correcto para crear un campo de entrada para email?",
        opciones: [
          "<input type=\"mail\">",
          "<input type=\"email\">",
          "<email>",
          "<input email>"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Qué elemento HTML5 se usa para especificar una sección de navegación?",
        opciones: [
          "<navigate>",
          "<nav>",
          "<menu>",
          "<navigation>"
        ],
        respuestaCorrecta: 1
      }
    ]
  },
  css: {
    nombre: "CSS",
    clase: "icono-css",
    preguntas: [
      {
        pregunta: "¿Qué significa CSS?",
        opciones: [
          "Hojas de Estilo Coloridas",
          "Hojas de Estilo de Computadora",
          "Hojas de Estilo en Cascada",
          "Hojas de Estilo Creativas"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Qué propiedad se usa para cambiar el color de fondo?",
        opciones: [
          "bgcolor",
          "color",
          "background",
          "background-color"
        ],
        respuestaCorrecta: 3
      },
      {
        pregunta: "¿Cómo seleccionas un elemento con el nombre de clase 'encabezado'?",
        opciones: [
          ".encabezado",
          "#encabezado",
          "encabezado",
          "*encabezado"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Qué propiedad CSS controla el tamaño del texto?",
        opciones: [
          "text-size",
          "font-style",
          "text-style",
          "font-size"
        ],
        respuestaCorrecta: 3
      },
      {
        pregunta: "¿Qué propiedad CSS se usa para controlar el espacio entre elementos?",
        opciones: [
          "spacing",
          "margin",
          "padding",
          "border"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Cuál es la sintaxis CSS correcta para hacer que todos los elementos <p> sean negrita?",
        opciones: [
          "p {font-weight: bold;}",
          "p {text-size: bold;}",
          "<p style=\"font-weight: bold;\">",
          "p.all {font-weight: bold;}"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Cómo se agrega un comentario en CSS?",
        opciones: [
          "// Esto es un comentario",
          "/* Esto es un comentario */",
          "<!-- Esto es un comentario -->",
          "# Esto es un comentario"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Qué propiedad se usa para cambiar la fuente de un elemento?",
        opciones: [
          "font-family",
          "font-style",
          "font-type",
          "font-weight"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Cómo hacer que cada palabra en un texto comience con mayúscula?",
        opciones: [
          "text-transform: capitalize",
          "text-transform: uppercase",
          "text-style: capital",
          "font-transform: capitalize"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Qué propiedad CSS se usa para especificar la transparencia de un elemento?",
        opciones: [
          "transparency",
          "filter",
          "opacity",
          "visibility"
        ],
        respuestaCorrecta: 2
      }
    ]
  },
  javascript: {
    nombre: "JavaScript",
    clase: "icono-js",
    preguntas: [
      {
        pregunta: "¿Dentro de qué elemento HTML se coloca el JavaScript?",
        opciones: [
          "<javascript>",
          "<js>",
          "<script>",
          "<scripting>"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Cómo se crea una función en JavaScript?",
        opciones: [
          "funcion = miFuncion()",
          "function miFuncion()",
          "funcion:miFuncion()",
          "crear miFuncion()"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Cómo se llama a una función llamada \"miFuncion\"?",
        opciones: [
          "llamar miFuncion()",
          "miFuncion()",
          "llamar funcion miFuncion()",
          "Llamar.miFuncion()"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Cómo comienza un bucle WHILE?",
        opciones: [
          "while (i <= 10)",
          "while i = 1 to 10",
          "while (i <= 10; i++)",
          "while (i++; i <= 10)"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Cuál es la forma correcta de escribir un array en JavaScript?",
        opciones: [
          "var colores = \"rojo\", \"verde\", \"azul\"",
          "var colores = (1:\"rojo\", 2:\"verde\", 3:\"azul\")",
          "var colores = [\"rojo\", \"verde\", \"azul\"]",
          "var colores = 1 = (\"rojo\"), 2 = (\"verde\"), 3 = (\"azul\")"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Qué evento ocurre cuando el usuario hace clic en un elemento HTML?",
        opciones: [
          "onmouseclick",
          "onclick",
          "onchange",
          "onmouseover"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Cómo se declara una variable en JavaScript?",
        opciones: [
          "variable nombreCoche",
          "v nombreCoche",
          "var nombreCoche",
          "let 'nombreCoche'"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Qué operador se usa para asignar un valor a una variable?",
        opciones: [
          "*",
          "-",
          "=",
          "x"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Qué devolverá el siguiente código: Boolean(10 > 9)?",
        opciones: [
          "NaN",
          "false",
          "true",
          "undefined"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Cómo encontrar el número con el valor más alto entre x e y?",
        opciones: [
          "Math.max(x, y)",
          "Math.ceil(x, y)",
          "top(x, y)",
          "ceil(x, y)"
        ],
        respuestaCorrecta: 0
      }
    ]
  },
  accesibilidad: {
    nombre: "Accesibilidad",
    clase: "icono-a11y",
    preguntas: [
      {
        pregunta: "¿Qué proporciona el atributo 'alt' para los elementos de imagen?",
        opciones: [
          "Fuente alternativa de imagen",
          "Descripción alternativa del texto",
          "Mensaje de alerta al pasar el mouse",
          "Estilo alternativo"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Qué elemento HTML se usa para definir un título para una tabla?",
        opciones: [
          "<caption>",
          "<figcaption>",
          "<summary>",
          "<title>"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Qué significa ARIA?",
        opciones: [
          "Aplicaciones de Internet Ricas en Accesibilidad",
          "Acceso Responsivo a Internet Avanzado",
          "Aplicación de Renderizado de Internet Alternativo",
          "Atributos de Interfaz de Renderizado Accesible"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Qué atributo se puede usar para indicar si un elemento de formulario es obligatorio?",
        opciones: [
          "required",
          "mandatory",
          "needed",
          "important"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Cuál es el propósito del atributo 'tabindex'?",
        opciones: [
          "Crear pestañas en la navegación",
          "Especificar el orden de los elementos al navegar con la tecla Tab",
          "Establecer un índice de tabla para aplicaciones de base de datos",
          "Controlar la sangría de los elementos"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Qué relación de contraste se recomienda para texto normal según los estándares WCAG AA?",
        opciones: [
          "Al menos 3:1",
          "Al menos 4.5:1",
          "Al menos 7:1",
          "Al menos 2:1"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Cuál es el propósito de un enlace 'saltar navegación'?",
        opciones: [
          "Saltar a la siguiente página",
          "Permitir a los usuarios de teclado omitir la navegación repetitiva",
          "Ocultar la navegación en dispositivos móviles",
          "Simplificar el menú de navegación"
        ],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Qué elemento HTML es más apropiado para el contenido principal de una página?",
        opciones: [
          "<div id=\"main\">",
          "<content>",
          "<main>",
          "<section class=\"main\">"
        ],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Qué significa WCAG?",
        opciones: [
          "Pautas de Accesibilidad para el Contenido Web",
          "Guía de Configuración de Accesibilidad Web",
          "Pautas de Aplicación de Contenido Web",
          "Pautas de Cumplimiento de Accesibilidad Web"
        ],
        respuestaCorrecta: 0
      },
      {
        pregunta: "Al diseñar para accesibilidad por teclado, ¿qué debes asegurar?",
        opciones: [
          "Que todos los elementos interactivos puedan recibir el foco del teclado",
          "Que haya atajos de teclado disponibles para todas las acciones",
          "Que la funcionalidad del mouse esté duplicada",
          "Que la tecla Tab esté deshabilitada"
        ],
        respuestaCorrecta: 0
      }
    ]
  }
};