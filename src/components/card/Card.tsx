import {clsx} from "clsx";

import s from "./card.module.scss";


import {Participant} from "../../types/participants.type.ts";
import {Button} from "../ui/button/Button.tsx";
import {Description} from "./cardComponents/description/Description.tsx";
import {CloseButton} from "./cardComponents/closeButton/closeButton.tsx";
import {OwnInfo} from "./cardComponents/ownInfo/OwnInfo.tsx";
import {useContext} from "react";
import {RegisteredContext} from "../PersonList/personLine/PersonLine.tsx";
import {createPortal} from "react-dom";

type CardProps = {
    close: (isOpen: boolean) => void;
    data: Participant;
    id: number;
    open: boolean;
    isRegistered: boolean
};

export const Card = ({close, data, id, open, isRegistered}: CardProps) => {
    const classNames = clsx(s.card, open && s.active);

    const update = useContext(RegisteredContext)
    const closeHandler = () => {
        close(false);
    };

    const updateHandler = (registered: boolean) => {
        update({id, registered});
        closeHandler();
    };

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
                        onClick={() => updateHandler(true)}
                        variant={"primary"}
                    >
                        Зарегистрировать
                    </Button>
                    <Button
                        disabled={!isRegistered}
                        onClick={() => updateHandler(false)}
                        variant={"primary"}
                    >
                        Отклонить
                    </Button>
                </div>
            </div>, document.body)
    );
};
