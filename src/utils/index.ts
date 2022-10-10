import {useEffect, useState} from "react";

const isFalsy = (res: any) => {
    // 这里的函数的作用是为了排除if(res[k]); res[k]=0有意义的这种情况的
    // !!res 可以把结果转化为Boolean值
    return res === 0 ? true : !!res
}
// 解决CleanObj防止当val 为 字面量 false的时候被删掉的bug
const isValue = (val:unknown)=>{
    return val === null || '' || undefined
}
// 使用[key:string]:unknown 确定的高速typescript这里要的是一个k-v形式的object
export const CleanObj = (obj: { [key: string]: unknown }) => {
    const res = {...obj}
    Object.keys(res).forEach(k => {

        if (isValue(res[k])) {

            delete res[k]
        }
    })
    return res
}
// 创建一个自定义hook,来替换只加载一次的useEffect
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}
// 注意上面的写法 与 直接写callback 有什么区别?
// useEffect(callback, [])

// const debounce = (func, delay) => {
//     let timeout
//     return function () {
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(() => {
//             func()
//         }, delay)
//     }
// }
//
// const log = debounce(()=>{ console.log('hello')},2000)
// log()
// log()
export const useDebounce = <T>(value: T, delay?: number) => {
    const [debouncedValue, setDebounceValue] = useState(value)
    useEffect(() => {
        // 1. 设定一个延迟更新 delay延迟时间的间隔
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        // 2. 第一次执行时,在延迟时间还没到时timeout为空,这时候执行clearTimeout(timeout)是清空了个寂寞
        // 3. 当第二次执行的时候
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debouncedValue
}

export const useArray = () => {
    // hello，请把作业写在这里吧，写完记得再对照作业要求检查一下
};

