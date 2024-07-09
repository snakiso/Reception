import {useContext} from "react";
import {NavLink} from "react-router-dom";

import {clsx} from "clsx";

import "./navLink.scss";

import s from "./links.module.scss";

import {SettingsContext} from "../../../app/App";
import {Alphabet} from "../../../assets/icons/alphabet";
import {ListLink} from "../../../assets/icons/listLink";
import {Tables} from "../../../assets/icons/tables";
import {Typography} from "../../ui/typography/Typography.tsx";


const linkClass = clsx(s.link, "link");

export const Links = () => {
    const settings = useContext(SettingsContext);

    return (
        <nav className={s.links}>
            <div className={s.linksGroup}>
                <NavLink className={linkClass} to={"alphabet"}>
                    <Alphabet/>
                    <Typography variant={"body1m"}>А — Я</Typography>
                </NavLink>
                {settings?.table && (
                    <NavLink className={linkClass} to={"table"}>
                        <Tables/>
                        <Typography variant={"body1m"}>По столам</Typography>
                    </NavLink>
                )}
            </div>
            <NavLink className={linkClass} to={"list"}>
                <ListLink/>
                <Typography variant={"body1m"}>Полный список</Typography>
            </NavLink>
        </nav>
    );
};