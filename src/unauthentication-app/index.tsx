import {useState} from "react";
import {LoginScreen} from "./login";
import {RegisterScreen} from "./register";
import {Button, Card} from "antd";

export const UnauthenticationdApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return <div style={{display:'flex', justifyContent:'center',}}>
        <Card>
            {isLoggedIn ? <LoginScreen/> : <RegisterScreen/>}
            <Button onClick={() => setIsLoggedIn(!isLoggedIn)}>{"切换登录注册"}</Button>
        </Card>
    </div>
}
