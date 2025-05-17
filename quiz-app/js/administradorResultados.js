// Clase para manejar la visualización de resultados
export class AdministradorResultados {
  constructor(administradorQuiz, administradorAlmacenamiento) {
    this.administradorQuiz = administradorQuiz;
    this.administradorAlmacenamiento = administradorAlmacenamiento;
    
    // Elementos del DOM
    this.porcentajePuntaje = document.getElementById('porcentaje-puntaje');
    this.respuestasCorrectas = document.getElementById('respuestas-correctas');
    this.totalRespuestas = document.getElementById('total-respuestas');
    this.detallesResultados = document.getElementById('detalles-resultados');
  }
  
  // Muestra los resultados del quiz
  mostrarResultados() {
    const ultimoResultado = this.administradorAlmacenamiento.obtenerUltimoResultado();
    
    if (!ultimoResultado) {
      console.error('¡No se encontraron resultados!');
      return;
    }
    
    // Actualiza estadísticas resumen
    this.porcentajePuntaje.textContent = `${ultimoResultado.porcentaje}%`;
    this.respuestasCorrectas.textContent = ultimoResultado.respuestasCorrectas;
    this.totalRespuestas.textContent = ultimoResultado.totalPreguntas;
    
    // Limpia resultados anteriores
    this.detallesResultados.innerHTML = '';
    
    // Agrega resultados detallados
    ultimoResultado.resultadosDetallados.forEach((resultado, indice) => {
      const elementoResultado = document.createElement('div');
      elementoResultado.className = `elemento-resultado ${resultado.esCorrecta ? 'correcta' : 'incorrecta'}`;
      
      const numeroPregunta = indice + 1;
      
      const preguntaDiv = document.createElement('div');
      preguntaDiv.className = 'resultado-pregunta';
      preguntaDiv.textContent = `Pregunta ${numeroPregunta}: ${resultado.pregunta}`;

      const respuestaUsuarioDiv = document.createElement('div');
      respuestaUsuarioDiv.className = 'resultado-respuesta-usuario';
      respuestaUsuarioDiv.textContent = `Tu respuesta: ${resultado.respuestaUsuario}`;

      const respuestaCorrectaDiv = document.createElement('div');
      respuestaCorrectaDiv.className = 'resultado-respuesta-correcta';
      respuestaCorrectaDiv.textContent = `Respuesta correcta: ${resultado.respuestaCorrecta}`;

      elementoResultado.appendChild(preguntaDiv);
      elementoResultado.appendChild(respuestaUsuarioDiv);
      elementoResultado.appendChild(respuestaCorrectaDiv);
      
      this.detallesResultados.appendChild(elementoResultado);
      
      // Agrega animación
      setTimeout(() => {
        elementoResultado.classList.add('aparecer');
      }, 100 * indice);
    });
    
    // Actualiza color del círculo de puntaje según el porcentaje
    const circuloPuntaje = document.querySelector('.circulo-puntaje');
    
    if (ultimoResultado.porcentaje >= 80) {
      circuloPuntaje.style.borderColor = 'var(--color-exito)';
    } else if (ultimoResultado.porcentaje >= 60) {
      circuloPuntaje.style.borderColor = 'var(--color-advertencia)';
    } else {
      circuloPuntaje.style.borderColor = 'var(--color-error)';
    }
  }
  
  // Obtiene retroalimentación según el rendimiento
  obtenerRetroalimentacionRendimiento(porcentaje) {
    if (porcentaje >= 90) {
      return '¡Excelente trabajo! ¡Has dominado este tema!';
    } else if (porcentaje >= 70) {
      return '¡Buen trabajo! Tienes un buen entendimiento de este tema.';
    } else if (porcentaje >= 50) {
      return '¡Buen esfuerzo! Con un poco más de estudio, mejorarás tu conocimiento.';
    } else {
      return '¡Sigue practicando! Este tema necesita más atención.';
    }
  }
}