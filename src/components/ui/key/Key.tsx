import { ComponentPropsWithoutRef, ReactNode } from "react";

import { clsx } from "clsx";

import s from "./key.module.scss";
import {Typography} from "../typography/Typography.tsx";



export type KeyProps = {
  children?: ReactNode;
  isActive: boolean;
  keyDown: () => void;
} & ComponentPropsWithoutRef<"button">;

export const Key = ({ children, isActive, keyDown, ...rest }: KeyProps) => {
  const classNames = clsx(s.key, isActive && s.active);

  return (
    <div className={s.buttonWrapper}>
      <button className={classNames} {...rest} onClick={keyDown}>
        <Typography as={"span"} variant={"body0s"}>
          {children}
        </Typography>
      </button>
    </div>
  );
};
