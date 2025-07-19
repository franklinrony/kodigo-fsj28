<?php

namespace Tests\Parte1;

use PHPUnit\Framework\TestCase;

/**
 * Pruebas unitarias para las funciones de palíndromos
 */
class PalindromosTest extends TestCase
{
    /**
     * Prueba que esPalindromo devuelve true para palíndromos simples
     */
    public function testEsPalindromoConPalindromosSimples(): void
    {
        $palindromos = ['ana', 'radar', 'oso', 'level', 'civic', 'rotor', 'deed', 'noon', 'php'];
        
        foreach ($palindromos as $palindromo) {
            $this->assertTrue(\App\Parte1\esPalindromo($palindromo), 
                "'{$palindromo}' debe ser un palíndromo");
        }
    }

    /**
     * Prueba que esPalindromo devuelve false para no palíndromos
     */
    public function testEsPalindromoConNoPalindromos(): void
    {
        $noPalindromos = ['casa', 'hola', 'mundo', 'programacion', 'test'];
        
        foreach ($noPalindromos as $noPalindromo) {
            $this->assertFalse(\App\Parte1\esPalindromo($noPalindromo), 
                "'{$noPalindromo}' no debe ser un palíndromo");
        }
    }

    /**
     * Prueba que esPalindromo ignora mayúsculas y minúsculas
     */
    public function testEsPalindromoIgnoraMayusculas(): void
    {
        $this->assertTrue(\App\Parte1\esPalindromo('Ana'));
        $this->assertTrue(\App\Parte1\esPalindromo('RADAR'));
        $this->assertTrue(\App\Parte1\esPalindromo('Oso'));
        $this->assertTrue(\App\Parte1\esPalindromo('LEVEL'));
    }

    /**
     * Prueba que esPalindromo ignora espacios
     */
    public function testEsPalindromoIgnoraEspacios(): void
    {
        $this->assertTrue(\App\Parte1\esPalindromo('a n a'));
        $this->assertTrue(\App\Parte1\esPalindromo('r a d a r'));
        $this->assertTrue(\App\Parte1\esPalindromo('oso'));
        $this->assertFalse(\App\Parte1\esPalindromo('c a s a'));
    }

    /**
     * Prueba que esPalindromo ignora puntuación
     */
    public function testEsPalindromoIgnoraPuntuacion(): void
    {
        $this->assertTrue(\App\Parte1\esPalindromo('a.n.a'));
        $this->assertTrue(\App\Parte1\esPalindromo('r-a-d-a-r'));
        $this->assertTrue(\App\Parte1\esPalindromo('o!s!o'));
        $this->assertTrue(\App\Parte1\esPalindromo('l,e,v,e,l'));
    }

    /**
     * Prueba que esPalindromo funciona con frases
     */
    public function testEsPalindromoConFrases(): void
    {
        $this->assertTrue(\App\Parte1\esPalindromo('A man a plan a canal Panama'));
        $this->assertTrue(\App\Parte1\esPalindromo('Madam I\'m Adam'));
        $this->assertFalse(\App\Parte1\esPalindromo('Race a car'));
        $this->assertTrue(\App\Parte1\esPalindromo('Never odd or even'));
        $this->assertTrue(\App\Parte1\esPalindromo('Do geese see God?'));
    }

    /**
     * Prueba que esPalindromo funciona con números
     */
    public function testEsPalindromoConNumeros(): void
    {
        $this->assertTrue(\App\Parte1\esPalindromo('12321'));
        $this->assertTrue(\App\Parte1\esPalindromo('1234321'));
        $this->assertFalse(\App\Parte1\esPalindromo('12345'));
        $this->assertFalse(\App\Parte1\esPalindromo('123456'));
    }

    /**
     * Prueba que esPalindromo funciona con strings vacíos
     */
    public function testEsPalindromoConStringVacio(): void
    {
        $this->assertTrue(\App\Parte1\esPalindromo(''));
        $this->assertTrue(\App\Parte1\esPalindromo('   '));
        $this->assertTrue(\App\Parte1\esPalindromo('...'));
    }

    /**
     * Prueba que esPalindromo funciona con un solo carácter
     */
    public function testEsPalindromoConUnCaracter(): void
    {
        $this->assertTrue(\App\Parte1\esPalindromo('a'));
        $this->assertTrue(\App\Parte1\esPalindromo('1'));
        $this->assertTrue(\App\Parte1\esPalindromo('!'));
    }

    /**
     * Prueba que encontrarPalindromos devuelve array vacío para array vacío
     */
    public function testEncontrarPalindromosConArrayVacio(): void
    {
        $resultado = \App\Parte1\encontrarPalindromos([]);
        $this->assertIsArray($resultado);
        $this->assertEmpty($resultado);
    }

    /**
     * Prueba que encontrarPalindromos encuentra palíndromos en un array
     */
    public function testEncontrarPalindromosEnArray(): void
    {
        $palabras = ['ana', 'casa', 'radar', 'hola', 'oso', 'mundo'];
        $resultado = \App\Parte1\encontrarPalindromos($palabras);
        $esperado = ['ana', 'radar', 'oso'];
        
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que encontrarPalindromos no encuentra palíndromos cuando no hay
     */
    public function testEncontrarPalindromosSinPalindromos(): void
    {
        $palabras = ['casa', 'hola', 'mundo', 'programacion'];
        $resultado = \App\Parte1\encontrarPalindromos($palabras);
        
        $this->assertIsArray($resultado);
        $this->assertEmpty($resultado);
    }

    /**
     * Prueba que encontrarPalindromos encuentra todos los palíndromos
     */
    public function testEncontrarPalindromosTodosLosPalindromos(): void
    {
        $palabras = ['ana', 'radar', 'oso', 'level', 'civic', 'rotor'];
        $resultado = \App\Parte1\encontrarPalindromos($palabras);
        
        $this->assertCount(6, $resultado);
        $this->assertEquals($palabras, $resultado);
    }

    /**
     * Prueba que encontrarPalindromos funciona con frases
     */
    public function testEncontrarPalindromosConFrases(): void
    {
        $frases = [
            'A man a plan a canal Panama',
            'Madam I\'m Adam',
            'Race a car',
            'Hello World',
            'Never odd or even'
        ];
        $resultado = \App\Parte1\encontrarPalindromos($frases);
        $esperado = [
            'A man a plan a canal Panama',
            'Madam I\'m Adam',
            'Never odd or even'
        ];
        
        $this->assertEquals($esperado, $resultado);
    }

    /**
     * Prueba que noEstaVacio funciona correctamente
     */
    public function testNoEstaVacio(): void
    {
        $this->assertTrue(\App\Parte1\noEstaVacio('hola'));
        $this->assertTrue(\App\Parte1\noEstaVacio('  hola  '));
        $this->assertFalse(\App\Parte1\noEstaVacio(''));
        $this->assertFalse(\App\Parte1\noEstaVacio('   '));
        $this->assertFalse(\App\Parte1\noEstaVacio("\t\n"));
    }

    /**
     * Prueba casos edge con caracteres especiales
     */
    public function testEsPalindromoConCaracteresEspeciales(): void
    {
        $this->assertTrue(\App\Parte1\esPalindromo('a@a'));
        $this->assertTrue(\App\Parte1\esPalindromo('r#a#d#a#r'));
        $this->assertTrue(\App\Parte1\esPalindromo('o$s$o'));
        $this->assertFalse(\App\Parte1\esPalindromo('c@a@s@a'));
    }

    /**
     * Prueba que el procesamiento de texto funciona correctamente
     */
    public function testProcesamientoDeTexto(): void
    {
        // Verificar que el procesamiento interno funciona
        $texto = 'A Man A Plan A Canal Panama';
        $procesado = preg_replace('/[^a-zA-Z0-9]/', '', strtolower($texto));
        $this->assertEquals('amanaplanacanalpanama', $procesado);
        
        $reverso = strrev($procesado);
        $this->assertEquals('amanaplanacanalpanama', $reverso);
        $this->assertTrue($procesado === $reverso);
    }
} 