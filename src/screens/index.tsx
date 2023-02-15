import {List} from "./list";
import {useState} from "react";
import {SearchPanel} from "./search-panel";
import {useDebounce} from "../utils";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProject} from "../utils/use-project";
import {useUsers} from "../utils/use-Users";

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
    // 使用这种方式 data:list 可以写别名
    const {isLoading, error, data: list} = useProject(debouncedParam)

    const {data: users} = useUsers()

    return <Container>
        <h1>项目列表</h1>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <SearchPanel param={param} setParam={setParam} users={users || []}/>
        <List loading={isLoading} dataSource={list || []} users={users || []}/>
    </Container>
}
const Container = styled.div`
  padding: 3.2rem;
`;
