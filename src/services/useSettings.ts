import axios from "axios";
import {useQuery} from "@tanstack/react-query";


export const UseSettings = () => {
    const getSettings = async () => {
      return axios.get(`./settings.json`);
        //   return axios.get("../../../settings.json")
    }


    const {data: settings, isSuccess} = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,
        select: (data) => data.data,
    })


    return {settings, isSuccess}
};


