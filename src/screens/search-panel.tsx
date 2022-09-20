export interface User {
    id: string;
    name: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[];
    param: {
        name: string;
        personId: string;
    }
    // 引用自身的定义
    setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({param, setParam, users}: SearchPanelProps) => {
    return <form action="">
        <div>
            {/* 下面的写法等价于这个{setParam(Object.assign({}, param,{name:evt.target.name}))}*/}
            <input type="text" value={param.name} onChange={(evt) => setParam({
                ...param,
                name: evt.target.value
            })}/>
            <select value={param.personId} onChange={(evt) => setParam({
                ...param,
                personId: evt.target.value
            })}>
                <option value="">负责人</option>
                {users.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
        </div>
    </form>
}
