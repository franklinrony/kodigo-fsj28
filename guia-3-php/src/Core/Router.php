<?php

namespace App\Core;

/**
 * Clase Router para manejar las rutas de la aplicación
 * Implementa un sistema de routing simple y funcional
 */
class Router
{
    /**
     * Array que almacena las rutas registradas
     * @var array
     */
    private array $routes = [];

    /**
     * Registra una ruta GET
     * @param string $path Ruta de la URL
     * @param array $handler Controlador y método a ejecutar
     */
    public function get(string $path, array $handler): void
    {
        $this->routes['GET'][$path] = $handler;
    }

    /**
     * Registra una ruta POST
     * @param string $path Ruta de la URL
     * @param array $handler Controlador y método a ejecutar
     */
    public function post(string $path, array $handler): void
    {
        $this->routes['POST'][$path] = $handler;
    }

    /**
     * Despacha la solicitud al controlador correspondiente
     * @param string $method Método HTTP (GET, POST, etc.)
     * @param string $path Ruta de la URL
     * @throws \Exception Si la ruta no existe
     */
    public function dispatch(string $method, string $path): void
    {
        // Verificar si existe la ruta
        if (!isset($this->routes[$method][$path])) {
            throw new \Exception("Ruta no encontrada: {$method} {$path}");
        }

        // Obtener el handler
        $handler = $this->routes[$method][$path];
        
        // Verificar que el handler sea válido
        if (!is_array($handler) || count($handler) !== 2) {
            throw new \Exception("Handler inválido para la ruta: {$method} {$path}");
        }

        [$controllerClass, $method] = $handler;

        // Verificar que la clase del controlador existe
        if (!class_exists($controllerClass)) {
            throw new \Exception("Controlador no encontrado: {$controllerClass}");
        }

        // Crear instancia del controlador
        $controller = new $controllerClass();

        // Verificar que el método existe
        if (!method_exists($controller, $method)) {
            throw new \Exception("Método no encontrado: {$method} en {$controllerClass}");
        }

        // Ejecutar el método del controlador
        $controller->$method();
    }
} 