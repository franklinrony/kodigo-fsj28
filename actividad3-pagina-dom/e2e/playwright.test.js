const { test, expect } = require('@playwright/test');

// URL de tu página (asegúrate de que el servidor esté corriendo)
const BASE_URL = 'http://localhost:8080';

test.describe('Registro de Estudiantes', () => {
  // Ejecutar antes de cada prueba para asegurar un estado limpio
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('debería permitir agregar un estudiante y mostrarlo en la tabla', async ({ page }) => {
    const nombre = 'Ana Pérez';
    const nota1 = '8.5';
    const nota2 = '9.0';
    const nota3 = '7.8';

    // Llenar el formulario
    await page.fill('#studentName', nombre);
    await page.fill('#studentGrade1', nota1);
    await page.fill('#studentGrade2', nota2);
    await page.fill('#studentGrade3', nota3);

    // Hacer clic en el botón "Agregar Estudiante"
    await page.click('button:text("Agregar Estudiante")');

    // Verificar que la fila se haya agregado a la tabla
    const nuevaFila = page.locator('#studentTable tbody tr:last-child');
    await expect(nuevaFila).toBeVisible();
    await expect(nuevaFila.locator('td:nth-child(1)')).toHaveText(nombre);
    await expect(nuevaFila.locator('td:nth-child(2)')).toHaveText(parseFloat(nota1).toFixed(2));
    await expect(nuevaFila.locator('td:nth-child(3)')).toHaveText(parseFloat(nota2).toFixed(2));
    await expect(nuevaFila.locator('td:nth-child(4)')).toHaveText(parseFloat(nota3).toFixed(2));
    const promedioEsperado = ((parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3).toFixed(2);
    await expect(nuevaFila.locator('td:nth-child(5)')).toHaveText(promedioEsperado);
  });

  test('debería mostrar un mensaje de error si las notas no son válidas', async ({ page }) => {
    const nombre = 'Carlos López';
    const nota1 = '14'; // Invalid grade
    const nota2 = '9.5'; // Valid grade
    const nota3 = '8.0'; // Valid grade

    // Llenar el formulario con una nota inválida
    await page.fill('#studentName', nombre);
    await page.fill('#studentGrade1', nota1);
    await page.fill('#studentGrade2', nota2);
    await page.fill('#studentGrade3', nota3);

    // Intentar enviar el formulario
    await page.click('button:text("Agregar Estudiante")');

    // Verificar que el mensaje de error sea visible
    const errorAlert = page.locator('#errorAlert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText('Las calificaciones deben estar entre 0 y 10 con hasta dos decimales.');

    // Verificar que no se haya agregado una nueva fila a la tabla
    await expect(page.locator('#studentTable tbody tr')).toHaveCount(0);
  });

  test('debería mostrar un mensaje en el input si las notas no son válidas', async ({ page }) => {
    const nombre = 'Carlos López';
    const nota1 = '12'; // Invalid grade
    const nota2 = '-1'; // Invalid grade
    const nota3 = '5.5'; // Valid grade

    // Llenar el formulario con notas inválidas
    await page.fill('#studentName', nombre);
    await page.fill('#studentGrade1', nota1);
    await page.fill('#studentGrade2', nota2);
    await page.fill('#studentGrade3', nota3);

    // Intentar enviar el formulario
    await page.click('button:text("Agregar Estudiante")');

    // Verificar que el mensaje de error sea visible
    const errorAlert = page.locator('#errorAlert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText('Las calificaciones deben estar entre 0 y 10 con hasta dos decimales.');

    // Verificar que no se haya agregado una nueva fila a la tabla
    await expect(page.locator('#studentTable tbody tr')).toHaveCount(0);
  });

  test('debería permitir eliminar un estudiante de la tabla', async ({ page }) => {
    // Primero, agregar un estudiante para poder eliminarlo
    await page.fill('#studentName', 'Elena Vargas');
    await page.fill('#studentGrade1', '7.0');
    await page.fill('#studentGrade2', '8.0');
    await page.fill('#studentGrade3', '9.0');
    await page.click('button:text("Agregar Estudiante")');

    // Verificar que la fila se agregó
    await expect(page.locator('#studentTable tbody tr')).toHaveCount(1);

    // Hacer clic en el botón "Eliminar" del estudiante agregado
    await page.click('#studentTable tbody tr:last-child button:text("Eliminar")');

    // Verificar el mensaje de confirmación (simulando hacer clic en "Sí, eliminar")
    await page.locator('button:text("Sí, eliminar")').click();

    // Verificar que la fila haya sido eliminada de la tabla
    await expect(page.locator('#studentTable tbody tr')).toHaveCount(0);
    await expect(page.locator('.swal2-container')).toBeVisible();
    await expect(page.locator('.swal2-title')).toHaveText('Eliminado');
  });

  test('debería permitir editar un estudiante de la tabla', async ({ page }) => {
    // Primero, agregar un estudiante para poder editarlo
    await page.fill('#studentName', 'Fernando Díaz');
    await page.fill('#studentGrade1', '6.5');
    await page.fill('#studentGrade2', '7.5');
    await page.fill('#studentGrade3', '8.5');
    await page.click('button:text("Agregar Estudiante")');

    // Verificar que la fila se agregó
    const primeraFila = page.locator('#studentTable tbody tr:first-child');
    await expect(primeraFila).toBeVisible();
    const nombreOriginal = await primeraFila.locator('td:nth-child(1)').textContent();

    // Hacer clic en el botón "Editar" del estudiante agregado
    await page.click('#studentTable tbody tr:first-child button:text("Editar")');

    // Modificar los datos del formulario
    const nuevoNombre = 'Federico Díaz';
    const nuevaNota1 = '9.5';
    await page.fill('#studentName', nuevoNombre);
    await page.fill('#studentGrade1', nuevaNota1);
    await page.click('button:text("Agregar Estudiante")'); // El botón "Agregar" ahora actúa como "Guardar" después de la edición

    // Verificar que la fila se haya actualizado en la tabla
    const filaActualizada = page.locator('#studentTable tbody tr:first-child');
    await expect(filaActualizada.locator('td:nth-child(1)')).toHaveText(nuevoNombre);
    await expect(filaActualizada.locator('td:nth-child(2)')).toHaveText(parseFloat(nuevaNota1).toFixed(2));
  });

  test('debería persistir los datos en sessionStorage y cargarlos al iniciar', async ({ page }) => {
    const nombre = 'Gabriela Soto';
    const nota1 = '5.0';
    const nota2 = '6.0';
    const nota3 = '7.0';

    // Agregar un estudiante
    await page.fill('#studentName', nombre);
    await page.fill('#studentGrade1', nota1);
    await page.fill('#studentGrade2', nota2);
    await page.fill('#studentGrade3', nota3);
    await page.click('button:text("Agregar Estudiante")');

    // Recargar la página (simulando un nuevo inicio)
    await page.reload();

    // Verificar que los datos persisten y se cargan en la tabla
    const primeraFila = page.locator('#studentTable tbody tr:first-child');
    await expect(primeraFila).toBeVisible();
    await expect(primeraFila.locator('td:nth-child(1)')).toHaveText(nombre);
    await expect(primeraFila.locator('td:nth-child(2)')).toHaveText(parseFloat(nota1).toFixed(2));
    await expect(primeraFila.locator('td:nth-child(3)')).toHaveText(parseFloat(nota2).toFixed(2));
    await expect(primeraFila.locator('td:nth-child(4)')).toHaveText(parseFloat(nota3).toFixed(2));
  });
});