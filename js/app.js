// ========================================
// CR-26-COL
// Archivo principal
// ========================================

document.addEventListener("DOMContentLoaded", iniciarApp);

async function iniciarApp() {

    console.log("🚀 Iniciando aplicación...");

    try {

        state.participantes = await obtenerParticipantes();

        console.log(`✅ ${state.participantes.length} participantes cargados`);

        mostrarBuscador();

        inicializarBuscador();

    } catch (error) {

        console.error(error);

    }

}