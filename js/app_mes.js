const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const params = new URLSearchParams(window.location.search);
const mes = Number(params.get("mes"));
let editandoId = null;

function iniciar() {
    document.querySelector("#nombreMes").textContent = "Notas de " + meses[mes];
    mostrarNotas();

    document.querySelector("#formNota").addEventListener("submit", guardarNota);

    const btnVolver = document.querySelector("#btnVolver");
    if (btnVolver) btnVolver.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}

function cargarNotas() {
    const datos = localStorage.getItem("calendarioNotas");
    if (datos) return JSON.parse(datos);
    return [];
}

function guardarNotas(notas) {
    localStorage.setItem("calendarioNotas", JSON.stringify(notas));
}

function mostrarNotas() {
    const lista = document.querySelector("#listaNotas");
    lista.innerHTML = "";

    const notas = cargarNotas();

    for (let i = 0; i < notas.length; i++) {
        if (notas[i].mes === mes) {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${notas[i].titulo}</strong><br>${notas[i].descripcion}<br>`;

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.addEventListener("click", function () {
                editarNota(notas[i].id);
            });

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.addEventListener("click", function () {
                eliminarNota(notas[i].id);
            });

            li.appendChild(btnEditar);
            li.appendChild(btnEliminar);
            lista.appendChild(li);
        }
    }
}

function guardarNota(e) {
    e.preventDefault();

    const titulo = document.querySelector("#titulo").value.trim();
    const descripcion = document.querySelector("#descripcion").value.trim();
    const error = document.querySelector("#error");

    error.textContent = "";

    if (titulo === "" || descripcion === "") {
        error.textContent = "Todos los campos son obligatorios";
        return;
    }

    const notas = cargarNotas();

    if (editandoId === null) {
        const nuevaNota = {
            id: Date.now(),
            mes: mes,
            titulo: titulo,
            descripcion: descripcion
        };
        notas.push(nuevaNota);
    } else {
        let nota = null;
        for (let i = 0; i < notas.length; i++) {
            if (notas[i].id === editandoId) {
                nota = notas[i];
                break;
            }
        }
        if (nota) {
            nota.titulo = titulo;
            nota.descripcion = descripcion;
        }
        editandoId = null;
    }

    guardarNotas(notas);
    document.querySelector("#formNota").reset();
    mostrarNotas();
}

function editarNota(id) {
    const notas = cargarNotas();
    for (let i = 0; i < notas.length; i++) {
        if (notas[i].id === id) {
            document.querySelector("#titulo").value = notas[i].titulo;
            document.querySelector("#descripcion").value = notas[i].descripcion;
            editandoId = id;
            break;
        }
    }
}

function eliminarNota(id) {
    if (!confirm("¿Eliminar esta nota?")) return;

    const notas = cargarNotas();
    for (let i = 0; i < notas.length; i++) {
        if (notas[i].id === id) {
            notas.splice(i, 1);
            break;
        }
    }
    guardarNotas(notas);
    mostrarNotas();
}

iniciar();