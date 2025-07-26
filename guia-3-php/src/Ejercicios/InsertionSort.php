<?php

namespace App\Ejercicios;

/**
 * Clase para el ejercicio Insertion Sort
 * Implementa la inserción de un elemento en su posición correcta dentro de un array ordenado
 */
class InsertionSort
{
    /**
     * Resuelve el ejercicio de inserción de un elemento en un array ordenado
     * 
     * @param array $arr Array con el último elemento desordenado
     * @return array Resultado con pasos detallados
     */
    public static function resolver(array $arr): array
    {
        $pasos = [];
        $resultado = [];
        
        // Validar restricciones
        $validacion = self::validarRestricciones($arr);
        if (!$validacion['valido']) {
            return [
                'resultado' => null,
                'error' => $validacion['mensaje'],
                'pasos' => [],
                'algoritmo' => 'Insertion Sort'
            ];
        }
        
        $n = count($arr);
        $pasos[] = "Array inicial: [" . implode(', ', $arr) . "]";
        $pasos[] = "Tamaño del array: {$n}";
        
        // Almacenar el valor del último elemento (el que se va a insertar)
        $valorInsertar = $arr[$n - 1];
        $pasos[] = "Valor a insertar: {$valorInsertar} (posición " . ($n-1) . ")";
        
        // Iterar desde la penúltima posición hacia atrás
        $i = $n - 2;
        $posicionFinal = $n - 1;
        
        while ($i >= 0 && $arr[$i] > $valorInsertar) {
            $pasos[] = "Comparando: arr[{$i}] = {$arr[$i]} > {$valorInsertar}";
            $pasos[] = "Desplazando {$arr[$i]} de posición {$i} a posición " . ($i + 1);
            
            // Desplazar el elemento hacia la derecha
            $arr[$i + 1] = $arr[$i];
            
            // Mostrar el estado actual del array
            $pasos[] = "Array después del desplazamiento: [" . implode(', ', $arr) . "]";
            
            $i--;
        }
        
        // Insertar el valor en su posición correcta
        $posicionFinal = $i + 1;
        $arr[$posicionFinal] = $valorInsertar;
        
        $pasos[] = "Insertando {$valorInsertar} en posición {$posicionFinal}";
        $pasos[] = "Array final: [" . implode(', ', $arr) . "]";
        $pasos[] = "¡Inserción completada!";
        
        return [
            'resultado' => $arr,
            'array_original' => $arr,
            'valor_insertado' => $valorInsertar,
            'posicion_final' => $posicionFinal,
            'pasos' => $pasos,
            'algoritmo' => 'Insertion Sort'
        ];
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
                'mensaje' => 'La longitud del array debe estar entre 1 y 1000'
            ];
        }
        
        // Verificar valores individuales
        foreach ($arr as $i => $valor) {
            if (!is_numeric($valor) || $valor < -10000 || $valor > 10000) {
                return [
                    'valido' => false,
                    'mensaje' => "El valor en la posición {$i} debe estar entre -10000 y 10000"
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
                'nombre' => 'Ejemplo 1 - Inserción simple',
                'arr' => [1, 2, 4, 5, 3],
                'descripcion' => 'Insertar 3 en un array ordenado'
            ],
            [
                'nombre' => 'Ejemplo 2 - Inserción al inicio',
                'arr' => [2, 4, 6, 8, 1],
                'descripcion' => 'Insertar 1 al inicio del array'
            ],
            [
                'nombre' => 'Ejemplo 3 - Inserción al final',
                'arr' => [1, 2, 3, 4, 5],
                'descripcion' => 'El elemento ya está en su posición correcta'
            ],
            [
                'nombre' => 'Ejemplo 4 - Array pequeño',
                'arr' => [2, 1],
                'descripcion' => 'Array con solo 2 elementos'
            ],
            [
                'nombre' => 'Ejemplo 5 - Valores negativos',
                'arr' => [-5, -3, -1, 0, -2],
                'descripcion' => 'Array con valores negativos'
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
            $resultado = self::resolver($ejemplo['arr']);
            $resultados[] = [
                'ejemplo' => $ejemplo,
                'resultado' => $resultado
            ];
        }
        
        return $resultados;
    }
} 