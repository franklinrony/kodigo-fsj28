<?php

namespace Tests\Parte1;

use PHPUnit\Framework\TestCase;

/**
 * Pruebas unitarias para las funciones de números primos
 */
class PrimosTest extends TestCase
{
    /**
     * Prueba que esPrimo devuelve false para números menores a 2
     */
    public function testEsPrimoConNumerosMenoresADos(): void
    {
        $this->assertFalse(\App\Parte1\esPrimo(0));
        $this->assertFalse(\App\Parte1\esPrimo(1));
        $this->assertFalse(\App\Parte1\esPrimo(-5));
    }

    /**
     * Prueba que esPrimo devuelve true para el número 2
     */
    public function testEsPrimoConDos(): void
    {
        $this->assertTrue(\App\Parte1\esPrimo(2));
    }

    /**
     * Prueba que esPrimo devuelve false para números pares mayores a 2
     */
    public function testEsPrimoConNumerosPares(): void
    {
        $this->assertFalse(\App\Parte1\esPrimo(4));
        $this->assertFalse(\App\Parte1\esPrimo(6));
        $this->assertFalse(\App\Parte1\esPrimo(8));
        $this->assertFalse(\App\Parte1\esPrimo(10));
        $this->assertFalse(\App\Parte1\esPrimo(100));
    }

    /**
     * Prueba que esPrimo devuelve true para números primos conocidos
     */
    public function testEsPrimoConNumerosPrimos(): void
    {
        $primos = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
        
        foreach ($primos as $primo) {
            $this->assertTrue(\App\Parte1\esPrimo($primo), "El número {$primo} debe ser primo");
        }
    }

    /**
     * Prueba que esPrimo devuelve false para números compuestos
     */
    public function testEsPrimoConNumerosCompuestos(): void
    {
        $compuestos = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25];
        
        foreach ($compuestos as $compuesto) {
            $this->assertFalse(\App\Parte1\esPrimo($compuesto), "El número {$compuesto} no debe ser primo");
        }
    }

    /**
     * Prueba que esPrimo funciona con números grandes
     */
    public function testEsPrimoConNumerosGrandes(): void
    {
        $this->assertTrue(\App\Parte1\esPrimo(97));
        $this->assertTrue(\App\Parte1\esPrimo(101));
        $this->assertFalse(\App\Parte1\esPrimo(100));
        $this->assertFalse(\App\Parte1\esPrimo(99));
    }

    /**
     * Prueba que encontrarPrimosHasta devuelve array vacío para límite < 2
     */
    public function testEncontrarPrimosHastaConLimiteMenorADos(): void
    {
        $resultado = \App\Parte1\encontrarPrimosHasta(1);
        $this->assertIsArray($resultado);
        $this->assertEmpty($resultado);
    }

    /**
     * Prueba que encontrarPrimosHasta devuelve los primos correctos hasta 10
     */
    public function testEncontrarPrimosHastaDiez(): void
    {
        $resultado = \App\Parte1\encontrarPrimosHasta(10);
        $esperado = [2, 3, 5, 7];
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que encontrarPrimosHasta devuelve los primos correctos hasta 20
     */
    public function testEncontrarPrimosHastaVeinte(): void
    {
        $resultado = \App\Parte1\encontrarPrimosHasta(20);
        $esperado = [2, 3, 5, 7, 11, 13, 17, 19];
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que encontrarPrimosHasta devuelve los primos correctos hasta 30
     */
    public function testEncontrarPrimosHastaTreinta(): void
    {
        $resultado = \App\Parte1\encontrarPrimosHasta(30);
        $esperado = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que encontrarPrimosHasta devuelve la cantidad correcta de primos
     */
    public function testCantidadPrimosHasta(): void
    {
        $resultado = \App\Parte1\encontrarPrimosHasta(100);
        $this->assertCount(25, $resultado); // Hay 25 primos hasta 100
    }

    /**
     * Prueba que todos los números devueltos por encontrarPrimosHasta son realmente primos
     */
    public function testTodosLosNumerosDevueltosSonPrimos(): void
    {
        $resultado = \App\Parte1\encontrarPrimosHasta(50);
        
        foreach ($resultado as $numero) {
            $this->assertTrue(\App\Parte1\esPrimo($numero), 
                "El número {$numero} debe ser primo");
        }
    }

    /**
     * Prueba que no hay números compuestos en el resultado
     */
    public function testNoHayNumerosCompuestosEnResultado(): void
    {
        $resultado = \App\Parte1\encontrarPrimosHasta(50);
        $compuestos = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50];
        
        foreach ($compuestos as $compuesto) {
            $this->assertNotContains($compuesto, $resultado, 
                "El número {$compuesto} no debe estar en el resultado");
        }
    }

    /**
     * Prueba que el resultado está ordenado
     */
    public function testResultadoEstaOrdenado(): void
    {
        $resultado = \App\Parte1\encontrarPrimosHasta(50);
        $ordenado = $resultado;
        sort($ordenado);
        $this->assertEquals($ordenado, $resultado);
    }
} 