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

        <p id="contadorResultados"></p>

        <div id="results"></div>
    `;

}

function mostrarResultados(lista) {

    const contenedor = document.getElementById("results");

    const contador = document.getElementById("contadorResultados");

    contador.textContent =
        `${lista.length} participante${lista.length !== 1 ? "s" : ""} encontrado${lista.length !== 1 ? "s" : ""}`;

    if (lista.length === 0) {

        contenedor.innerHTML = `
            <div class="sin-resultados">
                No se encontraron participantes
            </div>
        `;

        return;

    }

    contenedor.innerHTML = lista.map(p => `

        <div class="card-participante"
             onclick="mostrarFicha('${p.id}')">

            <div class="nombre">
                👤 ${p.nombre}
            </div>

            <div class="info">
                📍 ${p.ciudad}
            </div>

            <div class="info">
                🌎 ${p.pais}
            </div>

            <div class="info">
                ⛪ ${p.iglesia || "Sin iglesia"}
            </div>

            <div class="documento">
                🪪 ${p.documento}
            </div>

        </div>

    `).join("");

}

function mostrarFicha(id) {

    const p = state.participantes.find(x => x.id === id);

    const app = document.getElementById("app");

    app.innerHTML = `

        <button id="btnVolver">← Volver</button>

        <h2>${p.nombre}</h2>

        <hr>

        <p><strong>Documento:</strong><br>${p.documento}</p>

        <p><strong>Edad:</strong><br>${p.edad}</p>

        <p><strong>Sexo:</strong><br>${p.sexo}</p>

        <p><strong>País:</strong><br>${p.pais}</p>

        <p><strong>Ciudad:</strong><br>${p.ciudad}</p>

        <p><strong>Iglesia:</strong><br>${p.iglesia}</p>

        <p><strong>Teléfono:</strong><br>${p.telefono || "-"}</p>

        <p><strong>Correo:</strong><br>${p.correo}</p>

        <p><strong>Condición médica:</strong><br>${p.condicionMedica || "-"}</p>

    `;

    document
        .getElementById("btnVolver")
        .addEventListener("click", () => {

            mostrarBuscador();
            inicializarBuscador();

        });

}