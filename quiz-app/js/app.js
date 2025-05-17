// Importación de módulos
import { datosQuiz } from './datosQuiz.js';
import { AdministradorQuiz } from './administradorQuiz.js';
import { AdministradorAlmacenamiento } from './administradorAlmacenamiento.js';
import { AdministradorResultados } from './administradorResultados.js';

// Inicialización de administradores
const administradorAlmacenamiento = new AdministradorAlmacenamiento();
const administradorQuiz = new AdministradorQuiz(datosQuiz, administradorAlmacenamiento);
const administradorResultados = new AdministradorResultados(administradorQuiz, administradorAlmacenamiento);

// Elementos del DOM
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaQuiz = document.getElementById('pantalla-quiz');
const pantallaResultados = document.getElementById('pantalla-resultados');
const elementosCategorias = document.querySelectorAll('.elemento-categoria');
const interruptorTema = document.getElementById('interruptorTema');

// Elementos de la pantalla del quiz
const nombreCategoria = document.getElementById('nombre-categoria');
const iconoCategoria = document.getElementById('icono-categoria');
const barraProgreso = document.getElementById('barra-progreso');
const preguntaActual = document.getElementById('pregunta-actual');
const totalPreguntas = document.getElementById('total-preguntas');
const textoPregunta = document.getElementById('texto-pregunta');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const botonAnterior = document.getElementById('boton-anterior');
const botonSiguiente = document.getElementById('boton-siguiente');
const botonEnviar = document.getElementById('boton-enviar');

// Elementos de la pantalla de resultados
const botonReiniciar = document.getElementById('boton-reiniciar');

// Funcionalidad del cambio de tema
function inicializarTema() {
  const temaGuardado = localStorage.getItem('quizTema');
  
  if (temaGuardado === 'oscuro') {
    document.body.classList.add('tema-oscuro');
    interruptorTema.checked = true;
  }
}

interruptorTema.addEventListener('change', () => {
  if (interruptorTema.checked) {
    document.body.classList.add('tema-oscuro');
    localStorage.setItem('quizTema', 
 'oscuro');
  } else {
    document.body.classList.remove('tema-oscuro');
    localStorage.setItem('quizTema', 'claro');
  }
});

// Inicializa la selección de categoría
function inicializarSeleccionCategoria() {
  elementosCategorias.forEach(elemento => {
    elemento.addEventListener('click', () => {
      const categoria = elemento.dataset.categoria;
      administradorQuiz.iniciarQuiz(categoria);
      actualizarInterfazQuiz();
      mostrarPantalla('quiz');
    });
  });
}

// Actualiza la interfaz del quiz según el estado actual
function actualizarInterfazQuiz() {
  const estadoActual = administradorQuiz.obtenerEstadoActual();
  
  // Actualiza información de categoría
  nombreCategoria.textContent = estadoActual.nombreCategoria;
  iconoCategoria.className = `icono-categoria ${estadoActual.claseCategoria}`;
  
  // Actualiza progreso
  const porcentajeProgreso = (estadoActual.indicePreguntaActual / estadoActual.totalPreguntas) * 100;
  barraProgreso.style.width = `${porcentajeProgreso}%`;
  preguntaActual.textContent = estadoActual.indicePreguntaActual + 1;
  totalPreguntas.textContent = estadoActual.totalPreguntas;
  
  // Actualiza pregunta y opciones
  textoPregunta.textContent = estadoActual.preguntaActual.pregunta;
  
  // Limpia y repuebla opciones
  contenedorOpciones.innerHTML = '';
  
  estadoActual.preguntaActual.opciones.forEach((opcion, indice) => {
    // Mejor validación: también considera vacías las cadenas con solo espacios
    const textoOpcion = (typeof opcion === "string" && opcion.trim() !== "") ? opcion : "(Sin texto)";
    const elementoOpcion = document.createElement('div');
    elementoOpcion.className = 'elemento-opcion';
    if (estadoActual.respuestasUsuario[estadoActual.indicePreguntaActual] === indice) {
      elementoOpcion.classList.add('seleccionada');
    }

    const letraOpcion = String.fromCharCode(65 + indice); // A, B, C, D

    // Crea los subelementos y usa textContent para evitar renderizado HTML
    const marcadorDiv = document.createElement('div');
    marcadorDiv.className = 'marcador-opcion';
    marcadorDiv.textContent = letraOpcion;

    const textoDiv = document.createElement('div');
    textoDiv.className = 'texto-opcion';
    textoDiv.textContent = textoOpcion;

    elementoOpcion.appendChild(marcadorDiv);
    elementoOpcion.appendChild(textoDiv);

    elementoOpcion.addEventListener('click', () => {
      administradorQuiz.seleccionarRespuesta(indice);
      actualizarInterfazQuiz();
    });

    contenedorOpciones.appendChild(elementoOpcion);

    // Agrega animación
    setTimeout(() => {
      elementoOpcion.classList.add('deslizar-entrada');
    }, 50 * indice);
  });
  
  // Actualiza botones de navegación
  botonAnterior.disabled = estadoActual.indicePreguntaActual === 0;
  
  // Muestra botón de enviar en la última pregunta
  if (estadoActual.indicePreguntaActual === estadoActual.totalPreguntas - 1) {
    botonSiguiente.classList.add('d-none');
    botonEnviar.classList.remove('d-none');
  } else {
    botonSiguiente.classList.remove('d-none');
    botonEnviar.classList.add('d-none');
  }
}

// Inicializa la navegación
function inicializarNavegacion() {
  botonAnterior.addEventListener('click', () => {
    administradorQuiz.preguntaAnterior();
    actualizarInterfazQuiz();
  });
  
  botonSiguiente.addEventListener('click', () => {
    administradorQuiz.siguientePregunta();
    actualizarInterfazQuiz();
  });
  
  botonEnviar.addEventListener('click', () => {
    administradorQuiz.terminarQuiz();
    administradorResultados.mostrarResultados();
    mostrarPantalla('resultados');
  });
  
  botonReiniciar.addEventListener('click', () => {
    mostrarPantalla('inicio');
  });
}

// Muestra una pantalla específica (inicio, quiz, resultados)
function mostrarPantalla(pantalla) {
  pantallaInicio.classList.add('d-none');
  pantallaQuiz.classList.add('d-none');
  pantallaResultados.classList.add('d-none');
  
  switch (pantalla) {
    case 'inicio':
      pantallaInicio.classList.remove('d-none');
      break;
    case 'quiz':
      pantallaQuiz.classList.remove('d-none');
      break;
    case 'resultados':
      pantallaResultados.classList.remove('d-none');
      break;
  }
}

// Verifica si hay un quiz en progreso
function verificarQuizEnProgreso() {
  const quizEnProgreso = administradorAlmacenamiento.obtenerQuizEnProgreso();
  
  if (quizEnProgreso && quizEnProgreso.respuestasUsuario && quizEnProgreso.respuestasUsuario.length > 0) {
    const reanudarQuiz = confirm('Tienes un quiz sin terminar. ¿Deseas continuarlo?');
    
    if (reanudarQuiz) {
      administradorQuiz.reanudarQuiz(quizEnProgreso);
      actualizarInterfazQuiz();
      mostrarPantalla('quiz');
      return true;
    } else {
      administradorAlmacenamiento.limpiarQuizEnProgreso();
    }
  }
  
  return false;
}

// Inicializa la aplicación
function inicializar() {
  inicializarTema();
  inicializarSeleccionCategoria();
  inicializarNavegacion();
  
  // Verifica quiz en progreso
  if (!verificarQuizEnProgreso()) {
    mostrarPantalla('inicio');
  }
}

// Inicia la aplicación
window.addEventListener('DOMContentLoaded', inicializar);