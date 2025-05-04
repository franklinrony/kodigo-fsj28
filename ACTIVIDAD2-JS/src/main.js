/**
 * EJERCICIO 1: Determina si una persona es mayor de edad en base a su edad.
 * @param {number} edad - La edad de la persona.
 * @returns {string} Un mensaje indicando si es mayor de edad o no.
 */
function esMayorDeEdad(edad) {
    return edad >= 18 ? "La persona es mayor de edad." : "La persona no es mayor de edad.";
}

/**
 * EJERCICIO 2: Calcula la nota final de un alumno en base a los porcentajes establecidos.
 * @param {string} nombre - El nombre del alumno.
 * @param {string} carnet - El carnet del alumno.
 * @param {number} examen - Nota del examen (20%).
 * @param {number} tareas - Nota de las tareas (40%).
 * @param {number} asistencia - Nota de la asistencia (10%).
 * @param {number} investigacion - Nota de la investigación (30%).
 * @returns {string} Un mensaje con los datos del alumno y su nota final.
 */
function calcularNotaFinal(nombre, carnet, examen, tareas, asistencia, investigacion) {
    const notaFinal = (examen * 0.2) + (tareas * 0.4) + (asistencia * 0.1) + (investigacion * 0.3);
    return `Alumno: ${nombre}, Carnet: ${carnet}, Nota Final: ${notaFinal.toFixed(2)}`;
}

/**
 * EJERCICIO 3: Calcula el aumento salarial de un trabajador basado en su categoría.
 * @param {string} nombre - El nombre del trabajador.
 * @param {number} salario - El salario actual del trabajador.
 * @param {string} categoria - La categoría del trabajador (A, B, C, D).
 * @returns {string} Un mensaje con los datos del trabajador y el aumento salarial.
 */
function calcularAumentoSalarial(nombre, salario, categoria) {
    let porcentajeAumento;

    switch (categoria.toUpperCase()) {
        case 'A':
            porcentajeAumento = 0.15;
            break;
        case 'B':
            porcentajeAumento = 0.30;
            break;
        case 'C':
            porcentajeAumento = 0.10;
            break;
        case 'D':
            porcentajeAumento = 0.20;
            break;
        default:
            return `Categoría inválida para el trabajador ${nombre}.`;
    }

    const aumento = salario * porcentajeAumento;
    const nuevoSalario = salario + aumento;

    return `Empleado: ${nombre}, Categoría: ${categoria}, Salario Actual: ${salario.toFixed(2)}, Aumento: ${aumento.toFixed(2)}, Nuevo Salario: ${nuevoSalario.toFixed(2)}`;
}

/**
 * EJERCICIO 4: Determina cuál de los dos números ingresados es mayor.
 * @param {number} numero1 - El primer número ingresado.
 * @param {number} numero2 - El segundo número ingresado.
 * @returns {string} Un mensaje indicando cuál número es mayor o si son iguales.
 */
function calcularMayorNumero(numero1, numero2) {
    if (numero1 > numero2) {
        return `El número mayor es: ${numero1}`;
    } else if (numero2 > numero1) {
        return `El número mayor es: ${numero2}`;
    } else {
        return "Ambos números son iguales.";
    }
}

/**
 * EJERCICIO 5: Calcula el descuento aplicado a un coche en base a su modelo.
 * @param {string} modelo - El modelo del coche (FORD FIESTA, FORD FOCUS, FORD ESCAPE).
 * @param {number} precio - El precio del coche.
 * @returns {string} Un mensaje con el modelo del coche y el descuento aplicado.
 */
function calcularDescuentoCoche(modelo, precio) {
    let descuento;

    switch (modelo.toUpperCase()) {
        case 'FORD FIESTA':
            descuento = 0.05;
            break;
        case 'FORD FOCUS':
            descuento = 0.10;
            break;
        case 'FORD ESCAPE':
            descuento = 0.20;
            break;
        default:
            return `Modelo no válido: ${modelo}.`;
    }

    const montoDescuento = precio * descuento;
    const precioFinal = precio - montoDescuento;

    return `Coche: ${modelo}, Descuento Aplicado: ${montoDescuento.toFixed(2)}, Precio Final: ${precioFinal.toFixed(2)}`;
}

/**
 * EJERCICIO 6: Calcula el descuento aplicado en viajes turísticos según el destino.
 * @param {string} origen - La ciudad de origen.
 * @param {string} destino - La ciudad de destino.
 * @param {number} precio - El precio del viaje.
 * @returns {string} Un mensaje con el destino y el descuento aplicado.
 */
function calcularDescuentoViaje(origen, destino, precio) {
    if (origen.toLowerCase() !== "palma") {
        return `No se aplica descuento para el origen: ${origen}.`;
    }

    let descuento;

    switch (destino.toLowerCase()) {
        case "la costa del sol":
            descuento = 0.05;
            break;
        case "panchimalco":
            descuento = 0.10;
            break;
        case "puerto el triunfo":
            descuento = 0.15;
            break;
        default:
            return `Destino no válido: ${destino}.`;
    }

    const montoDescuento = precio * descuento;
    const precioFinal = precio - montoDescuento;

    return `Destino: ${destino}, Descuento Aplicado: ${montoDescuento.toFixed(2)}, Precio Final: ${precioFinal.toFixed(2)}`;
}

/**
 * EJERCICIO 7: Analiza un conjunto de 10 valores enteros ingresados.
 * @param {number[]} valores - Un arreglo de 10 números enteros.
 * @returns {object} Un objeto con los resultados del análisis.
 */
function analizarValores(valores) {
    if (valores.length !== 10) {
        return "Debe ingresar exactamente 10 valores.";
    }

    let negativos = 0;
    let positivos = 0;
    let multiplosDe15 = 0;
    let sumaPares = 0;

    valores.forEach((valor) => {
        if (valor < 0) negativos++;
        if (valor > 0) positivos++;
        if (valor % 15 === 0) multiplosDe15++;
        if (valor % 2 === 0) sumaPares += valor; 
    });

    return {
        negativos,
        positivos,
        multiplosDe15,
        sumaPares,
    };
}

/**
 * EJERCICIO 8: Genera la tabla de multiplicar del 1 al 10 para un número dado.
 * @param {number} numero - El número para el cual se generará la tabla de multiplicar.
 * @returns {string[]} Un arreglo con las líneas de la tabla de multiplicar.
 */
function generarTablaMultiplicar(numero) {
    if (typeof numero !== 'number' || isNaN(numero)) {
        return "Debe ingresar un número válido.";
    }

    const tabla = [];
    for (let i = 1; i <= 10; i++) {
        tabla.push(`${numero} x ${i} = ${numero * i}`);
    }
    return tabla;
}

/**
 * EJERCICIO 9: Convierte una temperatura de Celsius a Fahrenheit y clasifica la temperatura.
 * @param {number} celsius - La temperatura en grados Celsius.
 * @returns {string} Un mensaje con la temperatura en Fahrenheit y su clasificación.
 */
function convertirTemperatura(celsius) {
    if (typeof celsius !== 'number' || isNaN(celsius)) {
        return "Debe ingresar un número válido.";
    }

    const fahrenheit = (celsius * 9/5) + 32;

    if (fahrenheit >= 14 && fahrenheit < 32) {
        return `Temperatura: ${fahrenheit.toFixed(2)} ºF - Temperatura baja`;
    } else if (fahrenheit >= 32 && fahrenheit < 68) {
        return `Temperatura: ${fahrenheit.toFixed(2)} ºF - Temperatura adecuada`;
    } else if (fahrenheit >= 68 && fahrenheit < 96) {
        return `Temperatura: ${fahrenheit.toFixed(2)} ºF - Temperatura alta`;
    } else {
        return `Temperatura: ${fahrenheit.toFixed(2)} ºF - Temperatura desconocida`;
    }
}

/**
 * EJERCICIO 10: Calcula los promedios de edades de tres turnos y determina cuál tiene el promedio mayor.
 * @param {number[]} turnoManana - Edades de los estudiantes del turno mañana.
 * @param {number[]} turnoTarde - Edades de los estudiantes del turno tarde.
 * @param {number[]} turnoNoche - Edades de los estudiantes del turno noche.
 * @returns {string} Un mensaje con los promedios de cada turno y cuál tiene el promedio mayor.
 */
function calcularPromediosTurnos(turnoManana, turnoTarde, turnoNoche) {
    const calcularPromedio = (edades) => {
        if (edades.length === 0) return 0;
        return edades.reduce((acc, edad) => acc + edad, 0) / edades.length;
    };

    const promedioManana = calcularPromedio(turnoManana);
    const promedioTarde = calcularPromedio(turnoTarde);
    const promedioNoche = calcularPromedio(turnoNoche);

    let turnoMayor = "mañana";
    let promedioMayor = promedioManana;

    if (promedioTarde > promedioMayor) {
        turnoMayor = "tarde";
        promedioMayor = promedioTarde;
    }
    if (promedioNoche > promedioMayor) {
        turnoMayor = "noche";
        promedioMayor = promedioNoche;
    }

    return `Promedio turno mañana: ${promedioManana.toFixed(2)}, Promedio turno tarde: ${promedioTarde.toFixed(2)}, Promedio turno noche: ${promedioNoche.toFixed(2)}. El turno con el promedio mayor es el turno ${turnoMayor}.`;
}

// Exportar las funciones solo si el entorno es Node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        esMayorDeEdad,
        calcularNotaFinal,
        calcularAumentoSalarial,
        calcularMayorNumero,
        calcularDescuentoCoche,
        calcularDescuentoViaje,
        analizarValores,
        generarTablaMultiplicar,
        convertirTemperatura,
        calcularPromediosTurnos
    };
}