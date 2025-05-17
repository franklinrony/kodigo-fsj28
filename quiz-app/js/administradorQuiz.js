// Clase para administrar el estado y la lógica del quiz
export class AdministradorQuiz {
  constructor(datosQuiz, administradorAlmacenamiento) {
    this.datosQuiz = datosQuiz;
    this.administradorAlmacenamiento = administradorAlmacenamiento;
    this.categoriaActual = null;
    this.indicePreguntaActual = 0;
    this.respuestasUsuario = [];
    this.quizTerminado = false;
  }
  
  // Inicia un nuevo quiz para la categoría seleccionada
  iniciarQuiz(categoria) {
    this.categoriaActual = categoria;
    this.indicePreguntaActual = 0;
    this.respuestasUsuario = Array(this.datosQuiz[categoria].preguntas.length).fill(null);
    this.quizTerminado = false;
    
    // Guarda el estado actual del quiz
    this.guardarEstadoQuiz();
  }
  
  // Reanuda un quiz guardado previamente
  reanudarQuiz(quizGuardado) {
    this.categoriaActual = quizGuardado.categoria;
    this.indicePreguntaActual = quizGuardado.indicePreguntaActual;
    this.respuestasUsuario = quizGuardado.respuestasUsuario;
    this.quizTerminado = false;
  }
  
  // Obtiene el estado actual del quiz
  obtenerEstadoActual() {
    const datosCategoría = this.datosQuiz[this.categoriaActual];
    
    return {
      nombreCategoria: datosCategoría.nombre,
      claseCategoria: datosCategoría.clase,
      indicePreguntaActual: this.indicePreguntaActual,
      totalPreguntas: datosCategoría.preguntas.length,
      preguntaActual: datosCategoría.preguntas[this.indicePreguntaActual],
      respuestasUsuario: this.respuestasUsuario,
      quizTerminado: this.quizTerminado
    };
  }
  
  // Selecciona una respuesta para la pregunta actual
  seleccionarRespuesta(indiceRespuesta) {
    this.respuestasUsuario[this.indicePreguntaActual] = indiceRespuesta;
    this.guardarEstadoQuiz();
  }
  
  // Avanza a la siguiente pregunta
  siguientePregunta() {
    if (this.indicePreguntaActual < this.datosQuiz[this.categoriaActual].preguntas.length - 1) {
      this.indicePreguntaActual++;
      this.guardarEstadoQuiz();
      return true;
    }
    return false;
  }
  
  // Retrocede a la pregunta anterior
  preguntaAnterior() {
    if (this.indicePreguntaActual > 0) {
      this.indicePreguntaActual--;
      this.guardarEstadoQuiz();
      return true;
    }
    return false;
  }
  
  // Finaliza el quiz y calcula los resultados
  terminarQuiz() {
    this.quizTerminado = true;
    
    // Calcula los resultados
    const resultados = this.calcularResultados();
    
    // Guarda en almacenamiento
    this.administradorAlmacenamiento.guardarResultadosQuiz(this.categoriaActual, resultados);
    
    // Limpia el quiz en progreso
    this.administradorAlmacenamiento.limpiarQuizEnProgreso();
    
    return resultados;
  }
  
  // Calcula los resultados del quiz
  calcularResultados() {
    const preguntas = this.datosQuiz[this.categoriaActual].preguntas;
    let respuestasCorrectas = 0;
    
    const resultadosDetallados = preguntas.map((pregunta, indice) => {
      const esCorrecta = this.respuestasUsuario[indice] === pregunta.respuestaCorrecta;
      
      if (esCorrecta) {
        respuestasCorrectas++;
      }
      
      return {
        pregunta: pregunta.pregunta,
        respuestaUsuario: this.respuestasUsuario[indice] !== null ? pregunta.opciones[this.respuestasUsuario[indice]] : "Sin responder",
        respuestaCorrecta: pregunta.opciones[pregunta.respuestaCorrecta],
        esCorrecta: esCorrecta
      };
    });
    
    return {
      categoria: this.categoriaActual,
      nombreCategoria: this.datosQuiz[this.categoriaActual].nombre,
      totalPreguntas: preguntas.length,
      respuestasCorrectas: respuestasCorrectas,
      porcentaje: Math.round((respuestasCorrectas / preguntas.length) * 100),
      resultadosDetallados: resultadosDetallados,
      fechaHora: new Date().toISOString()
    };
  }
  
  // Guarda el estado actual del quiz
  guardarEstadoQuiz() {
    const estadoQuiz = {
      categoria: this.categoriaActual,
      indicePreguntaActual: this.indicePreguntaActual,
      respuestasUsuario: this.respuestasUsuario,
      fechaHora: new Date().toISOString()
    };
    
    this.administradorAlmacenamiento.guardarQuizEnProgreso(estadoQuiz);
  }
  
  // Obtiene las respuestas correctas
  obtenerRespuestasCorrectas() {
    if (!this.categoriaActual || !this.quizTerminado) {
      return [];
    }
    
    return this.datosQuiz[this.categoriaActual].preguntas.map(p => p.respuestaCorrecta);
  }
}