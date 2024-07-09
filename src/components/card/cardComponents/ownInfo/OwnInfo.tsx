import { useContext } from "react";

import { clsx } from "clsx";

import s from "./ownInfo.module.scss";

import { SettingsContext } from "../../../../app/App";
import { CheckIcon } from "../../../../assets/icons/checkIcon";
import { PhotoIcon } from "../../../../assets/icons/photoIcon";
import { UncheckIcon } from "../../../../assets/icons/uncheckIcon";
import {Typography} from "../../../ui/typography/Typography.tsx";


type OwnInfoProps = {
  name: string;
  photo?: string;
  registered: boolean;
  secondName: string;
  table: string;
  thirdName: string;
};

export const OwnInfo = ({
  name,
  photo,
  registered,
  secondName,
  table,
  thirdName,
}: OwnInfoProps) => {
  const settings = useContext(SettingsContext);

  const classNames = {
    status: clsx(s.status, registered ? s.active : s.unactive),
  };

  return (
    <div className={s.ownInfo}>
      {settings?.photo &&
        (photo ? (
          <img alt={""} className={s.photo} src={photo} />
        ) : (
          <PhotoIcon className={s.photo} />
        ))}
      <div>
        {settings?.table && (
          <Typography variant={"body1m"}>Стол № {table}</Typography>
        )}

        <div className={classNames.status}>
          {registered ? (
            <>
              {" "}
              <CheckIcon />
              <Typography variant={"body2s"}>Зарегистрирован</Typography>
            </>
          ) : (
            <>
              <UncheckIcon />
              <Typography variant={"body2s"}>Не зарегистрирован</Typography>
            </>
          )}
        </div>
        <div className={s.name}>
          <Typography variant={"body1s"}>{thirdName}</Typography>
          <Typography variant={"body1s"}>{name}</Typography>
          <Typography variant={"body1s"}>{secondName}</Typography>
        </div>
      </div>
    </div>
  );
};
