import { describe, it, expect } from "vitest";
import { Calculadora } from "@src/Calculadora";

describe("Calculadora", () => {
  const calc = new Calculadora();

  it("debería sumar correctamente", () => {
    expect(calc.sumar(2, 3)).toBe(5);
  });

  it("debería calcular el factorial de 5", () => {
    expect(calc.factorial(5)).toBe(120);
  });

  it("debería dividir correctamente", () => {
    expect(calc.dividir(10, 2)).toBe(5);
  });

  it("debería devolver NaN al dividir por 0", () => {
    expect(calc.dividir(10, 0)).toBeNaN();
  });
});
