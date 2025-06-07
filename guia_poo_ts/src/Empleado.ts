
import { Persona } from "./Persona";

export class Empleado extends Persona {
  private sueldo: number = 0;

  cargarSueldo(sueldo: number): void {
    this.sueldo = sueldo;
  }

  imprimirSueldo(): void {
    console.log(`Sueldo: $${this.sueldo}`);
  }

  mostrarDatos(): void {
    console.log(`Nombre: ${this.nombre} ${this.apellido}`);
    console.log(`Dirección: ${this.direccion}`);
    console.log(`Teléfono: ${this.telefono}`);
    console.log(`Edad: ${this.edad}`);
  }
}
