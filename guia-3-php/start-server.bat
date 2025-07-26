@echo off
echo ========================================
echo   Algoritmos PHP - Servidor de Desarrollo
echo ========================================
echo.
echo Iniciando servidor de desarrollo...
echo URL: http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
cd /d "%~dp0public"
php -S localhost:8000
pause 