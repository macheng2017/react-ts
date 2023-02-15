/*custom hook 是用来将
loading error success，将异步请求，的一些散落在代码中的一些状态封装到一块形成一个自定义hook
不是类似redux vuex的公用的状态管理，而是一个局部的方便处理异步相关状态的逻辑，也就是异步请求的一个hook形式的封装
它和redux很像，但

1. 让代码看起来更清爽
2. 方便处理异步逻辑
3. 方便维护
4. 重复利用？
5. 看起来更cool
*/
import {useState} from "react";

interface State<D> {
    error: Error | null;
    data: D | null; // 泛型的D是给这个属性用的
    stat: 'idle' | 'loading' | 'error' | 'success'
}

// idle 默认
// 默认值
const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

export const useAsync = <D>(initialState?: State<D>) => {
    // 用户传入的state要比我们定义的默认的defaultInitialState的优先级要高，放在后面会覆盖前面的定义
    const [state, setState] = useState<State<D>>({...defaultInitialState, ...initialState})
    const setError = (error: Error) => setState({
        error: error,
        data: null,
        stat: 'error'
    })

    const setData = (data: D) => setState({
        error: null,
        data: data,
        stat: 'success'
    })
    const setLoading = () => setState({
        error: null,
        data: null,
        stat: 'loading'
    })
    // run
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入Promise 类型数据')
        }
        setState({...state, stat: 'loading'})
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            return error
        })
    }

    return {
        isIdle: state.stat === 'idle',
        isSuccess: state.stat === 'success',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        run,
        setData,
        setError,
        ...state
    }
}
