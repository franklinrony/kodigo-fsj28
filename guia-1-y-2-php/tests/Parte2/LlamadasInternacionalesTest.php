<?php

namespace Tests\Parte2;

use PHPUnit\Framework\TestCase;

/**
 * Pruebas unitarias para las funciones de llamadas internacionales
 */
class LlamadasInternacionalesTest extends TestCase
{
    /**
     * Prueba que calcularCostoLlamada devuelve error para minutos <= 0
     */
    public function testCalcularCostoLlamadaConMinutosCero(): void
    {
        $resultado = \App\Parte2\calcularCostoLlamada(12, 0);
        $this->assertArrayHasKey('error', $resultado);
    }

    /**
     * Prueba que calcularCostoLlamada devuelve error para minutos negativos
     */
    public function testCalcularCostoLlamadaConMinutosNegativos(): void
    {
        $resultado = \App\Parte2\calcularCostoLlamada(12, -5);
        $this->assertArrayHasKey('error', $resultado);
    }

    /**
     * Prueba que calcularCostoLlamada calcula correctamente para zona 12 (América del Norte)
     */
    public function testCalcularCostoLlamadaZona12(): void
    {
        // Zona 12: $2.00 por minuto
        $resultado = \App\Parte2\calcularCostoLlamada(12, 10);
        $this->assertEqualsWithDelta(20.0, $resultado['costo_base'], 0.01); // 10 * $2.00 = $20.00
        $this->assertEqualsWithDelta(18.0, $resultado['costo_final'], 0.01); // Con descuento 10%
        
        $resultado = \App\Parte2\calcularCostoLlamada(12, 30);
        $this->assertEqualsWithDelta(60.0, $resultado['costo_base'], 0.01); // 30 * $2.00 = $60.00
        $this->assertEqualsWithDelta(60.0, $resultado['costo_final'], 0.01); // Sin descuento
    }

    /**
     * Prueba que calcularCostoLlamada calcula correctamente para zona 15 (América Central)
     */
    public function testCalcularCostoLlamadaZona15(): void
    {
        // Zona 15: $2.20 por minuto
        $resultado = \App\Parte2\calcularCostoLlamada(15, 10);
        $this->assertEqualsWithDelta(22.0, $resultado['costo_base'], 0.01); // 10 * $2.20 = $22.00
        $this->assertEqualsWithDelta(19.8, $resultado['costo_final'], 0.01); // Con descuento 10%
        
        $resultado = \App\Parte2\calcularCostoLlamada(15, 25);
        $this->assertEqualsWithDelta(55.0, $resultado['costo_base'], 0.01); // 25 * $2.20 = $55.00
        $this->assertEqualsWithDelta(49.5, $resultado['costo_final'], 0.01); // Con descuento 10%
    }

    /**
     * Prueba que calcularCostoLlamada calcula correctamente para zona 18 (América del Sur)
     */
    public function testCalcularCostoLlamadaZona18(): void
    {
        // Zona 18: $4.50 por minuto
        $resultado = \App\Parte2\calcularCostoLlamada(18, 10);
        $this->assertEqualsWithDelta(45.0, $resultado['costo_base'], 0.01); // 10 * $4.50 = $45.00
        $this->assertEqualsWithDelta(40.5, $resultado['costo_final'], 0.01); // Con descuento 10%
        
        $resultado = \App\Parte2\calcularCostoLlamada(18, 20);
        $this->assertEqualsWithDelta(90.0, $resultado['costo_base'], 0.01); // 20 * $4.50 = $90.00
        $this->assertEqualsWithDelta(81.0, $resultado['costo_final'], 0.01); // Con descuento 10%
    }

    /**
     * Prueba que calcularCostoLlamada calcula correctamente para zona 19 (Europa)
     */
    public function testCalcularCostoLlamadaZona19(): void
    {
        // Zona 19: $3.50 por minuto
        $resultado = \App\Parte2\calcularCostoLlamada(19, 10);
        $this->assertEqualsWithDelta(35.0, $resultado['costo_base'], 0.01); // 10 * $3.50 = $35.00
        $this->assertEqualsWithDelta(31.5, $resultado['costo_final'], 0.01); // Con descuento 10%
        
        $resultado = \App\Parte2\calcularCostoLlamada(19, 15);
        $this->assertEqualsWithDelta(52.5, $resultado['costo_base'], 0.01); // 15 * $3.50 = $52.50
        $this->assertEqualsWithDelta(47.25, $resultado['costo_final'], 0.01); // Con descuento 10%
    }

    /**
     * Prueba que calcularCostoLlamada calcula correctamente para zona 23 (Asia)
     */
    public function testCalcularCostoLlamadaZona23(): void
    {
        // Zona 23: $6.00 por minuto
        $resultado = \App\Parte2\calcularCostoLlamada(23, 10);
        $this->assertEqualsWithDelta(60.0, $resultado['costo_base'], 0.01); // 10 * $6.00 = $60.00
        $this->assertEqualsWithDelta(54.0, $resultado['costo_final'], 0.01); // Con descuento 10%
        
        $resultado = \App\Parte2\calcularCostoLlamada(23, 5);
        $this->assertEqualsWithDelta(30.0, $resultado['costo_base'], 0.01); // 5 * $6.00 = $30.00
        $this->assertEqualsWithDelta(27.0, $resultado['costo_final'], 0.01); // Con descuento 10%
    }

    /**
     * Prueba que calcularCostoLlamada aplica descuento del 10% para llamadas < 30 minutos
     */
    public function testCalcularCostoLlamadaConDescuento(): void
    {
        // Zona 12: $2.00 por minuto, 15 minutos = $30.00, descuento 10% = $27.00
        $resultado = \App\Parte2\calcularCostoLlamada(12, 15);
        $this->assertEqualsWithDelta(27.0, $resultado['costo_final'], 0.01);
        
        // Zona 19: $3.50 por minuto, 20 minutos = $70.00, descuento 10% = $63.00
        $resultado = \App\Parte2\calcularCostoLlamada(19, 20);
        $this->assertEqualsWithDelta(63.0, $resultado['costo_final'], 0.01);
        
        // Zona 23: $6.00 por minuto, 25 minutos = $150.00, descuento 10% = $135.00
        $resultado = \App\Parte2\calcularCostoLlamada(23, 25);
        $this->assertEqualsWithDelta(135.0, $resultado['costo_final'], 0.01);
    }

    /**
     * Prueba que calcularCostoLlamada no aplica descuento para llamadas >= 30 minutos
     */
    public function testCalcularCostoLlamadaSinDescuento(): void
    {
        // Zona 12: $2.00 por minuto, 30 minutos = $60.00 (sin descuento)
        $resultado = \App\Parte2\calcularCostoLlamada(12, 30);
        $this->assertEqualsWithDelta(60.0, $resultado['costo_final'], 0.01);
        
        // Zona 19: $3.50 por minuto, 35 minutos = $122.50 (sin descuento)
        $resultado = \App\Parte2\calcularCostoLlamada(19, 35);
        $this->assertEqualsWithDelta(122.5, $resultado['costo_final'], 0.01);
    }

    /**
     * Prueba que calcularCostoLlamada devuelve error para zona inválida
     */
    public function testCalcularCostoLlamadaZonaInvalida(): void
    {
        $resultado = \App\Parte2\calcularCostoLlamada(99, 10);
        $this->assertArrayHasKey('error', $resultado);
        $this->assertEquals('Clave de zona no válida', $resultado['error']);
        
        $resultado = \App\Parte2\calcularCostoLlamada(50, 10);
        $this->assertArrayHasKey('error', $resultado);
        $this->assertEquals('Clave de zona no válida', $resultado['error']);
    }

    /**
     * Prueba que esClaveZonaValida funciona correctamente
     */
    public function testEsClaveZonaValida(): void
    {
        $zonasValidas = [12, 15, 18, 19, 23, 25, 29];
        
        foreach ($zonasValidas as $zona) {
            $this->assertTrue(\App\Parte2\esClaveZonaValida($zona), 
                "La zona {$zona} debe ser válida");
        }
        
        $zonasInvalidas = [11, 13, 14, 16, 17, 20, 21, 22, 24, 99, 50];
        
        foreach ($zonasInvalidas as $zona) {
            $this->assertFalse(\App\Parte2\esClaveZonaValida($zona), 
                "La zona {$zona} no debe ser válida");
        }
    }

    /**
     * Prueba que sonMinutosValidos funciona correctamente
     */
    public function testSonMinutosValidos(): void
    {
        $this->assertTrue(\App\Parte2\sonMinutosValidos(1));
        $this->assertTrue(\App\Parte2\sonMinutosValidos(10));
        $this->assertTrue(\App\Parte2\sonMinutosValidos(100));
        
        $this->assertFalse(\App\Parte2\sonMinutosValidos(0));
        $this->assertFalse(\App\Parte2\sonMinutosValidos(-1));
        $this->assertFalse(\App\Parte2\sonMinutosValidos(-10));
        $this->assertFalse(\App\Parte2\sonMinutosValidos(-100));
    }

    /**
     * Prueba casos edge con minutos decimales
     */
    public function testCalcularCostoLlamadaConMinutosDecimales(): void
    {
        // PHP debería truncar los decimales, pero probemos
        $resultado = \App\Parte2\calcularCostoLlamada(12, 10.5);
        $this->assertEqualsWithDelta(20.0, $resultado['costo_base'], 0.01); // 10 * $2.00 = $20.00
        $this->assertEqualsWithDelta(18.0, $resultado['costo_final'], 0.01); // Con descuento 10%
        
        $resultado = \App\Parte2\calcularCostoLlamada(19, 15.7);
        $this->assertEqualsWithDelta(52.5, $resultado['costo_base'], 0.01); // 15 * $3.50 = $52.50
        $this->assertEqualsWithDelta(47.25, $resultado['costo_final'], 0.01); // Con descuento 10%
    }

    /**
     * Prueba que el cálculo del descuento es correcto
     */
    public function testCalculoDescuentoCorrecto(): void
    {
        // Verificar que el descuento del 10% se aplica correctamente
        $costoSinDescuento = 15 * 2.0; // 15 minutos en zona 12 = $30.00
        $descuento = $costoSinDescuento * 0.10; // 10% = $3.00
        $costoConDescuento = $costoSinDescuento - $descuento; // $30.00 - $3.00 = $27.00
        
        $resultado = \App\Parte2\calcularCostoLlamada(12, 15);
        $this->assertEqualsWithDelta($costoConDescuento, $resultado['costo_final'], 0.01);
    }

    /**
     * Prueba que todas las zonas tienen tarifas diferentes
     */
    public function testTarifasDiferentesPorZona(): void
    {
        $minutos = 10;
        $costos = [];
        
        $zonas = [12, 15, 18, 19, 23];
        foreach ($zonas as $zona) {
            $costos[$zona] = \App\Parte2\calcularCostoLlamada($zona, $minutos)['costo_base'];
        }
        
        // Verificar que todas las tarifas son diferentes
        $tarifasUnicas = array_unique($costos);
        $this->assertCount(count($costos), $tarifasUnicas, 
            'Todas las zonas deben tener tarifas diferentes');
    }

    /**
     * Prueba que el descuento se aplica correctamente en el límite
     */
    public function testDescuentoEnLimite(): void
    {
        // 29 minutos: con descuento
        $resultado29 = \App\Parte2\calcularCostoLlamada(12, 29);
        $this->assertEqualsWithDelta(58.0, $resultado29['costo_base'], 0.01); // 29 * $2.00 = $58.00
        $this->assertEqualsWithDelta(52.2, $resultado29['costo_final'], 0.01); // Con descuento 10%
        
        // 30 minutos: sin descuento
        $resultado30 = \App\Parte2\calcularCostoLlamada(12, 30);
        $this->assertEqualsWithDelta(60.0, $resultado30['costo_base'], 0.01); // 30 * $2.00 = $60.00
        $this->assertEqualsWithDelta(60.0, $resultado30['costo_final'], 0.01); // Sin descuento
    }
} 