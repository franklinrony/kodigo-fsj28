<?php

namespace App\Core;

use App\Config\AppConfig;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

/**
 * Clase TwigRenderer para manejar la renderización de plantillas Twig
 * Configura Twig y proporciona métodos para renderizar vistas
 */
class TwigRenderer
{
    /**
     * Instancia de Twig Environment
     * @var Environment
     */
    private Environment $twig;

    /**
     * Constructor que inicializa Twig
     */
    public function __construct()
    {
        // Configurar el loader de archivos
        $loader = new FilesystemLoader(AppConfig::TEMPLATES_PATH);
        
        // Crear la instancia de Twig
        $this->twig = new Environment($loader, [
            'cache' => AppConfig::CACHE_PATH . 'twig',
            'debug' => AppConfig::TWIG_DEBUG_ENABLED,
            'auto_reload' => AppConfig::TWIG_AUTO_RELOAD
        ]);

        // Crear el directorio de cache si no existe
        if (!is_dir(AppConfig::CACHE_PATH . 'twig')) {
            mkdir(AppConfig::CACHE_PATH . 'twig', 0777, true);
        }
    }

    /**
     * Renderiza una plantilla con datos
     * @param string $template Nombre de la plantilla
     * @param array $data Datos a pasar a la plantilla
     * @return string HTML renderizado
     */
    public function render(string $template, array $data = []): string
    {
        return $this->twig->render($template, $data);
    }

    /**
     * Renderiza una plantilla y la imprime directamente
     * @param string $template Nombre de la plantilla
     * @param array $data Datos a pasar a la plantilla
     */
    public function display(string $template, array $data = []): void
    {
        echo $this->render($template, $data);
    }
} 