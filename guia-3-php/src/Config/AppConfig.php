<?php

namespace App\Config;

/**
 * Clase de configuración del proyecto
 * Contiene constantes y configuraciones globales
 */
class AppConfig
{
    // Configuración de la aplicación
    public const APP_NAME = 'Ejercicios PHP';
    public const APP_VERSION = '1.0.0';
    public const APP_ENV = 'development'; // development, production

    // Configuración de rutas
    public const BASE_PATH = __DIR__ . '/../../';
    public const PUBLIC_PATH = self::BASE_PATH . 'public/';
    public const TEMPLATES_PATH = self::BASE_PATH . 'templates/';
    public const CACHE_PATH = self::BASE_PATH . 'cache/';

    // Configuración de Twig
    public const TWIG_CACHE_ENABLED = self::APP_ENV === 'production';
    public const TWIG_DEBUG_ENABLED = self::APP_ENV === 'development';
    public const TWIG_AUTO_RELOAD = self::APP_ENV === 'development';

    // Configuración de algoritmos
    public const MAX_ARRAY_SIZE = 50;
    public const MIN_ARRAY_SIZE = 3;
    public const DEFAULT_ARRAY_SIZE = 10;

    /**
     * Configurar el entorno de desarrollo
     */
    public static function setupEnvironment(): void
    {
        // Configuración de errores
        if (self::APP_ENV === 'development') {
            error_reporting(E_ALL);
            ini_set('display_errors', 1);
        } else {
            error_reporting(0);
            ini_set('display_errors', 0);
        }

        // Configuración de zona horaria
        date_default_timezone_set('America/El_Salvador');

        // Configuración de caracteres
        ini_set('default_charset', 'UTF-8');
    }
} 