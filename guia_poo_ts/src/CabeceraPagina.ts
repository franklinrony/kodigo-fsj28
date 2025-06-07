
export class CabeceraPagina {
  private titulo: string;
  private color: string;
  private fuente: string;
  private alineacion: 'centrado' | 'derecha' | 'izquierda' = 'centrado';

  constructor(titulo: string, color: string, fuente: string) {
    this.titulo = titulo;
    this.color = color;
    this.fuente = fuente;
  }

  setAlineacion(alineacion: 'centrado' | 'derecha' | 'izquierda') {
    this.alineacion = alineacion;
  }

  mostrarPropiedades() {
    console.log(`Título: ${this.titulo}`);
    console.log(`Color: ${this.color}`);
    console.log(`Fuente: ${this.fuente}`);
    console.log(`Alineación: ${this.alineacion}`);
  }
}
