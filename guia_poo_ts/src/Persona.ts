
export abstract class Persona {
  constructor(
    protected nombre: string,
    protected apellido: string,
    protected direccion: string,
    protected telefono: string,
    protected edad: number
  ) {}

  verificarMayorEdad(): void {
    const mensaje = this.edad >= 18 ? "Es mayor de edad." : "Es menor de edad.";
    console.log(mensaje);
  }

  abstract mostrarDatos(): void;
}
