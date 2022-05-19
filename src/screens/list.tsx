import {User} from "./search-panel";

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: string;
    organization: string;
}

interface ListProps {
    list: Project[],
    users: User[]
}

export const List = ({list, users}: ListProps) => {
    // const newList = list.map(item => {
    //     return users.find(user => item.personId === user.personId ? item.name : item.personId)
    // })
    // 下面的做法是直接输入显示了,这里的想法是想生成一个新的数组再到下面循环使用
    return <table>
        <thead>
        <tr>
            <th>名称</th>
            <th>负责</th>
        </tr>
        </thead>
        <tbody>
        {
            list.map(project => {
                    return (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            {/*这里需要好好琢磨一下,注意这里在map里面*/}
                            {/*find 很可能会返回undefined,使用? 可以如果前面返回一个undefined.name则整个表达式都会返回undefined而不会报错
                            也就是保证不出错可以配合||使用
                            */}
                            <td>{users.find(v => v.id === project.personId)?.name || '未知'}</td>
                        </tr>)
                }
            )
        }
        </tbody>
    </table>
}
