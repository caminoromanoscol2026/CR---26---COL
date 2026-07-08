// ========================================
// API - Camino Romanos Colombia
// ========================================

const API_URL = "https://script.google.com/macros/s/AKfycbxhtQmLSIMAlSETDNFcFM7ExVzMuJFYTORnHejJXp6t1TENmodtgfiKCOwFrAtxekIf/exec";

async function obtenerParticipantes() {

    console.log("🌐 Descargando participantes...");

    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los participantes.");
    }

    const datos = await respuesta.json();

    console.log(`📥 ${datos.length} registros recibidos`);

    return datos.map(normalizarParticipante);

}

function normalizarParticipante(p) {

    return {

        id: String(p["N° de cedula o pasaporte"] ?? ""),

        nombre: String(p["Nombre completo"] ?? ""),

        documento: String(p["N° de cedula o pasaporte"] ?? ""),

        correo: String(p["Correo electrónico"] ?? ""),

        edad: Number(p["Edad"] ?? 0),

        sexo: String(p["Sexo"] ?? ""),

        pais: String(p["Pais"] ?? p["País"] ?? ""),

        ciudad: String(p["Ciudad - Departamento"] ?? ""),

        iglesia: String(p["Iglesia o ministerio al que pertenece"] ?? ""),

        telefono: String(p["Número de celular"] ?? p["Telefono"] ?? ""),

        condicionMedica: String(
            p["¿Tiene alguna condición medica o alimentaria que debamos conocer?"] ??
            ""
        ),

        timestamp: String(p["Marca temporal"] ?? ""),

        checkin: false

    };

}