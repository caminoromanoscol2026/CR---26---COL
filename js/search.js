// ========================================
// Buscador de participantes
// ========================================
function normalizarTexto(texto) {

    return String(texto)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

}

function inicializarBuscador() {

    const input = document.getElementById("searchInput");

    input.addEventListener("input", buscarParticipantes);

}

function buscarParticipantes(e) {

    const texto = normalizarTexto(e.target.value);

    const resultados = document.getElementById("results");

    if (texto === "") {
        resultados.innerHTML = "";
        return;
    }

    const encontrados = state.participantes.filter(p => {

    return (

        normalizarTexto(p.nombre).includes(texto) ||

        normalizarTexto(p.documento).includes(texto) ||

        normalizarTexto(p.correo).includes(texto) ||

        normalizarTexto(p.ciudad).includes(texto) ||

        normalizarTexto(p.pais).includes(texto) ||

        normalizarTexto(p.iglesia).includes(texto)

    );

});

    encontrados.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
    );

    mostrarResultados(encontrados);

}