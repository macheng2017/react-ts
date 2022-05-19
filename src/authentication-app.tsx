import {useAuth} from "./context/auth-context";
import {UnauthenticationdApp} from "./unauthentication-app";
import {ProjectListScreen} from "./screens";

export  const AuthenticationApp = () =>{
        const {user}=useAuth()
    return (<div>
            {user ? <ProjectListScreen/> :<UnauthenticationdApp/>}
        </div>
    )
}
