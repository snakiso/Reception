import {memo, useContext} from "react";

import s from "./personList.module.scss";

import {SettingsContext} from "../../app/App";
import {Participant} from "../../types/participants.type.ts";

import {PersonLine} from "./personLine/PersonLine.tsx";
import {Typography} from "../ui/typography/Typography.tsx";

type PersonListProps = {
    data: Participant[];
    marginBottom?: number;
};

export const PersonList = memo(({data, marginBottom}: PersonListProps) => {
    const settings = useContext(SettingsContext);

    return (
        <div
            className={s.list}
            style={{paddingBottom: `${(marginBottom ?? 0) + 20}px`}}
        >
            <div className={s.tableHeader}>
                <Typography as={"span"} variant={"body1m"}>
                    Данные
                </Typography>
                <div className={settings?.table ? s.tableHeaderGroup : undefined}>
                    {settings?.table && (
                        <Typography as={"span"} variant={"body1m"}>
                            № стола
                        </Typography>
                    )}
                    <Typography as={"span"} variant={"body1m"}>
                        Действия
                    </Typography>
                </div>
            </div>

            {data?.map((el) => <PersonLine data={el} key={el.id}/>)}
        </div>
    );
});
