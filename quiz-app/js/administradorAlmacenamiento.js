// Clase para manejar el almacenamiento local del quiz
export class AdministradorAlmacenamiento {
  constructor() {
    this.CLAVES_ALMACENAMIENTO = {
      EN_PROGRESO: 'quiz_en_progreso',
      RESULTADOS: 'quiz_resultados',
      TEMA: 'quiz_tema'
    };
  }
  
  // Guarda un quiz en progreso
  guardarQuizEnProgreso(estadoQuiz) {
    localStorage.setItem(this.CLAVES_ALMACENAMIENTO.EN_PROGRESO, JSON.stringify(estadoQuiz));
  }
  
  // Obtiene un quiz en progreso
  obtenerQuizEnProgreso() {
    const quizGuardado = localStorage.getItem(this.CLAVES_ALMACENAMIENTO.EN_PROGRESO);
    return quizGuardado ? JSON.parse(quizGuardado) : null;
  }
  
  // Limpia el quiz en progreso
  limpiarQuizEnProgreso() {
    localStorage.removeItem(this.CLAVES_ALMACENAMIENTO.EN_PROGRESO);
  }
  
  // Guarda los resultados del quiz
  guardarResultadosQuiz(categoria, resultados) {
    let todosLosResultados = this.obtenerTodosLosResultados();
    
    // Agrega nuevos resultados
    todosLosResultados.push(resultados);
    
    // Mantiene solo los últimos 10 resultados
    if (todosLosResultados.length > 10) {
      todosLosResultados = todosLosResultados.slice(-10);
    }
    
    localStorage.setItem(this.CLAVES_ALMACENAMIENTO.RESULTADOS, JSON.stringify(todosLosResultados));
  }
  
  // Obtiene todos los resultados
  obtenerTodosLosResultados() {
    const resultados = localStorage.getItem(this.CLAVES_ALMACENAMIENTO.RESULTADOS);
    return resultados ? JSON.parse(resultados) : [];
  }
  
  // Obtiene resultados por categoría
  obtenerResultadosCategoria(categoria) {
    const todosLosResultados = this.obtenerTodosLosResultados();
    return todosLosResultados.filter(resultado => resultado.categoria === categoria);
  }
  
  // Obtiene el último resultado
  obtenerUltimoResultado() {
    const todosLosResultados = this.obtenerTodosLosResultados();
    return todosLosResultados.length > 0 ? todosLosResultados[todosLosResultados.length - 1] : null;
  }
  
  // Limpia todos los resultados
  limpiarTodosLosResultados() {
    localStorage.removeItem(this.CLAVES_ALMACENAMIENTO.RESULTADOS);
  }
  
  // Establece la preferencia de tema
  establecerPreferenciaTema(esOscuro) {
    localStorage.setItem(this.CLAVES_ALMACENAMIENTO.TEMA, esOscuro ? 'oscuro' : 'claro');
  }
  
  // Obtiene la preferencia de tema
  obtenerPreferenciaTema() {
    return localStorage.getItem(this.CLAVES_ALMACENAMIENTO.TEMA) || 'claro';
  }
}