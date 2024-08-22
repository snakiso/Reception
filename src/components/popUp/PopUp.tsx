import {clsx} from "clsx";

import s from "./popUp.module.scss";
import {Typography} from "../ui/typography/Typography.tsx";
import {Button} from "../ui/button/Button.tsx";
import {Dispatch} from "react";
import {createPortal} from "react-dom";


type PopUpProps = {
    close: () => void;
    id: number;
    isOpen: boolean;
    title: string;
    setIsRegistered: Dispatch<boolean>
};

export const PopUp = ({close, id, isOpen, title, setIsRegistered}: PopUpProps) => {
   // const update = useContext(RegisteredContext)
    const classNames = clsx(s.popUp, isOpen && s.active);

    // const updateHandler = () => {
    //     update({id, registered: true});
    //     close();
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
        close();
    }

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
                    onClick={confimRegistration}
                    variant={"primary"}
                >
                    <Typography variant={"body2m"}>Да</Typography>
                </Button>
            </div>
        </div>, document.body)
    );
};
