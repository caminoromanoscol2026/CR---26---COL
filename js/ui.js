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

        <div class="card-participante" onclick="mostrarFicha(${state.participantes.indexOf(p)})">

            <strong>${p["Nombre completo"]}</strong>

            <br>

            <small>${p["Ciudad - Departamento"]}</small>

        </div>

    `).join("");

}
function mostrarFicha(indice) {

    const p = state.participantes[indice];

    const app = document.getElementById("app");

    app.innerHTML = `

        <button id="btnVolver">← Volver</button>

        <h2>${p["Nombre completo"]}</h2>

        <hr>

        <p><strong>Documento:</strong><br>${p["N° de cedula o pasaporte"]}</p>

        <p><strong>Edad:</strong><br>${p["Edad"]}</p>

        <p><strong>Sexo:</strong><br>${p["Sexo"]}</p>

        <p><strong>País:</strong><br>${p["País"]}</p>

        <p><strong>Ciudad:</strong><br>${p["Ciudad - Departamento"]}</p>

        <p><strong>Iglesia:</strong><br>${p["Iglesia o ministerio al que pertenece"]}</p>

        <p><strong>Teléfono:</strong><br>${p["Teléfono"]}</p>

        <p><strong>Correo:</strong><br>${p["Correo electrónico"]}</p>

    `;

    document
        .getElementById("btnVolver")
        .addEventListener("click", () => {

            mostrarBuscador();
            inicializarBuscador();

        });

}