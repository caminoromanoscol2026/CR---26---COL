// ========================================
// Interfaz de usuario
// ========================================

function mostrarBuscador() {

    const app = document.getElementById("app");

    app.innerHTML = `

        <section class="hero">

            <h2>Participantes</h2>

            <p>
                Busque por nombre, ciudad o documento.
            </p>

        </section>

        <div class="search-box">

            <i class="fa-solid fa-magnifying-glass"></i>

            <input
                id="searchInput"
                type="text"
                placeholder="Buscar participante..."
                autocomplete="off">

        </div>

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
        `${lista.length} participante${lista.length !== 1 ? "s" : ""}`;

    if (lista.length === 0) {

        contenedor.innerHTML = `

            <div class="empty-state">

                <i class="fa-regular fa-face-smile"></i>

                <h3>Sin resultados</h3>

                <p>No encontramos participantes con esa búsqueda.</p>

            </div>

        `;

        return;

    }

    contenedor.innerHTML = lista.map(p => `

        <div class="card-participante"

            onclick="mostrarFicha('${p.id}')">

            <div class="card-top">

                <div>

                    <div class="nombre">

                        ${p.nombre}

                    </div>

                    <div class="card-subtitle">

                        ${p.ciudad}

                    </div>

                </div>

                <div class="edad">

                    ${p.edad}

                </div>

            </div>

            <div class="card-footer">

                <span>

                    <i class="fa-solid fa-location-dot"></i>

                    ${p.pais}

                </span>

                <span>

                    <i class="fa-solid fa-building-columns"></i>

                    ${p.iglesia || "Sin iglesia"}

                </span>

            </div>

        </div>

    `).join("");

}
function mostrarFicha(id) {

    state.scrollY = window.scrollY;

    const p = state.participantes.find(x => x.id === id);

    const app = document.getElementById("app");

    app.innerHTML = `

        <button id="btnVolver">
            <i class="fa-solid fa-arrow-left"></i>
            Volver
        </button>

        <h2>${p.nombre}</h2>

        <div class="ficha-card">

            ${fila("fa-id-card","Documento",p.documento)}

            ${fila("fa-cake-candles","Edad",p.edad)}

            ${fila("fa-user","Sexo",p.sexo)}

            ${fila("fa-earth-americas","País",p.pais)}

            ${fila("fa-location-dot","Ciudad",p.ciudad)}

            ${fila("fa-church","Iglesia",p.iglesia || "-")}

            ${fila("fa-phone","Teléfono",p.telefono || "-")}

            ${fila("fa-envelope","Correo",p.correo)}

            ${fila("fa-heart-pulse","Condición médica",p.condicionMedica || "-")}

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

function fila(icono,titulo,valor){

    return `

        <div class="ficha-item">

            <div class="ficha-left">

                <i class="fa-solid ${icono}"></i>

                <span class="ficha-label">${titulo}</span>

            </div>

            <span class="ficha-value">${valor}</span>

        </div>

    `;

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

        <nav class="bottom-bar">

            <button id="btnBuscar" class="bottom-btn">

                <i class="fa-solid fa-magnifying-glass"></i>

                <span>Buscar</span>

            </button>

            <button id="btnDashboard" class="bottom-btn">

                <i class="fa-solid fa-chart-simple"></i>

                <span>Dashboard</span>

            </button>

        </nav>

    `;

}