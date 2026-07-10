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

    const total = state.participantes.length;

    const hombres = state.participantes.filter(p => p.sexo === "Masculino").length;

    const mujeres = state.participantes.filter(p => p.sexo === "Femenino").length;

    const ciudades = {};

    state.participantes.forEach(p => {

        ciudades[p.ciudad] = (ciudades[p.ciudad] || 0) + 1;

    });

    const topCiudades = Object.entries(ciudades)
        .sort((a,b)=>b[1]-a[1])
        .slice(0,5);

    document.getElementById("app").innerHTML = `

        <section class="page-header">

    <div class="page-title">

        <i class="fa-solid fa-chart-line"></i>

        <div>

            <h2>Dashboard</h2>

            <p>Resumen general del evento</p>

        </div>

    </div>

</section>

        <div class="dashboard-grid">

            <div class="metric-card">

                <div class="metric-value">${total}</div>

                <div class="metric-label">Participantes</div>

            </div>

            <div class="metric-card">

                <div class="metric-value">${hombres}</div>

                <div class="metric-label">Hombres</div>

            </div>

            <div class="metric-card">

                <div class="metric-value">${mujeres}</div>

                <div class="metric-label">Mujeres</div>

            </div>

        </div>

        <div class="dashboard-section">

            <h3>Ciudades con más participantes</h3>

            ${topCiudades.map(c=>`

                <div class="city-row">

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

        });

}