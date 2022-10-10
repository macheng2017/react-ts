import {useState} from "react";
import {LoginScreen} from "./login";
import {RegisterScreen} from "./register";
import {Button, Card, Divider} from "antd";
import styled from "@emotion/styled";
import logo from "../assets/logo.svg"
import left from "../assets/left.svg"
import right from "../assets/right.svg"

export const UnauthenticationdApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return <Container>
        <Header/>
        <Background/>
        <ShadowCard>
            <Title>{isLoggedIn ? "请注册" : "请登录"} </Title>
            {isLoggedIn ? <RegisterScreen/> : <LoginScreen/>}
            <Divider/>
            <Button type={'link'} onClick={() => setIsLoggedIn(!isLoggedIn)}>{isLoggedIn ? "已经有账号了?点我登录" : "还没有账号?点我注册"}</Button>
        </ShadowCard>
    </Container>
}
export const LongButton = styled(Button)`
width: 100%;
`
const Title = styled.h2`
  margin-bottom: 3.2rem;
  color: rgb(94, 108, 132);

`
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center; // 让box中的元素居中显示
`
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  width: 100%;
  padding: 3rem 0;
  background-size: 8rem;
`
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
    //background: url(${left}) left bottom/calc((100vw - 40rem)/2 - 3.2rem) fixed no-repeat,  url(${right}) right bottom/calc((100vw - 40rem)/2 - 3.2rem) fixed no-repeat;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

