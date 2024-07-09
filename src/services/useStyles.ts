import {useQuery} from "@tanstack/react-query";
import {API} from "./service.ts";


export const UseStyles = () => {

    const {data: styles, isSuccess} = useQuery({
        queryKey: ['styles'],
        queryFn: API.getStyles,
        select: (data) => data.data,
    })

    return {styles, isSuccess}
};

