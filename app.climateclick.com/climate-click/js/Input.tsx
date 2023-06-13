import { FC, forwardRef, InputHTMLAttributes, ReactElement } from "react";
import { styled, useStyletron } from "styletron-react";

interface InputProps {
  chevron?: ReactElement;
}

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & InputProps
>(({ chevron, ...props }, ref) => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        position: `relative`,
        cursor: `text`,
        borderRadius: `3px`,
        borderWidth: `1px`,
        borderColor: `#C9C9C9`,
        borderStyle: `solid`,
        height: `38px`,
        overflow: `hidden`,
        background: props.disabled ? `#EAEAEA` : `#fff`,
        ":focus-within": {
          borderColor: `#009F78`,
          margin: `-1px`,
          borderWidth: `2px`,
          height: `40px`,
        },
      })}
    >
      <input
        {...props}
        ref={ref}
        className={css({
          padding: `0 10px`,
          fontSize: `16px`,
          outline: `none`,
          fontWeight: 500,
          border: `none`,
          height: `100%`,
          margin: 0,
          background: `none`,
          width: `100%`,
        })}
      />
      {chevron && (
        <label
          className={css({
            position: `absolute`,
            right: `0px`,
            top: `0px`,
            height: `100%`,
            display: `flex`,
            alignItems: `center`,
            margin: 0,
            padding: 0,
          })}
        >
          {chevron}
        </label>
      )}
    </div>
  );
});
