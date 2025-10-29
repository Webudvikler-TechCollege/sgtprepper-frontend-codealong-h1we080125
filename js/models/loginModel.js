// Importerer en hjælpefunktion til at lave fetch-kald (HTTP requests)
import { request } from "../services/fetch.js"

// Funktion der forsøger at logge brugeren ind
export const Authenticate = async (username, password) => {
    try {
        // URL til login-endpoint på serveren
        const url = `http://localhost:4000/api/auth/login`
        
        // Sender brugernavn og adgangskode til serveren som POST-request
        const data = await request(url, 'POST', { username, password })
        
        // Returnerer svaret fra serveren (fx token eller fejlbesked)
        return data
    } catch (error) {
        // Skriver fejl i konsollen hvis noget går galt
        console.error(error)
    }
}