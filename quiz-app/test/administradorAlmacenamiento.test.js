import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AdministradorAlmacenamiento } from '../js/administradorAlmacenamiento.js';

// Mock localStorage para entorno Node
if (typeof global.localStorage === "undefined") {
  global.localStorage = (() => {
    let store = {};
    return {
      getItem: key => store[key] || null,
      setItem: (key, value) => { store[key] = value.toString(); },
      removeItem: key => { delete store[key]; },
      clear: () => { store = {}; }
    };
  })();
}

describe('AdministradorAlmacenamiento', () => {
  let almacenamiento;

  beforeEach(() => {
    almacenamiento = new AdministradorAlmacenamiento();
    localStorage.clear();
  });

  it('guardar y obtener quiz en progreso', () => {
    const estado = { categoria: 'html', indicePreguntaActual: 1, respuestasUsuario: [0, 1] };
    almacenamiento.guardarQuizEnProgreso(estado);
    expect(almacenamiento.obtenerQuizEnProgreso()).toEqual(estado);
  });

  it('limpiar quiz en progreso', () => {
    almacenamiento.guardarQuizEnProgreso({ test: true });
    almacenamiento.limpiarQuizEnProgreso();
    expect(almacenamiento.obtenerQuizEnProgreso()).toBeNull();
  });

  it('guardar y obtener resultados', () => {
    const resultado = { categoria: 'css', respuestasCorrectas: 2 };
    almacenamiento.guardarResultadosQuiz('css', resultado);
    const resultados = almacenamiento.obtenerTodosLosResultados();
    expect(resultados[resultados.length - 1]).toEqual(resultado);
  });

  it('limpiar todos los resultados', () => {
    almacenamiento.guardarResultadosQuiz('css', { test: true });
    almacenamiento.limpiarTodosLosResultados();
    expect(almacenamiento.obtenerTodosLosResultados()).toEqual([]);
  });

  it('preferencia de tema', () => {
    almacenamiento.establecerPreferenciaTema(true);
    expect(almacenamiento.obtenerPreferenciaTema()).toBe('oscuro');
    almacenamiento.establecerPreferenciaTema(false);
    expect(almacenamiento.obtenerPreferenciaTema()).toBe('claro');
  });
});