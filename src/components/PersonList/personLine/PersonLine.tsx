import {createContext, memo, useContext, useEffect, useState} from "react";

import {clsx} from "clsx";

import s from "./personLine.module.scss";

import {SettingsContext} from "../../../app/App";
import {CheckIcon} from "../../../assets/icons/checkIcon";
import {ListIcon} from "../../../assets/icons/listIcon";
import {Typography} from "../../ui/typography/Typography.tsx";
import {IconButton} from "../../ui/iconButton/IconButton.tsx";
import {Participant} from "../../../types/participants.type.ts";
import {UseRegistered} from "../../../services/useRegistered.ts";
import {Card} from "../../card/Card.tsx";
import {PopUp} from "../../popUp/PopUp.tsx";
import {Loader} from "../../ui/loader/Loader.tsx";


type PersonLineProps = {
    data: Participant;
};

export const RegisteredContext = createContext<(params: { id: number, registered: boolean }) => void>(() => {
});

export const PersonLine = memo(({data}: PersonLineProps) => {
    const settings = useContext(SettingsContext);
    const id = data.id;
    const {mutate: update, isPending} = UseRegistered()
    const [openInfo, setOpenInfo] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [isRegistered, setIsRegistered] = useState(data.registered)

    const classNames = {
        personLine: clsx(s.personLine, isRegistered && s.active),
        table: clsx(s.table, isRegistered && s.active),
        text: clsx(s.text, isRegistered && s.active),
    };

    useEffect(() => {
        if (data) {
            setIsRegistered(data.registered)
        }
    }, [data]);

    useEffect(() => {
        const registeredArr = JSON.parse(localStorage.getItem('registered')) || []
        if (registeredArr.includes(id)) {
            setIsRegistered(true)
        }
    }, []);

    const confirmRegistration = () => {
        if (settings?.confirm) {
            setOpenPopup(true);
        } else {
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
        }
    };

    // useEffect(() => {
    //     if (response) {
    //         setIsRegistered(response.IS_ATTENDED)
    //     }
    // }, [response]);


    // const confirmRegistration = () => {
    //     if (settings?.confirm) {
    //         setOpenPopup(true);
    //     } else {
    //         update({id, registered: true})
    //     }
    // };

    return (
        <RegisteredContext.Provider value={update}>
            <>
                {openInfo && (
                    <Card
                        close={() => setOpenInfo(false)}
                        data={data}
                        id={data.id}
                        open={openInfo}
                        isRegistered={isRegistered}
                        setIsRegistered={setIsRegistered}
                    />
                )}
                {openPopup && (
                    <PopUp
                        close={() => setOpenPopup(false)}
                        id={data.id}
                        isOpen={openPopup}
                        title={"Подтвердить регистрацию?"}
                    />
                )}
                {(openInfo || openPopup) && <div className={s.darkBg}></div>}
                <div className={classNames.personLine}>
                    <div className={classNames.text}>
                        <Typography variant={"body1s"}>
                            {data.thirdName + " " + data.name}
                        </Typography>
                        <Typography variant={"body3r"}>{data.position}</Typography>
                    </div>
                    <div className={settings?.table ? s.personLineGroup : undefined}>
                        {settings?.table && (
                            <div className={classNames.table}>
                                <Typography variant={"body1s"}>{data.table}</Typography>
                            </div>
                        )}
                        <div className={s.icons}>
                            {isPending
                                ? <Loader/>
                                :
                                (isRegistered) ? (
                                    <IconButton className={s.check}>
                                        <CheckIcon/>
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={confirmRegistration}>
                                        <span className={s.accessButton}></span>
                                        {/*<ListIcon />*/}
                                    </IconButton>
                                )}
                            <IconButton onClick={() => setOpenInfo(true)}>
                                <ListIcon/>
                                {/*<PersonIcon />*/}
                            </IconButton>
                        </div>
                    </div>
                </div>
            </>
        </RegisteredContext.Provider>
    )
})
