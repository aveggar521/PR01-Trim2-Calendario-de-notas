const meses = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

iniciar();

// Muestra los meses del calendario e inicia el boton de de listar notas y el de limpiar
function iniciar() {
    mostrarMeses();

    document.getElementById("btnListar").addEventListener("click", listarNotas);
    document.getElementById("btnLimpiar").addEventListener("click", limpiarCalendario);
}

//Carga las notas guardadas en el localStorage
function cargarNotas() {
    const datos = localStorage.getItem("calendarioNotas");

    if (!datos) {
        return [];
    }

    return JSON.parse(datos);
}

//
function guardarNotas(notas) {
    localStorage.setItem("calendarioNotas", JSON.stringify(notas));
}

//Muestra los meses del año
function mostrarMeses() {

    const contenedor = document.getElementById("meses");
    contenedor.innerHTML = "";

    //Notas guardadas
    const notas = cargarNotas();

    for (let i = 0; i < 12; i++) {

        const div = document.createElement("div");
        div.classList.add("mes");

        //Recorre las notas
        const notasMes = [];
        for (let k = 0; k < notas.length; k++) {
            if (notas[k].mes === i) {
                notasMes.push(notas[k]);
            }
        }

        //Cambiar el estilo del div dependiendo si tiene notas o no
        if (notasMes.length > 0) {
            div.classList.add("mes-con-notas");
        } else {
            div.classList.add("mes-vacio");
        }

        div.innerHTML = `
        <h3>${meses[i]}</h3>
        <p>${notasMes.length} notas</p>
        `;

        //Al pulsar en el div (los meses que hay) te dirige al mes.html de ese mes
        div.addEventListener("click", function () {
            window.location.href = "mes.html?mes=" + i;
        });

        contenedor.appendChild(div);

    }

}


function listarNotas() {

    const lista = document.getElementById("listaNotas");
    lista.innerHTML = "";

    const notas = cargarNotas();

    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];

        const li = document.createElement("li");

        li.textContent = meses[nota.mes] + " - " + nota.titulo;

        lista.appendChild(li);
    }
}

    function limpiarCalendario() {

        const confirmar = confirm("¿Eliminar todas las notas?");

        if (confirmar) {

            localStorage.removeItem("calendarioNotas");

            mostrarMeses();

            document.getElementById("listaNotas").innerHTML = "";

        }

    }


