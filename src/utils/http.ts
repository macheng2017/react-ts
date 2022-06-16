import qs from "qs";
import * as auth from "../auth/auth-provider"
import {useAuth} from "../context/auth-context";
const apiUrl = process.env["REACT_APP_API_URL"]

interface Config extends RequestInit {
    data?: object,
    token?: string
}

export const http = (endpoint: string, {data, token, headers, ...customConfig}: Config) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token + `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        ...customConfig
    }
    if (config.method === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data||{})
    }

    return fetch(`${apiUrl}/${endpoint}`, config).then( async r => {
        // 如果为401无授权，需要客户端配合，清除客户端的登录状态
        if (r.status === 401) {
            await auth.logout()
            // 为了防止有一些状态忘记清理。如果你能确保状态都被清理好了，不reload也没问题
            window.location.reload()
            return Promise.reject({message:'请重新登录'})
        }
        const data = await r.json()
        if (r.ok){
            return data
        }else {
            // 为什么要手动抛出一个错误？fetch为什么不会自动抛出错误？
            return Promise.reject(data)
        }
    })
}

