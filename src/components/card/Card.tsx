import {clsx} from "clsx";

import s from "./card.module.scss";


import {Participant} from "../../types/participants.type.ts";
import {Button} from "../ui/button/Button.tsx";
import {Description} from "./cardComponents/description/Description.tsx";
import {CloseButton} from "./cardComponents/closeButton/closeButton.tsx";
import {OwnInfo} from "./cardComponents/ownInfo/OwnInfo.tsx";
import {Dispatch} from "react";
import {createPortal} from "react-dom";

type CardProps = {
    close: (isOpen: boolean) => void;
    data: Participant;
    id: number;
    open: boolean;
    isRegistered: boolean
    setIsRegistered: Dispatch<boolean>
};


export const Card = ({close, data, id, open, isRegistered, setIsRegistered}: CardProps) => {
    const classNames = clsx(s.card, open && s.active);

    // const update = useContext(RegisteredContext)
    const closeHandler = () => {
        close(false);
    };

    // const updateHandler = (registered: boolean) => {
    //     update({id, registered});
    //     closeHandler();
    // };

    const confimRegistration = () => {
        setIsRegistered(true);

        const registeredArr = JSON.parse(localStorage.getItem('registered')) || []
        let unregisteredArr = JSON.parse(localStorage.getItem('unregistered')) || []

        if (unregisteredArr.includes(id)) {
            unregisteredArr = unregisteredArr.filter(item => item !== id);
            localStorage.setItem('unregistered', JSON.stringify(unregisteredArr));
        } else if (!registeredArr.includes(id)) {
            registeredArr.push(id);
            localStorage.setItem('registered', JSON.stringify(registeredArr));
        }
        closeHandler()
    }

    const cancelRegistration = () => {
        setIsRegistered(false)
        let registeredArr = JSON.parse(localStorage.getItem('registered')) || []
        const unregisteredArr = JSON.parse(localStorage.getItem('unregistered')) || []
        if (registeredArr.includes(id)) {
            registeredArr = registeredArr.filter(item => item !== id);
            localStorage.setItem('registered', JSON.stringify(registeredArr));
        } else if (!unregisteredArr.includes(id)) {
            unregisteredArr.push(id);
            localStorage.setItem('unregistered', JSON.stringify(unregisteredArr));
        }
        closeHandler()
    }


    return (
        createPortal(
            <div className={classNames}>
                <CloseButton close={closeHandler}/>
                <OwnInfo
                    name={data.name}
                    photo={data.photo}
                    registered={isRegistered}
                    secondName={data.secondName}
                    table={data.table}
                    thirdName={data.thirdName}
                />
                <div className={s.cardDescription}>
                    <Description description={data.organization} title={"Организация"}/>
                    <Description description={data.position} title={"Должность"}/>
                    <Description
                        description={data.phone}
                        link={!!data.phone}
                        title={"Номер мобильного"}
                    />
                    <Description description={`${data.id}`} title={"ID"}/>
                </div>
                <div className={s.cardButtons}>
                    <Button
                        disabled={isRegistered}
                        onClick={confimRegistration}
                        variant={"primary"}
                    >
                        Зарегистрировать
                    </Button>
                    <Button
                        disabled={!isRegistered}
                        onClick={cancelRegistration}
                        variant={"primary"}
                    >
                        Отклонить
                    </Button>
                </div>
            </div>, document.body)
    );
};
