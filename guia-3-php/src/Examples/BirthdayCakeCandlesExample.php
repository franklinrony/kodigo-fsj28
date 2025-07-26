<?php
/**
 * Ejemplo de uso del ejercicio Birthday Cake Candles
 */

// Incluir el autoloader de Composer
require_once __DIR__ . '/../../vendor/autoload.php';

// Importar las clases necesarias
use App\Config\AppConfig;
use App\Ejercicios\BirthdayCakeCandles;

// Configurar el entorno
AppConfig::setupEnvironment();

echo "=== EJERCICIO: BIRTHDAY CAKE CANDLES ===\n\n";

// Ejemplo 1: Velas múltiples máximas
echo "1. EJEMPLO - VELAS MÚLTIPLES MÁXIMAS\n";
echo "====================================\n";
$candles1 = [4, 4, 1, 3];
echo "Input: candles = [" . implode(', ', $candles1) . "]\n";

$resultado1 = BirthdayCakeCandles::resolver($candles1);
echo "Output: " . $resultado1['resultado'] . "\n";
echo "Altura máxima: " . $resultado1['altura_maxima'] . "\n";
echo "Posiciones: [" . implode(', ', $resultado1['posiciones']) . "]\n\n";

// Ejemplo 2: Una vela máxima
echo "2. EJEMPLO - UNA VELA MÁXIMA\n";
echo "============================\n";
$candles2 = [3, 2, 1, 3];
echo "Input: candles = [" . implode(', ', $candles2) . "]\n";

$resultado2 = BirthdayCakeCandles::resolver($candles2);
echo "Output: " . $resultado2['resultado'] . "\n";
echo "Altura máxima: " . $resultado2['altura_maxima'] . "\n";
echo "Posiciones: [" . implode(', ', $resultado2['posiciones']) . "]\n\n";

// Ejemplo 3: Todas iguales
echo "3. EJEMPLO - TODAS IGUALES\n";
echo "==========================\n";
$candles3 = [5, 5, 5, 5];
echo "Input: candles = [" . implode(', ', $candles3) . "]\n";

$resultado3 = BirthdayCakeCandles::resolver($candles3);
echo "Output: " . $resultado3['resultado'] . "\n";
echo "Altura máxima: " . $resultado3['altura_maxima'] . "\n";
echo "Posiciones: [" . implode(', ', $resultado3['posiciones']) . "]\n\n";

// Ejemplo 4: Una vela
echo "4. EJEMPLO - UNA VELA\n";
echo "=====================\n";
$candles4 = [7];
echo "Input: candles = [" . implode(', ', $candles4) . "]\n";

$resultado4 = BirthdayCakeCandles::resolver($candles4);
echo "Output: " . $resultado4['resultado'] . "\n";
echo "Altura máxima: " . $resultado4['altura_maxima'] . "\n";
echo "Posiciones: [" . implode(', ', $resultado4['posiciones']) . "]\n\n";

// Ejemplo 5: Secuencia creciente
echo "5. EJEMPLO - SECUENCIA CRECIENTE\n";
echo "================================\n";
$candles5 = [1, 2, 3, 4, 5];
echo "Input: candles = [" . implode(', ', $candles5) . "]\n";

$resultado5 = BirthdayCakeCandles::resolver($candles5);
echo "Output: " . $resultado5['resultado'] . "\n";
echo "Altura máxima: " . $resultado5['altura_maxima'] . "\n";
echo "Posiciones: [" . implode(', ', $resultado5['posiciones']) . "]\n\n";

// Ejemplo 6: Secuencia decreciente
echo "6. EJEMPLO - SECUENCIA DECRECIENTE\n";
echo "==================================\n";
$candles6 = [5, 4, 3, 2, 1];
echo "Input: candles = [" . implode(', ', $candles6) . "]\n";

$resultado6 = BirthdayCakeCandles::resolver($candles6);
echo "Output: " . $resultado6['resultado'] . "\n";
echo "Altura máxima: " . $resultado6['altura_maxima'] . "\n";
echo "Posiciones: [" . implode(', ', $resultado6['posiciones']) . "]\n\n";

// Ejecutar todos los ejemplos predefinidos
echo "7. TODOS LOS EJEMPLOS PREDEFINIDOS\n";
echo "==================================\n";
$ejemplos = BirthdayCakeCandles::ejecutarEjemplos();

foreach ($ejemplos as $i => $item) {
    $ejemplo = $item['ejemplo'];
    $resultado = $item['resultado'];
    echo "Ejemplo " . ($i + 1) . ": " . $ejemplo['nombre'] . "\n";
    echo "Input: candles = [" . implode(', ', $ejemplo['candles']) . "]\n";
    echo "Output: " . $resultado['resultado'] . "\n";
    echo "Altura máxima: " . $resultado['altura_maxima'] . "\n";
    echo "Descripción: " . $ejemplo['descripcion'] . "\n";
    echo "---\n";
}

echo "\n=== FIN DE EJEMPLOS ===\n";
echo "Para usar la interfaz web, ejecuta: start-server.bat\n";
echo "Luego ve a: http://localhost:8000/ejercicios/birthday-cake-candles\n"; 