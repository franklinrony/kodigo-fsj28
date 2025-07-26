<?php

namespace App\Ejercicios;

/**
 * Clase para el ejercicio Strong Password
 * Valida contraseñas y calcula el mínimo número de caracteres a agregar
 */
class StrongPassword
{
    /**
     * Resuelve el ejercicio Strong Password
     * 
     * @param string $password Contraseña a validar
     * @return array Resultado con pasos detallados
     */
    public static function resolver(string $password): array
    {
        $pasos = [];
        
        // Validar restricciones
        $validacion = self::validarRestricciones($password);
        if (!$validacion['valido']) {
            return [
                'resultado' => 0,
                'error' => $validacion['mensaje'],
                'pasos' => [],
                'algoritmo' => 'Strong Password'
            ];
        }
        
        $n = strlen($password);
        $pasos[] = "Longitud de la contraseña: {$n}";
        $pasos[] = "Contraseña: '{$password}'";
        $pasos[] = "Iniciando validación de contraseña fuerte...";
        
        // Definir conjuntos de caracteres
        $numeros = '0123456789';
        $minusculas = 'abcdefghijklmnopqrstuvwxyz';
        $mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $especiales = '!@#$%^&*()-+';
        
        $pasos[] = "--- Criterios de contraseña fuerte ---";
        $pasos[] = "1. Longitud mínima: 6 caracteres";
        $pasos[] = "2. Al menos un dígito: {$numeros}";
        $pasos[] = "3. Al menos una minúscula: {$minusculas}";
        $pasos[] = "4. Al menos una mayúscula: {$mayusculas}";
        $pasos[] = "5. Al menos un carácter especial: {$especiales}";
        
        // Verificar cada criterio
        $tieneNumeros = false;
        $tieneMinusculas = false;
        $tieneMayusculas = false;
        $tieneEspeciales = false;
        
        $pasos[] = "--- Verificación de criterios ---";
        
        foreach (str_split($password) as $i => $caracter) {
            $pasos[] = "Posición {$i}: '{$caracter}'";
            
            if (strpos($numeros, $caracter) !== false) {
                if (!$tieneNumeros) {
                    $tieneNumeros = true;
                    $pasos[] = "  ✓ Encontrado dígito";
                }
            } elseif (strpos($minusculas, $caracter) !== false) {
                if (!$tieneMinusculas) {
                    $tieneMinusculas = true;
                    $pasos[] = "  ✓ Encontrada minúscula";
                }
            } elseif (strpos($mayusculas, $caracter) !== false) {
                if (!$tieneMayusculas) {
                    $tieneMayusculas = true;
                    $pasos[] = "  ✓ Encontrada mayúscula";
                }
            } elseif (strpos($especiales, $caracter) !== false) {
                if (!$tieneEspeciales) {
                    $tieneEspeciales = true;
                    $pasos[] = "  ✓ Encontrado carácter especial";
                }
            }
        }
        
        // Contar criterios faltantes
        $criteriosFaltantes = 0;
        $criteriosFaltantesLista = [];
        
        $pasos[] = "--- Análisis de criterios faltantes ---";
        
        if (!$tieneNumeros) {
            $criteriosFaltantes++;
            $criteriosFaltantesLista[] = 'dígito';
            $pasos[] = "✗ Falta: dígito";
        } else {
            $pasos[] = "✓ Tiene: dígito";
        }
        
        if (!$tieneMinusculas) {
            $criteriosFaltantes++;
            $criteriosFaltantesLista[] = 'minúscula';
            $pasos[] = "✗ Falta: minúscula";
        } else {
            $pasos[] = "✓ Tiene: minúscula";
        }
        
        if (!$tieneMayusculas) {
            $criteriosFaltantes++;
            $criteriosFaltantesLista[] = 'mayúscula';
            $pasos[] = "✗ Falta: mayúscula";
        } else {
            $pasos[] = "✓ Tiene: mayúscula";
        }
        
        if (!$tieneEspeciales) {
            $criteriosFaltantes++;
            $criteriosFaltantesLista[] = 'carácter especial';
            $pasos[] = "✗ Falta: carácter especial";
        } else {
            $pasos[] = "✓ Tiene: carácter especial";
        }
        
        // Verificar longitud mínima
        $longitudFaltante = max(0, 6 - $n);
        $pasos[] = "--- Verificación de longitud ---";
        $pasos[] = "Longitud actual: {$n}";
        $pasos[] = "Longitud mínima requerida: 6";
        $pasos[] = "Caracteres faltantes para longitud: {$longitudFaltante}";
        
        // Calcular resultado final
        $caracteresNecesarios = max($criteriosFaltantes, $longitudFaltante);
        
        $pasos[] = "--- Resultado ---";
        $pasos[] = "Criterios faltantes: {$criteriosFaltantes}";
        $pasos[] = "Caracteres faltantes para longitud: {$longitudFaltante}";
        $pasos[] = "Mínimo de caracteres a agregar: {$caracteresNecesarios}";
        
        if ($caracteresNecesarios === 0) {
            $pasos[] = "¡La contraseña ya es fuerte!";
        } else {
            $pasos[] = "Caracteres faltantes: " . implode(', ', $criteriosFaltantesLista);
            if ($longitudFaltante > 0) {
                $pasos[] = "También necesita {$longitudFaltante} caracteres más para alcanzar la longitud mínima";
            }
        }
        
        return [
            'resultado' => $caracteresNecesarios,
            'password' => $password,
            'longitud' => $n,
            'tiene_numeros' => $tieneNumeros,
            'tiene_minusculas' => $tieneMinusculas,
            'tiene_mayusculas' => $tieneMayusculas,
            'tiene_especiales' => $tieneEspeciales,
            'criterios_faltantes' => $criteriosFaltantes,
            'longitud_faltante' => $longitudFaltante,
            'criterios_faltantes_lista' => $criteriosFaltantesLista,
            'es_fuerte' => $caracteresNecesarios === 0,
            'pasos' => $pasos,
            'algoritmo' => 'Strong Password'
        ];
    }
    
    /**
     * Valida las restricciones del problema
     * 
     * @param string $password Contraseña a validar
     * @return array Resultado de la validación
     */
    private static function validarRestricciones(string $password): array
    {
        $n = strlen($password);
        
        // Verificar longitud del password
        if ($n < 1 || $n > 100) {
            return [
                'valido' => false,
                'mensaje' => 'La longitud de la contraseña debe estar entre 1 y 100'
            ];
        }
        
        // Verificar caracteres permitidos
        $caracteresPermitidos = '/^[a-zA-Z0-9!@#$%^&*()\-+]+$/';
        if (!preg_match($caracteresPermitidos, $password)) {
            return [
                'valido' => false,
                'mensaje' => 'La contraseña solo puede contener letras minúsculas, mayúsculas, dígitos y caracteres especiales (!@#$%^&*()-+)'
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
                'nombre' => 'Ejemplo 1 - Contraseña Débil',
                'password' => 'Ab1',
                'descripcion' => 'Falta longitud, mayúscula y carácter especial'
            ],
            [
                'nombre' => 'Ejemplo 2 - Contraseña Casi Fuerte',
                'password' => '#HackerRank',
                'descripcion' => 'Solo falta un dígito'
            ],
            [
                'nombre' => 'Ejemplo 3 - Contraseña Muy Débil',
                'password' => 'abc',
                'descripcion' => 'Falta todo excepto minúsculas'
            ],
            [
                'nombre' => 'Ejemplo 4 - Contraseña Fuerte',
                'password' => 'Ab1@cd',
                'descripcion' => 'Ya cumple todos los criterios'
            ],
            [
                'nombre' => 'Ejemplo 5 - Solo Números',
                'password' => '12345',
                'descripcion' => 'Falta longitud y otros tipos de caracteres'
            ],
            [
                'nombre' => 'Ejemplo 6 - Solo Mayúsculas',
                'password' => 'ABCDE',
                'descripcion' => 'Falta longitud y otros tipos de caracteres'
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
            $resultado = self::resolver($ejemplo['password']);
            $resultados[] = [
                'ejemplo' => $ejemplo,
                'resultado' => $resultado
            ];
        }
        
        return $resultados;
    }
} 