<?php
/**
 * Ejemplo de uso del ejercicio Insertion Sort
 */

// Incluir el autoloader de Composer
require_once __DIR__ . '/../../vendor/autoload.php';

// Importar las clases necesarias
use App\Config\AppConfig;
use App\Ejercicios\InsertionSort;

// Configurar el entorno
AppConfig::setupEnvironment();

echo "=== EJERCICIO: INSERTION SORT ===\n\n";

// Ejemplo 1: Inserción simple
echo "1. EJEMPLO - INSERCIÓN SIMPLE\n";
echo "==============================\n";
$arr1 = [1, 2, 4, 5, 3];
echo "Input: [" . implode(', ', $arr1) . "]\n";

$resultado1 = InsertionSort::resolver($arr1);
echo "Output: [" . implode(', ', $resultado1['resultado']) . "]\n";
echo "Elemento insertado: " . $resultado1['valor_insertado'] . "\n";
echo "Posición final: " . $resultado1['posicion_final'] . "\n\n";

// Ejemplo 2: Inserción al inicio
echo "2. EJEMPLO - INSERCIÓN AL INICIO\n";
echo "================================\n";
$arr2 = [2, 4, 6, 8, 1];
echo "Input: [" . implode(', ', $arr2) . "]\n";

$resultado2 = InsertionSort::resolver($arr2);
echo "Output: [" . implode(', ', $resultado2['resultado']) . "]\n";
echo "Elemento insertado: " . $resultado2['valor_insertado'] . "\n";
echo "Posición final: " . $resultado2['posicion_final'] . "\n\n";

// Ejemplo 3: Inserción al final
echo "3. EJEMPLO - INSERCIÓN AL FINAL\n";
echo "===============================\n";
$arr3 = [1, 2, 3, 4, 5];
echo "Input: [" . implode(', ', $arr3) . "]\n";

$resultado3 = InsertionSort::resolver($arr3);
echo "Output: [" . implode(', ', $resultado3['resultado']) . "]\n";
echo "Elemento insertado: " . $resultado3['valor_insertado'] . "\n";
echo "Posición final: " . $resultado3['posicion_final'] . "\n\n";

// Ejemplo 4: Array pequeño
echo "4. EJEMPLO - ARRAY PEQUEÑO\n";
echo "==========================\n";
$arr4 = [2, 1];
echo "Input: [" . implode(', ', $arr4) . "]\n";

$resultado4 = InsertionSort::resolver($arr4);
echo "Output: [" . implode(', ', $resultado4['resultado']) . "]\n";
echo "Elemento insertado: " . $resultado4['valor_insertado'] . "\n";
echo "Posición final: " . $resultado4['posicion_final'] . "\n\n";

// Ejemplo 5: Valores negativos
echo "5. EJEMPLO - VALORES NEGATIVOS\n";
echo "==============================\n";
$arr5 = [-5, -3, -1, 0, -2];
echo "Input: [" . implode(', ', $arr5) . "]\n";

$resultado5 = InsertionSort::resolver($arr5);
echo "Output: [" . implode(', ', $resultado5['resultado']) . "]\n";
echo "Elemento insertado: " . $resultado5['valor_insertado'] . "\n";
echo "Posición final: " . $resultado5['posicion_final'] . "\n\n";

// Ejecutar todos los ejemplos predefinidos
echo "6. TODOS LOS EJEMPLOS PREDEFINIDOS\n";
echo "==================================\n";
$ejemplos = InsertionSort::ejecutarEjemplos();

foreach ($ejemplos as $i => $item) {
    $ejemplo = $item['ejemplo'];
    $resultado = $item['resultado'];
    echo "Ejemplo " . ($i + 1) . ": " . $ejemplo['nombre'] . "\n";
    echo "Input: [" . implode(', ', $ejemplo['arr']) . "]\n";
    echo "Output: [" . implode(', ', $resultado['resultado']) . "]\n";
    echo "Elemento insertado: " . $resultado['valor_insertado'] . " en posición " . $resultado['posicion_final'] . "\n";
    echo "Descripción: " . $ejemplo['descripcion'] . "\n";
    echo "---\n";
}

echo "\n=== FIN DE EJEMPLOS ===\n";
echo "Para usar la interfaz web, ejecuta: start-server.bat\n";
echo "Luego ve a: http://localhost:8000/ejercicios/insertion-sort\n"; 