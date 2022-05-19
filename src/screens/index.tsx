import {List} from "./list";
import {useEffect, useState} from "react";
import {SearchPanel} from "./search-panel";
import {CleanObj, useDebounce, useMount} from "../utils";
import qs from "qs";
// vite 上与webpack不同的地方 [环境变量和模式 | Vite 官方中文文档](https://cn.vitejs.dev/guide/env-and-mode.html)
const apiUrl = process.env.VITE_REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: "",
        personId: ""
    })
    const debouncedParam = useDebounce(param, 200)
    // 请求项目列表的api需要用到useEffect
    // 这个组件中的list其他组件也需要用到,需要状态提升到父组件当中
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
        //[Using Fetch - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
        fetch(`${apiUrl}/projects?${qs.stringify(CleanObj(debouncedParam))}`).then(async resp => {
            // 这里使用了一个qs的第三方的库,方便以后扩展查询字符串
            if (resp.ok) {
                // console.log("apiUrl", apiUrl)
                setList(await resp.json())
                // console.log("list", list)
            }
        })
    }, [debouncedParam])
    // 使用自定义hook
    useMount(() => {
        fetch(`${apiUrl}/users`).then(
            async resp => {
                if (resp.ok) {
                    setUsers(await resp.json())
                    // console.log("users", users)
                }
            }
        )
    }) // 空数组可以让页面渲染的时候只执行一次

    // 这里的[param]变化的时候去同步,去请求
    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List list={list} users={users}/>
    </div>
}
