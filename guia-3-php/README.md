# Ejercicios de Algoritmos en PHP

## 📋 Descripción

Este proyecto implementa ejercicios específicos de algoritmos en PHP utilizando las mejores prácticas de desarrollo:

- **Composer** para gestión de dependencias
- **Routing** personalizado
- **Programación funcional** con funciones puras y expresiones lambda
- **Autoloading PSR-4** para carga automática de clases
- **Twig** con **Bootstrap 5** para la interfaz de usuario
- **Clean Code** con comentarios en español

## 🚀 Características

### Ejercicios Implementados
- **Height Checker** - Contar estudiantes en posiciones incorrectas
- **Insertion Sort** - Insertar un elemento en su posición correcta
- **Binary Search** - Buscar un elemento en un array ordenado
- **Happy Number** - Determinar si un número es feliz
- Más ejercicios próximamente...

### Tecnologías Utilizadas
- **Composer** para gestión de dependencias
- **Routing** personalizado
- **Programación funcional** con funciones puras
- **Autoloading PSR-4** para carga automática de clases
- **Twig** con **Bootstrap 5** para la interfaz de usuario
- **Clean Code** con comentarios en español

## 📁 Estructura del Proyecto

```
guia-3-php/
├── public/
│   └── index.php              # Punto de entrada principal
├── src/
│   ├── Config/
│   │   └── AppConfig.php              # Configuración del proyecto
│   ├── Core/
│   │   ├── Router.php                 # Sistema de routing
│   │   └── TwigRenderer.php           # Renderizador de plantillas
│   ├── Controllers/
│   │   └── EjerciciosController.php   # Controlador principal
│   ├── Ejercicios/
│   │   ├── HeightChecker.php          # Ejercicio Height Checker
│   │   ├── InsertionSort.php          # Ejercicio Insertion Sort
│   │   ├── BinarySearch.php           # Ejercicio Binary Search
│   │   └── HappyNumber.php            # Ejercicio Happy Number
│   ├── Examples/
│   │   ├── HeightCheckerExample.php   # Ejemplo de uso
│   │   ├── InsertionSortExample.php   # Ejemplo de uso
│   │   ├── BinarySearchExample.php    # Ejemplo de uso
│   │   └── HappyNumberExample.php     # Ejemplo de uso
│   └── Helpers/
│       └── AppHelper.php              # Funciones auxiliares
├── templates/
│   ├── layout.twig                    # Layout base
│   └── ejercicios/
│       ├── index.twig                 # Página principal de ejercicios
│       ├── height-checker.twig        # Página del ejercicio Height Checker
│       ├── resultado-height-checker.twig  # Resultados del ejercicio
│       ├── insertion-sort.twig        # Página del ejercicio Insertion Sort
│       ├── resultado-insertion-sort.twig  # Resultados del ejercicio
│       ├── binary-search.twig         # Página del ejercicio Binary Search
│       ├── resultado-binary-search.twig   # Resultados del ejercicio
│       ├── happy-number.twig          # Página del ejercicio Happy Number
│       ├── resultado-happy-number.twig    # Resultados del ejercicio
│       ├── ejemplos-height-checker.twig   # Ejemplos del ejercicio
│       ├── ejemplos-insertion-sort.twig   # Ejemplos del ejercicio
│       ├── ejemplos-binary-search.twig    # Ejemplos del ejercicio
│       └── ejemplos-happy-number.twig     # Ejemplos del ejercicio
├── cache/                     # Cache de Twig (se crea automáticamente)
├── vendor/                    # Dependencias de Composer
├── composer.json              # Configuración de Composer
└── README.md                  # Este archivo
```

## 🛠️ Instalación y Uso

### Requisitos
- PHP 7.4 o superior
- Composer
- Servidor web (Apache, Nginx, o servidor de desarrollo de PHP)

### Instalación Rápida

**Opción 1: Usando el Script Automático (Recomendado)**

0. **Instalar dependencias**
   ```bash
   composer install
   ```
1. **Ejecutar el script de inicio:**
   ```cmd
   start-server.bat
   ```

2. **Abrir el navegador en:**
   ```
   http://localhost:8000
   ```

3. **Probar el ejercicio Height Checker:**
   ```
   http://localhost:8000/ejercicios/height-checker
   ```

### Instalación Manual

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd guia-3-php
   ```

2. **Instalar dependencias**
   ```bash
   composer install
   ```

3. **Configurar el servidor web**
   
   **Opción A: Servidor de desarrollo de PHP**
   ```bash
   cd public
   php -S localhost:8000
   ```
   
   **Opción B: Apache/Nginx**
   - Configurar el DocumentRoot apuntando a la carpeta `public/`
   - Asegurarse de que el módulo rewrite esté habilitado

4. **Acceder a la aplicación**
   - Abrir el navegador en `http://localhost:8000`

## 🎯 Uso

### Página Principal
- Dashboard con información general de los ejercicios
- Enlaces a los ejercicios disponibles

### Ejercicio Height Checker
1. Seleccionar el ejercicio Height Checker
2. Ingresar un array de alturas o usar ejemplos predefinidos
3. Ejecutar y ver la solución paso a paso
4. Observar la comparación entre array original y esperado

### Ejercicio Insertion Sort
1. Seleccionar el ejercicio Insertion Sort
2. Ingresar un array con el último elemento desordenado
3. Ejecutar y ver el proceso de inserción paso a paso
4. Observar cómo se desplazan los elementos y se inserta el valor

### Ejercicio Binary Search
1. Seleccionar el ejercicio Binary Search
2. Ingresar un array ordenado (1-104 elementos) y un elemento a buscar (-104 a 104, exclusivo)
3. Ejecutar y ver el proceso de búsqueda binaria paso a paso
4. Observar cómo se divide el espacio de búsqueda en cada iteración

### Ejercicio Happy Number
1. Seleccionar el ejercicio Happy Number
2. Ingresar un número entero positivo (1 a 231 - 1)
3. Ejecutar y ver el proceso de suma de cuadrados paso a paso
4. Observar si el número termina en 1 (feliz) o en un ciclo infinito

### Próximos Ejercicios
- Se agregarán más ejercicios de algoritmos
- Cada ejercicio tendrá su propia página con ejemplos
- Soluciones detalladas con pasos explicativos

### Uso Programático

**Ejemplo Básico:**
```php
use App\Ejercicios\HeightChecker;

// Resolver ejercicio Height Checker
$heights = [5, 1, 2, 3, 4];
$resultado = HeightChecker::resolver($heights);

// Ver resultado
echo "Estudiantes en posiciones incorrectas: " . $resultado['resultado'];
```

**Ejecutar ejemplos por consola:**
```bash
php src/Examples/HeightCheckerExample.php
php src/Examples/InsertionSortExample.php
php src/Examples/BinarySearchExample.php
```

**Funciones auxiliares:**
```php
use App\Helpers\AppHelper;

// Generar array aleatorio
$array = AppHelper::generateRandomArray(10, 1, 100);

// Parsear string de array
$heights = AppHelper::parseArrayString("5,1,2,3,4");

// Formatear tiempo de ejecución
$tiempo = AppHelper::formatExecutionTime(1234567); // "1.23 ms"
```

## 🔧 Configuración

### Composer
El archivo `composer.json` incluye:
- Autoloading PSR-4 para el namespace `App\`
- Dependencia de Twig para plantillas
- Configuración de PHP 7.4+

### Características Implementadas

#### ✅ Composer
- Gestión de dependencias
- Autoloading PSR-4
- Configuración de proyecto

#### ✅ Routing
- Sistema de routing personalizado
- Soporte para GET y POST
- Manejo de errores 404

#### ✅ Programación Funcional
- Funciones puras
- Expresiones lambda
- Inmutabilidad de datos
- Funciones de orden superior

#### ✅ Autoloading PSR-4
- Namespace `App\`
- Carga automática de clases
- Estructura organizada

#### ✅ Twig con Bootstrap
- Plantillas heredables
- Diseño responsive
- Componentes interactivos
- Iconos Bootstrap

#### ✅ Clean Code
- Nombres descriptivos en español
- Comentarios PHPDoc completos
- Separación de responsabilidades
- Código autodocumentado

### Routing
El sistema de routing está implementado en `src/Core/Router.php` y maneja:
- Rutas GET y POST
- Mapeo de URLs a controladores
- Manejo de errores 404

### Twig
Configurado en `src/Core/TwigRenderer.php` con:
- Cache automático en la carpeta `cache/twig/`
- Modo debug habilitado
- Auto-reload para desarrollo

## 📚 Programación Funcional

El proyecto implementa conceptos de programación funcional:

### Funciones Puras
```php
// Ejemplo de función pura
$comparar = function($a, $b) {
    if ($a < $b) return -1;
    if ($a > $b) return 1;
    return 0;
};
```

### Expresiones Lambda
```php
// Uso de funciones anónimas
$intercambiar = function(array $arr, int $i, int $j) use (&$pasos) {
    $pasos[] = "Intercambiando {$arr[$i]} y {$arr[$j]}";
    $temp = $arr[$i];
    $arr[$i] = $arr[$j];
    $arr[$j] = $temp;
    return $arr;
};
```

### Inmutabilidad
Los algoritmos trabajan con copias de arrays para mantener la inmutabilidad de los datos originales.

## 🎨 Interfaz de Usuario

### Bootstrap 5
- Diseño responsive y moderno
- Componentes interactivos
- Iconos de Bootstrap Icons
- Paleta de colores consistente

### Twig Templates
- Herencia de plantillas
- Bloques reutilizables
- Filtros y funciones personalizadas
- Separación clara de lógica y presentación

## 🔍 Ejercicios Implementados

### Height Checker

#### Descripción
Dado un array de alturas de estudiantes, contar cuántos estudiantes están en posiciones incorrectas después de ordenar por altura.

#### Ejemplo
```
Input: heights = [5,1,2,3,4]
Output: 5

Explanation:
heights:  [5,1,2,3,4]
expected: [1,2,3,4,5]
All indices do not match.
```

#### Restricciones
- `1 <= heights.length <= 100`
- `1 <= heights[i] <= 100`

#### Complejidad
- **Tiempo:** O(n log n) - debido al ordenamiento
- **Espacio:** O(n) - para almacenar el array ordenado

#### Características
- Validación de restricciones
- Visualización paso a paso
- Comparación de arrays
- Ejemplos predefinidos
- Interfaz web interactiva

### Insertion Sort

#### Descripción
Dado un array ordenado con un elemento desordenado al final, inserta ese elemento en su posición correcta manteniendo el orden.

#### Ejemplo
```
Input: arr = [1,2,4,5,3]
Output: [1,2,3,4,5]

Explanation:
3 is removed from the end of the array.
In the 1st line 5 > 3, so 5 is shifted one cell to the right.
In the 2nd line 4 > 3, so 4 is shifted one cell to the right.
In the 3rd line 2 < 3, so 3 is placed at position 2.
```

#### Restricciones
- `1 <= n <= 1000`
- `-10000 <= arr[i] <= 10000`

#### Complejidad
- **Tiempo:** O(n) - en el peor caso
- **Espacio:** O(1) - solo variables auxiliares

#### Características
- Validación de restricciones
- Visualización paso a paso del desplazamiento
- Comparación de arrays antes y después
- Ejemplos predefinidos
- Interfaz web interactiva

### Binary Search

#### Descripción
Dado un array de enteros ordenado en orden ascendente y un entero target, escribe una función para buscar target en el array. Si target existe, retorna su índice. De lo contrario, retorna -1.

#### Ejemplo
```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4

Explanation: 9 exists in nums and its index is 4
```

#### Restricciones
- `1 <= nums.length <= 104`
- `-104 < nums[i], target < 104`
- Todos los elementos son únicos
- nums está ordenado en orden ascendente

#### Complejidad
- **Tiempo:** O(log n) - divide el espacio de búsqueda por la mitad en cada iteración
- **Espacio:** O(1) - solo variables auxiliares

#### Características
- Validación de restricciones
- Visualización paso a paso de la búsqueda binaria
- Conteo de iteraciones
- Ejemplos predefinidos
- Interfaz web interactiva

### Happy Number

#### Descripción
Escribir un algoritmo para determinar si un número `n` es feliz. Un número feliz se define por el siguiente proceso:

1. Comenzando con cualquier entero positivo, reemplaza el número por la suma de los cuadrados de sus dígitos
2. Repite el proceso hasta que el número sea igual a 1 (donde permanecerá), o se repita infinitamente en un ciclo que no incluya 1
3. Aquellos números para los que este proceso termina en 1 son felices

#### Ejemplo
```
Input: n = 19
Output: true

Explanation:
1² + 9² = 1 + 81 = 82
8² + 2² = 64 + 4 = 68
6² + 8² = 36 + 64 = 100
1² + 0² + 0² = 1 + 0 + 0 = 1
```

#### Restricciones
- `1 <= n <= 231 - 1 (230)`
- El proceso debe terminar en 1 o en un ciclo infinito
- Un número es feliz si el proceso termina en 1

#### Complejidad
- **Tiempo:** O(log n) - en el peor caso, el número de dígitos se reduce en cada iteración
- **Espacio:** O(log n) - para almacenar los números vistos y detectar ciclos

#### Características
- Validación de restricciones
- Visualización paso a paso del proceso de suma de cuadrados
- Detección de ciclos infinitos
- Ejemplos predefinidos
- Interfaz web interactiva con emojis

## 🧪 Pruebas

Para probar los ejercicios:

1. **Ejecutar ejemplos por consola:**
```bash
php src/Examples/HeightCheckerExample.php
php src/Examples/InsertionSortExample.php
php src/Examples/BinarySearchExample.php
php src/Examples/HappyNumberExample.php
```

2. **Usar la interfaz web:**
   - Ejecutar `start-server.bat`
   - Ir a `http://localhost:8000`
   - Seleccionar el ejercicio deseado

3. **Proporcionar datos personalizados** o usar ejemplos predefinidos
4. **Observar la solución paso a paso** con visualizaciones

## 📝 Clean Code

### Principios Aplicados
- **Nombres descriptivos** en español
- **Funciones pequeñas** y con una sola responsabilidad
- **Comentarios explicativos** para algoritmos complejos
- **Separación de responsabilidades** (MVC)
- **Código autodocumentado**

### Convenciones
- **PSR-4** para autoloading
- **PSR-12** para estilo de código
- **Comentarios PHPDoc** completos
- **Namespaces** organizados por funcionalidad

## 🚀 Despliegue

### Producción
1. Configurar el servidor web para apuntar a `public/`
2. Habilitar el módulo rewrite
3. Configurar variables de entorno si es necesario
4. Optimizar el cache de Twig

### Desarrollo
1. Usar el servidor de desarrollo de PHP
2. Mantener el modo debug activo
3. Auto-reload habilitado para Twig

## 🤝 Contribuciones

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Kodigo Bootcamp** - Proyecto educativo para el aprendizaje de ejercicios de algoritmos en PHP.

---

**Nota:** Este proyecto es educativo y está diseñado para demostrar las mejores prácticas de desarrollo en PHP, incluyendo programación funcional, clean code y arquitectura moderna. Se enfoca en ejercicios específicos de algoritmos con soluciones paso a paso. 