import {useAuth} from "./context/auth-context";
import {ProjectListScreen} from "./screens";
import {UnauthenticationdApp} from "./unauthentication-app";
import styled from "@emotion/styled";
import {Button} from "antd";


export const AuthenticationApp = () => {
    const {user} = useAuth()
    const {logout} = useAuth()
    return (<div>
            {user ? <Container>
                <Header>
                    <Button htmlType={"button"} onClick={logout}>登出</Button>
                </Header>
                <Nav>nav</Nav>
                <Main>
                    <ProjectListScreen/>
                </Main>
                <Aside>aside</Aside>
                <Footer>footer</Footer>
            </Container> : <UnauthenticationdApp/>}
            {/*<ProjectListScreen/>*/}
        </div>
    )
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 40rem 1fr 40rem;
  grid-template-areas:
          "header header header"
          "nav main aside"
          "footer footer footer";
  height: 100vh;
`
// 使用grid-area给grid的子元素起个名字
const Header = styled.header` grid-area: header`
const Main = styled.main`grid-area: main`
const Aside = styled.aside`grid-area: aside`
const Footer = styled.footer`grid-area: footer`
const Nav = styled.nav`grid-area: nav`
