import {FormEvent} from "react";
import {login, register} from "../../auth/auth-provider";


export const LoginScreen = () => {

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        console.log(username, password)
        login({username, password})
    }
    return (
        <form onSubmit={handleSubmit}>

            {/* 下面的写法相当于 <div children={<><label htmlFor="username">username</label> <input type={"text"} id="username"/> </>}/>*/}
            {/* input元素相当于挂在div中的children属性 */}
            <div>
                <label htmlFor="username">username</label>
                <input type={"text"} id="username"/>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input type={"password"} id="password"/>
            </div>
            <button type="submit">注册</button>
        </form>
    )
}
