import {NavLink} from "react-router-dom";

import s from "./header.module.scss";
import {Typography} from "../../ui/typography/Typography.tsx";
import {useContext} from "react";
import {StylesContext} from "../../../app/App.tsx";


export const Header = () => {
    const styles = useContext(StylesContext)
    return (
        <header className={s.header}>
            <NavLink to={"alphabet"}>
                <img alt={""} className={s.headerImg} src={styles?.logo}/>
            </NavLink>
            <Typography className={s.headerTitle} variant={"h1"}>
                {styles?.event_title}
            </Typography>
        </header>
    );
};
