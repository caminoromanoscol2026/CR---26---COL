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

        ${mostrarMenu()}
    `;

    document
        .getElementById("btnDashboard")
        .addEventListener("click", mostrarDashboard);

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

        <div class="card-participante" onclick="mostrarFicha('${p.id}')">

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

    state.scrollY = window.scrollY;

    const p = state.participantes.find(x => x.id === id);

    const app = document.getElementById("app");

    app.innerHTML = `

        <button id="btnVolver">← Volver</button>

        <h2>${p.nombre}</h2>

        <hr>

        <div class="ficha-campo">
            <strong>Documento</strong>
            ${p.documento}
        </div>

        <div class="ficha-campo">
            <strong>Edad</strong>
            ${p.edad}
        </div>

        <div class="ficha-campo">
            <strong>Sexo</strong>
            ${p.sexo}
        </div>

        <div class="ficha-campo">
            <strong>País</strong>
            ${p.pais}
        </div>

        <div class="ficha-campo">
            <strong>Ciudad</strong>
            ${p.ciudad}
        </div>

        <div class="ficha-campo">
            <strong>Iglesia</strong>
            ${p.iglesia || "-"}
        </div>

        <div class="ficha-campo">
            <strong>Teléfono</strong>
            ${p.telefono || "-"}
        </div>

        <div class="ficha-campo">
            <strong>Correo</strong>
            ${p.correo || "-"}
        </div>

        <div class="ficha-campo">
            <strong>Condición médica</strong>
            ${p.condicionMedica || "-"}
        </div>

    `;

    document
        .getElementById("btnVolver")
        .addEventListener("click", () => {

            mostrarBuscador();

            inicializarBuscador();

            const input = document.getElementById("searchInput");

            input.value = state.busqueda;

            if (state.resultados.length > 0) {
                mostrarResultados(state.resultados);
            }

            setTimeout(() => {
                window.scrollTo(0, state.scrollY);
            }, 0);

        });

}

function mostrarPantallaCarga() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="pantalla-carga">

            <div class="spinner"></div>

            <h2>Cargando participantes...</h2>

            <p>Por favor espere unos segundos.</p>

        </div>
    `;

}

function mostrarMenu() {

    return `
        <div class="menu">

            <button id="btnBuscar">
                🔍 Buscar
            </button>

            <button id="btnDashboard">
                📊 Dashboard
            </button>

        </div>
    `;

}