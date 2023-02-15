import {useEffect} from "react";
import {useHttp} from "./http";
import {useAsync} from "./use-async";
import {User} from "../screens/search-panel";
import {CleanObj} from "./index";

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    const {run, ...result} = useAsync<User[]>()
    useEffect(() => {
        run(client('users', {data: CleanObj(param || {})}))
        // eslint-disable-next-line
    }, [param])
    return result

}
