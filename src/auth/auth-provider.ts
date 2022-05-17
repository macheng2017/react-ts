import {User} from "../screens/search-panel";

const token = "__token__";
const apiUrl = process.env.REACT_APP_API_URL
const getToken = () => window.localStorage.getItem(token)

const handleLogin = ({user}: { user: User }) => {
    window.localStorage.setItem(user.token, token)
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
            return handleLogin(await res.json())
        }
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
            return handleLogin(await res.json())
        }
    })
}

export const logout = () => {
    window.localStorage.removeItem(token)
}
