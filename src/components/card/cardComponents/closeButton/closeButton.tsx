import s from "./closeButton.module.scss";

type CloseButtonProps = {
  close: () => void;
};

export const CloseButton = ({ close }: CloseButtonProps) => {
  return (
    <div className={s.closeButtonWrapper}>
      <button className={s.closeButton} onClick={close}></button>
    </div>
  );
};
