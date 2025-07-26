<?php
/**
 * Ejemplo de uso del ejercicio Mars Exploration
 */

// Incluir el autoloader de Composer
require_once __DIR__ . '/../../vendor/autoload.php';

// Importar las clases necesarias
use App\Config\AppConfig;
use App\Ejercicios\MarsExploration;

// Configurar el entorno
AppConfig::setupEnvironment();

echo "=== EJERCICIO: MARS EXPLORATION ===\n\n";

// Ejemplo 1: Múltiples alteraciones
echo "1. EJEMPLO - MÚLTIPLES ALTERACIONES\n";
echo "===================================\n";
$mensaje1 = 'SOSSPSSQSSOR';
echo "Input: s = '{$mensaje1}'\n";

$resultado1 = MarsExploration::resolver($mensaje1);
echo "Output: " . $resultado1['resultado'] . "\n";
echo "Longitud: " . $resultado1['longitud'] . "\n";
echo "Mensajes SOS: " . $resultado1['num_mensajes'] . "\n";
echo "Posiciones alteradas: " . implode(', ', $resultado1['posiciones_alteradas']) . "\n\n";

// Ejemplo 2: Una alteración
echo "2. EJEMPLO - UNA ALTERACIÓN\n";
echo "============================\n";
$mensaje2 = 'SOSSOT';
echo "Input: s = '{$mensaje2}'\n";

$resultado2 = MarsExploration::resolver($mensaje2);
echo "Output: " . $resultado2['resultado'] . "\n";
echo "Longitud: " . $resultado2['longitud'] . "\n";
echo "Mensajes SOS: " . $resultado2['num_mensajes'] . "\n";
echo "Posiciones alteradas: " . implode(', ', $resultado2['posiciones_alteradas']) . "\n\n";

// Ejemplo 3: Sin alteraciones
echo "3. EJEMPLO - SIN ALTERACIONES\n";
echo "==============================\n";
$mensaje3 = 'SOSSOSSOS';
echo "Input: s = '{$mensaje3}'\n";

$resultado3 = MarsExploration::resolver($mensaje3);
echo "Output: " . $resultado3['resultado'] . "\n";
echo "Longitud: " . $resultado3['longitud'] . "\n";
echo "Mensajes SOS: " . $resultado3['num_mensajes'] . "\n";
echo "Posiciones alteradas: " . implode(', ', $resultado3['posiciones_alteradas']) . "\n\n";

// Ejemplo 4: Un mensaje SOS
echo "4. EJEMPLO - UN MENSAJE SOS\n";
echo "============================\n";
$mensaje4 = 'SOS';
echo "Input: s = '{$mensaje4}'\n";

$resultado4 = MarsExploration::resolver($mensaje4);
echo "Output: " . $resultado4['resultado'] . "\n";
echo "Longitud: " . $resultado4['longitud'] . "\n";
echo "Mensajes SOS: " . $resultado4['num_mensajes'] . "\n";
echo "Posiciones alteradas: " . implode(', ', $resultado4['posiciones_alteradas']) . "\n\n";

// Ejemplo 5: Alteraciones en posiciones específicas
echo "5. EJEMPLO - ALTERACIONES EN POSICIONES ESPECÍFICAS\n";
echo "==================================================\n";
$mensaje5 = 'SASOBSOS';
echo "Input: s = '{$mensaje5}'\n";

$resultado5 = MarsExploration::resolver($mensaje5);
echo "Output: " . $resultado5['resultado'] . "\n";
echo "Longitud: " . $resultado5['longitud'] . "\n";
echo "Mensajes SOS: " . $resultado5['num_mensajes'] . "\n";
echo "Posiciones alteradas: " . implode(', ', $resultado5['posiciones_alteradas']) . "\n\n";

// Ejemplo 6: Múltiples mensajes con varias alteraciones
echo "6. EJEMPLO - MÚLTIPLES MENSAJES CON VARIAS ALTERACIONES\n";
echo "=======================================================\n";
$mensaje6 = 'SASOBSOSCOS';
echo "Input: s = '{$mensaje6}'\n";

$resultado6 = MarsExploration::resolver($mensaje6);
echo "Output: " . $resultado6['resultado'] . "\n";
echo "Longitud: " . $resultado6['longitud'] . "\n";
echo "Mensajes SOS: " . $resultado6['num_mensajes'] . "\n";
echo "Posiciones alteradas: " . implode(', ', $resultado6['posiciones_alteradas']) . "\n\n";

// Ejecutar todos los ejemplos predefinidos
echo "7. TODOS LOS EJEMPLOS PREDEFINIDOS\n";
echo "==================================\n";
$ejemplos = MarsExploration::ejecutarEjemplos();

foreach ($ejemplos as $i => $item) {
    $ejemplo = $item['ejemplo'];
    $resultado = $item['resultado'];
    echo "Ejemplo " . ($i + 1) . ": " . $ejemplo['nombre'] . "\n";
    echo "Input: s = '" . $ejemplo['mensaje'] . "'\n";
    echo "Output: " . $resultado['resultado'] . "\n";
    echo "Longitud: " . $resultado['longitud'] . "\n";
    echo "Mensajes SOS: " . $resultado['num_mensajes'] . "\n";
    echo "Estado: " . ($resultado['resultado'] == 0 ? 'Perfecto' : 'Con alteraciones') . "\n";
    echo "Descripción: " . $ejemplo['descripcion'] . "\n";
    echo "---\n";
}

echo "\n=== FIN DE EJEMPLOS ===\n";
echo "Para usar la interfaz web, ejecuta: start-server.bat\n";
echo "Luego ve a: http://localhost:8000/ejercicios/mars-exploration\n"; 