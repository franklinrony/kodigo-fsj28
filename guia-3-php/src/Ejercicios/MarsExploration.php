<?php

namespace App\Ejercicios;

/**
 * Clase para el ejercicio Mars Exploration
 * Cuenta letras alteradas en mensajes SOS por radiación cósmica
 */
class MarsExploration
{
    /**
     * Resuelve el ejercicio Mars Exploration
     * 
     * @param string $s String recibido en la Tierra
     * @return array Resultado con pasos detallados
     */
    public static function resolver(string $s): array
    {
        $pasos = [];
        
        // Validar restricciones
        $validacion = self::validarRestricciones($s);
        if (!$validacion['valido']) {
            return [
                'resultado' => 0,
                'error' => $validacion['mensaje'],
                'pasos' => [],
                'algoritmo' => 'Mars Exploration'
            ];
        }
        
        $longitud = strlen($s);
        $pasos[] = "Longitud del mensaje recibido: {$longitud}";
        $pasos[] = "Mensaje recibido: '{$s}'";
        $pasos[] = "Iniciando análisis de mensajes SOS...";
        
        // Calcular número de mensajes SOS
        $numMensajes = $longitud / 3;
        $pasos[] = "Número de mensajes SOS: {$longitud} ÷ 3 = {$numMensajes}";
        
        // Definir el mensaje SOS esperado
        $mensajeEsperado = 'SOS';
        $pasos[] = "Mensaje SOS esperado: '{$mensajeEsperado}'";
        
        $letrasAlteradas = 0;
        $posicionesAlteradas = [];
        $comparacion = '';
        
        $pasos[] = "--- Análisis de cada mensaje SOS ---";
        
        // Analizar cada grupo de 3 caracteres
        for ($i = 0; $i < $longitud; $i += 3) {
            $mensajeActual = substr($s, $i, 3);
            $mensajeNumero = ($i / 3) + 1;
            $posicionInicial = $i;
            
            $pasos[] = "Mensaje SOS #{$mensajeNumero} (posiciones {$posicionInicial}-" . ($posicionInicial + 2) . "):";
            $pasos[] = "  Recibido: '{$mensajeActual}'";
            $pasos[] = "  Esperado: '{$mensajeEsperado}'";
            
            // Comparar cada carácter
            $mensajeComparacion = '';
            $alteracionesEnMensaje = 0;
            
            for ($j = 0; $j < 3; $j++) {
                $caracterRecibido = $mensajeActual[$j];
                $caracterEsperado = $mensajeEsperado[$j];
                $posicionGlobal = $posicionInicial + $j;
                
                if ($caracterRecibido === $caracterEsperado) {
                    $mensajeComparacion .= $caracterRecibido;
                    $pasos[] = "    Posición {$posicionGlobal}: '{$caracterRecibido}' ✓ (correcto)";
                } else {
                    $mensajeComparacion .= 'X';
                    $alteracionesEnMensaje++;
                    $letrasAlteradas++;
                    $posicionesAlteradas[] = $posicionGlobal;
                    $pasos[] = "    Posición {$posicionGlobal}: '{$caracterRecibido}' ✗ (esperado: '{$caracterEsperado}')";
                }
            }
            
            $comparacion .= $mensajeComparacion;
            
            if ($alteracionesEnMensaje > 0) {
                $pasos[] = "  → {$alteracionesEnMensaje} letra(s) alterada(s) en este mensaje";
            } else {
                $pasos[] = "  → Mensaje SOS perfecto ✓";
            }
            $pasos[] = "";
        }
        
        $pasos[] = "--- Resumen del Análisis ---";
        $pasos[] = "Mensaje completo recibido: '{$s}'";
        $pasos[] = "Mensaje esperado: '" . str_repeat($mensajeEsperado, $numMensajes) . "'";
        $pasos[] = "Comparación: '{$comparacion}'";
        $pasos[] = "Posiciones alteradas: " . (empty($posicionesAlteradas) ? 'Ninguna' : implode(', ', $posicionesAlteradas));
        $pasos[] = "Total de letras alteradas: {$letrasAlteradas}";
        
        if ($letrasAlteradas === 0) {
            $pasos[] = "¡Todos los mensajes SOS llegaron perfectos! 🎉";
        } else {
            $pasos[] = "Se detectaron {$letrasAlteradas} letra(s) alterada(s) por radiación cósmica";
        }
        
        return [
            'resultado' => $letrasAlteradas,
            'mensaje_recibido' => $s,
            'longitud' => $longitud,
            'num_mensajes' => $numMensajes,
            'mensaje_esperado' => $mensajeEsperado,
            'mensaje_completo_esperado' => str_repeat($mensajeEsperado, $numMensajes),
            'comparacion' => $comparacion,
            'posiciones_alteradas' => $posicionesAlteradas,
            'pasos' => $pasos,
            'algoritmo' => 'Mars Exploration'
        ];
    }
    
    /**
     * Valida las restricciones del problema
     * 
     * @param string $s String a validar
     * @return array Resultado de la validación
     */
    private static function validarRestricciones(string $s): array
    {
        $longitud = strlen($s);
        
        // Verificar longitud
        if ($longitud < 1 || $longitud > 99) {
            return [
                'valido' => false,
                'mensaje' => 'La longitud del mensaje debe estar entre 1 y 99 caracteres'
            ];
        }
        
        // Verificar que la longitud sea múltiplo de 3
        if ($longitud % 3 !== 0) {
            return [
                'valido' => false,
                'mensaje' => 'La longitud del mensaje debe ser múltiplo de 3 (para mensajes SOS completos)'
            ];
        }
        
        // Verificar que solo contenga letras mayúsculas
        if (!preg_match('/^[A-Z]+$/', $s)) {
            return [
                'valido' => false,
                'mensaje' => 'El mensaje solo puede contener letras mayúsculas (A-Z)'
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
                'nombre' => 'Ejemplo 1 - Múltiples Alteraciones',
                'mensaje' => 'SOSSPSSQSSOR',
                'descripcion' => '4 mensajes SOS con 3 letras alteradas'
            ],
            [
                'nombre' => 'Ejemplo 2 - Una Alteración',
                'mensaje' => 'SOSSOT',
                'descripcion' => '2 mensajes SOS con 1 letra alterada'
            ],
            [
                'nombre' => 'Ejemplo 3 - Sin Alteraciones',
                'mensaje' => 'SOSSOSSOS',
                'descripcion' => '3 mensajes SOS perfectos'
            ],
            [
                'nombre' => 'Ejemplo 4 - Un Mensaje SOS',
                'mensaje' => 'SOS',
                'descripcion' => '1 mensaje SOS perfecto'
            ],
            [
                'nombre' => 'Ejemplo 5 - Alteraciones en Posiciones Específicas',
                'mensaje' => 'SASOBSOS',
                'descripcion' => '2 mensajes SOS con alteraciones en posiciones específicas'
            ],
            [
                'nombre' => 'Ejemplo 6 - Múltiples Mensajes con Varias Alteraciones',
                'mensaje' => 'SASOBSOSCOS',
                'descripcion' => '3 mensajes SOS con múltiples alteraciones'
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
            $resultado = self::resolver($ejemplo['mensaje']);
            $resultados[] = [
                'ejemplo' => $ejemplo,
                'resultado' => $resultado
            ];
        }
        
        return $resultados;
    }
} 