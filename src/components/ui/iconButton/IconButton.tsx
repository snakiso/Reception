import { ComponentPropsWithoutRef, ReactNode } from "react";

import { clsx } from "clsx";

import s from "./iconButton.module.scss";

type IconButtonProps = {
  children?: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"button">;
export const IconButton = ({
  children,
  className,
  ...rest
}: IconButtonProps) => {
  const classNames = clsx(s.iconButton, className);

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};
