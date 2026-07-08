// ========================================
// Buscador de participantes
// ========================================

function inicializarBuscador() {

    const input = document.getElementById("searchInput");

    input.addEventListener("input", buscarParticipantes);

}

function buscarParticipantes(evento) {

    const texto = evento.target.value
        .trim()
        .toLowerCase();

    const resultados = document.getElementById("results");

    if (texto.length === 0) {

        resultados.innerHTML = "";

        return;

    }

    const encontrados = state.participantes.filter(participante => {

        return JSON.stringify(participante)
            .toLowerCase()
            .includes(texto);

    });

    mostrarResultados(encontrados);

}