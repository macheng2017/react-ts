import {User} from "../screens/search-panel";

const localStorageKey = "__token__";
const apiUrl = process.env.REACT_APP_API_URL
const getToken = () => window.localStorage.getItem(localStorageKey)

const handleUserResponse = ({user}: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token)
    return user
}


export const login = (params: { username: string, password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    },).then(async res => {
        if (res.ok) {
            return handleUserResponse(await res.json())
        }
        return Promise.reject(params)
    })
}

export const register = (params: { username: string, password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    },).then(async res => {
        if (res.ok) {
            return handleUserResponse(await res.json())
        }
        return Promise.reject(params)
    })
}

export const logout = async() => {
    return window.localStorage.removeItem(localStorageKey)
}
