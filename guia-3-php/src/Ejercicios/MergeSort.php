<?php

namespace App\Ejercicios;

/**
 * Clase para el ejercicio Merge Sort
 * Implementa el algoritmo de ordenamiento por mezcla (divide y conquista)
 */
class MergeSort
{
    /**
     * Resuelve el ejercicio Merge Sort
     * 
     * @param array $arr Array a ordenar
     * @return array Resultado con pasos detallados
     */
    public static function resolver(array $arr): array
    {
        $pasos = [];
        
        // Validar restricciones
        $validacion = self::validarRestricciones($arr);
        if (!$validacion['valido']) {
            return [
                'resultado' => [],
                'error' => $validacion['mensaje'],
                'pasos' => [],
                'algoritmo' => 'Merge Sort'
            ];
        }
        
        $n = count($arr);
        $pasos[] = "Array original: [" . implode(', ', $arr) . "]";
        $pasos[] = "Longitud del array: {$n}";
        $pasos[] = "Iniciando algoritmo Merge Sort...";
        $pasos[] = "";
        
        // Crear una copia del array original para no modificarlo
        $arrayOriginal = $arr;
        $arrayOrdenado = self::mergeSort($arr, $pasos, 0, $n - 1, 1);
        
        $pasos[] = "--- Resumen Final ---";
        $pasos[] = "Array original: [" . implode(', ', $arrayOriginal) . "]";
        $pasos[] = "Array ordenado: [" . implode(', ', $arrayOrdenado) . "]";
        $pasos[] = "¡Ordenamiento completado exitosamente! 🎉";
        
        return [
            'resultado' => $arrayOrdenado,
            'array_original' => $arrayOriginal,
            'longitud' => $n,
            'pasos' => $pasos,
            'algoritmo' => 'Merge Sort'
        ];
    }
    
    /**
     * Implementa el algoritmo Merge Sort recursivo
     * 
     * @param array $arr Array a ordenar
     * @param array &$pasos Referencia a array de pasos
     * @param int $inicio Índice de inicio
     * @param int $fin Índice de fin
     * @param int $nivel Nivel de recursión
     * @return array Array ordenado
     */
    private static function mergeSort(array &$arr, array &$pasos, int $inicio, int $fin, int $nivel): array
    {
        $indentacion = str_repeat('  ', $nivel - 1);
        
        if ($inicio >= $fin) {
            $pasos[] = "{$indentacion}Subarray de un elemento: [" . $arr[$inicio] . "] - ya está ordenado";
            return [$arr[$inicio]];
        }
        
        $medio = intval(($inicio + $fin) / 2);
        $pasos[] = "{$indentacion}Dividiendo array [" . implode(', ', array_slice($arr, $inicio, $fin - $inicio + 1)) . "]";
        $pasos[] = "{$indentacion}  Índice medio: {$medio}";
        $pasos[] = "{$indentacion}  Mitad izquierda: [" . implode(', ', array_slice($arr, $inicio, $medio - $inicio + 1)) . "]";
        $pasos[] = "{$indentacion}  Mitad derecha: [" . implode(', ', array_slice($arr, $medio + 1, $fin - $medio)) . "]";
        $pasos[] = "";
        
        // Ordenar recursivamente las dos mitades
        $izquierda = self::mergeSort($arr, $pasos, $inicio, $medio, $nivel + 1);
        $derecha = self::mergeSort($arr, $pasos, $medio + 1, $fin, $nivel + 1);
        
        // Mezclar las dos mitades ordenadas
        $pasos[] = "{$indentacion}Mezclando subarrays ordenados:";
        $pasos[] = "{$indentacion}  Izquierda: [" . implode(', ', $izquierda) . "]";
        $pasos[] = "{$indentacion}  Derecha: [" . implode(', ', $derecha) . "]";
        
        $resultado = self::mezclar($izquierda, $derecha, $pasos, $indentacion);
        
        $pasos[] = "{$indentacion}Resultado de la mezcla: [" . implode(', ', $resultado) . "]";
        $pasos[] = "";
        
        return $resultado;
    }
    
    /**
     * Mezcla dos arrays ordenados en uno solo ordenado
     * 
     * @param array $izquierda Array izquierdo ordenado
     * @param array $derecha Array derecho ordenado
     * @param array &$pasos Referencia a array de pasos
     * @param string $indentacion Indentación para los pasos
     * @return array Array mezclado y ordenado
     */
    private static function mezclar(array $izquierda, array $derecha, array &$pasos, string $indentacion): array
    {
        $resultado = [];
        $i = 0; // Índice para array izquierdo
        $j = 0; // Índice para array derecho
        
        $pasos[] = "{$indentacion}  Iniciando proceso de mezcla...";
        
        while ($i < count($izquierda) && $j < count($derecha)) {
            $pasos[] = "{$indentacion}  Comparando: {$izquierda[$i]} vs {$derecha[$j]}";
            
            if ($izquierda[$i] <= $derecha[$j]) {
                $resultado[] = $izquierda[$i];
                $pasos[] = "{$indentacion}  → Agregando {$izquierda[$i]} (izquierda)";
                $i++;
            } else {
                $resultado[] = $derecha[$j];
                $pasos[] = "{$indentacion}  → Agregando {$derecha[$j]} (derecha)";
                $j++;
            }
        }
        
        // Agregar elementos restantes del array izquierdo
        while ($i < count($izquierda)) {
            $resultado[] = $izquierda[$i];
            $pasos[] = "{$indentacion}  → Agregando {$izquierda[$i]} (izquierda restante)";
            $i++;
        }
        
        // Agregar elementos restantes del array derecho
        while ($j < count($derecha)) {
            $resultado[] = $derecha[$j];
            $pasos[] = "{$indentacion}  → Agregando {$derecha[$j]} (derecha restante)";
            $j++;
        }
        
        return $resultado;
    }
    
    /**
     * Valida las restricciones del problema
     * 
     * @param array $arr Array a validar
     * @return array Resultado de la validación
     */
    private static function validarRestricciones(array $arr): array
    {
        $n = count($arr);
        
        // Verificar longitud del array
        if ($n < 1 || $n > 1000) {
            return [
                'valido' => false,
                'mensaje' => 'El array debe tener entre 1 y 1000 elementos'
            ];
        }
        
        // Verificar que todos los elementos sean números
        foreach ($arr as $elemento) {
            if (!is_numeric($elemento)) {
                return [
                    'valido' => false,
                    'mensaje' => 'Todos los elementos del array deben ser números'
                ];
            }
        }
        
        // Verificar rango de valores
        foreach ($arr as $elemento) {
            if ($elemento < -10000 || $elemento > 10000) {
                return [
                    'valido' => false,
                    'mensaje' => 'Los elementos del array deben estar entre -10000 y 10000'
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
                'nombre' => 'Ejemplo 1 - Array Pequeño',
                'array' => [64, 34, 25, 12, 22, 11, 90],
                'descripcion' => 'Array de 7 elementos con números variados'
            ],
            [
                'nombre' => 'Ejemplo 2 - Array Invertido',
                'array' => [5, 4, 3, 2, 1],
                'descripcion' => 'Array ordenado de mayor a menor'
            ],
            [
                'nombre' => 'Ejemplo 3 - Array Ya Ordenado',
                'array' => [1, 2, 3, 4, 5],
                'descripcion' => 'Array ya ordenado de menor a mayor'
            ],
            [
                'nombre' => 'Ejemplo 4 - Array con Duplicados',
                'array' => [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
                'descripcion' => 'Array con elementos duplicados'
            ],
            [
                'nombre' => 'Ejemplo 5 - Array con Negativos',
                'array' => [-5, 10, -3, 8, -1, 0, 7],
                'descripcion' => 'Array con números negativos y positivos'
            ],
            [
                'nombre' => 'Ejemplo 6 - Array Grande',
                'array' => [38, 27, 43, 3, 9, 82, 10, 16, 25, 7, 12, 45, 33, 18, 29],
                'descripcion' => 'Array de 15 elementos para mostrar el proceso completo'
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
            $resultado = self::resolver($ejemplo['array']);
            $resultados[] = [
                'ejemplo' => $ejemplo,
                'resultado' => $resultado
            ];
        }
        
        return $resultados;
    }
} 