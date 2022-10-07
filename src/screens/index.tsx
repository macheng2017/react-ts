import {List} from "./list";
import {useEffect, useState} from "react";
import {SearchPanel} from "./search-panel";
import {CleanObj, useDebounce, useMount} from "../utils";
import {useHttp} from "../utils/http";
import {Button} from "antd";
import {useAuth} from "../context/auth-context";

export const ProjectListScreen = () => {
    // {"status":404,"message":"No user with the id \"193416166193416160\""}
    // 这里找不到 user id 很奇怪,没有说要user id 啊
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 200)
    // 请求项目列表的api需要用到useEffect
    // 这个组件中的list其他组件也需要用到,需要状态提升到父组件当中
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const client = useHttp()
    useEffect(() => {
        client('projects', {data: CleanObj(debouncedParam)}).then(setList)
    }, [debouncedParam])
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


    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List list={list} users={users}/>
    </div>
}
