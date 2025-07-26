<?php

namespace App\Ejercicios;

/**
 * Clase para el ejercicio A Very Big Sum
 * Calcula la suma de elementos en un array considerando números muy grandes
 */
class VeryBigSum
{
    /**
     * Resuelve el ejercicio A Very Big Sum
     * 
     * @param array $ar Array de enteros
     * @return array Resultado con pasos detallados
     */
    public static function resolver(array $ar): array
    {
        $pasos = [];
        
        // Validar restricciones
        $validacion = self::validarRestricciones($ar);
        if (!$validacion['valido']) {
            return [
                'resultado' => 0,
                'error' => $validacion['mensaje'],
                'pasos' => [],
                'algoritmo' => 'A Very Big Sum'
            ];
        }
        
        $n = count($ar);
        $pasos[] = "Array de entrada: [" . implode(', ', $ar) . "]";
        $pasos[] = "Longitud del array: {$n}";
        $pasos[] = "Iniciando cálculo de suma muy grande...";
        $pasos[] = "";
        
        // Usar BC Math para manejar números muy grandes
        $suma = '0';
        $pasos[] = "--- Proceso de Suma ---";
        $pasos[] = "Inicializando suma: 0";
        
        foreach ($ar as $i => $elemento) {
            $sumaAnterior = $suma;
            $suma = bcadd($suma, (string)$elemento);
            $pasos[] = "Paso " . ($i + 1) . ": {$sumaAnterior} + {$elemento} = {$suma}";
        }
        
        $pasos[] = "";
        $pasos[] = "--- Resultado Final ---";
        $pasos[] = "Suma total: {$suma}";
        
        // Verificar si excede el rango de int de 32 bits
        $limiteInt32 = '2147483647'; // 2^31 - 1
        $limiteInt32Negativo = '-2147483648'; // -2^31
        
        if (bccomp($suma, $limiteInt32) > 0 || bccomp($suma, $limiteInt32Negativo) < 0) {
            $pasos[] = "⚠️  La suma excede el rango de enteros de 32 bits";
            $pasos[] = "   Rango de int32: [{$limiteInt32Negativo}, {$limiteInt32}]";
            $pasos[] = "   Se requiere usar long int o BigInteger";
        } else {
            $pasos[] = "✓ La suma está dentro del rango de enteros de 32 bits";
        }
        
        // Formatear el resultado para mostrar
        $sumaFormateada = self::formatearNumeroGrande($suma);
        $pasos[] = "Suma formateada: {$sumaFormateada}";
        
        return [
            'resultado' => $suma,
            'resultado_formateado' => $sumaFormateada,
            'array_original' => $ar,
            'longitud' => $n,
            'excede_int32' => bccomp($suma, $limiteInt32) > 0 || bccomp($suma, $limiteInt32Negativo) < 0,
            'limite_int32' => $limiteInt32,
            'limite_int32_negativo' => $limiteInt32Negativo,
            'pasos' => $pasos,
            'algoritmo' => 'A Very Big Sum'
        ];
    }
    
    /**
     * Valida las restricciones del problema
     * 
     * @param array $ar Array a validar
     * @return array Resultado de la validación
     */
    private static function validarRestricciones(array $ar): array
    {
        $n = count($ar);
        
        // Verificar longitud del array
        if ($n < 1 || $n > 10) {
            return [
                'valido' => false,
                'mensaje' => 'El array debe tener entre 1 y 10 elementos'
            ];
        }
        
        // Verificar que todos los elementos sean números
        foreach ($ar as $elemento) {
            if (!is_numeric($elemento)) {
                return [
                    'valido' => false,
                    'mensaje' => 'Todos los elementos del array deben ser números'
                ];
            }
        }
        
        // Verificar rango de valores
        $limiteMaximo = '10000000000'; // 10^10
        foreach ($ar as $elemento) {
            if (bccomp((string)$elemento, '0') < 0 || bccomp((string)$elemento, $limiteMaximo) > 0) {
                return [
                    'valido' => false,
                    'mensaje' => 'Los elementos del array deben estar entre 0 y 10^10'
                ];
            }
        }
        
        return ['valido' => true, 'mensaje' => ''];
    }
    
    /**
     * Formatea un número grande para mejor visualización
     * 
     * @param string $numero Número en formato string
     * @return string Número formateado
     */
    private static function formatearNumeroGrande(string $numero): string
    {
        // Si el número es muy grande, usar notación científica
        if (strlen($numero) > 15) {
            $primerosDigitos = substr($numero, 0, 3);
            $exponente = strlen($numero) - 1;
            return $primerosDigitos . ' × 10^' . $exponente;
        }
        
        // Para números más pequeños, usar separadores de miles
        return number_format((float)$numero, 0, '.', ',');
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
                'nombre' => 'Ejemplo 1 - Números Grandes',
                'array' => [1000000001, 1000000002, 1000000003, 1000000004, 1000000005],
                'descripcion' => 'Array con números que exceden int32'
            ],
            [
                'nombre' => 'Ejemplo 2 - Números Pequeños',
                'array' => [1, 2, 3, 4, 5],
                'descripcion' => 'Array con números pequeños dentro del rango int32'
            ],
            [
                'nombre' => 'Ejemplo 3 - Un Solo Elemento',
                'array' => [9999999999],
                'descripcion' => 'Array con un solo elemento muy grande'
            ],
            [
                'nombre' => 'Ejemplo 4 - Múltiples Elementos Grandes',
                'array' => [5000000000, 5000000000, 5000000000],
                'descripcion' => 'Array con múltiples elementos que suman un número muy grande'
            ],
            [
                'nombre' => 'Ejemplo 5 - Ceros y Números Grandes',
                'array' => [0, 1000000000, 0, 2000000000, 0],
                'descripcion' => 'Array mezclando ceros con números grandes'
            ],
            [
                'nombre' => 'Ejemplo 6 - Máximo Tamaño',
                'array' => [10000000000, 10000000000, 10000000000, 10000000000, 10000000000, 10000000000, 10000000000, 10000000000, 10000000000, 10000000000],
                'descripcion' => 'Array de 10 elementos con el valor máximo permitido'
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