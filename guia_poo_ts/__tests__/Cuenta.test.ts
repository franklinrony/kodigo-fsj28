import { describe, it, expect, vi } from "vitest";
import { Cuenta } from "@src/Cuenta";

describe("Cuenta", () => {
  it("debería permitir depositar si la cantidad es suficiente", () => {
    const cuenta = new Cuenta("Pedro", 10, "Corriente", "111");
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    cuenta.depositar();
    expect(spy).toHaveBeenCalledWith("Se ha depositado correctamente: $10");
    spy.mockRestore();
  });

  it("debería rechazar depósito menor a 5", () => {
    const cuenta = new Cuenta("Pedro", 4, "Corriente", "111");
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    cuenta.depositar();
    expect(spy).toHaveBeenCalledWith("El valor a depositar debe ser mayor a $5.00");
    spy.mockRestore();
  });

  it("debería permitir retiro válido", () => {
    const cuenta = new Cuenta("Ana", 100, "Ahorro", "222");
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    cuenta.retirar(20);
    expect(spy).toHaveBeenCalledWith("Se ha retirado: $20, saldo restante: $80");
    spy.mockRestore();
  });

  it("debería rechazar retiro mayor al saldo", () => {
    const cuenta = new Cuenta("Luis", 10, "Ahorro", "333");
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    cuenta.retirar(50);
    expect(spy).toHaveBeenCalledWith("No hay fondos suficientes en la cuenta.");
    spy.mockRestore();
  });
});
