<?php

require_once 'vendor/autoload.php';
require_once 'src/Parte1Functions.php';
require_once 'src/Parte2Functions.php';

use FastRoute\Dispatcher;
use FastRoute\RouteCollector;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Configuración de Twig
$loader = new FilesystemLoader('templates');
$twig = new Environment($loader, [
    'cache' => 'cache/twig',
    'debug' => true,
    'auto_reload' => true
]);

// Función para manejar las rutas
$dispatcher = FastRoute\simpleDispatcher(function(RouteCollector $r) {
    $r->addRoute('GET', '/', 'home');
    $r->addRoute('GET', '/about', 'about');
    
    // Rutas para ejercicios de la Parte 1
    $r->addRoute(['GET', 'POST'], '/fibonacci', 'fibonacci');
    $r->addRoute(['GET', 'POST'], '/primos', 'primos');
    $r->addRoute(['GET', 'POST'], '/palindromos', 'palindromos');
    
    // Rutas para ejercicios de la Parte 2
    $r->addRoute(['GET', 'POST'], '/suma-pares', 'suma_pares');
    $r->addRoute(['GET', 'POST'], '/llamadas-internacionales', 'llamadas_internacionales');
    $r->addRoute(['GET', 'POST'], '/fizzbuzz', 'fizzbuzz');
});

// Obtener la URI y método HTTP
$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Remover query string y fragmento
if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

// Despachar la ruta
$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

switch ($routeInfo[0]) {
    case Dispatcher::NOT_FOUND:
        // 404 Not found
        http_response_code(404);
        echo $twig->render('404.twig', ['title' => 'Página no encontrada']);
        break;

    case Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        // 405 Method Not Allowed
        http_response_code(405);
        echo $twig->render('405.twig', ['title' => 'Método no permitido']);
        break;

    case Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        
        // Manejar las rutas
        switch ($handler) {
            case 'home':
                echo $twig->render('home.twig', [
                    'title' => 'Inicio',
                    'message' => '¡Bienvenido a mi proyecto PHP!'
                ]);
                break;
                
            case 'about':
                echo $twig->render('about.twig', [
                    'title' => 'Acerca de',
                    'content' => 'Esta es la página acerca de nosotros.'
                ]);
                break;
                
            case 'fibonacci':
                $input = [];
                $resultado = null;
                
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $n = (int) ($_POST['n'] ?? 10);
                    if (\App\Parte1\esPositivo($n) && $n <= 50) {
                        $fibonacci = \App\Parte1\generarFibonacci($n);
                        $resultado = [
                            'n' => $n,
                            'serie' => \App\Parte1\formatearArray($fibonacci),
                            'numeros' => $fibonacci,
                            'ultimo' => end($fibonacci),
                            'suma' => array_sum($fibonacci)
                        ];
                    }
                    $input['n'] = $n;
                }
                
                echo $twig->render('fibonacci.twig', [
                    'title' => 'Serie Fibonacci',
                    'input' => $input,
                    'resultado' => $resultado
                ]);
                break;
                
            case 'primos':
                $input = [];
                $resultado_verificacion = null;
                $resultado_busqueda = null;
                
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $action = $_POST['action'] ?? '';
                    
                    if ($action === 'verificar') {
                        $numero = (int) ($_POST['numero'] ?? 0);
                        if (\App\Parte1\esPositivo($numero)) {
                            $esPrimo = \App\Parte1\esPrimo($numero);
                            $resultado_verificacion = [
                                'numero' => $numero,
                                'esPrimo' => $esPrimo,
                                'divisores' => $esPrimo ? null : array_filter(range(1, $numero), fn($d) => $numero % $d === 0)
                            ];
                        }
                        $input['numero'] = $numero;
                    } elseif ($action === 'encontrar') {
                        $limite = (int) ($_POST['limite'] ?? 100);
                        if ($limite >= 2 && $limite <= 1000) {
                            $primos = \App\Parte1\encontrarPrimosHasta($limite);
                            $resultado_busqueda = [
                                'limite' => $limite,
                                'cantidad' => count($primos),
                                'primos' => $primos
                            ];
                        }
                        $input['limite'] = $limite;
                    }
                }
                
                echo $twig->render('primos.twig', [
                    'title' => 'Números Primos',
                    'input' => $input,
                    'resultado_verificacion' => $resultado_verificacion,
                    'resultado_busqueda' => $resultado_busqueda
                ]);
                break;
                
            case 'palindromos':
                $input = [];
                $resultado_verificacion = null;
                $resultado_multiple = null;
                
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $action = $_POST['action'] ?? '';
                    
                    if ($action === 'verificar') {
                        $texto = trim($_POST['texto'] ?? '');
                        if (\App\Parte1\noEstaVacio($texto)) {
                            $textoProcesado = preg_replace('/[^a-zA-Z0-9]/', '', strtolower($texto));
                            $esPalindromo = \App\Parte1\esPalindromo($texto);
                            $resultado_verificacion = [
                                'textoOriginal' => $texto,
                                'textoProcesado' => $textoProcesado,
                                'textoReverso' => strrev($textoProcesado),
                                'esPalindromo' => $esPalindromo
                            ];
                        }
                        $input['texto'] = $texto;
                    } elseif ($action === 'multiple') {
                        $palabrasTexto = $_POST['palabras'] ?? '';
                        if (\App\Parte1\noEstaVacio($palabrasTexto)) {
                            $palabras = array_map('trim', explode(',', $palabrasTexto));
                            $palabras = array_filter($palabras, 'App\Parte1\noEstaVacio');
                            $palindromos = \App\Parte1\encontrarPalindromos($palabras);
                            $noPalindromos = array_diff($palabras, $palindromos);
                            
                            $resultado_multiple = [
                                'total' => count($palabras),
                                'palindromos' => $palindromos,
                                'noPalindromos' => $noPalindromos
                            ];
                        }
                        $input['palabras'] = $palabrasTexto;
                    }
                }
                
                echo $twig->render('palindromos.twig', [
                    'title' => 'Palíndromos',
                    'input' => $input,
                    'resultado_verificacion' => $resultado_verificacion,
                    'resultado_multiple' => $resultado_multiple
                ]);
                break;
                
            case 'suma_pares':
                $input = [];
                $resultado = null;
                
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $numerosString = $_POST['numeros'] ?? '';
                    if (!empty($numerosString)) {
                        $numeros = \App\Parte2\parsearNumerosString($numerosString);
                        if (!empty($numeros)) {
                            $pares = \App\Parte2\obtenerNumerosPares($numeros);
                            $impares = \App\Parte2\obtenerNumerosImpares($numeros);
                            $estadisticas = \App\Parte2\obtenerEstadisticas($numeros);
                            
                            $resultado = [
                                'numeros' => $numeros,
                                'pares' => $pares,
                                'impares' => $impares,
                                'suma_pares' => \App\Parte2\sumarNumerosPares($numeros),
                                'estadisticas' => $estadisticas
                            ];
                        }
                    }
                    $input['numeros'] = $numerosString;
                }
                
                echo $twig->render('suma-pares.twig', [
                    'title' => 'Suma de Números Pares',
                    'input' => $input,
                    'resultado' => $resultado
                ]);
                break;
                
            case 'llamadas_internacionales':
                $input = [];
                $resultado = null;
                
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $clave = (int) ($_POST['clave'] ?? 0);
                    $minutos = (int) ($_POST['minutos'] ?? 0);
                    
                    if (\App\Parte2\esClaveZonaValida($clave) && \App\Parte2\sonMinutosValidos($minutos)) {
                        $resultado = \App\Parte2\calcularCostoLlamada($clave, $minutos);
                    } else {
                        $resultado = [
                            'error' => 'Clave de zona o minutos no válidos',
                            'clave' => $clave,
                            'minutos' => $minutos
                        ];
                    }
                    
                    $input['clave'] = $clave;
                    $input['minutos'] = $minutos;
                }
                
                echo $twig->render('llamadas-internacionales.twig', [
                    'title' => 'Llamadas Internacionales',
                    'input' => $input,
                    'resultado' => $resultado
                ]);
                break;
                
            case 'fizzbuzz':
                $input = [];
                $resultado = null;
                
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $n = (int) ($_POST['n'] ?? 15);
                    if (\App\Parte2\esRangoFizzBuzzValido($n)) {
                        $resultado = \App\Parte2\analizarFizzBuzz($n);
                    } else {
                        $resultado = [
                            'error' => 'El número debe estar entre 1 y 10000',
                            'n' => $n
                        ];
                    }
                    $input['n'] = $n;
                }
                
                echo $twig->render('fizzbuzz.twig', [
                    'title' => 'FizzBuzz',
                    'input' => $input,
                    'resultado' => $resultado
                ]);
                break;
                
            default:
                http_response_code(404);
                echo $twig->render('404.twig', ['title' => 'Página no encontrada']);
        }
        break;
} 