import {List} from "./list";
import {useState} from "react";
import {SearchPanel} from "./search-panel";
import {useDebounce, useMount} from "../utils";
import {useHttp} from "../utils/http";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProject} from "../utils/use-project";

export const ProjectListScreen = () => {
    // {"status":404,"message":"No user with the id \"193416166193416160\""}
    // 这里找不到 user id 很奇怪,没有说要user id 啊
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState<null | Error>(null)

    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 200)
    const {isLoading, error, data: list} = useProject(debouncedParam)
    // 请求项目列表的api需要用到useEffect
    // 这个组件中的list其他组件也需要用到,需要状态提升到父组件当中
    // const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const client = useHttp()
    // 使用自定义hook
    useMount(() => {
        client('users').then(setUsers)
    }) // 空数组可以让页面渲染的时候只执行一次

    // 这里的[param]变化的时候去同步,去请求
    // const handleLogout = async () => {
    //     await logout()
    //     return <LoginScreen/>
    // }
    // 这里直接使用自定义hook中引入的logout就行
    //
    // useEffect(() => {
    //     // error ? setList([]) : null
    //     if (error) setList([])
    // }, [error])
    return <Container>
        <h1>项目列表</h1>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List loading={isLoading} dataSource={list || []} users={users}/>
    </Container>
}
const Container = styled.div`
  padding: 3.2rem;
`;
