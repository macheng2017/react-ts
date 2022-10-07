import {useAuth} from "./context/auth-context";
import {ProjectListScreen} from "./screens";
import {UnauthenticationdApp} from "./unauthentication-app";
import styled from "@emotion/styled";
import {Button} from "antd";


export const AuthenticationApp = () => {
    const {user} = useAuth()
    const {logout} = useAuth()
    return (<div>
            {user ? <div>
                <PageHeader>
                    <Button htmlType={"button"} onClick={logout}>登出</Button>
                </PageHeader>
                <Main>
                    <ProjectListScreen/>
                </Main>
            </div> : <UnauthenticationdApp/>}
            {/*<ProjectListScreen/>*/}
        </div>
    )
}


const PageHeader = styled.header`
  background-color: gray;
  height: 4rem
`
const Main = styled.main`
  height: calc(100vh - 4rem);
`
