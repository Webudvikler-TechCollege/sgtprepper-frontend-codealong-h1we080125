// Importerer en hjælpefunktion til at lave fetch-kald (HTTP requests)
import { request } from "../services/fetch.js"

/**
 * Henter en liste af produkter indenfor en bestemt kategori.
 * @param {string} category - Kategoriens slug (fx "mad" eller "vand-og-vandrensning")
 */
export const getList = async (category) => {
    // Bygger URL’en til API’et baseret på kategorien
    const url = `http://localhost:4000/api/products/${category}`

    // Sender GET-request til serveren og venter på data
    const data = await request(url)

    // Returnerer listen af produkter fra serveren
    return data
}

/**
 * Henter detaljer om ét specifikt produkt.
 * @param {string} product - Produktets ID
 */
export const getDetails = async (product) => {
    // Bygger URL’en til API’et for at hente ét produkt via dets ID
    const url = `http://localhost:4000/api/products/byId/${product}`

    // Sender GET-request til serveren og venter på data
    const data = await request(url)

    // Returnerer produktdata (fx navn, beskrivelse, pris osv.)
    return data
}