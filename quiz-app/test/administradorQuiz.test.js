import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AdministradorQuiz } from '../js/administradorQuiz.js';

const datosQuizMock = {
  html: {
    nombre: 'HTML',
    clase: 'icon-html',
    preguntas: [
      {
        pregunta: '¿Qué es HTML?',
        opciones: ['Lenguaje de marcado', 'Lenguaje de programación'],
        respuestaCorrecta: 0
      }
    ]
  }
};

const almacenamientoMock = {
  guardarQuizEnProgreso: vi.fn(),
  guardarResultadosQuiz: vi.fn(),
  limpiarQuizEnProgreso: vi.fn()
};

describe('AdministradorQuiz', () => {
  let quiz;

  beforeEach(() => {
    quiz = new AdministradorQuiz(datosQuizMock, almacenamientoMock);
    // Limpia localStorage para evitar interferencias si algún método lo usa
    if (typeof localStorage !== "undefined") localStorage.clear();
  });

  it('iniciarQuiz inicializa correctamente', () => {
    quiz.iniciarQuiz('html');
    expect(quiz.categoriaActual).toBe('html');
    expect(quiz.indicePreguntaActual).toBe(0);
    expect(quiz.respuestasUsuario).toEqual([null]);
    expect(quiz.quizTerminado).toBe(false);
  });

  it('seleccionarRespuesta guarda la respuesta', () => {
    quiz.iniciarQuiz('html');
    quiz.seleccionarRespuesta(1);
    expect(quiz.respuestasUsuario[0]).toBe(1);
  });

  it('siguientePregunta y preguntaAnterior', () => {
    quiz.iniciarQuiz('html');
    expect(quiz.siguientePregunta()).toBe(false);
    expect(quiz.preguntaAnterior()).toBe(false);
  });

  it('terminarQuiz marca como terminado y llama almacenamiento', () => {
    quiz.iniciarQuiz('html');
    quiz.seleccionarRespuesta(0);
    const resultados = quiz.terminarQuiz();
    expect(quiz.quizTerminado).toBe(true);
    expect(almacenamientoMock.guardarResultadosQuiz).toHaveBeenCalled();
    expect(almacenamientoMock.limpiarQuizEnProgreso).toHaveBeenCalled();
    expect(resultados.respuestasCorrectas).toBe(1);
  });

  it('obtenerRespuestasCorrectas solo si terminado', () => {
    quiz.iniciarQuiz('html');
    expect(quiz.obtenerRespuestasCorrectas()).toEqual([]);
    quiz.terminarQuiz();
    expect(quiz.obtenerRespuestasCorrectas()).toEqual([0]);
  });
});