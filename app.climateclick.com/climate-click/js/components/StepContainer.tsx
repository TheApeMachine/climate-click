import { FC, ReactNode } from "react";
import { useStyletron } from "styletron-react";

export const StepContainer: FC<{ children?: ReactNode }> = ({ children }) => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        position: `relative`,
        display: `flex`,
        justifyContent: `center`,
      })}
    >
      <div
        className={css({
          position: `absolute`,
          marginTop: `-15px`,
          display: `flex`,
          gap: `6px`,
        })}
      >
        {children}
      </div>
    </div>
  );
};
