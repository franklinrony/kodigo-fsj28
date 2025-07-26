<?php

namespace App\Helpers;

/**
 * Clase helper con funciones utilitarias del proyecto
 */
class AppHelper
{
    /**
     * Función para obtener la URL base de la aplicación
     * @return string URL base
     */
    public static function getBaseUrl(): string
    {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $port = $_SERVER['SERVER_PORT'] ?? '';
        $port = ($port === '80' || $port === '443') ? '' : ':' . $port;
        
        return $protocol . '://' . $host . $port;
    }

    /**
     * Función para validar el tamaño del array
     * @param int $size Tamaño del array
     * @return bool True si es válido
     */
    public static function validateArraySize(int $size): bool
    {
        return $size >= 3 && $size <= 50;
    }

    /**
     * Función para generar un array aleatorio
     * @param int $size Tamaño del array
     * @param int $min Valor mínimo
     * @param int $max Valor máximo
     * @return array Array aleatorio
     */
    public static function generateRandomArray(int $size, int $min = 1, int $max = 100): array
    {
        if (!self::validateArraySize($size)) {
            throw new \InvalidArgumentException("Tamaño de array inválido: {$size}");
        }
        
        return array_map(function() use ($min, $max) {
            return rand($min, $max);
        }, range(1, $size));
    }

    /**
     * Función para formatear el tiempo de ejecución
     * @param float $time Tiempo en microsegundos
     * @return string Tiempo formateado
     */
    public static function formatExecutionTime(float $time): string
    {
        if ($time < 1000) {
            return number_format($time, 2) . ' μs';
        } elseif ($time < 1000000) {
            return number_format($time / 1000, 2) . ' ms';
        } else {
            return number_format($time / 1000000, 2) . ' s';
        }
    }

    /**
     * Función para parsear un string de array a array
     * @param string $arrayString String con formato "1,2,3,4,5"
     * @return array Array parseado
     */
    public static function parseArrayString(string $arrayString): array
    {
        $array = array_map('trim', explode(',', $arrayString));
        return array_map('intval', array_filter($array, 'is_numeric'));
    }

    /**
     * Función para validar que un array contiene solo números
     * @param array $array Array a validar
     * @return bool True si es válido
     */
    public static function validateNumericArray(array $array): bool
    {
        return !empty($array) && array_reduce($array, function($carry, $item) {
            return $carry && is_numeric($item);
        }, true);
    }
} 