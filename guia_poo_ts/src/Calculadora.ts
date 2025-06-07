
export class Calculadora {
  sumar(a: number, b: number): number {
    return a + b;
  }

  restar(a: number, b: number): number {
    return a - b;
  }

  multiplicar(a: number, b: number): number {
    return a * b;
  }

  dividir(a: number, b: number): number {
    return b !== 0 ? a / b : NaN;
  }

  potencia(base: number, exponente: number): number {
    return Math.pow(base, exponente);
  }

  factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}
