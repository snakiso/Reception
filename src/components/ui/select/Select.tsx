import { ComponentPropsWithoutRef } from "react";

import * as SelectRadix from "@radix-ui/react-select";

import s from "./select.module.scss";

import { FilterIcon } from "../../../assets/icons/filter";
import {UseGetParticipants} from "../../../services/useGetParticipants.ts";
import {Typography} from "../typography/Typography.tsx";


export const Select = ({
  defaultValue,
  onValueChange,
  value,
}: ComponentPropsWithoutRef<typeof SelectRadix.Root>) => {
  const {data} = UseGetParticipants()

  const participantCount = data?.participantCount;

  return (
    <SelectRadix.Root
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      value={value}
    >
      <SelectRadix.Trigger className={s.select}>
        <SelectRadix.Value
          defaultValue={"all"}
          placeholder={
            <Typography variant={"body2s"}>
              Все ({participantCount?.all})
            </Typography>
          }
        />
        <SelectRadix.Icon className={s.arrow}>
          {/*<ArrowIcon />*/}
          <FilterIcon />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>
      <SelectRadix.Portal>
        <SelectRadix.Content className={s.portal} position={"popper"}>
          <SelectRadix.Viewport asChild>
            <SelectRadix.Group>
              <SelectRadix.Item className={s.item} value={"all"}>
                <SelectRadix.ItemText>
                  <Typography variant={"body2s"}>
                    Все ({participantCount?.all})
                  </Typography>
                </SelectRadix.ItemText>
              </SelectRadix.Item>
              <SelectRadix.Item className={s.item} value={"uncheck"}>
                <SelectRadix.ItemText>
                  <Typography variant={"body2s"}>
                    Не пришедшие ({participantCount?.nonArrived})
                  </Typography>
                </SelectRadix.ItemText>
              </SelectRadix.Item>
              <SelectRadix.Item className={s.item} value={"check"}>
                <SelectRadix.ItemText>
                  <Typography variant={"body2s"}>
                    Пришедшие ({participantCount?.arrived})
                  </Typography>
                </SelectRadix.ItemText>
              </SelectRadix.Item>
            </SelectRadix.Group>
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
};
