import {ReactNode, Ref, forwardRef} from "react";

import s from "./keyboard.module.scss";
import {Typography} from "../ui/typography/Typography.tsx";


type KeyboardProps = {
    children?: ReactNode;
    title: string;
};

export const Keyboard = forwardRef<HTMLDivElement, KeyboardProps>(
    ({children, title}, ref: Ref<HTMLDivElement>) => {
        return (
            <div className={s.box} ref={ref}>
                <Typography variant={"body1s"}>{title}</Typography>
                <div className={s.keyboard}>{children}</div>
            </div>
        );
    },
);
