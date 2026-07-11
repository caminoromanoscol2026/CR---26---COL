// ========================================
// API
// ========================================

const API_URL =
"https://script.google.com/macros/s/AKfycbxi_r7rxkozzaCmWw-bdMdbDdtBRZn3x6BazOiFsUx5sdD8hItjiLth3ZcCZ3deoQI-/exec";

const CACHE_KEY = "CR26_CACHE_V1";

// ========================================

async function obtenerParticipantes() {

    const cache = localStorage.getItem(CACHE_KEY);

    if (cache) {

        console.log("📦 Cargando desde caché...");

        // Actualizamos en segundo plano
        actualizarCache();

        return JSON.parse(cache);

    }

    console.log("🌐 Primera descarga...");

    return await actualizarCache();

}

// ========================================

async function actualizarCache() {

    const response = await fetch(

        API_URL + "?t=" + Date.now(),

        {

            cache: "no-store"

        }

    );

    if (!response.ok) {

        throw new Error("No se pudieron descargar los participantes.");

    }

    const json = await response.json();

    const participantes = normalizarParticipantes(json);

    localStorage.setItem(

        CACHE_KEY,

        JSON.stringify(participantes)

    );

    console.log("✅ Caché actualizada");

    return participantes;

}

// ========================================

function normalizarParticipantes(datos) {

    return datos.map((p, i) => ({

        id: String(i + 1),

        nombre: p["Nombre completo"] || "",

        documento: p["N° de cedula o pasaporte"] || "",

        edad: Number(p["Edad"]) || 0,

        sexo: p["Sexo"] || "",

        pais: p["Pais"] || p["País"] || "",

        ciudad: p["Ciudad - Departamento"] || "",

        iglesia: p["Iglesia o ministerio al que pertenece"] || "",

        telefono: p["Teléfono"] || "",

        correo: p["Correo electrónico"] || "",

        condicionMedica:
            p["¿Tiene alguna condición medica o alimentaria que debamos conocer?"] ||
            p["Condición médica"] ||
            ""

    }));

}