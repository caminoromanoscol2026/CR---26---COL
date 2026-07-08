// ========================================
// CR-26-COL
// Archivo principal
// ========================================

document.addEventListener("DOMContentLoaded", iniciarApp);

async function iniciarApp() {

    console.log("🚀 Iniciando aplicación...");

    mostrarPantallaCarga();

    try {

        // Cargar participantes
        state.participantes = await obtenerParticipantes();

        console.log(`✅ ${state.participantes.length} participantes cargados`);

        // Mostrar la pantalla principal
        mostrarBuscador();

        // Activar el buscador
        inicializarBuscador();

    } catch (error) {

        console.error(error);

        const app = document.getElementById("app");

        if (app) {

            app.innerHTML = `
                <div style="
                    background:#ffebee;
                    border:1px solid #f44336;
                    padding:20px;
                    border-radius:8px;
                    margin:20px;
                ">
                    <h2>Error al cargar la aplicación</h2>
                    <p><strong>${error.message}</strong></p>
                </div>
            `;

        }

    }

}