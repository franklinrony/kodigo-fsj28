<?php

namespace Tests\Parte1;

use PHPUnit\Framework\TestCase;

/**
 * Pruebas unitarias para las funciones de Fibonacci
 */
class FibonacciTest extends TestCase
{
    /**
     * Prueba que generarFibonacci devuelve array vacío para n <= 0
     */
    public function testGenerarFibonacciConNumeroCero(): void
    {
        $resultado = \App\Parte1\generarFibonacci(0);
        $this->assertIsArray($resultado);
        $this->assertEmpty($resultado);
    }

    /**
     * Prueba que generarFibonacci devuelve array vacío para n negativo
     */
    public function testGenerarFibonacciConNumeroNegativo(): void
    {
        $resultado = \App\Parte1\generarFibonacci(-5);
        $this->assertIsArray($resultado);
        $this->assertEmpty($resultado);
    }

    /**
     * Prueba que generarFibonacci devuelve [0] para n = 1
     */
    public function testGenerarFibonacciConUno(): void
    {
        $resultado = \App\Parte1\generarFibonacci(1);
        $this->assertEquals([0], $resultado);
    }

    /**
     * Prueba que generarFibonacci devuelve [0, 1] para n = 2
     */
    public function testGenerarFibonacciConDos(): void
    {
        $resultado = \App\Parte1\generarFibonacci(2);
        $this->assertEquals([0, 1], $resultado);
    }

    /**
     * Prueba que generarFibonacci devuelve la secuencia correcta para n = 5
     */
    public function testGenerarFibonacciConCinco(): void
    {
        $resultado = \App\Parte1\generarFibonacci(5);
        $this->assertEquals([0, 1, 1, 2, 3], $resultado);
    }

    /**
     * Prueba que generarFibonacci devuelve la secuencia correcta para n = 8
     */
    public function testGenerarFibonacciConOcho(): void
    {
        $resultado = \App\Parte1\generarFibonacci(8);
        $this->assertEquals([0, 1, 1, 2, 3, 5, 8, 13], $resultado);
    }

    /**
     * Prueba que generarFibonacci devuelve la secuencia correcta para n = 10
     */
    public function testGenerarFibonacciConDiez(): void
    {
        $resultado = \App\Parte1\generarFibonacci(10);
        $this->assertEquals([0, 1, 1, 2, 3, 5, 8, 13, 21, 34], $resultado);
    }

    /**
     * Prueba que el último número de la secuencia es correcto
     */
    public function testUltimoNumeroFibonacci(): void
    {
        $resultado = \App\Parte1\generarFibonacci(10);
        $ultimo = end($resultado);
        $this->assertEquals(34, $ultimo);
    }

    /**
     * Prueba que la suma de la secuencia es correcta
     */
    public function testSumaFibonacci(): void
    {
        $resultado = \App\Parte1\generarFibonacci(8);
        $suma = array_sum($resultado);
        $this->assertEquals(33, $suma); // 0+1+1+2+3+5+8+13 = 33
    }

    /**
     * Prueba que la secuencia mantiene la propiedad de Fibonacci
     */
    public function testPropiedadFibonacci(): void
    {
        $resultado = \App\Parte1\generarFibonacci(10);
        
        for ($i = 2; $i < count($resultado); $i++) {
            $suma = $resultado[$i - 1] + $resultado[$i - 2];
            $this->assertEquals($resultado[$i], $suma, 
                "F_{$i} debe ser igual a F_" . ($i-1) . " + F_" . ($i-2));
        }
    }

    /**
     * Prueba que formatearArray funciona correctamente
     */
    public function testFormatearArray(): void
    {
        $array = [1, 2, 3, 4, 5];
        $resultado = \App\Parte1\formatearArray($array);
        $this->assertEquals('1, 2, 3, 4, 5', $resultado);
    }

    /**
     * Prueba que formatearArray funciona con separador personalizado
     */
    public function testFormatearArrayConSeparadorPersonalizado(): void
    {
        $array = [1, 2, 3, 4, 5];
        $resultado = \App\Parte1\formatearArray($array, ' | ');
        $this->assertEquals('1 | 2 | 3 | 4 | 5', $resultado);
    }

    /**
     * Prueba que esPositivo funciona correctamente
     */
    public function testEsPositivo(): void
    {
        $this->assertTrue(\App\Parte1\esPositivo(1));
        $this->assertTrue(\App\Parte1\esPositivo(100));
        $this->assertFalse(\App\Parte1\esPositivo(0));
        $this->assertFalse(\App\Parte1\esPositivo(-5));
    }
} 