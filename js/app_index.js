const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function iniciar() {
    mostrarMeses();

    document.querySelector("#btnListar").addEventListener("click", listarNotas);
    document.querySelector("#btnLimpiar").addEventListener("click", limpiarCalendario);
}

function cargarNotas() {
    const datos = localStorage.getItem("calendarioNotas");
    if (datos) return JSON.parse(datos);
    return [];
}

function guardarNotas(notas) {
    localStorage.setItem("calendarioNotas", JSON.stringify(notas));
}

function mostrarMeses() {
    const contenedor = document.querySelector("#meses");
    contenedor.innerHTML = "";

    const notas = cargarNotas();

    for (let i = 0; i < 12; i++) {
        const div = document.createElement("div");
        div.classList.add("mes");

        // Obtener notas del mes
        const notasMes = [];
        for (let j = 0; j < notas.length; j++) {
            if (notas[j].mes === i) notasMes.push(notas[j]);
        }

        if (notasMes.length > 0) div.classList.add("mes-con-notas");
        else div.classList.add("mes-vacio");

        div.innerHTML = `<div class="nombre-mes">${meses[i]}</div><p>${notasMes.length} notas</p>`;

        div.addEventListener("click", function () {
            window.location.href = "mes.html?mes=" + i;
        });

        contenedor.appendChild(div);
    }
}

function listarNotas() {
    const lista = document.querySelector("#listaNotas");
    lista.innerHTML = "";

    const notas = cargarNotas();

    for (let i = 0; i < notas.length; i++) {
        const li = document.createElement("li");
        li.textContent = meses[notas[i].mes] + " - " + notas[i].titulo;
        lista.appendChild(li);
    }
}

function limpiarCalendario() {
    if (confirm("¿Eliminar todas las notas?")) {
        localStorage.removeItem("calendarioNotas");
        mostrarMeses();
        document.querySelector("#listaNotas").innerHTML = "";
    }
}

iniciar();
