export const setSessionItem = (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value))
}

export const getSessionItem = name => {
    try {
        const value = sessionStorage.getItem(name)
        return value ? JSON.parse(value) : null
    } catch (error) {
        return null        
    }
}

export const deleteSessionItem = name => {
    sessionStorage.removeItem(name)
}

export const getToken = () => {
    return getSessionItem('sgtprepper_token')
}

export const setToken = token => {
    setSessionItem('sgtprepper_token', token)
}

export const clearToken = () => {
    deleteSessionItem('sgtprepper_token')

    if(!window.location.pathname.includes('/login')) {
        window.location.href = '/index.htm#/login'
    }
}

export const isTokenExpired = token => {
    if (!token) return true;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
            return true;
        }
        return false;
    } catch {
        return true;
    }
}

export const isLoggedIn = async () => {
    const token = getToken();

    if (!token?.accessToken) {
        return false;
    }

    if (isTokenExpired(token.accessToken)) {
        clearToken();
        return false;
    }

    try {
        const response = await Authorize();
        if (!response) {
            clearToken();
            return false;
        }
        return true;
    } catch {
        return false;
    }
}