import { FC, forwardRef, InputHTMLAttributes } from "react";
import { useStyletron } from "styletron-react";

export const Switch: FC<InputHTMLAttributes<HTMLInputElement>> = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [css] = useStyletron();
  return (
    <label
      className={css({
        display: `inline-block`,
        position: `relative`,
        cursor: `pointer`,
      })}
    >
      <div
        className={css({
          width: `34px`,
          height: `14px`,
          borderRadius: `7px`,
          background: `#EEE`,
          margin: `5px 0`,
        })}
      />
      <input
        type="checkbox"
        className={css({
          position: `absolute`,
          width: `0px`,
          height: `0px`,
          overflow: `hidden`,
          clip: `rect(0 0 0 0)`,
          padding: 0,
          margin: 0,
          appearance: `none`,
          ":checked + div": {
            left: `14px`,
            background: `#009F78`,
          },
          ":focus + div": {
            boxShadow: `inset 0px 0px 4px rgba(0,0,0,0.5)`,
          },
        })}
        {...props}
        ref={ref}
      />
      <div
        className={css({
          transition: `0.25s`,
          position: `absolute`,
          top: `0px`,
          left: `0px`,
          width: `24px`,
          height: `24px`,
          borderRadius: `12px`,
          background: `#AFB1BB`,
          borderWidth: `2px`,
          borderStyle: `solid`,
          borderColor: `#fff`,
        })}
      />
    </label>
  );
});
