<?php

namespace Tests\Parte2;

use PHPUnit\Framework\TestCase;

/**
 * Pruebas unitarias para las funciones de suma de números pares
 */
class SumaParesTest extends TestCase
{
    /**
     * Prueba que sumarNumerosPares devuelve 0 para array vacío
     */
    public function testSumarNumerosParesConArrayVacio(): void
    {
        $resultado = \App\Parte2\sumarNumerosPares([]);
        $this->assertEquals(0, $resultado);
    }

    /**
     * Prueba que sumarNumerosPares devuelve 0 cuando no hay números pares
     */
    public function testSumarNumerosParesSinPares(): void
    {
        $numeros = [1, 3, 5, 7, 9, 11];
        $resultado = \App\Parte2\sumarNumerosPares($numeros);
        $this->assertEquals(0, $resultado);
    }

    /**
     * Prueba que sumarNumerosPares suma correctamente los números pares
     */
    public function testSumarNumerosParesConPares(): void
    {
        $numeros = [1, 2, 3, 4, 5, 6];
        $resultado = \App\Parte2\sumarNumerosPares($numeros);
        $this->assertEquals(12, $resultado); // 2 + 4 + 6 = 12
    }

    /**
     * Prueba que sumarNumerosPares funciona con solo números pares
     */
    public function testSumarNumerosParesSoloPares(): void
    {
        $numeros = [2, 4, 6, 8, 10];
        $resultado = \App\Parte2\sumarNumerosPares($numeros);
        $this->assertEquals(30, $resultado); // 2 + 4 + 6 + 8 + 10 = 30
    }

    /**
     * Prueba que sumarNumerosPares funciona con números grandes
     */
    public function testSumarNumerosParesConNumerosGrandes(): void
    {
        $numeros = [10, 15, 20, 25, 30, 35, 40];
        $resultado = \App\Parte2\sumarNumerosPares($numeros);
        $this->assertEquals(100, $resultado); // 10 + 20 + 30 + 40 = 100
    }

    /**
     * Prueba que obtenerNumerosPares devuelve array vacío para array vacío
     */
    public function testObtenerNumerosParesConArrayVacio(): void
    {
        $resultado = \App\Parte2\obtenerNumerosPares([]);
        $this->assertIsArray($resultado);
        $this->assertEmpty($resultado);
    }

    /**
     * Prueba que obtenerNumerosPares filtra correctamente los números pares
     */
    public function testObtenerNumerosPares(): void
    {
        $numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $resultado = \App\Parte2\obtenerNumerosPares($numeros);
        $esperado = [2, 4, 6, 8, 10];
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que obtenerNumerosPares devuelve array vacío cuando no hay pares
     */
    public function testObtenerNumerosParesSinPares(): void
    {
        $numeros = [1, 3, 5, 7, 9];
        $resultado = \App\Parte2\obtenerNumerosPares($numeros);
        $this->assertIsArray($resultado);
        $this->assertEmpty($resultado);
    }

    /**
     * Prueba que obtenerNumerosImpares devuelve array vacío para array vacío
     */
    public function testObtenerNumerosImparesConArrayVacio(): void
    {
        $resultado = \App\Parte2\obtenerNumerosImpares([]);
        $this->assertIsArray($resultado);
        $this->assertEmpty($resultado);
    }

    /**
     * Prueba que obtenerNumerosImpares filtra correctamente los números impares
     */
    public function testObtenerNumerosImpares(): void
    {
        $numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $resultado = \App\Parte2\obtenerNumerosImpares($numeros);
        $esperado = [1, 3, 5, 7, 9];
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que obtenerNumerosImpares devuelve array vacío cuando no hay impares
     */
    public function testObtenerNumerosImparesSinImpares(): void
    {
        $numeros = [2, 4, 6, 8, 10];
        $resultado = \App\Parte2\obtenerNumerosImpares($numeros);
        $this->assertIsArray($resultado);
        $this->assertEmpty($resultado);
    }

    /**
     * Prueba que obtenerEstadisticas devuelve estadísticas correctas para array vacío
     */
    public function testObtenerEstadisticasConArrayVacio(): void
    {
        $resultado = \App\Parte2\obtenerEstadisticas([]);
        $esperado = [
            'total' => 0,
            'pares' => 0,
            'impares' => 0,
            'suma_pares' => 0,
            'suma_impares' => 0,
            'promedio' => 0
        ];
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que obtenerEstadisticas calcula correctamente las estadísticas
     */
    public function testObtenerEstadisticas(): void
    {
        $numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $resultado = \App\Parte2\obtenerEstadisticas($numeros);
        
        $this->assertEquals(10, $resultado['total']);
        $this->assertEquals(5, $resultado['pares']);
        $this->assertEquals(5, $resultado['impares']);
        $this->assertEquals(30, $resultado['suma_pares']); // 2+4+6+8+10 = 30
        $this->assertEquals(25, $resultado['suma_impares']); // 1+3+5+7+9 = 25
        $this->assertEquals(5.5, $resultado['promedio']); // (1+2+3+4+5+6+7+8+9+10)/10 = 5.5
    }

    /**
     * Prueba que obtenerEstadisticas funciona con solo números pares
     */
    public function testObtenerEstadisticasSoloPares(): void
    {
        $numeros = [2, 4, 6, 8, 10];
        $resultado = \App\Parte2\obtenerEstadisticas($numeros);
        
        $this->assertEquals(5, $resultado['total']);
        $this->assertEquals(5, $resultado['pares']);
        $this->assertEquals(0, $resultado['impares']);
        $this->assertEquals(30, $resultado['suma_pares']);
        $this->assertEquals(0, $resultado['suma_impares']);
        $this->assertEquals(6.0, $resultado['promedio']);
    }

    /**
     * Prueba que obtenerEstadisticas funciona con solo números impares
     */
    public function testObtenerEstadisticasSoloImpares(): void
    {
        $numeros = [1, 3, 5, 7, 9];
        $resultado = \App\Parte2\obtenerEstadisticas($numeros);
        
        $this->assertEquals(5, $resultado['total']);
        $this->assertEquals(0, $resultado['pares']);
        $this->assertEquals(5, $resultado['impares']);
        $this->assertEquals(0, $resultado['suma_pares']);
        $this->assertEquals(25, $resultado['suma_impares']);
        $this->assertEquals(5.0, $resultado['promedio']);
    }

    /**
     * Prueba que parsearNumerosString funciona correctamente
     */
    public function testParsearNumerosString(): void
    {
        $string = '1,2,3,4,5';
        $resultado = \App\Parte2\parsearNumerosString($string);
        $esperado = [1, 2, 3, 4, 5];
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que parsearNumerosString ignora espacios
     */
    public function testParsearNumerosStringConEspacios(): void
    {
        $string = '1, 2, 3, 4, 5';
        $resultado = \App\Parte2\parsearNumerosString($string);
        $esperado = [1, 2, 3, 4, 5];
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que parsearNumerosString filtra valores no numéricos
     */
    public function testParsearNumerosStringConValoresNoNumericos(): void
    {
        $string = '1,abc,2,def,3,4,xyz,5';
        $resultado = \App\Parte2\parsearNumerosString($string);
        $esperado = [1, 2, 3, 4, 5];
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que parsearNumerosString devuelve array vacío para string vacío
     */
    public function testParsearNumerosStringVacio(): void
    {
        $resultado = \App\Parte2\parsearNumerosString('');
        $this->assertIsArray($resultado);
        $this->assertEmpty($resultado);
    }

    /**
     * Prueba que parsearNumerosString funciona con números negativos
     */
    public function testParsearNumerosStringConNegativos(): void
    {
        $string = '-1,2,-3,4,-5';
        $resultado = \App\Parte2\parsearNumerosString($string);
        $esperado = [-1, 2, -3, 4, -5];
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que la suma de pares e impares es igual a la suma total
     */
    public function testSumaParesEImparesIgualTotal(): void
    {
        $numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $estadisticas = \App\Parte2\obtenerEstadisticas($numeros);
        
        $sumaTotal = array_sum($numeros);
        $sumaParesEImpares = $estadisticas['suma_pares'] + $estadisticas['suma_impares'];
        
        $this->assertEquals($sumaTotal, $sumaParesEImpares);
    }

    /**
     * Prueba que el número de pares más impares es igual al total
     */
    public function testCantidadParesEImparesIgualTotal(): void
    {
        $numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $estadisticas = \App\Parte2\obtenerEstadisticas($numeros);
        
        $total = $estadisticas['pares'] + $estadisticas['impares'];
        $this->assertEquals($estadisticas['total'], $total);
    }
} 