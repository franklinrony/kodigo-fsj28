// Función para validar que una nota esté entre 0 y 10
function esNotaValida(nota) {
    return !isNaN(nota) && nota >= 0 && nota <= 10;
}

// Función para calcular el promedio de las notas
function calcularPromedio(...notas) {
    return notas.reduce((suma, nota) => suma + nota, 0) / notas.length;
}

// Función para guardar los datos en sessionStorage
function guardarDatos() {
    const filas = Array.from(document.getElementById("studentTable").querySelector("tbody").children);
    const datos = filas.map((fila) => {
        const celdas = fila.children;
        return {
            nombre: celdas[0].textContent,
            nota1: parseFloat(celdas[1].textContent),
            nota2: parseFloat(celdas[2].textContent),
            nota3: parseFloat(celdas[3].textContent),
            promedio: parseFloat(celdas[4].textContent),
        };
    });
    sessionStorage.setItem("estudiantes", JSON.stringify(datos));
}

// Función para cargar los datos desde sessionStorage
function cargarDatos() {
    const datos = JSON.parse(sessionStorage.getItem("estudiantes")) || [];
    const tablaEstudiantes = document.getElementById("studentTable").querySelector("tbody");
    datos.forEach((estudiante) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${estudiante.nombre}</td>
            <td>${estudiante.nota1.toFixed(2)}</td>
            <td>${estudiante.nota2.toFixed(2)}</td>
            <td>${estudiante.nota3.toFixed(2)}</td>
            <td>${estudiante.promedio.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn">Editar</button>
                <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            </td>
        `;
        tablaEstudiantes.appendChild(fila);
    });
}

// Código que depende del DOM
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        const formularioEstudiante = document.getElementById("studentForm");
        const tablaEstudiantes = document.getElementById("studentTable").querySelector("tbody");
        const alertaError = document.getElementById("errorAlert");

        // Cargar datos desde sessionStorage al iniciar
        cargarDatos();

        // Validar campos al perder el foco
        ["studentGrade1", "studentGrade2", "studentGrade3"].forEach((id) => {
            const campo = document.getElementById(id);
            campo.addEventListener("blur", () => {
                if (!esNotaValida(parseFloat(campo.value))) {
                    campo.classList.add("is-invalid");
                } else {
                    campo.classList.remove("is-invalid");
                }
            });
        });

        formularioEstudiante.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("studentName").value;
            const nota1 = parseFloat(document.getElementById("studentGrade1").value);
            const nota2 = parseFloat(document.getElementById("studentGrade2").value);
            const nota3 = parseFloat(document.getElementById("studentGrade3").value);

            // Validar que las notas estén en el rango permitido
            if (!esNotaValida(nota1) || !esNotaValida(nota2) || !esNotaValida(nota3)) {
                alertaError.classList.remove("d-none");
                return;
            }

            alertaError.classList.add("d-none");
            const promedio = calcularPromedio(nota1, nota2, nota3);

            // Crear una nueva fila en la tabla
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${nombre}</td>
                <td>${nota1.toFixed(2)}</td>
                <td>${nota2.toFixed(2)}</td>
                <td>${nota3.toFixed(2)}</td>
                <td>${promedio.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn">Editar</button>
                    <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
                </td>
            `;
            tablaEstudiantes.appendChild(fila);

            guardarDatos();
            formularioEstudiante.reset();
        });

        tablaEstudiantes.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) {
                // Confirmar eliminación con SweetAlert
                const fila = e.target.closest("tr");
                const nombre = fila.children[0].textContent;

                Swal.fire({
                    title: "¿Está seguro?",
                    text: `Está a punto de eliminar el registro de ${nombre}.`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        fila.remove();
                        guardarDatos();
                        Swal.fire("Eliminado", `El registro de ${nombre} ha sido eliminado.`, "success");
                    }
                });
            } else if (e.target.classList.contains("edit-btn")) {
                // Editar la fila seleccionada
                const fila = e.target.closest("tr");
                const celdas = fila.children;

                document.getElementById("studentName").value = celdas[0].textContent;
                document.getElementById("studentGrade1").value = parseFloat(celdas[1].textContent);
                document.getElementById("studentGrade2").value = parseFloat(celdas[2].textContent);
                document.getElementById("studentGrade3").value = parseFloat(celdas[3].textContent);

                fila.remove();
                guardarDatos();
            }
        });
    });
}

// Exportar funciones para pruebas
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        esNotaValida,
        calcularPromedio,
        guardarDatos,
        cargarDatos,
    };
}
