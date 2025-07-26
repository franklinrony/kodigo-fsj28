<?php

namespace App\Ejercicios;

/**
 * Clase HeightChecker para resolver el ejercicio de verificación de alturas
 * 
 * Problema: Dado un array de alturas de estudiantes, contar cuántos estudiantes
 * están en posiciones incorrectas después de ordenar por altura.
 * 
 * Ejemplo:
 * Input: heights = [5,1,2,3,4]
 * Output: 5
 * 
 * Explanation:
 * heights:  [5,1,2,3,4]
 * expected: [1,2,3,4,5]
 * All indices do not match.
 */
class HeightChecker
{
    /**
     * Resuelve el ejercicio Height Checker
     * 
     * @param array $heights Array de alturas de estudiantes
     * @return array Resultado con la solución y pasos detallados
     */
    public static function resolver(array $heights): array
    {
        $pasos = [];
        $resultado = 0;
        
        // Validar restricciones
        $validacion = self::validarRestricciones($heights);
        if (!$validacion['valido']) {
            return [
                'resultado' => -1,
                'error' => $validacion['mensaje'],
                'pasos' => [],
                'algoritmo' => 'Height Checker'
            ];
        }
        
        $pasos[] = "Array original de alturas: [" . implode(', ', $heights) . "]";
        
        // Crear una copia ordenada del array
        $expected = $heights;
        sort($expected);
        $pasos[] = "Array esperado (ordenado): [" . implode(', ', $expected) . "]";
        
        // Comparar cada posición
        $indicesIncorrectos = [];
        for ($i = 0; $i < count($heights); $i++) {
            if ($heights[$i] !== $expected[$i]) {
                $resultado++;
                $indicesIncorrectos[] = $i;
                $pasos[] = "Posición {$i}: {$heights[$i]} ≠ {$expected[$i]} (incorrecto)";
            } else {
                $pasos[] = "Posición {$i}: {$heights[$i]} = {$expected[$i]} (correcto)";
            }
        }
        
        $pasos[] = "Total de estudiantes en posiciones incorrectas: {$resultado}";
        
        if ($resultado === 0) {
            $pasos[] = "¡Todos los estudiantes están en las posiciones correctas!";
        } else {
            $pasos[] = "Estudiantes en posiciones incorrectas: " . implode(', ', $indicesIncorrectos);
        }
        
        return [
            'resultado' => $resultado,
            'array_original' => $heights,
            'array_esperado' => $expected,
            'indices_incorrectos' => $indicesIncorrectos,
            'pasos' => $pasos,
            'algoritmo' => 'Height Checker'
        ];
    }
    
    /**
     * Valida las restricciones del problema
     * 
     * @param array $heights Array de alturas
     * @return array Resultado de la validación
     */
    private static function validarRestricciones(array $heights): array
    {
        // Verificar longitud del array
        if (count($heights) < 1 || count($heights) > 100) {
            return [
                'valido' => false,
                'mensaje' => 'La longitud del array debe estar entre 1 y 100'
            ];
        }
        
        // Verificar valores individuales
        foreach ($heights as $i => $height) {
            if (!is_numeric($height) || $height < 1 || $height > 100) {
                return [
                    'valido' => false,
                    'mensaje' => "El valor en la posición {$i} debe estar entre 1 y 100"
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
                'nombre' => 'Ejemplo 1 - Todos incorrectos',
                'heights' => [5, 1, 2, 3, 4],
                'descripcion' => 'Todos los estudiantes están en posiciones incorrectas'
            ],
            [
                'nombre' => 'Ejemplo 2 - Todos correctos',
                'heights' => [1, 2, 3, 4, 5],
                'descripcion' => 'Todos los estudiantes están en posiciones correctas'
            ],
            [
                'nombre' => 'Ejemplo 3 - Parcialmente correctos',
                'heights' => [1, 1, 4, 2, 1, 3],
                'descripcion' => 'Algunos estudiantes están en posiciones correctas'
            ],
            [
                'nombre' => 'Ejemplo 4 - Array pequeño',
                'heights' => [2, 1],
                'descripcion' => 'Array con solo 2 elementos'
            ],
            [
                'nombre' => 'Ejemplo 5 - Valores repetidos',
                'heights' => [1, 1, 1, 1, 1],
                'descripcion' => 'Array con valores repetidos'
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
            $resultado = self::resolver($ejemplo['heights']);
            $resultados[] = [
                'ejemplo' => $ejemplo,
                'resultado' => $resultado
            ];
        }
        
        return $resultados;
    }
} 