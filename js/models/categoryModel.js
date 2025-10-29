import { request } from "../services/fetch.js"

// Funktion der henter listen af kategorier fra serveren
export const getList = async () => {
    // URL til API'et hvor kategorierne findes
    const url = 'http://localhost:4000/api/categories'

    // Sender en GET-anmodning til serveren og venter på svar
    const data = await request(url)

    // Returnerer de hentede data (typisk en liste af kategorier)
    return data
}