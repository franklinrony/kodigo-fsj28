<?php

/**
 * Funciones funcionales para los ejercicios de la Parte 2
 * Utilizando PHP moderno y programación funcional
 */

declare(strict_types=1);

namespace App\Parte2;

/**
 * Suma todos los números pares en un array
 * 
 * @param array $numeros Array de números enteros
 * @return int Suma de todos los números pares
 */
function sumarNumerosPares(array $numeros): int
{
    return array_reduce(
        array_filter($numeros, fn($n) => $n % 2 === 0),
        fn($carry, $item) => $carry + $item,
        0
    );
}

/**
 * Filtra solo los números pares de un array
 * 
 * @param array $numeros Array de números enteros
 * @return array Array con solo los números pares
 */
function obtenerNumerosPares(array $numeros): array
{
    return array_values(array_filter($numeros, fn($n) => $n % 2 === 0));
}

/**
 * Filtra solo los números impares de un array
 * 
 * @param array $numeros Array de números enteros
 * @return array Array con solo los números impares
 */
function obtenerNumerosImpares(array $numeros): array
{
    return array_values(array_filter($numeros, fn($n) => $n % 2 !== 0));
}

/**
 * Obtiene estadísticas de un array de números
 * 
 * @param array $numeros Array de números enteros
 * @return array Array con estadísticas
 */
function obtenerEstadisticas(array $numeros): array
{
    if (empty($numeros)) {
        return [
            'total' => 0,
            'pares' => 0,
            'impares' => 0,
            'suma_pares' => 0,
            'suma_impares' => 0,
            'promedio' => 0
        ];
    }
    
    $pares = obtenerNumerosPares($numeros);
    $impares = obtenerNumerosImpares($numeros);
    
    return [
        'total' => count($numeros),
        'pares' => count($pares),
        'impares' => count($impares),
        'suma_pares' => sumarNumerosPares($numeros),
        'suma_impares' => array_sum($impares),
        'promedio' => array_sum($numeros) / count($numeros)
    ];
}

/**
 * Tabla de precios por zona geográfica
 * 
 * @return array Array asociativo con claves y precios
 */
function obtenerTablaPrecios(): array
{
    return [
        12 => ['zona' => 'América del Norte', 'precio' => 2.00],
        15 => ['zona' => 'América Central', 'precio' => 2.20],
        18 => ['zona' => 'América del Sur', 'precio' => 4.50],
        19 => ['zona' => 'Europa', 'precio' => 3.50],
        23 => ['zona' => 'Asia', 'precio' => 6.00],
        25 => ['zona' => 'África', 'precio' => 6.00],
        29 => ['zona' => 'Oceanía', 'precio' => 5.00]
    ];
}

/**
 * Calcula el costo de una llamada internacional
 * 
 * @param int $clave Clave de la zona geográfica
 * @param int $minutos Duración de la llamada en minutos
 * @return array Array con detalles del cálculo
 */
function calcularCostoLlamada(int $clave, int $minutos): array
{
    $tabla = obtenerTablaPrecios();
    
    if (!isset($tabla[$clave])) {
        return [
            'error' => 'Clave de zona no válida',
            'clave' => $clave,
            'minutos' => $minutos
        ];
    }
    
    $zona = $tabla[$clave]['zona'];
    $precioPorMinuto = $tabla[$clave]['precio'];
    $costoBase = $precioPorMinuto * $minutos;
    
    // Descuento del 10% para llamadas menores a 30 minutos
    $descuento = ($minutos < 30) ? 0.10 : 0.00;
    $montoDescuento = $costoBase * $descuento;
    $costoFinal = $costoBase - $montoDescuento;
    
    return [
        'clave' => $clave,
        'zona' => $zona,
        'minutos' => $minutos,
        'precio_por_minuto' => $precioPorMinuto,
        'costo_base' => $costoBase,
        'descuento_aplicado' => $descuento * 100,
        'monto_descuento' => $montoDescuento,
        'costo_final' => $costoFinal,
        'error' => null
    ];
}

/**
 * Genera la secuencia FizzBuzz hasta n
 * 
 * @param int $n Número hasta donde generar la secuencia
 * @return array Array con la secuencia FizzBuzz
 */
function generarFizzBuzz(int $n): array
{
    if ($n < 1) {
        return [];
    }
    
    return array_map(function($i) {
        if ($i % 3 === 0 && $i % 5 === 0) {
            return 'FizzBuzz';
        } elseif ($i % 3 === 0) {
            return 'Fizz';
        } elseif ($i % 5 === 0) {
            return 'Buzz';
        } else {
            return (string) $i;
        }
    }, range(1, $n));
}

/**
 * Analiza la secuencia FizzBuzz y obtiene estadísticas
 * 
 * @param int $n Número hasta donde generar la secuencia
 * @return array Array con estadísticas de la secuencia
 */
function analizarFizzBuzz(int $n): array
{
    $secuencia = generarFizzBuzz($n);
    
    $fizzCount = count(array_filter($secuencia, fn($item) => $item === 'Fizz'));
    $buzzCount = count(array_filter($secuencia, fn($item) => $item === 'Buzz'));
    $fizzBuzzCount = count(array_filter($secuencia, fn($item) => $item === 'FizzBuzz'));
    $numerosCount = count(array_filter($secuencia, fn($item) => is_numeric($item)));
    
    return [
        'n' => $n,
        'secuencia' => $secuencia,
        'estadisticas' => [
            'fizz' => $fizzCount,
            'buzz' => $buzzCount,
            'fizzbuzz' => $fizzBuzzCount,
            'numeros' => $numerosCount,
            'total' => count($secuencia)
        ]
    ];
}

/**
 * Valida que un número esté en el rango válido para FizzBuzz
 * 
 * @param int $n Número a validar
 * @return bool True si está en el rango válido
 */
function esRangoFizzBuzzValido(int $n): bool
{
    return $n >= 1 && $n <= 10000;
}

/**
 * Valida que una clave de zona sea válida
 * 
 * @param int $clave Clave a validar
 * @return bool True si la clave es válida
 */
function esClaveZonaValida(int $clave): bool
{
    $tabla = obtenerTablaPrecios();
    return isset($tabla[$clave]);
}

/**
 * Valida que los minutos sean positivos
 * 
 * @param int $minutos Minutos a validar
 * @return bool True si los minutos son válidos
 */
function sonMinutosValidos(int $minutos): bool
{
    return $minutos > 0;
}

/**
 * Formatea un número como moneda
 * 
 * @param float $numero Número a formatear
 * @return string Número formateado como moneda
 */
function formatearMoneda(float $numero): string
{
    return '$' . number_format($numero, 2);
}

/**
 * Convierte un string de números separados por comas en array
 * 
 * @param string $numerosString String con números separados por comas
 * @return array Array de números enteros
 */
function parsearNumerosString(string $numerosString): array
{
    $numeros = array_map('trim', explode(',', $numerosString));
    $numerosFiltrados = array_filter($numeros, fn($n) => is_numeric($n));
    return array_values(array_map('intval', $numerosFiltrados));
} 