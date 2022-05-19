import {FormEvent} from "react";
import {useAuth} from "../context/auth-context";


export const LoginScreen = () => {
    const {login, user} = useAuth()
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        console.log(username, password)
        login({username, password}).then(r => console.log(r))
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">username</label>
                <input type={"text"} id="username"/>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input type={"password"} id="password"/>
            </div>
            <button type="submit">登录</button>
        </form>
    )
}
