// ========================================
// API de Google Apps Script
// ========================================

const API_URL = "https://script.google.com/macros/s/AKfycbxhtQmLSIMAlSETDNFcFM7ExVzMuJFYTORnHejJXp6t1TENmodtgfiKCOwFrAtxekIf/exec";

async function obtenerParticipantes() {

    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    return datos;

}