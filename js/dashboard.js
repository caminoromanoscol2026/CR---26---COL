// ========================================
// Dashboard
// ========================================

function obtenerEstadisticas() {

    const participantes = state.participantes;

    const total = participantes.length;

    const hombres = participantes.filter(
        p => p.sexo === "Masculino"
    ).length;

    const mujeres = participantes.filter(
        p => p.sexo === "Femenino"
    ).length;

    const edades = {
        "18-25": 0,
        "26-35": 0,
        "36-45": 0,
        "46-55": 0,
        "56+": 0
    };

    participantes.forEach(p => {

        const edad = Number(p.edad);

        if (isNaN(edad)) return;

        if (edad >= 18 && edad <= 25) edades["18-25"]++;
        else if (edad <= 35) edades["26-35"]++;
        else if (edad <= 45) edades["36-45"]++;
        else if (edad <= 55) edades["46-55"]++;
        else edades["56+"]++;

    });

    const ciudades = {};

    participantes.forEach(p => {

        const ciudad = p.ciudad || "Sin ciudad";

        ciudades[ciudad] = (ciudades[ciudad] || 0) + 1;

    });

    const topCiudades = Object.entries(ciudades)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    return {

        total,
        hombres,
        mujeres,
        edades,
        topCiudades

    };

}

function barra(valor, total) {

    const porcentaje = total ? (valor * 100 / total) : 0;

    return `
        <div style="margin:10px 0 18px;">

            <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:6px;
                font-size:14px;
            ">
                <span>${valor}</span>
                <span>${Math.round(porcentaje)}%</span>
            </div>

            <div style="
                height:10px;
                background:#ececec;
                border-radius:20px;
                overflow:hidden;
            ">

                <div style="
                    width:${porcentaje}%;
                    height:100%;
                    background:var(--color-principal);
                "></div>

            </div>

        </div>
    `;

}

function mostrarDashboard() {

    const e = obtenerEstadisticas();

    const app = document.getElementById("app");

    app.innerHTML = `

        <h2>📊 Dashboard</h2>

        <div class="dashboard-grid">

            <div class="dashboard-card grande">

                <div class="dashboard-icon">👥</div>

                <div class="dashboard-numero">
                    ${e.total}
                </div>

                <div class="dashboard-titulo">
                    Participantes registrados
                </div>

            </div>

            <div class="dashboard-card">

                <div class="dashboard-icon">👨</div>

                <div class="dashboard-numero">
                    ${e.hombres}
                </div>

                <div class="dashboard-titulo">
                    Hombres
                </div>

            </div>

            <div class="dashboard-card">

                <div class="dashboard-icon">👩</div>

                <div class="dashboard-numero">
                    ${e.mujeres}
                </div>

                <div class="dashboard-titulo">
                    Mujeres
                </div>

            </div>

        </div>

        <div class="dashboard-seccion">

            <h3>👨 Hombres</h3>

            ${barra(e.hombres, e.total)}

            <h3>👩 Mujeres</h3>

            ${barra(e.mujeres, e.total)}

        </div>

        <div class="dashboard-seccion">

            <h3>🎂 Distribución por edades</h3>

            ${Object.entries(e.edades).map(([rango, cantidad]) => `

                <div class="dashboard-item">

                    <span>${rango}</span>

                    <strong>${cantidad}</strong>

                </div>

            `).join("")}

        </div>

        <div class="dashboard-seccion">

            <h3>📍 Top ciudades</h3>

            ${e.topCiudades.map(c => `

                <div class="dashboard-item">

                    <span>${c[0]}</span>

                    <strong>${c[1]}</strong>

                </div>

            `).join("")}

        </div>

        ${mostrarMenu()}

    `;

    document
        .getElementById("btnBuscar")
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