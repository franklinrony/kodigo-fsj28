<?php

namespace App\Ejercicios;

/**
 * Clase para el ejercicio Birthday Cake Candles
 * Cuenta cuántas velas son las más altas en un pastel de cumpleaños
 */
class BirthdayCakeCandles
{
    /**
     * Resuelve el ejercicio Birthday Cake Candles
     * 
     * @param array $candles Array de alturas de velas
     * @return array Resultado con pasos detallados
     */
    public static function resolver(array $candles): array
    {
        $pasos = [];
        
        // Validar restricciones
        $validacion = self::validarRestricciones($candles);
        if (!$validacion['valido']) {
            return [
                'resultado' => 0,
                'error' => $validacion['mensaje'],
                'pasos' => [],
                'algoritmo' => 'Birthday Cake Candles'
            ];
        }
        
        $n = count($candles);
        $pasos[] = "Número de velas: {$n}";
        $pasos[] = "Alturas de velas: [" . implode(', ', $candles) . "]";
        $pasos[] = "Iniciando proceso de conteo de velas más altas...";
        
        // Encontrar la altura máxima
        $alturaMaxima = max($candles);
        $pasos[] = "--- Paso 1: Encontrar la altura máxima ---";
        $pasos[] = "Altura máxima encontrada: {$alturaMaxima}";
        
        // Contar cuántas velas tienen esa altura máxima
        $conteo = 0;
        $posiciones = [];
        
        $pasos[] = "--- Paso 2: Contar velas con altura máxima ---";
        
        foreach ($candles as $i => $altura) {
            if ($altura === $alturaMaxima) {
                $conteo++;
                $posiciones[] = $i;
                $pasos[] = "Vela en posición {$i}: altura {$altura} ✓ (es máxima)";
            } else {
                $pasos[] = "Vela en posición {$i}: altura {$altura} ✗ (no es máxima)";
            }
        }
        
        $pasos[] = "--- Resultado ---";
        $pasos[] = "Total de velas más altas: {$conteo}";
        $pasos[] = "Posiciones de velas más altas: [" . implode(', ', $posiciones) . "]";
        
        return [
            'resultado' => $conteo,
            'n' => $n,
            'candles' => $candles,
            'altura_maxima' => $alturaMaxima,
            'conteo' => $conteo,
            'posiciones' => $posiciones,
            'pasos' => $pasos,
            'algoritmo' => 'Birthday Cake Candles'
        ];
    }
    
    /**
     * Valida las restricciones del problema
     * 
     * @param array $candles Array de velas a validar
     * @return array Resultado de la validación
     */
    private static function validarRestricciones(array $candles): array
    {
        $n = count($candles);
        
        // Verificar longitud del array
        if ($n < 1 || $n > 100000) {
            return [
                'valido' => false,
                'mensaje' => 'El número de velas debe estar entre 1 y 10^5'
            ];
        }
        
        // Verificar valores de las velas
        foreach ($candles as $i => $altura) {
            if (!is_numeric($altura) || $altura < 1 || $altura > 10000000) {
                return [
                    'valido' => false,
                    'mensaje' => "La altura de la vela en la posición {$i} debe estar entre 1 y 10^7"
                ];
            }
        }
        
        return ['valido' => true, 'mensaje' => ''];
    }
    
    /**
     * Genera ejemplos de prueba para el ejercicio
     * 
     * @return array Array de ejemplos
     */
    public static function generarEjemplos(): array
    {
        return [
            [
                'nombre' => 'Ejemplo 1 - Velas Múltiples Máximas',
                'candles' => [4, 4, 1, 3],
                'descripcion' => 'Hay 2 velas con altura máxima 4'
            ],
            [
                'nombre' => 'Ejemplo 2 - Una Vela Máxima',
                'candles' => [3, 2, 1, 3],
                'descripcion' => 'Hay 2 velas con altura máxima 3'
            ],
            [
                'nombre' => 'Ejemplo 3 - Todas Iguales',
                'candles' => [5, 5, 5, 5],
                'descripcion' => 'Todas las velas tienen altura máxima 5'
            ],
            [
                'nombre' => 'Ejemplo 4 - Una Vela',
                'candles' => [7],
                'descripcion' => 'Solo hay una vela con altura 7'
            ],
            [
                'nombre' => 'Ejemplo 5 - Secuencia Creciente',
                'candles' => [1, 2, 3, 4, 5],
                'descripcion' => 'Solo una vela con altura máxima 5'
            ],
            [
                'nombre' => 'Ejemplo 6 - Secuencia Decreciente',
                'candles' => [5, 4, 3, 2, 1],
                'descripcion' => 'Solo una vela con altura máxima 5'
            ]
        ];
    }
    
    /**
     * Ejecuta todos los ejemplos de prueba
     * 
     * @return array Resultados de todos los ejemplos
     */
    public static function ejecutarEjemplos(): array
    {
        $ejemplos = self::generarEjemplos();
        $resultados = [];
        
        foreach ($ejemplos as $ejemplo) {
            $resultado = self::resolver($ejemplo['candles']);
            $resultados[] = [
                'ejemplo' => $ejemplo,
                'resultado' => $resultado
            ];
        }
        
        return $resultados;
    }
} 