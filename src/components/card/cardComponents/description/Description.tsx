import s from "./decription.module.scss";
import {Typography} from "../../../ui/typography/Typography.tsx";



type DescriptionProps = {
  description: string;
  link?: boolean;
  title: string;
};

export const Description = ({ description, link, title }: DescriptionProps) => {
  const descriptionOrNone = description ? description : "Не указано";

  return (
    <div className={s.description}>
      <Typography as={"span"} variant={"body1m"}>
        {title}
      </Typography>
      {link ? (
        <Typography as={"a"} href={`tel:${description}`} variant={"body1m"}>
          {descriptionOrNone}
        </Typography>
      ) : (
        <Typography as={"p"} variant={"body1m"}>
          {descriptionOrNone}
        </Typography>
      )}
    </div>
  );
};
s;
