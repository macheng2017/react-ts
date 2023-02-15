import {useHttp} from "./http";
import {useEffect} from "react";
import {CleanObj} from "./index";
import {Project} from "../screens/list";
import {useAsync} from "./use-async";

export const useProject = (param?: Partial<Project>) => {
    const client = useHttp()
    const {run, ...result} = useAsync<Project[]>()
    useEffect(() => {
        run(client('projects', {data: CleanObj(param || {})}))
        // eslint-disable-next-line
    }, [param])
    return result
}

