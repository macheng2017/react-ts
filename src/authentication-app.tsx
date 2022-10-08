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
                    <HeaderLeft>
                        <h3>logo</h3>
                        <h3>项目</h3>
                        <h3>名称</h3>
                    </HeaderLeft>
                    <HeaderRight>
                        <Button htmlType={"button"} onClick={logout}>登出</Button>
                    </HeaderRight>
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
// 什么时候使用grid和flex呢?
// 要布局的是一维还是二维如果是一维(只有一行或一列)用flex,如果是二维则用grid
// 看内容如果是照着内容布局用flex
// 如果先框架则用grid
// 也就是搭架子用grid,布局细节用flex

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem; // 横向排列
  grid-template-columns: 40rem 1fr 40rem; // 纵向排列
  // 像格子一样划分区域
  grid-template-areas:
          "header header header"
          "nav main aside"
          "footer footer footer";
  height: 100vh;
`
// 使用grid-area给grid的子元素起个名字
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row; // 默认是横向的,显式的标注出来
  align-items: center;
  justify-content: space-between;
`
const HeaderLeft = styled.div`
display: flex;
  align-items: center;
`
const HeaderRight = styled.div``
const Main = styled.main`grid-area: main`
const Aside = styled.aside`grid-area: aside`
const Footer = styled.footer`grid-area: footer`
const Nav = styled.nav`grid-area: nav`
