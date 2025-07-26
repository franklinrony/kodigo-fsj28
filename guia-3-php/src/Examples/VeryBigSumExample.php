<?php
/**
 * Ejemplo de uso del ejercicio A Very Big Sum
 */

// Incluir el autoloader de Composer
require_once __DIR__ . '/../../vendor/autoload.php';

// Importar las clases necesarias
use App\Config\AppConfig;
use App\Ejercicios\VeryBigSum;

// Configurar el entorno
AppConfig::setupEnvironment();

echo "=== EJERCICIO: A VERY BIG SUM ===\n\n";

// Ejemplo 1: Números grandes (del problema original)
echo "1. EJEMPLO - NÚMEROS GRANDES\n";
echo "==============================\n";
$array1 = [1000000001, 1000000002, 1000000003, 1000000004, 1000000005];
echo "Input: ar = [" . implode(', ', $array1) . "]\n";

$resultado1 = VeryBigSum::resolver($array1);
echo "Output: " . $resultado1['resultado'] . "\n";
echo "Formateado: " . $resultado1['resultado_formateado'] . "\n";
echo "Excede int32: " . ($resultado1['excede_int32'] ? 'Sí' : 'No') . "\n\n";

// Ejemplo 2: Números pequeños
echo "2. EJEMPLO - NÚMEROS PEQUEÑOS\n";
echo "==============================\n";
$array2 = [1, 2, 3, 4, 5];
echo "Input: ar = [" . implode(', ', $array2) . "]\n";

$resultado2 = VeryBigSum::resolver($array2);
echo "Output: " . $resultado2['resultado'] . "\n";
echo "Formateado: " . $resultado2['resultado_formateado'] . "\n";
echo "Excede int32: " . ($resultado2['excede_int32'] ? 'Sí' : 'No') . "\n\n";

// Ejemplo 3: Un solo elemento muy grande
echo "3. EJEMPLO - UN SOLO ELEMENTO MUY GRANDE\n";
echo "=========================================\n";
$array3 = [9999999999];
echo "Input: ar = [" . implode(', ', $array3) . "]\n";

$resultado3 = VeryBigSum::resolver($array3);
echo "Output: " . $resultado3['resultado'] . "\n";
echo "Formateado: " . $resultado3['resultado_formateado'] . "\n";
echo "Excede int32: " . ($resultado3['excede_int32'] ? 'Sí' : 'No') . "\n\n";

// Ejemplo 4: Múltiples elementos grandes
echo "4. EJEMPLO - MÚLTIPLES ELEMENTOS GRANDES\n";
echo "=========================================\n";
$array4 = [5000000000, 5000000000, 5000000000];
echo "Input: ar = [" . implode(', ', $array4) . "]\n";

$resultado4 = VeryBigSum::resolver($array4);
echo "Output: " . $resultado4['resultado'] . "\n";
echo "Formateado: " . $resultado4['resultado_formateado'] . "\n";
echo "Excede int32: " . ($resultado4['excede_int32'] ? 'Sí' : 'No') . "\n\n";

// Ejemplo 5: Ceros y números grandes
echo "5. EJEMPLO - CEROS Y NÚMEROS GRANDES\n";
echo "=====================================\n";
$array5 = [0, 1000000000, 0, 2000000000, 0];
echo "Input: ar = [" . implode(', ', $array5) . "]\n";

$resultado5 = VeryBigSum::resolver($array5);
echo "Output: " . $resultado5['resultado'] . "\n";
echo "Formateado: " . $resultado5['resultado_formateado'] . "\n";
echo "Excede int32: " . ($resultado5['excede_int32'] ? 'Sí' : 'No') . "\n\n";

// Ejemplo 6: Máximo tamaño
echo "6. EJEMPLO - MÁXIMO TAMAÑO\n";
echo "===========================\n";
$array6 = [10000000000, 10000000000, 10000000000, 10000000000, 10000000000, 10000000000, 10000000000, 10000000000, 10000000000, 10000000000];
echo "Input: ar = [" . implode(', ', $array6) . "]\n";

$resultado6 = VeryBigSum::resolver($array6);
echo "Output: " . $resultado6['resultado'] . "\n";
echo "Formateado: " . $resultado6['resultado_formateado'] . "\n";
echo "Excede int32: " . ($resultado6['excede_int32'] ? 'Sí' : 'No') . "\n\n";

// Ejecutar todos los ejemplos predefinidos
echo "7. TODOS LOS EJEMPLOS PREDEFINIDOS\n";
echo "==================================\n";
$ejemplos = VeryBigSum::ejecutarEjemplos();

foreach ($ejemplos as $i => $item) {
    $ejemplo = $item['ejemplo'];
    $resultado = $item['resultado'];
    echo "Ejemplo " . ($i + 1) . ": " . $ejemplo['nombre'] . "\n";
    echo "Input: ar = [" . implode(', ', $ejemplo['array']) . "]\n";
    echo "Output: " . $resultado['resultado'] . "\n";
    echo "Formateado: " . $resultado['resultado_formateado'] . "\n";
    echo "Longitud: " . $resultado['longitud'] . "\n";
    echo "Excede int32: " . ($resultado['excede_int32'] ? 'Sí' : 'No') . "\n";
    echo "Descripción: " . $ejemplo['descripcion'] . "\n";
    echo "---\n";
}

echo "\n=== FIN DE EJEMPLOS ===\n";
echo "Para usar la interfaz web, ejecuta: start-server.bat\n";
echo "Luego ve a: http://localhost:8000/ejercicios/very-big-sum\n"; 