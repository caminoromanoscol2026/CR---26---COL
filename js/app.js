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

const app = document.getElementById("app");

app.innerHTML = `
    <div style="padding:15px;background:#e8f5e9;border:1px solid #4caf50;margin-bottom:20px;">
        <strong>Diagnóstico</strong><br>
        Participantes cargados: ${state.participantes.length}
    </div>
`;

mostrarBuscador();

inicializarBuscador();

    } catch (error) {

        console.error(error);

    }

}