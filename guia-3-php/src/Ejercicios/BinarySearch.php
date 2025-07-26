<?php

namespace App\Ejercicios;

/**
 * Clase para el ejercicio Binary Search
 * Implementa búsqueda binaria en un array ordenado
 */
class BinarySearch
{
    /**
     * Resuelve el ejercicio de búsqueda binaria
     * 
     * @param array $nums Array ordenado en orden ascendente
     * @param int $target Elemento a buscar
     * @return array Resultado con pasos detallados
     */
    public static function resolver(array $nums, int $target): array
    {
        $pasos = [];
        
        // Validar restricciones
        $validacion = self::validarRestricciones($nums, $target);
        if (!$validacion['valido']) {
            return [
                'resultado' => -1,
                'error' => $validacion['mensaje'],
                'pasos' => [],
                'algoritmo' => 'Binary Search'
            ];
        }
        
        $n = count($nums);
        $pasos[] = "Array ordenado: [" . implode(', ', $nums) . "]";
        $pasos[] = "Elemento a buscar: {$target}";
        $pasos[] = "Tamaño del array: {$n}";
        
        // Inicializar variables
        $izquierda = 0;
        $derecha = $n - 1;
        $iteracion = 1;
        
        $pasos[] = "Iniciando búsqueda binaria...";
        $pasos[] = "Rango inicial: izquierda = {$izquierda}, derecha = {$derecha}";
        
        while ($izquierda <= $derecha) {
            $pasos[] = "--- Iteración {$iteracion} ---";
            
            // Calcular punto medio
            $medio = intval(($izquierda + $derecha) / 2);
            $valorMedio = $nums[$medio];
            
            $pasos[] = "Punto medio: índice {$medio}, valor {$valorMedio}";
            $pasos[] = "Rango actual: [" . implode(', ', array_slice($nums, $izquierda, $derecha - $izquierda + 1)) . "]";
            
            // Comparar con el target
            if ($valorMedio === $target) {
                $pasos[] = "¡Encontrado! {$target} está en la posición {$medio}";
                $pasos[] = "Búsqueda completada exitosamente.";
                
                return [
                    'resultado' => $medio,
                    'array' => $nums,
                    'target' => $target,
                    'posicion_encontrada' => $medio,
                    'iteraciones' => $iteracion,
                    'pasos' => $pasos,
                    'algoritmo' => 'Binary Search'
                ];
            } elseif ($valorMedio < $target) {
                $pasos[] = "{$valorMedio} < {$target}, buscar en la mitad derecha";
                $izquierda = $medio + 1;
                $pasos[] = "Nuevo rango: izquierda = {$izquierda}, derecha = {$derecha}";
            } else {
                $pasos[] = "{$valorMedio} > {$target}, buscar en la mitad izquierda";
                $derecha = $medio - 1;
                $pasos[] = "Nuevo rango: izquierda = {$izquierda}, derecha = {$derecha}";
            }
            
            $iteracion++;
        }
        
        $pasos[] = "Elemento {$target} no encontrado en el array";
        $pasos[] = "Búsqueda completada. Retornando -1";
        
        return [
            'resultado' => -1,
            'array' => $nums,
            'target' => $target,
            'posicion_encontrada' => -1,
            'iteraciones' => $iteracion - 1,
            'pasos' => $pasos,
            'algoritmo' => 'Binary Search'
        ];
    }
    
    /**
     * Valida las restricciones del problema
     * 
     * @param array $nums Array a validar
     * @param int $target Target a validar
     * @return array Resultado de la validación
     */
    private static function validarRestricciones(array $nums, int $target): array
    {
        $n = count($nums);
        
        // Verificar longitud del array
        if ($n < 1 || $n > 104) {
            return [
                'valido' => false,
                'mensaje' => 'La longitud del array debe estar entre 1 y 104'
            ];
        }
        
        // Verificar valores del array
        foreach ($nums as $i => $valor) {
            if (!is_numeric($valor) || $valor <= -104 || $valor >= 104) {
                return [
                    'valido' => false,
                    'mensaje' => "El valor en la posición {$i} debe estar entre -104 y 104 (exclusivo)"
                ];
            }
        }
        
        // Verificar target
        if (!is_numeric($target) || $target <= -104 || $target >= 104) {
            return [
                'valido' => false,
                'mensaje' => 'El target debe estar entre -104 y 104 (exclusivo)'
            ];
        }
        
        // Verificar que el array esté ordenado
        for ($i = 1; $i < $n; $i++) {
            if ($nums[$i] <= $nums[$i - 1]) {
                return [
                    'valido' => false,
                    'mensaje' => 'El array debe estar ordenado en orden ascendente'
                ];
            }
        }
        
        // Verificar que todos los elementos sean únicos
        if (count(array_unique($nums)) !== $n) {
            return [
                'valido' => false,
                'mensaje' => 'Todos los elementos del array deben ser únicos'
            ];
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
                'nombre' => 'Ejemplo 1 - Elemento encontrado',
                'nums' => [-1, 0, 3, 5, 9, 12],
                'target' => 9,
                'descripcion' => 'Buscar 9 en el array ordenado'
            ],
            [
                'nombre' => 'Ejemplo 2 - Elemento no encontrado',
                'nums' => [-1, 0, 3, 5, 9, 12],
                'target' => 2,
                'descripcion' => 'Buscar 2 que no existe en el array'
            ],
            [
                'nombre' => 'Ejemplo 3 - Elemento al inicio',
                'nums' => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                'target' => 1,
                'descripcion' => 'Buscar el primer elemento'
            ],
            [
                'nombre' => 'Ejemplo 4 - Elemento al final',
                'nums' => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                'target' => 10,
                'descripcion' => 'Buscar el último elemento'
            ],
            [
                'nombre' => 'Ejemplo 5 - Array pequeño',
                'nums' => [1, 3, 5],
                'target' => 3,
                'descripcion' => 'Buscar en un array pequeño'
            ],
            [
                'nombre' => 'Ejemplo 6 - Valores negativos',
                'nums' => [-10, -5, 0, 5, 10],
                'target' => -5,
                'descripcion' => 'Buscar un valor negativo'
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
            $resultado = self::resolver($ejemplo['nums'], $ejemplo['target']);
            $resultados[] = [
                'ejemplo' => $ejemplo,
                'resultado' => $resultado
            ];
        }
        
        return $resultados;
    }
} 