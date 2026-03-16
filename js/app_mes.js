const meses = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const params = new URLSearchParams(window.location.search);
const mes = Number(params.get("mes"));

let editandoId = null;

iniciar();

function iniciar() {

    document.getElementById("nombreMes").textContent = "Notas de " + meses[mes];

    mostrarNotas();

    document.getElementById("formNota").addEventListener("submit", guardarNota);
}

function cargarNotas() {

    const datos = localStorage.getItem("calendarioNotas");

    if (!datos) {
        return [];
    }

    return JSON.parse(datos);
}

function guardarNotas(notas) {

    localStorage.setItem("calendarioNotas", JSON.stringify(notas));
}

function mostrarNotas() {

    const lista = document.getElementById("listaNotas");
    lista.innerHTML = "";

    const notas = cargarNotas();

    const notasMes = notas.filter(n => n.mes === mes);

    notasMes.forEach(nota => {

        const li = document.createElement("li");

        li.innerHTML = `
        <h3>${nota.titulo}</h3>
        <p>${nota.descripcion}</p>
        <button onclick="editarNota(${nota.id})">Editar</button>
        <button onclick="eliminarNota(${nota.id})">Eliminar</button>
        `;

        lista.appendChild(li);
    });
}

function guardarNota(e) {

    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    const error = document.getElementById("error");

    if (titulo === "" || descripcion === "") {

        error.textContent = "Todos los campos son obligatorios";
        return;

    }

    error.textContent = "";

    let notas = cargarNotas();

    if (editandoId) {

        let nota = null;
        for (let i = 0; i < notas.length; i++) {
            if (notas[i].id === editandoId) {
                nota = notas[i];
                break;
            }
        }

        nota.titulo = titulo;
        nota.descripcion = descripcion;

        editandoId = null;

    } else {

        const nuevaNota = {
            id: Date.now(),
            mes: mes,
            titulo: titulo,
            descripcion: descripcion
        };

        notas.push(nuevaNota);

    }

    guardarNotas(notas);

    document.getElementById("formNota").reset();

    mostrarNotas();
}

function eliminarNota(id) {

    const confirmar = confirm("¿Eliminar nota?");

    if (!confirmar) return;

    let notas = cargarNotas();

    for (let i = 0; i < notas.length; i++) {
        if (notas[i].id === id) {
            notas.splice(i, 1);
            break;
        }
    }

    guardarNotas(notas);

    mostrarNotas();
}

function editarNota(id) {

    const notas = cargarNotas();

    const nota = notas.find(n => n.id === id);

    document.getElementById("titulo").value = nota.titulo;
    document.getElementById("descripcion").value = nota.descripcion;

    editandoId = id;
}

