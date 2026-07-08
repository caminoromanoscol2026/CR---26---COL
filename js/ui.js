// ========================================
// Interfaz de usuario
// ========================================

function mostrarBuscador() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <h2>Buscar participante</h2>

        <input
            type="text"
            id="searchInput"
            placeholder="Escriba un nombre..."
        >

        <div id="results"></div>
    `;


}
function mostrarResultados(lista) {

    const contenedor = document.getElementById("results");

    if (lista.length === 0) {

        contenedor.innerHTML = "<p>No se encontraron participantes.</p>";
        return;

    }

    contenedor.innerHTML = lista.map(p => `

        <div class="card-participante">

            <strong>${p["Nombre completo"]}</strong>

            <br>

            <small>${p["Ciudad - Departamento"]}</small>

        </div>

    `).join("");

}