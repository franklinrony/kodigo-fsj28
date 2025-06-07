import { describe, it, expect, vi } from "vitest";
import { CabeceraPagina } from "@src/CabeceraPagina";

describe("CabeceraPagina", () => {
  it("debería mostrar las propiedades correctamente", () => {
    const cabecera = new CabeceraPagina("Inicio", "rojo", "Verdana");
    cabecera.setAlineacion("centrado");

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    cabecera.mostrarPropiedades();

    expect(consoleSpy).toHaveBeenCalledWith("Título: Inicio");
    expect(consoleSpy).toHaveBeenCalledWith("Color: rojo");
    expect(consoleSpy).toHaveBeenCalledWith("Fuente: Verdana");
    expect(consoleSpy).toHaveBeenCalledWith("Alineación: centrado");

    consoleSpy.mockRestore();
  });
});
