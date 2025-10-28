import { Authorize } from "../models/loginModel.js";

// Gemmer en cookie med navn, værdi og udløbsdato
export const setCookie = (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
}

// Henter værdien af en cookie baseret på navn
const getCookie = name => {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

// Sletter en cookie ved at sætte udløbsdato til fortiden
export const deleteCookie = name => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Henter login-token fra cookie
export function getToken() {
    try { 
        const token = getCookie('sp_token'); 
        return token ? JSON.parse(token) : null;
    } catch { 
        return null; 
    }
}

// Gemmer login-token i cookie (gyldig i 7 dage)
export function setToken(token) {
    setCookie('sp_token', JSON.stringify(token), 7);
}

// Fjerner login-token og sender bruger til login-siden
export function clearToken() {
    deleteCookie('sp_token');
    // Kun redirect hvis vi ikke allerede er på login-siden
    if (!window.location.pathname.includes('/login')) {
        window.location.href = '/index.htm#/login';
    }
}

// Tjekker om JWT token er udløbet
export function isTokenExpired(token) {
    if (!token) return true;
    
    try {
        // Dekoder JWT payload (mellem første og anden punktum)
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Tjek om token er udløbet (exp er i sekunder, Date.now() er i millisekunder)
        if (payload.exp && payload.exp * 1000 < Date.now()) {
            return true;
        }
        
        return false;
    } catch {
        // Hvis vi ikke kan dekode token, betragt den som udløbet
        return true;
    }
}

// Tjekker om brugeren er logget ind
export async function isLoggedIn() {
    const token = getToken();
    
    // Hvis ingen token findes, er brugeren ikke logget ind
    if (!token?.accessToken) {
        return false;
    }
    
    // Tjek om token er udløbet lokalt FØRST (undgå unødvendige API-kald)
    if (isTokenExpired(token.accessToken)) {
        clearToken();
        return false;
    }
    
    // Verificer med server (kun hvis token ikke er udløbet lokalt)
    try {
        const response = await Authorize();
        
        // Hvis serveren ikke godkender, log ud
        if (!response) {
            clearToken();
            return false;
        }
        
        return true;
    } catch (error) {
        // Ved fejl er brugeren ikke logget ind (401 håndteres allerede i fetch.js)
        return false;
    }
}