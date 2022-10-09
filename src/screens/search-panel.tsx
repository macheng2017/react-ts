import {Form, Input, Select} from "antd";


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
    return <Form layout={"inline"} style={{marginBottom: '2rem'}} >
        <Form.Item>
            {/* 下面的写法等价于这个{setParam(Object.assign({}, param,{name:evt.target.name}))}*/}
            <Input placeholder={'项目名'} type="text" value={param.name} onChange={(evt) => setParam({
                ...param,
                name: evt.target.value
            })}/>

        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={(value) => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value="">负责人</Select.Option>
                {users.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </Select>
        </Form.Item>
    </Form>
}
