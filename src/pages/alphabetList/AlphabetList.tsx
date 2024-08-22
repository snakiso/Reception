import {Ref, useEffect, useRef, useState} from "react";

import {PersonList} from "../../components/PersonList/PersonList";
import {Participant} from "../../types/participants.type.ts";
import {Key} from "../../components/ui/key/Key.tsx";
import {Keyboard} from "../../components/keyboard/Keyboard.tsx";
import {UseGetParticipants} from "../../services/useGetParticipants.ts";
import {useFetching} from "../../hooks/useFetching.ts";


export const AlphabetList = () => {
    const [currentLetter, setCurrentLetter] = useState<string>("");
    const [keyBoardHeight, setKeyBoardHeight] = useState(0);
    const {data, isSuccess} = UseGetParticipants()

    const divRef: Ref<HTMLDivElement> = useRef(null);
    let filteredParticipants: Participant[] = [];

    if (data) {
        filteredParticipants = data.participant.filter(
            (el) => el.thirdName[0] === currentLetter,
        );
    }

    useEffect(() => {
        const letter = localStorage.getItem("letter");

        if (data) {
            if (divRef.current) {
                setKeyBoardHeight(divRef.current.clientHeight);
            }
            if (letter && letter !== "undefined") {
                setCurrentLetter(JSON.parse(letter));
            } else {
                setCurrentLetter(data.letters[0]);
                localStorage.setItem("letter", JSON.stringify(data.letters[0]));
            }
        }
    }, [isSuccess]);

    const ClickHandler = (key: string) => {
        setCurrentLetter(key);
        localStorage.setItem("letter", JSON.stringify(key));
    };

    return (
        <div>
            <PersonList data={filteredParticipants} marginBottom={keyBoardHeight}/>
            <Keyboard ref={divRef} title={"Выберите первую букву фамилии"}>
                {data?.letters?.map((el) => (
                    <Key
                        isActive={el === currentLetter}
                        key={el}
                        keyDown={() => ClickHandler(el)}
                    >
                        {el}
                    </Key>
                ))}
            </Keyboard>
        </div>
    );
};
