import {useQuery} from "@tanstack/react-query";
import {API} from "./service.ts";
import {Participant, ParticipantResponse} from "../types/participants.type.ts";

export const UseGetParticipants = () => {
    const {data, isSuccess} = useQuery({
        queryKey: ['participants'],
        queryFn: API.getParticipant,
        select: (data): ParticipantResponse => {
            const sortedData = data.data.sort((a, b) =>
                a.thirdName.localeCompare(b.thirdName),
            );

            const arrivedGuests = sortedData.filter((el) => el.registered);
            const nonArrivedGuests = sortedData.filter((el) => !el.registered);
            const letters = [
                ...new Set(
                    sortedData
                        .map((el) => el.thirdName[0])
                        .sort((a, b) => a.localeCompare(b)),
                ),
            ];

            const tables = [
                ...new Set(
                    sortedData
                        .map((el) => el.table)
                        .sort((a, b) => Number(a) - Number(b)),
                ),
            ];

            return {
                letters: letters,
                participant: [...sortedData] as Participant[],
                participantCount: {
                    all: sortedData.length,
                    arrived: arrivedGuests.length,
                    nonArrived: nonArrivedGuests.length,
                },
                table: tables,
            };
        },
        refetchInterval: 1000,
    })

    return {data, isSuccess}
};

