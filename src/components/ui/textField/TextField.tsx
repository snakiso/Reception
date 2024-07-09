import { ChangeEvent } from "react";

import s from "./textField.module.scss";

import { SearchIcon } from "../../../assets/icons/searchIcon";

type TextFieldProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const TextField = ({ onChange, value }: TextFieldProps) => {
  return (
    <div className={s.box}>
      <input
        className={s.textField}
        onChange={onChange}
        placeholder={"Искать по ФИО"}
        type={"search"}
        value={value}
      />
      <SearchIcon />
    </div>
  );
};
