<?php

namespace App\Ejercicios;

/**
 * Clase para el ejercicio Happy Number
 * Determina si un número es feliz mediante la suma de cuadrados de sus dígitos
 */
class HappyNumber
{
    /**
     * Resuelve el ejercicio Happy Number
     * 
     * @param int $n Número a verificar
     * @return array Resultado con pasos detallados
     */
    public static function resolver(int $n): array
    {
        $pasos = [];
        
        // Validar restricciones
        $validacion = self::validarRestricciones($n);
        if (!$validacion['valido']) {
            return [
                'resultado' => false,
                'error' => $validacion['mensaje'],
                'pasos' => [],
                'algoritmo' => 'Happy Number'
            ];
        }
        
        $pasos[] = "Número a verificar: {$n}";
        $pasos[] = "Iniciando proceso de verificación de número feliz...";
        
        // Conjunto para detectar ciclos
        $numerosVistos = [];
        $numeroActual = $n;
        $iteracion = 1;
        
        while ($numeroActual !== 1 && !in_array($numeroActual, $numerosVistos)) {
            $pasos[] = "--- Iteración {$iteracion} ---";
            $pasos[] = "Número actual: {$numeroActual}";
            
            // Agregar a números vistos para detectar ciclos
            $numerosVistos[] = $numeroActual;
            
            // Obtener dígitos del número
            $digitos = str_split((string)$numeroActual);
            $pasos[] = "Dígitos: [" . implode(', ', $digitos) . "]";
            
            // Calcular suma de cuadrados
            $sumaCuadrados = 0;
            $calculos = [];
            
            foreach ($digitos as $digito) {
                $cuadrado = $digito * $digito;
                $calculos[] = "{$digito}² = {$cuadrado}";
                $sumaCuadrados += $cuadrado;
            }
            
            $pasos[] = "Cálculos: " . implode(' + ', $calculos) . " = {$sumaCuadrados}";
            $pasos[] = "Nueva suma: {$sumaCuadrados}";
            
            $numeroActual = $sumaCuadrados;
            $iteracion++;
        }
        
        // Determinar resultado
        if ($numeroActual === 1) {
            $pasos[] = "¡El número {$n} ES FELIZ!";
            $pasos[] = "El proceso terminó en 1 después de " . ($iteracion - 1) . " iteraciones.";
            
            return [
                'resultado' => true,
                'numero' => $n,
                'es_feliz' => true,
                'iteraciones' => $iteracion - 1,
                'secuencia' => $numerosVistos,
                'pasos' => $pasos,
                'algoritmo' => 'Happy Number'
            ];
        } else {
            $pasos[] = "¡El número {$n} NO ES FELIZ!";
            $pasos[] = "Se detectó un ciclo infinito que no incluye 1.";
            $pasos[] = "Secuencia del ciclo: [" . implode(' → ', array_slice($numerosVistos, -5)) . " → ...]";
            
            return [
                'resultado' => false,
                'numero' => $n,
                'es_feliz' => false,
                'iteraciones' => $iteracion - 1,
                'secuencia' => $numerosVistos,
                'pasos' => $pasos,
                'algoritmo' => 'Happy Number'
            ];
        }
    }
    
    /**
     * Valida las restricciones del problema
     * 
     * @param int $n Número a validar
     * @return array Resultado de la validación
     */
    private static function validarRestricciones(int $n): array
    {
        // Verificar rango del número
        if ($n < 1 || $n > 230) { // 231 - 1
            return [
                'valido' => false,
                'mensaje' => 'El número debe estar entre 1 y 231 - 1 (230)'
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
                'nombre' => 'Ejemplo 1 - Número Feliz',
                'n' => 19,
                'descripcion' => '19 es un número feliz'
            ],
            [
                'nombre' => 'Ejemplo 2 - Número No Feliz',
                'n' => 2,
                'descripcion' => '2 no es un número feliz'
            ],
            [
                'nombre' => 'Ejemplo 3 - Número 1',
                'n' => 1,
                'descripcion' => '1 es un número feliz por definición'
            ],
            [
                'nombre' => 'Ejemplo 4 - Número Feliz Pequeño',
                'n' => 7,
                'descripcion' => '7 es un número feliz'
            ],
            [
                'nombre' => 'Ejemplo 5 - Número No Feliz',
                'n' => 4,
                'descripcion' => '4 no es un número feliz'
            ],
            [
                'nombre' => 'Ejemplo 6 - Número Grande',
                'n' => 100,
                'descripcion' => '100 es un número feliz'
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
            $resultado = self::resolver($ejemplo['n']);
            $resultados[] = [
                'ejemplo' => $ejemplo,
                'resultado' => $resultado
            ];
        }
        
        return $resultados;
    }
} 