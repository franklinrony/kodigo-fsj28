<?php

namespace Tests\Parte2;

use PHPUnit\Framework\TestCase;

/**
 * Pruebas unitarias para las funciones de FizzBuzz
 */
class FizzBuzzTest extends TestCase
{
    /**
     * Prueba que analizarFizzBuzz devuelve estructura correcta para n = 0
     */
    public function testAnalizarFizzBuzzConNumeroCero(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(0);
        $this->assertIsArray($resultado);
        $this->assertArrayHasKey('n', $resultado);
        $this->assertArrayHasKey('secuencia', $resultado);
        $this->assertArrayHasKey('estadisticas', $resultado);
        $this->assertEquals(0, $resultado['n']);
        $this->assertEmpty($resultado['secuencia']);
        $this->assertEquals(0, $resultado['estadisticas']['total']);
        $this->assertEquals(0, $resultado['estadisticas']['fizz']);
        $this->assertEquals(0, $resultado['estadisticas']['buzz']);
        $this->assertEquals(0, $resultado['estadisticas']['fizzbuzz']);
        $this->assertEquals(0, $resultado['estadisticas']['numeros']);
    }

    /**
     * Prueba que analizarFizzBuzz devuelve estructura correcta para n negativo
     */
    public function testAnalizarFizzBuzzConNumeroNegativo(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(-5);
        $this->assertIsArray($resultado);
        $this->assertArrayHasKey('n', $resultado);
        $this->assertArrayHasKey('secuencia', $resultado);
        $this->assertArrayHasKey('estadisticas', $resultado);
        $this->assertEquals(-5, $resultado['n']);
        $this->assertEmpty($resultado['secuencia']);
        $this->assertEquals(0, $resultado['estadisticas']['total']);
        $this->assertEquals(0, $resultado['estadisticas']['fizz']);
        $this->assertEquals(0, $resultado['estadisticas']['buzz']);
        $this->assertEquals(0, $resultado['estadisticas']['fizzbuzz']);
        $this->assertEquals(0, $resultado['estadisticas']['numeros']);
    }

    /**
     * Prueba que analizarFizzBuzz devuelve ['1'] para n = 1
     */
    public function testAnalizarFizzBuzzConUno(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(1);
        $this->assertEquals(['1'], $resultado['secuencia']);
    }

    /**
     * Prueba que analizarFizzBuzz devuelve ['1', '2'] para n = 2
     */
    public function testAnalizarFizzBuzzConDos(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(2);
        $this->assertEquals(['1', '2'], $resultado['secuencia']);
    }

    /**
     * Prueba que analizarFizzBuzz devuelve ['1', '2', 'Fizz'] para n = 3
     */
    public function testAnalizarFizzBuzzConTres(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(3);
        $this->assertEquals(['1', '2', 'Fizz'], $resultado['secuencia']);
    }

    /**
     * Prueba que analizarFizzBuzz devuelve ['1', '2', 'Fizz', '4'] para n = 4
     */
    public function testAnalizarFizzBuzzConCuatro(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(4);
        $this->assertEquals(['1', '2', 'Fizz', '4'], $resultado['secuencia']);
    }

    /**
     * Prueba que analizarFizzBuzz devuelve ['1', '2', 'Fizz', '4', 'Buzz'] para n = 5
     */
    public function testAnalizarFizzBuzzConCinco(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(5);
        $this->assertEquals(['1', '2', 'Fizz', '4', 'Buzz'], $resultado['secuencia']);
    }

    /**
     * Prueba que analizarFizzBuzz devuelve la secuencia correcta para n = 15
     */
    public function testAnalizarFizzBuzzConQuince(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(15);
        $esperado = [
            '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz',
            '11', 'Fizz', '13', '14', 'FizzBuzz'
        ];
        $this->assertEquals($esperado, $resultado['secuencia']);
    }

    /**
     * Prueba que analizarFizzBuzz devuelve la secuencia correcta para n = 20
     */
    public function testAnalizarFizzBuzzConVeinte(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(20);
        $esperado = [
            '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz',
            '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19', 'Buzz'
        ];
        $this->assertEquals($esperado, $resultado['secuencia']);
    }

    /**
     * Prueba que analizarFizzBuzz devuelve la secuencia correcta para n = 30
     */
    public function testAnalizarFizzBuzzConTreinta(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(30);
        $secuencia = $resultado['secuencia'];
        
        // Verificar que el último elemento es FizzBuzz
        $this->assertEquals('FizzBuzz', end($secuencia));
        
        // Verificar que hay 30 elementos
        $this->assertCount(30, $secuencia);
        
        // Verificar algunos elementos específicos
        $this->assertEquals('Fizz', $secuencia[2]); // índice 2 = número 3
        $this->assertEquals('Buzz', $secuencia[4]); // índice 4 = número 5
        $this->assertEquals('FizzBuzz', $secuencia[14]); // índice 14 = número 15
        $this->assertEquals('FizzBuzz', $secuencia[29]); // índice 29 = número 30
    }

    /**
     * Prueba que todos los números divisibles por 3 (pero no por 5) son 'Fizz'
     */
    public function testNumerosDivisiblesPorTresSonFizz(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(30);
        $secuencia = $resultado['secuencia'];
        
        for ($i = 1; $i <= 30; $i++) {
            if ($i % 3 == 0 && $i % 5 != 0) {
                $this->assertEquals('Fizz', $secuencia[$i - 1], 
                    "El número {$i} debe ser 'Fizz'");
            }
        }
    }

    /**
     * Prueba que todos los números divisibles por 5 (pero no por 3) son 'Buzz'
     */
    public function testNumerosDivisiblesPorCincoSonBuzz(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(30);
        $secuencia = $resultado['secuencia'];
        
        for ($i = 1; $i <= 30; $i++) {
            if ($i % 5 == 0 && $i % 3 != 0) {
                $this->assertEquals('Buzz', $secuencia[$i - 1], 
                    "El número {$i} debe ser 'Buzz'");
            }
        }
    }

    /**
     * Prueba que todos los números divisibles por 3 y 5 son 'FizzBuzz'
     */
    public function testNumerosDivisiblesPorTresYCincoSonFizzBuzz(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(30);
        $secuencia = $resultado['secuencia'];
        
        for ($i = 1; $i <= 30; $i++) {
            if ($i % 3 == 0 && $i % 5 == 0) {
                $this->assertEquals('FizzBuzz', $secuencia[$i - 1], 
                    "El número {$i} debe ser 'FizzBuzz'");
            }
        }
    }

    /**
     * Prueba que todos los números no divisibles por 3 ni 5 son el número mismo
     */
    public function testNumerosNoDivisiblesSonElNumero(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(30);
        $secuencia = $resultado['secuencia'];
        
        for ($i = 1; $i <= 30; $i++) {
            if ($i % 3 != 0 && $i % 5 != 0) {
                $this->assertEquals((string)$i, $secuencia[$i - 1], 
                    "El número {$i} debe ser '{$i}'");
            }
        }
    }

    /**
     * Prueba que esRangoFizzBuzzValido funciona correctamente
     */
    public function testEsRangoFizzBuzzValido(): void
    {
        $this->assertTrue(\App\Parte2\esRangoFizzBuzzValido(1));
        $this->assertTrue(\App\Parte2\esRangoFizzBuzzValido(10));
        $this->assertTrue(\App\Parte2\esRangoFizzBuzzValido(100));
        $this->assertTrue(\App\Parte2\esRangoFizzBuzzValido(1000));
        $this->assertTrue(\App\Parte2\esRangoFizzBuzzValido(10000));
        
        $this->assertFalse(\App\Parte2\esRangoFizzBuzzValido(0));
        $this->assertFalse(\App\Parte2\esRangoFizzBuzzValido(-1));
        $this->assertFalse(\App\Parte2\esRangoFizzBuzzValido(-10));
        $this->assertFalse(\App\Parte2\esRangoFizzBuzzValido(-100));
        $this->assertFalse(\App\Parte2\esRangoFizzBuzzValido(10001));
        $this->assertFalse(\App\Parte2\esRangoFizzBuzzValido(20000));
    }

    /**
     * Prueba que la secuencia tiene la longitud correcta
     */
    public function testLongitudSecuenciaCorrecta(): void
    {
        for ($n = 1; $n <= 20; $n++) {
            $resultado = \App\Parte2\analizarFizzBuzz($n);
            $this->assertCount($n, $resultado['secuencia'], 
                "La secuencia para n={$n} debe tener {$n} elementos");
        }
    }

    /**
     * Prueba que no hay elementos vacíos en la secuencia
     */
    public function testNoHayElementosVacios(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(30);
        $secuencia = $resultado['secuencia'];
        
        foreach ($secuencia as $elemento) {
            $this->assertNotEmpty($elemento, 
                "No debe haber elementos vacíos en la secuencia");
        }
    }

    /**
     * Prueba que todos los elementos son strings
     */
    public function testTodosLosElementosSonStrings(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(30);
        $secuencia = $resultado['secuencia'];
        
        foreach ($secuencia as $elemento) {
            $this->assertIsString($elemento, 
                "Todos los elementos deben ser strings");
        }
    }

    /**
     * Prueba casos específicos de FizzBuzz
     */
    public function testCasosEspecificosFizzBuzz(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(15);
        $secuencia = $resultado['secuencia'];
        
        // Casos específicos conocidos
        $casosEspecificos = [
            1 => '1',
            3 => 'Fizz',
            5 => 'Buzz',
            6 => 'Fizz',
            9 => 'Fizz',
            10 => 'Buzz',
            12 => 'Fizz',
            15 => 'FizzBuzz'
        ];
        
        foreach ($casosEspecificos as $numero => $esperado) {
            $this->assertEquals($esperado, $secuencia[$numero - 1], 
                "El número {$numero} debe ser '{$esperado}'");
        }
    }

    /**
     * Prueba que la secuencia es consistente
     */
    public function testSecuenciaConsistente(): void
    {
        // Verificar que dos llamadas consecutivas devuelven el mismo resultado
        $resultado1 = \App\Parte2\analizarFizzBuzz(20);
        $resultado2 = \App\Parte2\analizarFizzBuzz(20);
        
        $this->assertEquals($resultado1['secuencia'], $resultado2['secuencia'], 
            "Dos llamadas consecutivas deben devolver el mismo resultado");
    }

    /**
     * Prueba que la secuencia sigue las reglas de FizzBuzz
     */
    public function testReglasFizzBuzz(): void
    {
        $resultado = \App\Parte2\analizarFizzBuzz(100);
        $secuencia = $resultado['secuencia'];
        
        for ($i = 1; $i <= 100; $i++) {
            $elemento = $secuencia[$i - 1];
            
            if ($i % 3 == 0 && $i % 5 == 0) {
                $this->assertEquals('FizzBuzz', $elemento, 
                    "El número {$i} debe ser 'FizzBuzz'");
            } elseif ($i % 3 == 0) {
                $this->assertEquals('Fizz', $elemento, 
                    "El número {$i} debe ser 'Fizz'");
            } elseif ($i % 5 == 0) {
                $this->assertEquals('Buzz', $elemento, 
                    "El número {$i} debe ser 'Buzz'");
            } else {
                $this->assertEquals((string)$i, $elemento, 
                    "El número {$i} debe ser '{$i}'");
            }
        }
    }
} 