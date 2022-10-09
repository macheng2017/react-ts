import {useAuth} from "./context/auth-context";
import {ProjectListScreen} from "./screens";
import {UnauthenticationdApp} from "./unauthentication-app";
import styled from "@emotion/styled";
import {Button} from "antd";
import {Row} from "./components/lib";


export const AuthenticationApp = () => {
    const {user} = useAuth()
    const {logout} = useAuth()
    return (<div>
            {user ? <Container>
                <Header between={true}>
                    <HeaderLeft gap={true}>
                        <h3>logo</h3>
                        <h3>项目</h3>
                        <h3>名称</h3>
                    </HeaderLeft>
                    <HeaderRight>
                        <Button htmlType={"button"} onClick={logout}>登出</Button>
                    </HeaderRight>
                </Header>
                <Main>
                    <ProjectListScreen/>
                </Main>
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
  height: 100vh;
`
// 使用grid-area给grid的子元素起个名字
const Header = styled(Row)``
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``
const Main = styled.main``

