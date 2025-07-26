<?php
/**
 * Ejemplo de uso del ejercicio Binary Search
 */

// Incluir el autoloader de Composer
require_once __DIR__ . '/../../vendor/autoload.php';

// Importar las clases necesarias
use App\Config\AppConfig;
use App\Ejercicios\BinarySearch;

// Configurar el entorno
AppConfig::setupEnvironment();

echo "=== EJERCICIO: BINARY SEARCH ===\n\n";

// Ejemplo 1: Elemento encontrado
echo "1. EJEMPLO - ELEMENTO ENCONTRADO\n";
echo "================================\n";
$nums1 = [-1, 0, 3, 5, 9, 12];
$target1 = 9;
echo "Input: nums = [" . implode(', ', $nums1) . "], target = {$target1}\n";

$resultado1 = BinarySearch::resolver($nums1, $target1);
echo "Output: " . $resultado1['resultado'] . "\n";
echo "Iteraciones: " . $resultado1['iteraciones'] . "\n\n";

// Ejemplo 2: Elemento no encontrado
echo "2. EJEMPLO - ELEMENTO NO ENCONTRADO\n";
echo "===================================\n";
$nums2 = [-1, 0, 3, 5, 9, 12];
$target2 = 2;
echo "Input: nums = [" . implode(', ', $nums2) . "], target = {$target2}\n";

$resultado2 = BinarySearch::resolver($nums2, $target2);
echo "Output: " . $resultado2['resultado'] . "\n";
echo "Iteraciones: " . $resultado2['iteraciones'] . "\n\n";

// Ejemplo 3: Elemento al inicio
echo "3. EJEMPLO - ELEMENTO AL INICIO\n";
echo "===============================\n";
$nums3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
$target3 = 1;
echo "Input: nums = [" . implode(', ', $nums3) . "], target = {$target3}\n";

$resultado3 = BinarySearch::resolver($nums3, $target3);
echo "Output: " . $resultado3['resultado'] . "\n";
echo "Iteraciones: " . $resultado3['iteraciones'] . "\n\n";

// Ejemplo 4: Elemento al final
echo "4. EJEMPLO - ELEMENTO AL FINAL\n";
echo "==============================\n";
$nums4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
$target4 = 10;
echo "Input: nums = [" . implode(', ', $nums4) . "], target = {$target4}\n";

$resultado4 = BinarySearch::resolver($nums4, $target4);
echo "Output: " . $resultado4['resultado'] . "\n";
echo "Iteraciones: " . $resultado4['iteraciones'] . "\n\n";

// Ejemplo 5: Array pequeño
echo "5. EJEMPLO - ARRAY PEQUEÑO\n";
echo "==========================\n";
$nums5 = [1, 3, 5];
$target5 = 3;
echo "Input: nums = [" . implode(', ', $nums5) . "], target = {$target5}\n";

$resultado5 = BinarySearch::resolver($nums5, $target5);
echo "Output: " . $resultado5['resultado'] . "\n";
echo "Iteraciones: " . $resultado5['iteraciones'] . "\n\n";

// Ejemplo 6: Valores negativos
echo "6. EJEMPLO - VALORES NEGATIVOS\n";
echo "==============================\n";
$nums6 = [-10, -5, 0, 5, 10];
$target6 = -5;
echo "Input: nums = [" . implode(', ', $nums6) . "], target = {$target6}\n";

$resultado6 = BinarySearch::resolver($nums6, $target6);
echo "Output: " . $resultado6['resultado'] . "\n";
echo "Iteraciones: " . $resultado6['iteraciones'] . "\n\n";

// Ejecutar todos los ejemplos predefinidos
echo "7. TODOS LOS EJEMPLOS PREDEFINIDOS\n";
echo "==================================\n";
$ejemplos = BinarySearch::ejecutarEjemplos();

foreach ($ejemplos as $i => $item) {
    $ejemplo = $item['ejemplo'];
    $resultado = $item['resultado'];
    echo "Ejemplo " . ($i + 1) . ": " . $ejemplo['nombre'] . "\n";
    echo "Input: nums = [" . implode(', ', $ejemplo['nums']) . "], target = " . $ejemplo['target'] . "\n";
    echo "Output: " . $resultado['resultado'] . "\n";
    echo "Iteraciones: " . $resultado['iteraciones'] . "\n";
    echo "Descripción: " . $ejemplo['descripcion'] . "\n";
    echo "---\n";
}

echo "\n=== FIN DE EJEMPLOS ===\n";
echo "Para usar la interfaz web, ejecuta: start-server.bat\n";
echo "Luego ve a: http://localhost:8000/ejercicios/binary-search\n"; 