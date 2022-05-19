import {useState} from "react";
import {LoginScreen} from "./login";
import {RegisterScreen} from "./register";

export const UnauthenticationdApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return <div>
        {isLoggedIn ? <LoginScreen/> : <RegisterScreen/>}
        <button onClick={
            () => {
                setIsLoggedIn(!isLoggedIn)
            }}>{isLoggedIn ? "登录" : "注册"}</button>
    </div>
}
