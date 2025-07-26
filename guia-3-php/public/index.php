<?php
/**
 * Archivo principal de entrada del proyecto
 * Maneja el routing básico y la configuración de Twig
 */

// Incluir el autoloader de Composer
require_once __DIR__ . '/../vendor/autoload.php';

// Importar las clases necesarias
use App\Config\AppConfig;
use App\Core\Router;
use App\Core\TwigRenderer;
use App\Controllers\EjerciciosController;

// Configurar el entorno
AppConfig::setupEnvironment();

// Obtener la URL actual
$requestUri = $_SERVER['REQUEST_URI'];
$basePath = '/guia-3-php/public';

// Remover el path base de la URL
$path = str_replace($basePath, '', $requestUri);
$path = parse_url($path, PHP_URL_PATH);

// Crear instancia del router
$router = new Router();

// Configurar las rutas
$router->get('/', [EjerciciosController::class, 'index']);
$router->get('/ejercicios', [EjerciciosController::class, 'index']);
$router->get('/ejercicios/height-checker', [EjerciciosController::class, 'heightChecker']);
$router->post('/ejercicios/height-checker/ejecutar', [EjerciciosController::class, 'ejecutarHeightChecker']);
$router->get('/ejercicios/height-checker/ejemplos', [EjerciciosController::class, 'ejecutarEjemplosHeightChecker']);
$router->get('/ejercicios/insertion-sort', [EjerciciosController::class, 'insertionSort']);
$router->post('/ejercicios/insertion-sort/ejecutar', [EjerciciosController::class, 'ejecutarInsertionSort']);
$router->get('/ejercicios/insertion-sort/ejemplos', [EjerciciosController::class, 'ejecutarEjemplosInsertionSort']);
$router->get('/ejercicios/binary-search', [EjerciciosController::class, 'binarySearch']);
$router->post('/ejercicios/binary-search/ejecutar', [EjerciciosController::class, 'ejecutarBinarySearch']);
$router->get('/ejercicios/binary-search/ejemplos', [EjerciciosController::class, 'ejecutarEjemplosBinarySearch']);
$router->get('/ejercicios/happy-number', [EjerciciosController::class, 'happyNumber']);
$router->post('/ejercicios/happy-number/ejecutar', [EjerciciosController::class, 'ejecutarHappyNumber']);
$router->get('/ejercicios/happy-number/ejemplos', [EjerciciosController::class, 'ejecutarEjemplosHappyNumber']);
$router->get('/ejercicios/birthday-cake-candles', [EjerciciosController::class, 'birthdayCakeCandles']);
$router->post('/ejercicios/birthday-cake-candles/ejecutar', [EjerciciosController::class, 'ejecutarBirthdayCakeCandles']);
$router->get('/ejercicios/birthday-cake-candles/ejemplos', [EjerciciosController::class, 'ejecutarEjemplosBirthdayCakeCandles']);
$router->get('/ejercicios/strong-password', [EjerciciosController::class, 'strongPassword']);
$router->post('/ejercicios/strong-password/ejecutar', [EjerciciosController::class, 'ejecutarStrongPassword']);
$router->get('/ejercicios/strong-password/ejemplos', [EjerciciosController::class, 'ejecutarEjemplosStrongPassword']);
$router->get('/ejercicios/mars-exploration', [EjerciciosController::class, 'marsExploration']);
$router->post('/ejercicios/mars-exploration/ejecutar', [EjerciciosController::class, 'ejecutarMarsExploration']);
$router->get('/ejercicios/mars-exploration/ejemplos', [EjerciciosController::class, 'ejecutarEjemplosMarsExploration']);
$router->get('/ejercicios/merge-sort', [EjerciciosController::class, 'mergeSort']);
$router->post('/ejercicios/merge-sort/ejecutar', [EjerciciosController::class, 'ejecutarMergeSort']);
$router->get('/ejercicios/merge-sort/ejemplos', [EjerciciosController::class, 'ejecutarEjemplosMergeSort']);
$router->get('/ejercicios/very-big-sum', [EjerciciosController::class, 'veryBigSum']);
$router->post('/ejercicios/very-big-sum/ejecutar', [EjerciciosController::class, 'ejecutarVeryBigSum']);
$router->get('/ejercicios/very-big-sum/ejemplos', [EjerciciosController::class, 'ejecutarEjemplosVeryBigSum']);

// Manejar la solicitud
try {
    $router->dispatch($_SERVER['REQUEST_METHOD'], $path);
} catch (Exception $e) {
    // Página de error 404
    http_response_code(404);
    echo "Página no encontrada: " . $e->getMessage();
} 