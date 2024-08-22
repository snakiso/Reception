import {useMutation} from "@tanstack/react-query";
import {API} from "./service.ts";
import {updateResponse} from "../types/participants.type.ts";

export const UseRegistered = () => {
    //  const queryClient = useQueryClient();
    const {mutate, isPending, isSuccess, data: response, reset} = useMutation<updateResponse, any, {
        id: number,
        registered: boolean
    }, unknown>({
        mutationKey: ['participants'],
        mutationFn: async ({id, registered}: { id: number, registered: boolean }): Promise<updateResponse> => {
            return API.updateParticipant(id, registered);
        },
        onSuccess: async () => {
            //  await queryClient.invalidateQueries({queryKey: ['participants']});
        }
    })

    return {mutate, isPending, isSuccess, response, reset}
};


