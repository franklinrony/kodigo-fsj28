# Ejercicios - Parte 1 y 2

Este proyecto implementa los ejercicios de la Parte 1 y Parte 2 utilizando PHP moderno con programación funcional y una interfaz gráfica moderna.


- 🌙 **Tema oscuro/claro** incluido
- 📱 **Diseño responsive** para todos los dispositivos
- ⚡ **Interfaz moderna** con Bootstrap 5

## 🚀 Características

- **PHP Moderno**: Utiliza características de PHP 8+ como tipos estrictos, funciones anónimas y sintaxis moderna
- **Programación Funcional**: Implementación basada en funciones puras y composición funcional
- **Interfaz Gráfica**: Interfaz web moderna con Bootstrap 5 y Font Awesome
- **🌙 Tema Oscuro/Claro**: Sistema de cambio de tema con persistencia en localStorage
- **Clean Code**: Código limpio, bien documentado y fácil de mantener
- **Validación**: Validación robusta de entradas de usuario
- **Responsive**: Diseño adaptable a todos los dispositivos
- **🧪 Pruebas Unitarias**: Cobertura completa con PHPUnit

## 📋 Ejercicios Implementados

### Parte 1

#### 1. Serie Fibonacci

**Problema**: Escribe una función llamada `generarFibonacci` que reciba un número n como parámetro y genere los primeros n términos de la serie Fibonacci.

**Características**:
- Genera los primeros n términos de la serie
- Muestra visualización gráfica de los términos
- Calcula estadísticas (último término, suma total)
- Validación de entrada (1-50 términos)

**Función Principal**:
```php
function generarFibonacci(int $n): array
```

#### 2. Números Primos

**Problema**: Crea una función llamada `esPrimo` que determine si un número dado es primo o no.

**Características**:
- Verificación individual de números primos
- Búsqueda de números primos hasta un límite
- Muestra divisores para números no primos
- Optimización con criba de Eratóstenes

**Funciones Principales**:
```php
function esPrimo(int $numero): bool
function encontrarPrimosHasta(int $limite): array
```

#### 3. Palíndromos

**Problema**: Implementa una función llamada `esPalindromo` que determine si una cadena de texto dada es un palíndromo.

**Características**:
- Verificación individual de palíndromos
- Análisis de múltiples palabras
- Ignora espacios, puntuación y mayúsculas
- Muestra comparación normal vs reverso

**Funciones Principales**:
```php
function esPalindromo(string $texto): bool
function encontrarPalindromos(array $palabras): array
```

### Parte 2

#### 4. Suma de Números Pares

**Problema**: Crea un script que sume todos los números pares en un array de números enteros.

**Características**:
- Filtra automáticamente los números pares
- Calcula estadísticas completas (pares, impares, promedio)
- Visualización gráfica de resultados
- Validación de entrada

**Funciones Principales**:
```php
function sumarNumerosPares(array $numeros): int
function obtenerEstadisticas(array $numeros): array
```

#### 5. Llamadas Internacionales

**Problema**: Calcula el costo de llamadas telefónicas internacionales según la zona geográfica y duración.

**Características**:
- Tabla de precios por zona geográfica
- Descuento del 10% para llamadas < 30 minutos
- Desglose detallado de costos
- Validación de claves y minutos

**Funciones Principales**:
```php
function calcularCostoLlamada(int $clave, int $minutos): array
function obtenerTablaPrecios(): array
```

#### 6. FizzBuzz

**Problema**: Genera la secuencia FizzBuzz hasta un número n según las reglas clásicas.

**Características**:
- Generación de secuencia 1-indexed
- Estadísticas de Fizz, Buzz y FizzBuzz
- Visualización colorida por tipo
- Validación de rango (1-10000)

**Funciones Principales**:
```php
function generarFizzBuzz(int $n): array
function analizarFizzBuzz(int $n): array
```

## 🛠️ Tecnologías Utilizadas

- **PHP 8+**: Lenguaje principal con características modernas
- **FastRoute**: Sistema de rutas rápido y eficiente
- **Twig**: Motor de plantillas seguro y potente
- **Bootstrap 5**: Framework CSS para diseño responsive
- **Font Awesome**: Iconografía moderna
- **Composer**: Gestión de dependencias

## 📋 Requisitos del Sistema

- **PHP 8.0 o superior**
- **Composer** (para gestionar dependencias)
- **Navegador web moderno** (Chrome, Firefox, Safari, Edge)
- **Servidor web** (Apache, Nginx) o servidor de desarrollo de PHP

## 📁 Estructura del Proyecto

```
guia-1-y-2-php/
├── src/
│   ├── Parte1Functions.php    # Funciones funcionales Parte 1
│   └── Parte2Functions.php    # Funciones funcionales Parte 2
├── templates/
│   ├── base.twig              # Plantilla base
│   ├── home.twig              # Página de inicio
│   ├── fibonacci.twig         # Ejercicio Fibonacci
│   ├── primos.twig            # Ejercicio Números Primos
│   ├── palindromos.twig       # Ejercicio Palíndromos
│   ├── suma-pares.twig        # Ejercicio Suma de Números Pares
│   ├── llamadas-internacionales.twig # Ejercicio Llamadas Internacionales
│   └── fizzbuzz.twig          # Ejercicio FizzBuzz
├── index.php                  # Punto de entrada principal
└── README.md                  # Esta documentación
```

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/franklinrony/kodigo-fsj28
   cd guia-1-y-2-php
   ```

2. **Instalar dependencias**:
   ```bash
   composer install
   ```

3. **Ejecutar el proyecto**:

   **Opción A: Servidor de desarrollo de PHP (Recomendado)**
   ```bash
   php -S localhost:80
   ```
   Luego abrir el navegador en `http://localhost`

   **Opción B: Servidor web tradicional**
   - Configurar el directorio raíz del proyecto
   - Asegurar que PHP 8+ esté instalado
   - Habilitar mod_rewrite para Apache
   - Abrir el navegador en `http://localhost/guia-1-y-2-php`

4. **Navegar por la aplicación**:
   - Ir a la página de inicio para ver todos los ejercicios
   - Usar el menú "Ejercicios" para acceder directamente a cada ejercicio
   - Cada ejercicio tiene su propia página con interfaz gráfica

## 🎯 Funcionalidades por Ejercicio

### Fibonacci
- ✅ Generación de serie Fibonacci
- ✅ Visualización gráfica de términos
- ✅ Estadísticas de la serie
- ✅ Validación de entrada
- ✅ Ejemplos predefinidos

### Números Primos
- ✅ Verificación individual de primos
- ✅ Búsqueda de primos hasta un límite
- ✅ Visualización de divisores
- ✅ Estadísticas de búsqueda
- ✅ Información educativa

### Palíndromos
- ✅ Verificación individual de palíndromos
- ✅ Análisis de múltiples palabras
- ✅ Comparación normal vs reverso
- ✅ Procesamiento de texto (ignorar espacios/puntuación)
- ✅ Ejemplos de palíndromos famosos

### Suma de Números Pares
- ✅ Filtrado automático de números pares
- ✅ Cálculo de estadísticas completas
- ✅ Visualización gráfica de resultados
- ✅ Separación de pares e impares
- ✅ Ejemplos predefinidos

### Llamadas Internacionales
- ✅ Tabla de precios por zona geográfica
- ✅ Cálculo con descuentos automáticos
- ✅ Desglose detallado de costos
- ✅ Validación de entradas
- ✅ Información educativa

### FizzBuzz
- ✅ Generación de secuencia completa
- ✅ Estadísticas por tipo (Fizz, Buzz, FizzBuzz)
- ✅ Visualización colorida
- ✅ Desglose por categorías
- ✅ Ejemplos de referencia

## 🔧 Funciones Auxiliares

El proyecto incluye funciones auxiliares para mantener el código limpio:

```php
// Validación
function esPositivo(int $numero): bool
function noEstaVacio(string $texto): bool

// Formateo
function formatearArray(array $array, string $separador = ', '): string
```

## 🎨 Diseño y UX

- **Interfaz Moderna**: Diseño limpio y profesional
- **🌙 Tema Oscuro/Claro**: Cambio dinámico de tema con persistencia
- **Responsive**: Adaptable a móviles, tablets y desktop
- **Feedback Visual**: Resultados claros y coloridos
- **Navegación Intuitiva**: Menú dropdown y enlaces directos
- **Validación en Tiempo Real**: Mensajes de error claros
- **Accesibilidad**: Contraste adecuado en ambos temas

## 🌙 Sistema de Temas

El proyecto incluye un sistema completo de cambio de tema oscuro/claro:

### Características del Sistema de Temas:
- **Cambio Dinámico**: Botón en la navbar para alternar entre temas
- **Persistencia**: El tema seleccionado se guarda en localStorage
- **Detección Automática**: Respeta la preferencia del sistema operativo
- **Transiciones Suaves**: Animaciones CSS para cambios de tema
- **Cobertura Completa**: Todos los elementos se adaptan al tema

### Elementos que Cambian:
- **Fondo**: Gradientes adaptados para cada tema
- **Tarjetas**: Colores de fondo y sombras
- **Texto**: Colores optimizados para contraste
- **Formularios**: Campos de entrada y botones
- **Tablas**: Bordes y colores de fondo
- **Modales**: Ventanas emergentes
- **Dropdowns**: Menús desplegables

### Uso:
1. Hacer clic en el botón de tema (🌞/🌙) en la navbar
2. El tema se aplica inmediatamente
3. La preferencia se guarda automáticamente
4. Se mantiene entre sesiones

## 📝 Notas de Implementación

- **Programación Funcional**: Todas las funciones son puras y no tienen efectos secundarios

## 🧪 Pruebas Unitarias

El proyecto incluye pruebas unitarias completas para todas las funciones implementadas.

### Ejecutar todas las pruebas:
```bash
composer test
```

### Ejecutar pruebas con cobertura:
```bash
composer test:coverage
```

### Ejecutar pruebas específicas:
```bash
# Pruebas de Parte 1
./vendor/bin/phpunit tests/Parte1/

# Pruebas de Parte 2
./vendor/bin/phpunit tests/Parte2/

# Pruebas específicas
./vendor/bin/phpunit tests/Parte1/FibonacciTest.php
./vendor/bin/phpunit tests/Parte2/FizzBuzzTest.php
```

### Cobertura de pruebas:
- **Parte 1**: 100% de cobertura para Fibonacci, números primos y palíndromos
- **Parte 2**: 100% de cobertura para suma de pares, llamadas internacionales y FizzBuzz
- **Casos edge**: Incluye pruebas para valores límite, negativos y casos especiales
- **Validación**: Pruebas exhaustivas de todas las funciones de validación

### Estructura de pruebas:
```
tests/
├── Parte1/
│   ├── FibonacciTest.php      # Pruebas para serie Fibonacci
│   ├── PrimosTest.php         # Pruebas para números primos
│   └── PalindromosTest.php    # Pruebas para palíndromos
└── Parte2/
    ├── SumaParesTest.php      # Pruebas para suma de números pares
    ├── LlamadasInternacionalesTest.php # Pruebas para llamadas internacionales
    └── FizzBuzzTest.php       # Pruebas para FizzBuzz
```
- **Tipos Estrictos**: Uso de `declare(strict_types=1)` para mayor seguridad
- **Documentación**: Comentarios PHPDoc completos en todas las funciones
- **Manejo de Errores**: Validación robusta de entradas de usuario
- **Performance**: Algoritmos optimizados para cada ejercicio


## 🚀 Despliegue

### Netlify
El proyecto está desplegado en Netlify para demostración en vivo:
- **URL**: https://php-fsj28-kodigo.netlify.app
- **Configuración**: Despliegue automático desde GitHub
- **Características**: CDN global, SSL automático, optimizaciones de rendimiento

### Despliegue Local
Para desplegar localmente, sigue las instrucciones de instalación en la sección "Instalación y Uso".

---

**Desarrollado por Franklin Rony Cortez Barrera para bootcamp de kodigo FSJ28** 