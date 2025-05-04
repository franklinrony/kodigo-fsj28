const { esNotaValida, calcularPromedio } = require("../script");

describe("Funciones de validación y cálculo", () => {
    test("debería validar correctamente las notas", () => {
        expect(esNotaValida(8)).toBe(true);
        expect(esNotaValida(12)).toBe(false);
        expect(esNotaValida(-1)).toBe(false);
    });

    test("debería calcular correctamente el promedio", () => {
        expect(calcularPromedio(8, 9, 7)).toBeCloseTo(8.0);
        expect(calcularPromedio(10, 10, 10)).toBeCloseTo(10.0);
        expect(calcularPromedio(5, 5, 5)).toBeCloseTo(5.0);
    });
});
