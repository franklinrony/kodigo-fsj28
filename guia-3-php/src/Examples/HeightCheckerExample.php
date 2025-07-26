<?php
/**
 * Ejemplo de uso del ejercicio Height Checker
 */

// Incluir el autoloader de Composer
require_once __DIR__ . '/../../vendor/autoload.php';

// Importar las clases necesarias
use App\Config\AppConfig;
use App\Ejercicios\HeightChecker;

// Configurar el entorno
AppConfig::setupEnvironment();

echo "=== EJERCICIO: HEIGHT CHECKER ===\n\n";

// Ejemplo 1: Todos incorrectos
echo "1. EJEMPLO - TODOS INCORRECTOS\n";
echo "===============================\n";
$heights1 = [5, 1, 2, 3, 4];
echo "Input: [" . implode(', ', $heights1) . "]\n";

$resultado1 = HeightChecker::resolver($heights1);
echo "Output: " . $resultado1['resultado'] . "\n";
echo "Explanation:\n";
echo "heights:  [" . implode(', ', $resultado1['array_original']) . "]\n";
echo "expected: [" . implode(', ', $resultado1['array_esperado']) . "]\n";
echo "All indices do not match.\n\n";

// Ejemplo 2: Todos correctos
echo "2. EJEMPLO - TODOS CORRECTOS\n";
echo "============================\n";
$heights2 = [1, 2, 3, 4, 5];
echo "Input: [" . implode(', ', $heights2) . "]\n";

$resultado2 = HeightChecker::resolver($heights2);
echo "Output: " . $resultado2['resultado'] . "\n";
echo "Explanation:\n";
echo "heights:  [" . implode(', ', $resultado2['array_original']) . "]\n";
echo "expected: [" . implode(', ', $resultado2['array_esperado']) . "]\n";
echo "All indices match.\n\n";

// Ejemplo 3: Parcialmente correctos
echo "3. EJEMPLO - PARCIALMENTE CORRECTOS\n";
echo "===================================\n";
$heights3 = [1, 1, 4, 2, 1, 3];
echo "Input: [" . implode(', ', $heights3) . "]\n";

$resultado3 = HeightChecker::resolver($heights3);
echo "Output: " . $resultado3['resultado'] . "\n";
echo "Explanation:\n";
echo "heights:  [" . implode(', ', $resultado3['array_original']) . "]\n";
echo "expected: [" . implode(', ', $resultado3['array_esperado']) . "]\n";
echo "Some indices do not match.\n\n";

// Ejecutar todos los ejemplos predefinidos
echo "4. TODOS LOS EJEMPLOS PREDEFINIDOS\n";
echo "==================================\n";
$ejemplos = HeightChecker::ejecutarEjemplos();

foreach ($ejemplos as $i => $item) {
    $ejemplo = $item['ejemplo'];
    $resultado = $item['resultado'];
    echo "Ejemplo " . ($i + 1) . ": " . $ejemplo['nombre'] . "\n";
    echo "Input: [" . implode(', ', $ejemplo['heights']) . "]\n";
    echo "Output: " . $resultado['resultado'] . "\n";
    echo "Descripción: " . $ejemplo['descripcion'] . "\n";
    echo "---\n";
}

echo "\n=== FIN DE EJEMPLOS ===\n";
echo "Para usar la interfaz web, ejecuta: start-server.bat\n";
echo "Luego ve a: http://localhost:8000/ejercicios\n"; 