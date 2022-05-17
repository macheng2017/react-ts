import React, {ReactNode} from "react";
import * as auth from "../auth/auth-provider";
import {User} from "../screens/search-panel";

interface AuthForm {
    username: string;
    password: string;
}

// 使用React自带的Context,管理登录状态,提供给其他组件使用
// 这里下次做的时候不一定能想起来使用泛型,想想怎么提醒自己,跟着感觉走?
// 这里有点像 vue 的状态
const AuthContext = React.createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>,
    register: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'


// 提供给外部使用的方法
export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = React.useState<User | null>(null)

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))


    return <AuthContext.Provider children={children} value={{user, login, register, logout}}/>
}
// 自定hook
export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context){
        throw new Error( 'useAuth must be used within an AuthProvider')
    }
    return context
}


