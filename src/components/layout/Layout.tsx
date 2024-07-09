import {Outlet} from "react-router-dom";

import s from "./layout.module.scss";
import {Header} from "./header/Header.tsx";
import {Links} from "./links/Links.tsx";


export const Layout = () => {
    return (
        <>
            <div className={s.bgLayout}></div>

            <Header/>
            <Links/>
            <Outlet/>
        </>
    );
};
