
export class Cancion {
  public titulo: string;
  public genero: string;
  private _autor: string = "";

  constructor(titulo: string, genero: string) {
    this.titulo = titulo;
    this.genero = genero;
  }

  set autor(nombre: string) {
    this._autor = nombre;
  }

  get autor(): string {
    return this._autor;
  }

  mostrarDatos() {
    console.log(`Título: ${this.titulo}`);
    console.log(`Género: ${this.genero}`);
    console.log(`Autor: ${this._autor}`);
  }
}
