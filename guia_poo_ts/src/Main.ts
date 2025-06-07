import { CabeceraPagina } from "@src/CabeceraPagina";
import { Calculadora } from "@src/Calculadora";
import { Cancion } from "@src/Cancion";
import { Cuenta } from "@src/Cuenta";
import { Empleado } from "@src/Empleado";

class Main {
  static ejecutar() {
    console.log("=== EJERCICIO 1 ===");
    const cabecera = new CabeceraPagina("Mi Página", "azul", "Arial");
    cabecera.setAlineacion("derecha");
    cabecera.mostrarPropiedades();

    console.log("\n=== EJERCICIO 2 ===");
    const calc = new Calculadora();
    console.log("5 + 3 =", calc.sumar(5, 3));
    console.log("5 - 3 =", calc.restar(5, 3));
    console.log("5 * 3 =", calc.multiplicar(5, 3));
    console.log("5 / 3 =", calc.dividir(5, 3));
    console.log("5 ^ 3 =", calc.potencia(5, 3));
    console.log("5! =", calc.factorial(5));

    console.log("\n=== EJERCICIO 3 ===");
    const cancion = new Cancion("Imagine", "Rock");
    cancion.autor = "John Lennon";
    cancion.mostrarDatos();

    console.log("\n=== EJERCICIO 4 ===");
    const cuenta = new Cuenta("Ana Pérez", 100, "Ahorro", "123456789");
    cuenta.depositar();
    cuenta.retirar(20);
    cuenta.mostrarDatos();

    console.log("\n=== EJERCICIO 5 ===");
    const empleado = new Empleado("Luis", "Martínez", "San Salvador", "7777-8888", 30);
    empleado.verificarMayorEdad();
    empleado.cargarSueldo(950);
    empleado.mostrarDatos();
    empleado.imprimirSueldo();
  }
}

Main.ejecutar();
