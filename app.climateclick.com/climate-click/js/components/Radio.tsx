import { forwardRef, InputHTMLAttributes } from "react";
import { styled, useStyletron } from "styletron-react";

export const RadioField = styled(`label`, {
  display: `flex`,
  alignItems: `center`,
  marginBottom: `20px`,
});

export const RadioInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [css] = useStyletron();
  return (
    <label>
      <input
        {...props}
        type="radio"
        ref={ref}
        className={css({
          position: `absolute`,
          width: 0,
          height: 0,
          appearance: `none`,
          ":focus + div": {
            boxShadow: `inset 0px 0px 4px rgba(0,0,0,0.25)`,
          },
          ":not(:checked) + div > div": {
            display: `none`,
          },
        })}
      />
      <div
        className={css({
          borderRadius: `10px`,
          borderStyle: `solid`,
          borderWidth: `1px`,
          borderColor: `#D0D0D0`,
          width: `20px`,
          height: `20px`,
        })}
      >
        <div
          className={css({
            margin: `4px`,
            borderRadius: `5px`,
            width: `10px`,
            height: `10px`,
            background: `#009F78`,
          })}
        />
      </div>
    </label>
  );
});
