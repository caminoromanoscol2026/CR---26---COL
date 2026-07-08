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

        const nombre = String(p["Nombre completo"] ?? "").toLowerCase();
        const documento = String(p["N° de cedula o pasaporte"] ?? "").toLowerCase();
        const correo = String(p["Correo electrónico"] ?? "").toLowerCase();
        const ciudad = String(p["Ciudad - Departamento"] ?? "").toLowerCase();
        const pais = String(p["País"] ?? "").toLowerCase();
        const iglesia = String(p["Iglesia o ministerio al que pertenece"] ?? "").toLowerCase();

        return (
            nombre.includes(texto) ||
            documento.includes(texto) ||
            correo.includes(texto) ||
            ciudad.includes(texto) ||
            pais.includes(texto) ||
            iglesia.includes(texto)
        );

    });

    mostrarResultados(encontrados);

}