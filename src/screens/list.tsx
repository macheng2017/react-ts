import {User} from "./search-panel";
import {Table, TableProps} from "antd";
import dayjs from "dayjs";

export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: string;
    organization: string;
    created: number;
}

// 这样我们传入的数据已经包含在TableProps当中了,叫做DataSource,可以把list:Project[] 删除了
interface ListProps extends TableProps<Project> {
    users: User[]
}
// 注意这里的写法,{users, ...props}其实 ListProps包含两部分参数,一部分是user,另一部分是TableProps
// {users,...props}中的...props是去掉users的剩余部分
// 如果定义一个类型别名 type PropsType = Omit<ListProps,'users'>
export const List = ({users, ...props}: ListProps) => {
    // const newList = list.map(item => {
    //     return users.find(user => item.personId === user.personId ? item.name : item.personId)
    // })
    // 下面的做法是直接输入显示了,这里的想法是想生成一个新的数组再到下面循环使用
    // 2023年10月14日 现在为了添加一个loading的状态,其实ant组件的table中有一个loading属性,如果直接添加需要在ListProps也要添加相应的属性
    // 考虑到以后还有其他属性添加改动, 这里考虑能不能从外界list中直接透传到Table上而不用添加接口定义,方法是有的让ListProps extends 一个tableProps
    // 这里的DataSource就可以删掉了,为啥可以删掉了?
    return <Table rowKey={list => list.id} columns={[
        {title: '名称', dataIndex: 'name', key: 'name'},
        {title: '部门', dataIndex: 'organization', key: 'organization'},
        {
            title: '负责',
            dataIndex: 'id',
            key: 'id',
            render: (_, project) => {
                return <>{users.find(v => v.id === project.personId)?.name || '未知'}</>
            },
        },
        {
            title: '创建时间', dataIndex: 'created', key: 'created',
            render: (_, project) => {
                return <span> {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
            }
        },
    ]} {...props}/>
    // <table>
    //     <thead>
    //     <tr>
    //         <th>名称</th>
    //         <th>负责</th>
    //     </tr>
    //     </thead>
    //     <tbody>
    //     {
    //         list.map(project => {
    //                 return (
    //                     <tr key={project.id}>
    //                         <td>{project.name}</td>
    //                         {/*这里需要好好琢磨一下,注意这里在map里面*/}
    //                         {/*find 很可能会返回undefined,使用? 可以如果前面返回一个undefined.name则整个表达式都会返回undefined而不会报错
    //                         也就是保证不出错可以配合||使用
    //                         */}
    //                         <td>{users.find(v => v.id === project.personId)?.name || '未知'}</td>
    //                     </tr>)
    //             }
    //         )
    //     }
    //     </tbody>
    // </table>
}
