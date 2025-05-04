// Importar las funciones desde main.js
const { esMayorDeEdad, calcularNotaFinal, calcularAumentoSalarial, calcularMayorNumero, calcularDescuentoCoche, calcularDescuentoViaje, analizarValores, generarTablaMultiplicar, convertirTemperatura, calcularPromediosTurnos } = require('../src/main');

// Ejercicio 1: Pruebas para la función esMayorDeEdad
describe('Pruebas para main.js', () => {
   
});

describe('EJERCICIO 1: Pruebas para la función esMayorDeEdad', () => {
    test('Debe devolver "La persona es mayor de edad." si la edad es 18 o mayor', () => {
        expect(esMayorDeEdad(18)).toBe("La persona es mayor de edad.");
        expect(esMayorDeEdad(25)).toBe("La persona es mayor de edad.");
    });

    test('Debe devolver "La persona no es mayor de edad." si la edad es menor a 18', () => {
        expect(esMayorDeEdad(17)).toBe("La persona no es mayor de edad.");
        expect(esMayorDeEdad(10)).toBe("La persona no es mayor de edad.");
    });

    test('Debe manejar correctamente casos límite como edad 0', () => {
        expect(esMayorDeEdad(0)).toBe("La persona no es mayor de edad.");
    });
});

describe('EJERCICIO 2: Pruebas para la función calcularNotaFinal', () => {
    test('Debe calcular correctamente la nota final del alumno', () => {
        const resultado = calcularNotaFinal("Juan Pérez", "A12345", 80, 90, 100, 85);
        expect(resultado).toBe("Alumno: Juan Pérez, Carnet: A12345, Nota Final: 87.50");
    });

    test('Debe manejar correctamente valores bajos en las notas', () => {
        const resultado = calcularNotaFinal("Ana López", "B67890", 50, 60, 70, 40);
        expect(resultado).toBe("Alumno: Ana López, Carnet: B67890, Nota Final: 53.00");
    });

    test('Debe manejar correctamente valores máximos en las notas', () => {
        const resultado = calcularNotaFinal("Carlos Ruiz", "C11223", 100, 100, 100, 100);
        expect(resultado).toBe("Alumno: Carlos Ruiz, Carnet: C11223, Nota Final: 100.00");
    });
});

describe('EJERCICIO 3: Pruebas para la función calcularAumentoSalarial', () => {
    test('Debe calcular correctamente el aumento para categoría A', () => {
        const resultado = calcularAumentoSalarial("Luis Gómez", 2000, "A");
        expect(resultado).toBe("Empleado: Luis Gómez, Categoría: A, Salario Actual: 2000.00, Aumento: 300.00, Nuevo Salario: 2300.00");
    });

    test('Debe calcular correctamente el aumento para categoría B', () => {
        const resultado = calcularAumentoSalarial("María Pérez", 1500, "B");
        expect(resultado).toBe("Empleado: María Pérez, Categoría: B, Salario Actual: 1500.00, Aumento: 450.00, Nuevo Salario: 1950.00");
    });

    test('Debe calcular correctamente el aumento para categoría C', () => {
        const resultado = calcularAumentoSalarial("Carlos Ruiz", 1800, "C");
        expect(resultado).toBe("Empleado: Carlos Ruiz, Categoría: C, Salario Actual: 1800.00, Aumento: 180.00, Nuevo Salario: 1980.00");
    });

    test('Debe calcular correctamente el aumento para categoría D', () => {
        const resultado = calcularAumentoSalarial("Ana López", 2500, "D");
        expect(resultado).toBe("Empleado: Ana López, Categoría: D, Salario Actual: 2500.00, Aumento: 500.00, Nuevo Salario: 3000.00");
    });

    test('Debe manejar correctamente una categoría inválida', () => {
        const resultado = calcularAumentoSalarial("Pedro Sánchez", 2200, "E");
        expect(resultado).toBe("Categoría inválida para el trabajador Pedro Sánchez.");
    });
});

describe('EJERCICIO 4: Pruebas para la función calcularMayorNumero', () => {
    test('Debe devolver el primer número si es mayor', () => {
        const resultado = calcularMayorNumero(10, 5);
        expect(resultado).toBe("El número mayor es: 10");
    });

    test('Debe devolver el segundo número si es mayor', () => {
        const resultado = calcularMayorNumero(3, 8);
        expect(resultado).toBe("El número mayor es: 8");
    });

    test('Debe indicar que ambos números son iguales si tienen el mismo valor', () => {
        const resultado = calcularMayorNumero(7, 7);
        expect(resultado).toBe("Ambos números son iguales.");
    });
});

describe('EJERCICIO 5: Pruebas para la función calcularDescuentoCoche', () => {
    test('Debe calcular correctamente el descuento para FORD FIESTA', () => {
        const resultado = calcularDescuentoCoche("FORD FIESTA", 20000);
        expect(resultado).toBe("Coche: FORD FIESTA, Descuento Aplicado: 1000.00, Precio Final: 19000.00");
    });

    test('Debe calcular correctamente el descuento para FORD FOCUS', () => {
        const resultado = calcularDescuentoCoche("FORD FOCUS", 25000);
        expect(resultado).toBe("Coche: FORD FOCUS, Descuento Aplicado: 2500.00, Precio Final: 22500.00");
    });

    test('Debe calcular correctamente el descuento para FORD ESCAPE', () => {
        const resultado = calcularDescuentoCoche("FORD ESCAPE", 30000);
        expect(resultado).toBe("Coche: FORD ESCAPE, Descuento Aplicado: 6000.00, Precio Final: 24000.00");
    });

    test('Debe manejar correctamente un modelo no válido', () => {
        const resultado = calcularDescuentoCoche("TOYOTA COROLLA", 20000);
        expect(resultado).toBe("Modelo no válido: TOYOTA COROLLA.");
    });
});

describe('EJERCICIO 6: Pruebas para la función calcularDescuentoViaje', () => {
    test('Debe calcular correctamente el descuento para La Costa del Sol', () => {
        const resultado = calcularDescuentoViaje("Palma", "La Costa del Sol", 1000);
        expect(resultado).toBe("Destino: La Costa del Sol, Descuento Aplicado: 50.00, Precio Final: 950.00");
    });

    test('Debe calcular correctamente el descuento para Panchimalco', () => {
        const resultado = calcularDescuentoViaje("Palma", "Panchimalco", 1000);
        expect(resultado).toBe("Destino: Panchimalco, Descuento Aplicado: 100.00, Precio Final: 900.00");
    });

    test('Debe calcular correctamente el descuento para Puerto el Triunfo', () => {
        const resultado = calcularDescuentoViaje("Palma", "Puerto el Triunfo", 1000);
        expect(resultado).toBe("Destino: Puerto el Triunfo, Descuento Aplicado: 150.00, Precio Final: 850.00");
    });

    test('Debe manejar correctamente un destino no válido', () => {
        const resultado = calcularDescuentoViaje("Palma", "San Salvador", 1000);
        expect(resultado).toBe("Destino no válido: San Salvador.");
    });

    test('Debe manejar correctamente un origen no válido', () => {
        const resultado = calcularDescuentoViaje("San Salvador", "La Costa del Sol", 1000);
        expect(resultado).toBe("No se aplica descuento para el origen: San Salvador.");
    });
});

describe('EJERCICIO 7: Pruebas para la función analizarValores', () => {
    test('Debe analizar correctamente un conjunto de valores', () => {
        const valores = [10, -5, 15, 30, -20, 0, 45, -15, 8, 12];
        const resultado = analizarValores(valores);
        expect(resultado).toEqual({
            negativos: 3,
            positivos: 6,
            multiplosDe15: 5,
            sumaPares: 40, 
        });
    });

    test('Debe manejar correctamente un conjunto con todos valores negativos', () => {
        const valores = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
        const resultado = analizarValores(valores);
        expect(resultado).toEqual({
            negativos: 10,
            positivos: 0,
            multiplosDe15: 0,
            sumaPares: -30,
        });
    });

    test('Debe manejar correctamente un conjunto con todos valores positivos', () => {
        const valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const resultado = analizarValores(valores);
        expect(resultado).toEqual({
            negativos: 0,
            positivos: 10,
            multiplosDe15: 0,
            sumaPares: 30,
        });
    });

    test('Debe devolver un mensaje de error si no se ingresan exactamente 10 valores', () => {
        const valores = [1, 2, 3];
        const resultado = analizarValores(valores);
        expect(resultado).toBe("Debe ingresar exactamente 10 valores.");
    });
});

describe('EJERCICIO 8: Pruebas para la función generarTablaMultiplicar', () => {
    test('Debe generar correctamente la tabla de multiplicar para un número positivo', () => {
        const resultado = generarTablaMultiplicar(5);
        expect(resultado).toEqual([
            "5 x 1 = 5",
            "5 x 2 = 10",
            "5 x 3 = 15",
            "5 x 4 = 20",
            "5 x 5 = 25",
            "5 x 6 = 30",
            "5 x 7 = 35",
            "5 x 8 = 40",
            "5 x 9 = 45",
            "5 x 10 = 50",
        ]);
    });

    test('Debe generar correctamente la tabla de multiplicar para un número negativo', () => {
        const resultado = generarTablaMultiplicar(-3);
        expect(resultado).toEqual([
            "-3 x 1 = -3",
            "-3 x 2 = -6",
            "-3 x 3 = -9",
            "-3 x 4 = -12",
            "-3 x 5 = -15",
            "-3 x 6 = -18",
            "-3 x 7 = -21",
            "-3 x 8 = -24",
            "-3 x 9 = -27",
            "-3 x 10 = -30",
        ]);
    });

    test('Debe manejar correctamente un valor no numérico', () => {
        const resultado = generarTablaMultiplicar("texto");
        expect(resultado).toBe("Debe ingresar un número válido.");
    });

    test('Debe manejar correctamente un valor NaN', () => {
        const resultado = generarTablaMultiplicar(NaN);
        expect(resultado).toBe("Debe ingresar un número válido.");
    });
});

describe('EJERCICIO 9: Pruebas para la función convertirTemperatura', () => {
    test('Debe clasificar correctamente como "Temperatura baja"', () => {
        const resultado = convertirTemperatura(-10);
        expect(resultado).toBe("Temperatura: 14.00 ºF - Temperatura baja");
    });

    test('Debe clasificar correctamente como "Temperatura adecuada"', () => {
        const resultado = convertirTemperatura(0);
        expect(resultado).toBe("Temperatura: 32.00 ºF - Temperatura adecuada");
    });

    test('Debe clasificar correctamente como "Temperatura alta"', () => {
        const resultado = convertirTemperatura(25);
        expect(resultado).toBe("Temperatura: 77.00 ºF - Temperatura alta");
    });

    test('Debe clasificar correctamente como "Temperatura desconocida"', () => {
        const resultado = convertirTemperatura(40);
        expect(resultado).toBe("Temperatura: 104.00 ºF - Temperatura desconocida");
    });

    test('Debe manejar correctamente un valor no numérico', () => {
        const resultado = convertirTemperatura("texto");
        expect(resultado).toBe("Debe ingresar un número válido.");
    });

    test('Debe manejar correctamente un valor NaN', () => {
        const resultado = convertirTemperatura(NaN);
        expect(resultado).toBe("Debe ingresar un número válido.");
    });
});

describe('EJERCICIO 10: Pruebas para la función calcularPromediosTurnos', () => {
    test('Debe calcular correctamente los promedios y determinar el turno con el promedio mayor', () => {
        const turnoManana = [18, 20, 22, 19, 21];
        const turnoTarde = [25, 24, 23, 22, 26, 27];
        const turnoNoche = [30, 29, 28, 31, 32, 33, 34, 35, 36, 37, 38];
        const resultado = calcularPromediosTurnos(turnoManana, turnoTarde, turnoNoche);
        expect(resultado).toBe("Promedio turno mañana: 20.00, Promedio turno tarde: 24.50, Promedio turno noche: 33.00. El turno con el promedio mayor es el turno noche.");
    });

    test('Debe manejar correctamente turnos con edades vacías', () => {
        const turnoManana = [];
        const turnoTarde = [25, 24, 23, 22, 26, 27];
        const turnoNoche = [30, 29, 28, 31, 32, 33, 34, 35, 36, 37, 38];
        const resultado = calcularPromediosTurnos(turnoManana, turnoTarde, turnoNoche);
        expect(resultado).toBe("Promedio turno mañana: 0.00, Promedio turno tarde: 24.50, Promedio turno noche: 33.00. El turno con el promedio mayor es el turno noche.");
    });

    test('Debe manejar correctamente turnos con el mismo promedio', () => {
        const turnoManana = [20, 20, 20];
        const turnoTarde = [20, 20, 20];
        const turnoNoche = [20, 20, 20];
        const resultado = calcularPromediosTurnos(turnoManana, turnoTarde, turnoNoche);
        expect(resultado).toBe("Promedio turno mañana: 20.00, Promedio turno tarde: 20.00, Promedio turno noche: 20.00. El turno con el promedio mayor es el turno mañana.");
    });
});
