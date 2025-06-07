import { describe, it, expect, vi } from "vitest";
import { Cancion } from "@src/Cancion";

describe("Cancion", () => {
  it("debería asignar y obtener el autor correctamente", () => {
    const cancion = new Cancion("Let it be", "Pop");
    cancion.autor = "The Beatles";
    expect(cancion.autor).toBe("The Beatles");
  });

  it("debería mostrar los datos correctamente", () => {
    const cancion = new Cancion("Yesterday", "Rock");
    cancion.autor = "Paul McCartney";

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    cancion.mostrarDatos();

    expect(consoleSpy).toHaveBeenCalledWith("Título: Yesterday");
    expect(consoleSpy).toHaveBeenCalledWith("Género: Rock");
    expect(consoleSpy).toHaveBeenCalledWith("Autor: Paul McCartney");

    consoleSpy.mockRestore();
  });
});
