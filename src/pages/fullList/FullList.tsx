import {ChangeEvent, useEffect, useState} from "react";

import s from "./fullList.module.scss";

import {PersonList} from "../../components/PersonList/PersonList";
import {Participant} from "../../types/participants.type.ts";
import {UseGetParticipants} from "../../services/useGetParticipants.ts";
import {TextField} from "../../components/ui/textField/TextField.tsx";
import {Select} from "../../components/ui/select/Select.tsx";


type IsRegistered = "all" | "check" | "uncheck";

export const FullList = () => {
    const {data, isSuccess} = UseGetParticipants()
    let resultData: Participant[] = [];
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Participant[]>([]);
    const [selectValue, setSelectValue] = useState<IsRegistered>("all");


    const changeSelectValue = (value: IsRegistered) => {
        setSelectValue(value);
        if (data) {
            if (value === "check") {
                console.log('here')
                resultData = data.participant.filter(
                    (item) => item.registered,
                );
                setSelectValue("check");
                setSearchResults(resultData);
            } else if (value === "uncheck") {
                resultData = data.participant.filter(
                    (item) => !item.registered,
                );
                setSelectValue("uncheck");
                setSearchResults(resultData);
            } else {
                setSearchResults(data.participant);
            }
        }
    };

    useEffect(() => {
        changeSelectValue(selectValue);
    }, [data]);

    const search = (query: string) => {
        if (isSuccess && data) {
            resultData = data.participant.filter(
                (item) =>
                    item.name.toLowerCase().startsWith(query.toLowerCase()) ||
                    item.thirdName.toLowerCase().startsWith(query.toLowerCase()),
            );
            setSelectValue("all");
            setSearchResults(resultData);
        }
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
        search(e.currentTarget.value);
    };

    return (
        <div>
            <TextField onChange={handleChange} value={searchTerm}/>
            <div className={s.selectContainer}>
                <Select onValueChange={changeSelectValue} value={selectValue}/>
            </div>
            <PersonList data={searchResults}/>
        </div>
    );
};
