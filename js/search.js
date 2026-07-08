// ========================================
// Buscador de participantes
// ========================================

function inicializarBuscador() {

    const input = document.getElementById("searchInput");

    input.addEventListener("input", buscarParticipantes);

}

function buscarParticipantes(e) {

    const texto = e.target.value.trim().toLowerCase();

    const resultados = document.getElementById("results");

    if (texto === "") {
        resultados.innerHTML = "";
        return;
    }

    const encontrados = state.participantes.filter(p => {

        return (
            (p["Nombre completo"] || "").toLowerCase().includes(texto) ||
            String(p["N° de cedula o pasaporte"] || "").toLowerCase().includes(texto) ||
            (p["Correo electrónico"] || "").toLowerCase().includes(texto) ||
            (p["Ciudad - Departamento"] || "").toLowerCase().includes(texto) ||
            (p["País"] || "").toLowerCase().includes(texto) ||
            (p["Iglesia o ministerio al que pertenece"] || "").toLowerCase().includes(texto)
        );

    });

    mostrarResultados(encontrados);

}