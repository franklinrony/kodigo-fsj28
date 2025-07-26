<?php

namespace App\Controllers;

use App\Core\TwigRenderer;
use App\Ejercicios\HeightChecker;
use App\Ejercicios\InsertionSort;
use App\Ejercicios\BinarySearch;
use App\Ejercicios\HappyNumber;
use App\Ejercicios\BirthdayCakeCandles;
use App\Ejercicios\StrongPassword;
use App\Ejercicios\MarsExploration;
use App\Ejercicios\MergeSort;
use App\Ejercicios\VeryBigSum;
use App\Helpers\AppHelper;

/**
 * Controlador para manejar los ejercicios de algoritmos
 * Implementa la lógica de negocio para los ejercicios
 */
class EjerciciosController
{
    /**
     * Instancia del renderizador Twig
     * @var TwigRenderer
     */
    private TwigRenderer $renderer;

    /**
     * Constructor que inicializa el renderizador
     */
    public function __construct()
    {
        $this->renderer = new TwigRenderer();
    }

    /**
     * Página principal de ejercicios
     */
    public function index(): void
    {
        $datos = [
            'titulo' => 'Ejercicios de Algoritmos',
            'descripcion' => 'Resuelve ejercicios de algoritmos paso a paso',
            'ejercicios' => [
                'height-checker' => [
                    'nombre' => 'Height Checker',
                    'descripcion' => 'Contar estudiantes en posiciones incorrectas',
                    'dificultad' => 'Fácil',
                    'categoria' => 'Arrays'
                ],
                'insertion-sort' => [
                    'nombre' => 'Insertion Sort',
                    'descripcion' => 'Insertar un elemento en su posición correcta',
                    'dificultad' => 'Fácil',
                    'categoria' => 'Ordenamiento'
                ],
                'binary-search' => [
                    'nombre' => 'Binary Search',
                    'descripcion' => 'Buscar un elemento en un array ordenado',
                    'dificultad' => 'Fácil',
                    'categoria' => 'Búsqueda'
                ],
                'happy-number' => [
                    'nombre' => 'Happy Number',
                    'descripcion' => 'Determinar si un número es feliz',
                    'dificultad' => 'Fácil',
                    'categoria' => 'Matemáticas'
                ],
                'birthday-cake-candles' => [
                    'nombre' => 'Birthday Cake Candles',
                    'descripcion' => 'Contar velas más altas del pastel',
                    'dificultad' => 'Fácil',
                    'categoria' => 'Arrays'
                ],
                'strong-password' => [
                    'nombre' => 'Strong Password',
                    'descripcion' => 'Validar contraseña y calcular caracteres faltantes',
                    'dificultad' => 'Fácil',
                    'categoria' => 'Strings'
                ],
                'mars-exploration' => [
                    'nombre' => 'Mars Exploration',
                    'descripcion' => 'Contar letras alteradas en mensajes SOS por radiación cósmica',
                    'dificultad' => 'Fácil',
                    'categoria' => 'Strings'
                ],
                'merge-sort' => [
                    'nombre' => 'Merge Sort',
                    'descripcion' => 'Ordenar un arreglo de números de menor a mayor utilizando el algoritmo merge sort',
                    'dificultad' => 'Medio',
                    'categoria' => 'Ordenamiento'
                ],
                'very-big-sum' => [
                    'nombre' => 'A Very Big Sum',
                    'descripcion' => 'Calcular la suma de elementos en un array considerando números muy grandes',
                    'dificultad' => 'Fácil',
                    'categoria' => 'Matemáticas'
                ]
            ]
        ];

        $this->renderer->display('ejercicios/index.twig', $datos);
    }

    /**
     * Página del ejercicio Height Checker
     */
    public function heightChecker(): void
    {
        $datos = [
            'titulo' => 'Height Checker',
            'descripcion' => 'Contar cuántos estudiantes están en posiciones incorrectas',
            'ejemplos' => HeightChecker::generarEjemplos(),
            'restricciones' => [
                '1 <= heights.length <= 100',
                '1 <= heights[i] <= 100'
            ]
        ];

        $this->renderer->display('ejercicios/height-checker.twig', $datos);
    }

    /**
     * Ejecuta el ejercicio Height Checker
     */
    public function ejecutarHeightChecker(): void
    {
        // Verificar que sea una solicitud POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo 'Método no permitido';
            return;
        }

        // Obtener datos del formulario
        $heightsInput = $_POST['heights'] ?? '';
        $ejemploSeleccionado = $_POST['ejemplo'] ?? '';

        // Procesar el input
        if (!empty($ejemploSeleccionado)) {
            // Usar ejemplo predefinido
            $ejemplos = HeightChecker::generarEjemplos();
            $heights = $ejemplos[$ejemploSeleccionado]['heights'] ?? [];
        } else {
            // Procesar input personalizado usando el helper
            $heights = AppHelper::parseArrayString($heightsInput);
        }

        // Ejecutar el ejercicio
        $resultado = HeightChecker::resolver($heights);

        // Preparar datos para la vista
        $datos = [
            'titulo' => 'Resultado - Height Checker',
            'resultado' => $resultado,
            'heights_input' => $heightsInput,
            'ejemplo_seleccionado' => $ejemploSeleccionado
        ];

        $this->renderer->display('ejercicios/resultado-height-checker.twig', $datos);
    }

    /**
     * Ejecuta todos los ejemplos del ejercicio Height Checker
     */
    public function ejecutarEjemplosHeightChecker(): void
    {
        $resultados = HeightChecker::ejecutarEjemplos();

        $datos = [
            'titulo' => 'Ejemplos - Height Checker',
            'resultados' => $resultados
        ];

        $this->renderer->display('ejercicios/ejemplos-height-checker.twig', $datos);
    }

    /**
     * Página del ejercicio Insertion Sort
     */
    public function insertionSort(): void
    {
        $datos = [
            'titulo' => 'Insertion Sort',
            'descripcion' => 'Insertar un elemento en su posición correcta dentro de un array ordenado',
            'ejemplos' => InsertionSort::generarEjemplos(),
            'restricciones' => [
                '1 <= n <= 1000',
                '-10000 <= arr[i] <= 10000'
            ]
        ];

        $this->renderer->display('ejercicios/insertion-sort.twig', $datos);
    }

    /**
     * Ejecuta el ejercicio Insertion Sort
     */
    public function ejecutarInsertionSort(): void
    {
        // Verificar que sea una solicitud POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo 'Método no permitido';
            return;
        }

        // Obtener datos del formulario
        $arrInput = $_POST['arr'] ?? '';
        $ejemploSeleccionado = $_POST['ejemplo'] ?? '';

        // Procesar el input
        if (!empty($ejemploSeleccionado)) {
            // Usar ejemplo predefinido
            $ejemplos = InsertionSort::generarEjemplos();
            $arr = $ejemplos[$ejemploSeleccionado]['arr'] ?? [];
        } else {
            // Procesar input personalizado usando el helper
            $arr = AppHelper::parseArrayString($arrInput);
        }

        // Ejecutar el ejercicio
        $resultado = InsertionSort::resolver($arr);

        // Preparar datos para la vista
        $datos = [
            'titulo' => 'Resultado - Insertion Sort',
            'resultado' => $resultado,
            'arr_input' => $arrInput,
            'ejemplo_seleccionado' => $ejemploSeleccionado
        ];

        $this->renderer->display('ejercicios/resultado-insertion-sort.twig', $datos);
    }

    /**
     * Ejecuta todos los ejemplos del ejercicio Insertion Sort
     */
    public function ejecutarEjemplosInsertionSort(): void
    {
        $resultados = InsertionSort::ejecutarEjemplos();

        $datos = [
            'titulo' => 'Ejemplos - Insertion Sort',
            'resultados' => $resultados
        ];

        $this->renderer->display('ejercicios/ejemplos-insertion-sort.twig', $datos);
    }

    /**
     * Página del ejercicio Binary Search
     */
    public function binarySearch(): void
    {
        $datos = [
            'titulo' => 'Binary Search',
            'descripcion' => 'Buscar un elemento en un array ordenado usando búsqueda binaria',
            'ejemplos' => BinarySearch::generarEjemplos(),
            'restricciones' => [
                '1 <= nums.length <= 104',
                '-104 < nums[i], target < 104',
                'Todos los elementos son únicos',
                'nums está ordenado en orden ascendente'
            ]
        ];

        $this->renderer->display('ejercicios/binary-search.twig', $datos);
    }

    /**
     * Ejecuta el ejercicio Binary Search
     */
    public function ejecutarBinarySearch(): void
    {
        // Verificar que sea una solicitud POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo 'Método no permitido';
            return;
        }

        // Obtener datos del formulario
        $numsInput = $_POST['nums'] ?? '';
        $targetInput = $_POST['target'] ?? '';
        $ejemploSeleccionado = $_POST['ejemplo'] ?? '';

        // Procesar el input
        if (!empty($ejemploSeleccionado)) {
            // Usar ejemplo predefinido
            $ejemplos = BinarySearch::generarEjemplos();
            $nums = $ejemplos[$ejemploSeleccionado]['nums'] ?? [];
            $target = $ejemplos[$ejemploSeleccionado]['target'] ?? 0;
        } else {
            // Procesar input personalizado usando el helper
            $nums = AppHelper::parseArrayString($numsInput);
            $target = intval($targetInput);
        }

        // Ejecutar el ejercicio
        $resultado = BinarySearch::resolver($nums, $target);

        // Preparar datos para la vista
        $datos = [
            'titulo' => 'Resultado - Binary Search',
            'resultado' => $resultado,
            'nums_input' => $numsInput,
            'target_input' => $targetInput,
            'ejemplo_seleccionado' => $ejemploSeleccionado
        ];

        $this->renderer->display('ejercicios/resultado-binary-search.twig', $datos);
    }

    /**
     * Ejecuta todos los ejemplos del ejercicio Binary Search
     */
    public function ejecutarEjemplosBinarySearch(): void
    {
        $resultados = BinarySearch::ejecutarEjemplos();

        $datos = [
            'titulo' => 'Ejemplos - Binary Search',
            'resultados' => $resultados
        ];

        $this->renderer->display('ejercicios/ejemplos-binary-search.twig', $datos);
    }

    /**
     * Página del ejercicio Happy Number
     */
    public function happyNumber(): void
    {
        $datos = [
            'titulo' => 'Happy Number',
            'descripcion' => 'Determinar si un número es feliz mediante la suma de cuadrados de sus dígitos',
            'ejemplos' => HappyNumber::generarEjemplos(),
            'restricciones' => [
                '1 <= n <= 231 - 1 (230)',
                'El proceso debe terminar en 1 o en un ciclo infinito',
                'Un número es feliz si el proceso termina en 1'
            ]
        ];

        $this->renderer->display('ejercicios/happy-number.twig', $datos);
    }

    /**
     * Ejecuta el ejercicio Happy Number
     */
    public function ejecutarHappyNumber(): void
    {
        // Verificar que sea una solicitud POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo 'Método no permitido';
            return;
        }

        // Obtener datos del formulario
        $nInput = $_POST['n'] ?? '';
        $ejemploSeleccionado = $_POST['ejemplo'] ?? '';

        // Procesar el input
        if (!empty($ejemploSeleccionado)) {
            // Usar ejemplo predefinido
            $ejemplos = HappyNumber::generarEjemplos();
            $n = $ejemplos[$ejemploSeleccionado]['n'] ?? 1;
        } else {
            // Procesar input personalizado
            $n = intval($nInput);
        }

        // Ejecutar el ejercicio
        $resultado = HappyNumber::resolver($n);

        // Preparar datos para la vista
        $datos = [
            'titulo' => 'Resultado - Happy Number',
            'resultado' => $resultado,
            'n_input' => $nInput,
            'ejemplo_seleccionado' => $ejemploSeleccionado
        ];

        $this->renderer->display('ejercicios/resultado-happy-number.twig', $datos);
    }

    /**
     * Ejecuta todos los ejemplos del ejercicio Happy Number
     */
    public function ejecutarEjemplosHappyNumber(): void
    {
        $resultados = HappyNumber::ejecutarEjemplos();

        $datos = [
            'titulo' => 'Ejemplos - Happy Number',
            'resultados' => $resultados
        ];

        $this->renderer->display('ejercicios/ejemplos-happy-number.twig', $datos);
    }

    /**
     * Página del ejercicio Birthday Cake Candles
     */
    public function birthdayCakeCandles(): void
    {
        $datos = [
            'titulo' => 'Birthday Cake Candles',
            'descripcion' => 'Contar cuántas velas son las más altas en un pastel de cumpleaños',
            'ejemplos' => BirthdayCakeCandles::generarEjemplos(),
            'restricciones' => [
                '1 <= n <= 10^5 (número de velas)',
                '1 <= candles[i] <= 10^7 (altura de cada vela)',
                'El niño solo puede soplar las velas más altas'
            ]
        ];

        $this->renderer->display('ejercicios/birthday-cake-candles.twig', $datos);
    }

    /**
     * Ejecuta el ejercicio Birthday Cake Candles
     */
    public function ejecutarBirthdayCakeCandles(): void
    {
        // Verificar que sea una solicitud POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo 'Método no permitido';
            return;
        }

        // Obtener datos del formulario
        $candlesInput = $_POST['candles'] ?? '';
        $ejemploSeleccionado = $_POST['ejemplo'] ?? '';

        // Procesar el input
        if (!empty($ejemploSeleccionado)) {
            // Usar ejemplo predefinido
            $ejemplos = BirthdayCakeCandles::generarEjemplos();
            $candles = $ejemplos[$ejemploSeleccionado]['candles'] ?? [1];
        } else {
            // Procesar input personalizado
            $candles = AppHelper::parseArrayString($candlesInput);
        }

        // Ejecutar el ejercicio
        $resultado = BirthdayCakeCandles::resolver($candles);

        // Preparar datos para la vista
        $datos = [
            'titulo' => 'Resultado - Birthday Cake Candles',
            'resultado' => $resultado,
            'candles_input' => $candlesInput,
            'ejemplo_seleccionado' => $ejemploSeleccionado
        ];

        $this->renderer->display('ejercicios/resultado-birthday-cake-candles.twig', $datos);
    }

    /**
     * Ejecuta todos los ejemplos del ejercicio Birthday Cake Candles
     */
    public function ejecutarEjemplosBirthdayCakeCandles(): void
    {
        $resultados = BirthdayCakeCandles::ejecutarEjemplos();

        $datos = [
            'titulo' => 'Ejemplos - Birthday Cake Candles',
            'resultados' => $resultados
        ];

        $this->renderer->display('ejercicios/ejemplos-birthday-cake-candles.twig', $datos);
    }

    /**
     * Página del ejercicio Strong Password
     */
    public function strongPassword(): void
    {
        $datos = [
            'titulo' => 'Strong Password',
            'descripcion' => 'Validar contraseña y calcular el mínimo número de caracteres a agregar',
            'ejemplos' => StrongPassword::generarEjemplos(),
            'restricciones' => [
                '1 <= n <= 100 (longitud de la contraseña)',
                'Solo caracteres permitidos: a-z, A-Z, 0-9, !@#$%^&*()-+',
                'Criterios de contraseña fuerte: longitud ≥ 6, dígito, minúscula, mayúscula, especial'
            ]
        ];

        $this->renderer->display('ejercicios/strong-password.twig', $datos);
    }

    /**
     * Ejecuta el ejercicio Strong Password
     */
    public function ejecutarStrongPassword(): void
    {
        // Verificar que sea una solicitud POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo 'Método no permitido';
            return;
        }

        // Obtener datos del formulario
        $passwordInput = $_POST['password'] ?? '';
        $ejemploSeleccionado = $_POST['ejemplo'] ?? '';

        // Procesar el input
        if (!empty($ejemploSeleccionado)) {
            // Usar ejemplo predefinido
            $ejemplos = StrongPassword::generarEjemplos();
            $password = $ejemplos[$ejemploSeleccionado]['password'] ?? '';
        } else {
            // Procesar input personalizado
            $password = trim($passwordInput);
        }

        // Ejecutar el ejercicio
        $resultado = StrongPassword::resolver($password);

        // Preparar datos para la vista
        $datos = [
            'titulo' => 'Resultado - Strong Password',
            'resultado' => $resultado,
            'password_input' => $passwordInput,
            'ejemplo_seleccionado' => $ejemploSeleccionado
        ];

        $this->renderer->display('ejercicios/resultado-strong-password.twig', $datos);
    }

    /**
     * Ejecuta todos los ejemplos del ejercicio Strong Password
     */
    public function ejecutarEjemplosStrongPassword(): void
    {
        $resultados = StrongPassword::ejecutarEjemplos();

        $datos = [
            'titulo' => 'Ejemplos - Strong Password',
            'resultados' => $resultados
        ];

        $this->renderer->display('ejercicios/ejemplos-strong-password.twig', $datos);
    }

    /**
     * Página del ejercicio Mars Exploration
     */
    public function marsExploration(): void
    {
        $datos = [
            'titulo' => 'Mars Exploration',
            'descripcion' => 'Contar letras alteradas en mensajes SOS por radiación cósmica',
            'ejemplos' => MarsExploration::generarEjemplos(),
            'restricciones' => [
                '1 <= length of s <= 99',
                'length of s modulo 3 == 0',
                's contiene solo letras mayúsculas (A-Z)'
            ]
        ];

        $this->renderer->display('ejercicios/mars-exploration.twig', $datos);
    }

    /**
     * Ejecuta el ejercicio Mars Exploration
     */
    public function ejecutarMarsExploration(): void
    {
        // Verificar que sea una solicitud POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo 'Método no permitido';
            return;
        }

        // Obtener datos del formulario
        $mensajeInput = $_POST['mensaje'] ?? '';
        $ejemploSeleccionado = $_POST['ejemplo'] ?? '';

        // Procesar el input
        if (!empty($ejemploSeleccionado)) {
            // Usar ejemplo predefinido
            $ejemplos = MarsExploration::generarEjemplos();
            $mensaje = $ejemplos[$ejemploSeleccionado]['mensaje'] ?? '';
        } else {
            // Procesar input personalizado
            $mensaje = trim($mensajeInput);
        }

        // Ejecutar el ejercicio
        $resultado = MarsExploration::resolver($mensaje);

        // Preparar datos para la vista
        $datos = [
            'titulo' => 'Resultado - Mars Exploration',
            'resultado' => $resultado,
            'mensaje_input' => $mensajeInput,
            'ejemplo_seleccionado' => $ejemploSeleccionado
        ];

        $this->renderer->display('ejercicios/resultado-mars-exploration.twig', $datos);
    }

    /**
     * Ejecuta todos los ejemplos del ejercicio Mars Exploration
     */
    public function ejecutarEjemplosMarsExploration(): void
    {
        $resultados = MarsExploration::ejecutarEjemplos();

        $datos = [
            'titulo' => 'Ejemplos - Mars Exploration',
            'resultados' => $resultados
        ];

        $this->renderer->display('ejercicios/ejemplos-mars-exploration.twig', $datos);
    }

    /**
     * Página del ejercicio Merge Sort
     */
    public function mergeSort(): void
    {
        $datos = [
            'titulo' => 'Merge Sort',
            'descripcion' => 'Ordenar un arreglo de números de menor a mayor utilizando el algoritmo merge sort',
            'ejemplos' => MergeSort::generarEjemplos(),
            'restricciones' => [
                '1 <= n <= 1000 (longitud del array)',
                '-10000 <= arr[i] <= 10000 (rango de valores)',
                'Todos los elementos deben ser números'
            ]
        ];

        $this->renderer->display('ejercicios/merge-sort.twig', $datos);
    }

    /**
     * Ejecuta el ejercicio Merge Sort
     */
    public function ejecutarMergeSort(): void
    {
        // Verificar que sea una solicitud POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo 'Método no permitido';
            return;
        }

        // Obtener datos del formulario
        $arrayInput = $_POST['array'] ?? '';
        $ejemploSeleccionado = $_POST['ejemplo'] ?? '';

        // Procesar el input
        if (!empty($ejemploSeleccionado)) {
            // Usar ejemplo predefinido
            $ejemplos = MergeSort::generarEjemplos();
            $array = $ejemplos[$ejemploSeleccionado]['array'] ?? [];
        } else {
            // Procesar input personalizado
            $array = AppHelper::parseArrayString($arrayInput);
        }

        // Ejecutar el ejercicio
        $resultado = MergeSort::resolver($array);

        // Preparar datos para la vista
        $datos = [
            'titulo' => 'Resultado - Merge Sort',
            'resultado' => $resultado,
            'array_input' => $arrayInput,
            'ejemplo_seleccionado' => $ejemploSeleccionado
        ];

        $this->renderer->display('ejercicios/resultado-merge-sort.twig', $datos);
    }

    /**
     * Ejecuta todos los ejemplos del ejercicio Merge Sort
     */
    public function ejecutarEjemplosMergeSort(): void
    {
        $resultados = MergeSort::ejecutarEjemplos();

        $datos = [
            'titulo' => 'Ejemplos - Merge Sort',
            'resultados' => $resultados
        ];

        $this->renderer->display('ejercicios/ejemplos-merge-sort.twig', $datos);
    }

    /**
     * Página del ejercicio A Very Big Sum
     */
    public function veryBigSum(): void
    {
        $datos = [
            'titulo' => 'A Very Big Sum',
            'descripcion' => 'Calcular la suma de elementos en un array considerando números muy grandes',
            'ejemplos' => VeryBigSum::generarEjemplos(),
            'restricciones' => [
                '1 <= n <= 10 (longitud del array)',
                '0 <= ar[i] <= 10^10 (rango de valores)',
                'Todos los elementos deben ser números'
            ]
        ];

        $this->renderer->display('ejercicios/very-big-sum.twig', $datos);
    }

    /**
     * Ejecuta el ejercicio A Very Big Sum
     */
    public function ejecutarVeryBigSum(): void
    {
        // Verificar que sea una solicitud POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo 'Método no permitido';
            return;
        }

        // Obtener datos del formulario
        $arrayInput = $_POST['array'] ?? '';
        $ejemploSeleccionado = $_POST['ejemplo'] ?? '';

        // Procesar el input
        if (!empty($ejemploSeleccionado)) {
            // Usar ejemplo predefinido
            $ejemplos = VeryBigSum::generarEjemplos();
            $array = $ejemplos[$ejemploSeleccionado]['array'] ?? [];
        } else {
            // Procesar input personalizado
            $array = AppHelper::parseArrayString($arrayInput);
        }

        // Ejecutar el ejercicio
        $resultado = VeryBigSum::resolver($array);

        // Preparar datos para la vista
        $datos = [
            'titulo' => 'Resultado - A Very Big Sum',
            'resultado' => $resultado,
            'array_input' => $arrayInput,
            'ejemplo_seleccionado' => $ejemploSeleccionado
        ];

        $this->renderer->display('ejercicios/resultado-very-big-sum.twig', $datos);
    }

    /**
     * Ejecuta todos los ejemplos del ejercicio A Very Big Sum
     */
    public function ejecutarEjemplosVeryBigSum(): void
    {
        $resultados = VeryBigSum::ejecutarEjemplos();

        $datos = [
            'titulo' => 'Ejemplos - A Very Big Sum',
            'resultados' => $resultados
        ];

        $this->renderer->display('ejercicios/ejemplos-very-big-sum.twig', $datos);
    }
} 