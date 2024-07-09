import {ComponentPropsWithoutRef, ElementType, ReactNode} from "react";

import {clsx} from "clsx";

import s from "./typography.module.scss";

export interface TextProps<T extends ElementType> {
    as?: T;
    children?: ReactNode;
    className?: string;
    variant?:
        | "body0s"
        | "body1m"
        | "body1s"
        | "body2m"
        | "body2s"
        | "body3r"
        | "h1";
}

export function Typography<T extends ElementType = "p">({
                                                            as,
                                                            className = '',
                                                            variant = "body1s",
                                                            ...restProps
                                                        }: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>) {
    const Component = as || "p";

    const classNames = clsx(className ?? '', s[variant]);

    return <Component className={classNames} {...restProps} />;
}
