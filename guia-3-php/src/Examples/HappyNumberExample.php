<?php
/**
 * Ejemplo de uso del ejercicio Happy Number
 */

// Incluir el autoloader de Composer
require_once __DIR__ . '/../../vendor/autoload.php';

// Importar las clases necesarias
use App\Config\AppConfig;
use App\Ejercicios\HappyNumber;

// Configurar el entorno
AppConfig::setupEnvironment();

echo "=== EJERCICIO: HAPPY NUMBER ===\n\n";

// Ejemplo 1: Número feliz
echo "1. EJEMPLO - NÚMERO FELIZ\n";
echo "==========================\n";
$n1 = 19;
echo "Input: n = {$n1}\n";

$resultado1 = HappyNumber::resolver($n1);
echo "Output: " . ($resultado1['resultado'] ? 'true' : 'false') . "\n";
echo "Iteraciones: " . $resultado1['iteraciones'] . "\n";
echo "Secuencia: [" . implode(' → ', $resultado1['secuencia']) . " → 1]\n\n";

// Ejemplo 2: Número no feliz
echo "2. EJEMPLO - NÚMERO NO FELIZ\n";
echo "============================\n";
$n2 = 2;
echo "Input: n = {$n2}\n";

$resultado2 = HappyNumber::resolver($n2);
echo "Output: " . ($resultado2['resultado'] ? 'true' : 'false') . "\n";
echo "Iteraciones: " . $resultado2['iteraciones'] . "\n";
echo "Secuencia: [" . implode(' → ', $resultado2['secuencia']) . " → ...]\n\n";

// Ejemplo 3: Número 1
echo "3. EJEMPLO - NÚMERO 1\n";
echo "=====================\n";
$n3 = 1;
echo "Input: n = {$n3}\n";

$resultado3 = HappyNumber::resolver($n3);
echo "Output: " . ($resultado3['resultado'] ? 'true' : 'false') . "\n";
echo "Iteraciones: " . $resultado3['iteraciones'] . "\n";
echo "Secuencia: [" . implode(' → ', $resultado3['secuencia']) . " → 1]\n\n";

// Ejemplo 4: Número feliz pequeño
echo "4. EJEMPLO - NÚMERO FELIZ PEQUEÑO\n";
echo "==================================\n";
$n4 = 7;
echo "Input: n = {$n4}\n";

$resultado4 = HappyNumber::resolver($n4);
echo "Output: " . ($resultado4['resultado'] ? 'true' : 'false') . "\n";
echo "Iteraciones: " . $resultado4['iteraciones'] . "\n";
echo "Secuencia: [" . implode(' → ', $resultado4['secuencia']) . " → 1]\n\n";

// Ejemplo 5: Número no feliz
echo "5. EJEMPLO - NÚMERO NO FELIZ\n";
echo "============================\n";
$n5 = 4;
echo "Input: n = {$n5}\n";

$resultado5 = HappyNumber::resolver($n5);
echo "Output: " . ($resultado5['resultado'] ? 'true' : 'false') . "\n";
echo "Iteraciones: " . $resultado5['iteraciones'] . "\n";
echo "Secuencia: [" . implode(' → ', $resultado5['secuencia']) . " → ...]\n\n";

// Ejemplo 6: Número grande
echo "6. EJEMPLO - NÚMERO GRANDE\n";
echo "==========================\n";
$n6 = 100;
echo "Input: n = {$n6}\n";

$resultado6 = HappyNumber::resolver($n6);
echo "Output: " . ($resultado6['resultado'] ? 'true' : 'false') . "\n";
echo "Iteraciones: " . $resultado6['iteraciones'] . "\n";
echo "Secuencia: [" . implode(' → ', $resultado6['secuencia']) . " → 1]\n\n";

// Ejecutar todos los ejemplos predefinidos
echo "7. TODOS LOS EJEMPLOS PREDEFINIDOS\n";
echo "==================================\n";
$ejemplos = HappyNumber::ejecutarEjemplos();

foreach ($ejemplos as $i => $item) {
    $ejemplo = $item['ejemplo'];
    $resultado = $item['resultado'];
    echo "Ejemplo " . ($i + 1) . ": " . $ejemplo['nombre'] . "\n";
    echo "Input: n = " . $ejemplo['n'] . "\n";
    echo "Output: " . ($resultado['resultado'] ? 'true' : 'false') . "\n";
    echo "Iteraciones: " . $resultado['iteraciones'] . "\n";
    echo "Descripción: " . $ejemplo['descripcion'] . "\n";
    echo "---\n";
}

echo "\n=== FIN DE EJEMPLOS ===\n";
echo "Para usar la interfaz web, ejecuta: start-server.bat\n";
echo "Luego ve a: http://localhost:8000/ejercicios/happy-number\n"; 