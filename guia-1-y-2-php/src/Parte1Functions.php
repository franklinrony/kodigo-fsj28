<?php

/**
 * Funciones funcionales para los ejercicios de la Parte 1
 * Utilizando PHP moderno y programación funcional
 */

declare(strict_types=1);

namespace App\Parte1;

/**
 * Genera los primeros n términos de la serie Fibonacci
 * 
 * @param int $n Número de términos a generar
 * @return array Array con los términos de la serie Fibonacci
 */
function generarFibonacci(int $n): array
{
    if ($n <= 0) {
        return [];
    }
    
    if ($n === 1) {
        return [0];
    }
    
    if ($n === 2) {
        return [0, 1];
    }
    
    $fibonacci = [0, 1];
    
    for ($i = 2; $i < $n; $i++) {
        $fibonacci[] = $fibonacci[$i - 1] + $fibonacci[$i - 2];
    }
    
    return $fibonacci;
}

/**
 * Determina si un número es primo
 * 
 * @param int $numero Número a verificar
 * @return bool True si es primo, false en caso contrario
 */
function esPrimo(int $numero): bool
{
    if ($numero < 2) {
        return false;
    }
    
    if ($numero === 2) {
        return true;
    }
    
    if ($numero % 2 === 0) {
        return false;
    }
    
    $limite = (int) sqrt($numero);
    
    for ($i = 3; $i <= $limite; $i += 2) {
        if ($numero % $i === 0) {
            return false;
        }
    }
    
    return true;
}

/**
 * Encuentra todos los números primos hasta un límite dado
 * 
 * @param int $limite Límite superior para buscar números primos
 * @return array Array con todos los números primos encontrados
 */
function encontrarPrimosHasta(int $limite): array
{
    if ($limite < 2) {
        return [];
    }
    return array_values(array_filter(range(2, $limite), 'App\Parte1\esPrimo'));
}

/**
 * Determina si una cadena es un palíndromo
 * 
 * @param string $texto Texto a verificar
 * @return bool True si es palíndromo, false en caso contrario
 */
function esPalindromo(string $texto): bool
{
    // Limpiar el texto: remover espacios, puntuación y convertir a minúsculas
    $textoLimpiado = preg_replace('/[^a-zA-Z0-9]/', '', strtolower($texto));
    
    // Comparar con su reverso
    return $textoLimpiado === strrev($textoLimpiado);
}

/**
 * Encuentra todos los palíndromos en una lista de palabras
 * 
 * @param array $palabras Array de palabras a verificar
 * @return array Array con las palabras que son palíndromos
 */
function encontrarPalindromos(array $palabras): array
{
    return array_values(array_filter($palabras, 'App\Parte1\esPalindromo'));
}

/**
 * Formatea un array para mostrar en HTML
 * 
 * @param array $array Array a formatear
 * @param string $separador Separador entre elementos
 * @return string String formateado
 */
function formatearArray(array $array, string $separador = ', '): string
{
    return implode($separador, $array);
}

/**
 * Valida que un número sea positivo
 * 
 * @param int $numero Número a validar
 * @return bool True si es positivo, false en caso contrario
 */
function esPositivo(int $numero): bool
{
    return $numero > 0;
}

/**
 * Valida que una cadena no esté vacía
 * 
 * @param string $texto Texto a validar
 * @return bool True si no está vacío, false en caso contrario
 */
function noEstaVacio(string $texto): bool
{
    return !empty(trim($texto));
} 