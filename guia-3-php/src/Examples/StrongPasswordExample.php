<?php
/**
 * Ejemplo de uso del ejercicio Strong Password
 */

// Incluir el autoloader de Composer
require_once __DIR__ . '/../../vendor/autoload.php';

// Importar las clases necesarias
use App\Config\AppConfig;
use App\Ejercicios\StrongPassword;

// Configurar el entorno
AppConfig::setupEnvironment();

echo "=== EJERCICIO: STRONG PASSWORD ===\n\n";

// Ejemplo 1: Contraseña débil
echo "1. EJEMPLO - CONTRASEÑA DÉBIL\n";
echo "==============================\n";
$password1 = 'Ab1';
echo "Input: password = '{$password1}'\n";

$resultado1 = StrongPassword::resolver($password1);
echo "Output: " . $resultado1['resultado'] . "\n";
echo "Longitud: " . $resultado1['longitud'] . "\n";
echo "Criterios faltantes: " . $resultado1['criterios_faltantes'] . "\n";
echo "Longitud faltante: " . $resultado1['longitud_faltante'] . "\n\n";

// Ejemplo 2: Contraseña casi fuerte
echo "2. EJEMPLO - CONTRASEÑA CASI FUERTE\n";
echo "===================================\n";
$password2 = '#HackerRank';
echo "Input: password = '{$password2}'\n";

$resultado2 = StrongPassword::resolver($password2);
echo "Output: " . $resultado2['resultado'] . "\n";
echo "Longitud: " . $resultado2['longitud'] . "\n";
echo "Criterios faltantes: " . $resultado2['criterios_faltantes'] . "\n";
echo "Longitud faltante: " . $resultado2['longitud_faltante'] . "\n\n";

// Ejemplo 3: Contraseña muy débil
echo "3. EJEMPLO - CONTRASEÑA MUY DÉBIL\n";
echo "==================================\n";
$password3 = 'abc';
echo "Input: password = '{$password3}'\n";

$resultado3 = StrongPassword::resolver($password3);
echo "Output: " . $resultado3['resultado'] . "\n";
echo "Longitud: " . $resultado3['longitud'] . "\n";
echo "Criterios faltantes: " . $resultado3['criterios_faltantes'] . "\n";
echo "Longitud faltante: " . $resultado3['longitud_faltante'] . "\n\n";

// Ejemplo 4: Contraseña fuerte
echo "4. EJEMPLO - CONTRASEÑA FUERTE\n";
echo "==============================\n";
$password4 = 'Ab1@cd';
echo "Input: password = '{$password4}'\n";

$resultado4 = StrongPassword::resolver($password4);
echo "Output: " . $resultado4['resultado'] . "\n";
echo "Longitud: " . $resultado4['longitud'] . "\n";
echo "Criterios faltantes: " . $resultado4['criterios_faltantes'] . "\n";
echo "Longitud faltante: " . $resultado4['longitud_faltante'] . "\n\n";

// Ejemplo 5: Solo números
echo "5. EJEMPLO - SOLO NÚMEROS\n";
echo "=========================\n";
$password5 = '12345';
echo "Input: password = '{$password5}'\n";

$resultado5 = StrongPassword::resolver($password5);
echo "Output: " . $resultado5['resultado'] . "\n";
echo "Longitud: " . $resultado5['longitud'] . "\n";
echo "Criterios faltantes: " . $resultado5['criterios_faltantes'] . "\n";
echo "Longitud faltante: " . $resultado5['longitud_faltante'] . "\n\n";

// Ejemplo 6: Solo mayúsculas
echo "6. EJEMPLO - SOLO MAYÚSCULAS\n";
echo "============================\n";
$password6 = 'ABCDE';
echo "Input: password = '{$password6}'\n";

$resultado6 = StrongPassword::resolver($password6);
echo "Output: " . $resultado6['resultado'] . "\n";
echo "Longitud: " . $resultado6['longitud'] . "\n";
echo "Criterios faltantes: " . $resultado6['criterios_faltantes'] . "\n";
echo "Longitud faltante: " . $resultado6['longitud_faltante'] . "\n\n";

// Ejecutar todos los ejemplos predefinidos
echo "7. TODOS LOS EJEMPLOS PREDEFINIDOS\n";
echo "==================================\n";
$ejemplos = StrongPassword::ejecutarEjemplos();

foreach ($ejemplos as $i => $item) {
    $ejemplo = $item['ejemplo'];
    $resultado = $item['resultado'];
    echo "Ejemplo " . ($i + 1) . ": " . $ejemplo['nombre'] . "\n";
    echo "Input: password = '" . $ejemplo['password'] . "'\n";
    echo "Output: " . $resultado['resultado'] . "\n";
    echo "Longitud: " . $resultado['longitud'] . "\n";
    echo "Estado: " . ($resultado['es_fuerte'] ? 'Fuerte' : 'Débil') . "\n";
    echo "Descripción: " . $ejemplo['descripcion'] . "\n";
    echo "---\n";
}

echo "\n=== FIN DE EJEMPLOS ===\n";
echo "Para usar la interfaz web, ejecuta: start-server.bat\n";
echo "Luego ve a: http://localhost:8000/ejercicios/strong-password\n"; 