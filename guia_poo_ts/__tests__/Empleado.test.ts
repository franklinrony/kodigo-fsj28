import { Empleado } from "@src/Empleado";
import { describe, it, expect, vi } from "vitest";

describe("Empleado", () => {
  const empleado = new Empleado("Juan", "Gómez", "Santa Tecla", "7777-0000", 28);

  it("debería cargar e imprimir el sueldo", () => {
    empleado.cargarSueldo(800);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    empleado.imprimirSueldo();
    expect(spy).toHaveBeenCalledWith("Sueldo: $800");
    spy.mockRestore();
  });

  it("debería decir que es mayor de edad", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    empleado.verificarMayorEdad();
    expect(spy).toHaveBeenCalledWith("Es mayor de edad.");
    spy.mockRestore();
  });

  it("debería mostrar los datos del empleado", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    empleado.mostrarDatos();
    expect(spy).toHaveBeenCalledWith("Nombre: Juan Gómez");
    spy.mockRestore();
  });
});
