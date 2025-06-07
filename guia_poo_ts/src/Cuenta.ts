
export class Cuenta {
  private nombre: string;
  private cantidad: number;
  private tipoCuenta: string;
  private numeroCuenta: string;

  constructor(nombre: string, cantidad: number, tipoCuenta: string, numeroCuenta: string) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.tipoCuenta = tipoCuenta;
    this.numeroCuenta = numeroCuenta;
  }

  depositar() {
    if (this.cantidad < 5) {
      console.log("El valor a depositar debe ser mayor a $5.00");
    } else {
      console.log(`Se ha depositado correctamente: $${this.cantidad}`);
    }
  }

  retirar(valor: number) {
    if (valor > this.cantidad || this.cantidad <= 0) {
      console.log("No hay fondos suficientes en la cuenta.");
    } else if (valor < 5) {
      console.log("El retiro debe ser mayor de $5.00");
    } else {
      this.cantidad -= valor;
      console.log(`Se ha retirado: $${valor}, saldo restante: $${this.cantidad}`);
    }
  }

  mostrarDatos() {
    console.log(`Nombre: ${this.nombre}`);
    console.log(`Tipo de cuenta: ${this.tipoCuenta}`);
    console.log(`Número de cuenta: ${this.numeroCuenta}`);
  }
}
