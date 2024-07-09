import {clsx} from "clsx";

import s from "./popUp.module.scss";
import {Typography} from "../ui/typography/Typography.tsx";
import {Button} from "../ui/button/Button.tsx";
import {useContext} from "react";
import {RegisteredContext} from "../PersonList/personLine/PersonLine.tsx";
import {createPortal} from "react-dom";


type PopUpProps = {
    close: () => void;
    id: number;
    isOpen: boolean;
    title: string;
};

export const PopUp = ({close, id, isOpen, title}: PopUpProps) => {
    const update = useContext(RegisteredContext)
    const classNames = clsx(s.popUp, isOpen && s.active);

    const updateHandler = () => {
        update({id, registered: true});
        close();
    };

    return (
        createPortal(
        <div className={classNames}>
            <Typography className={s.popUpTitle} variant={"body2m"}>
                {title}
            </Typography>
            <div className={s.popUpButtons}>
                <Button className={s.popUpButton} onClick={close} variant={"outline"}>
                    <Typography variant={"body2m"}>Нет</Typography>
                </Button>
                <Button
                    className={s.popUpButton}
                    onClick={updateHandler}
                    variant={"primary"}
                >
                    <Typography variant={"body2m"}>Да</Typography>
                </Button>
            </div>
        </div>, document.body)
    );
};
