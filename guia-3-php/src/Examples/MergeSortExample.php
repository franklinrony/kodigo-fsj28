<?php
/**
 * Ejemplo de uso del ejercicio Merge Sort
 */

// Incluir el autoloader de Composer
require_once __DIR__ . '/../../vendor/autoload.php';

// Importar las clases necesarias
use App\Config\AppConfig;
use App\Ejercicios\MergeSort;

// Configurar el entorno
AppConfig::setupEnvironment();

echo "=== EJERCICIO: MERGE SORT ===\n\n";

// Ejemplo 1: Array pequeño
echo "1. EJEMPLO - ARRAY PEQUEÑO\n";
echo "===========================\n";
$array1 = [64, 34, 25, 12, 22, 11, 90];
echo "Input: arr = [" . implode(', ', $array1) . "]\n";

$resultado1 = MergeSort::resolver($array1);
echo "Output: [" . implode(', ', $resultado1['resultado']) . "]\n";
echo "Longitud: " . $resultado1['longitud'] . "\n\n";

// Ejemplo 2: Array invertido
echo "2. EJEMPLO - ARRAY INVERTIDO\n";
echo "============================\n";
$array2 = [5, 4, 3, 2, 1];
echo "Input: arr = [" . implode(', ', $array2) . "]\n";

$resultado2 = MergeSort::resolver($array2);
echo "Output: [" . implode(', ', $resultado2['resultado']) . "]\n";
echo "Longitud: " . $resultado2['longitud'] . "\n\n";

// Ejemplo 3: Array ya ordenado
echo "3. EJEMPLO - ARRAY YA ORDENADO\n";
echo "===============================\n";
$array3 = [1, 2, 3, 4, 5];
echo "Input: arr = [" . implode(', ', $array3) . "]\n";

$resultado3 = MergeSort::resolver($array3);
echo "Output: [" . implode(', ', $resultado3['resultado']) . "]\n";
echo "Longitud: " . $resultado3['longitud'] . "\n\n";

// Ejemplo 4: Array con duplicados
echo "4. EJEMPLO - ARRAY CON DUPLICADOS\n";
echo "==================================\n";
$array4 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
echo "Input: arr = [" . implode(', ', $array4) . "]\n";

$resultado4 = MergeSort::resolver($array4);
echo "Output: [" . implode(', ', $resultado4['resultado']) . "]\n";
echo "Longitud: " . $resultado4['longitud'] . "\n\n";

// Ejemplo 5: Array con negativos
echo "5. EJEMPLO - ARRAY CON NEGATIVOS\n";
echo "=================================\n";
$array5 = [-5, 10, -3, 8, -1, 0, 7];
echo "Input: arr = [" . implode(', ', $array5) . "]\n";

$resultado5 = MergeSort::resolver($array5);
echo "Output: [" . implode(', ', $resultado5['resultado']) . "]\n";
echo "Longitud: " . $resultado5['longitud'] . "\n\n";

// Ejemplo 6: Array grande
echo "6. EJEMPLO - ARRAY GRANDE\n";
echo "==========================\n";
$array6 = [38, 27, 43, 3, 9, 82, 10, 16, 25, 7, 12, 45, 33, 18, 29];
echo "Input: arr = [" . implode(', ', $array6) . "]\n";

$resultado6 = MergeSort::resolver($array6);
echo "Output: [" . implode(', ', $resultado6['resultado']) . "]\n";
echo "Longitud: " . $resultado6['longitud'] . "\n\n";

// Ejecutar todos los ejemplos predefinidos
echo "7. TODOS LOS EJEMPLOS PREDEFINIDOS\n";
echo "==================================\n";
$ejemplos = MergeSort::ejecutarEjemplos();

foreach ($ejemplos as $i => $item) {
    $ejemplo = $item['ejemplo'];
    $resultado = $item['resultado'];
    echo "Ejemplo " . ($i + 1) . ": " . $ejemplo['nombre'] . "\n";
    echo "Input: arr = [" . implode(', ', $ejemplo['array']) . "]\n";
    echo "Output: [" . implode(', ', $resultado['resultado']) . "]\n";
    echo "Longitud: " . $resultado['longitud'] . "\n";
    echo "Descripción: " . $ejemplo['descripcion'] . "\n";
    echo "---\n";
}

echo "\n=== FIN DE EJEMPLOS ===\n";
echo "Para usar la interfaz web, ejecuta: start-server.bat\n";
echo "Luego ve a: http://localhost:8000/ejercicios/merge-sort\n"; 