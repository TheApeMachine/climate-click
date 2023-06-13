import { FC } from "react";
import { useStyletron } from "styletron-react";

interface StepProps {
  onClick: () => void;
  position: string;
  type: "active" | "complete" | "incomplete";
}

export const Step: FC<StepProps> = ({ onClick, position, type }) => {
  const [css] = useStyletron();
  return (
    <button
      onClick={onClick}
      className={css({
        padding: 0,
        width: `30px`,
        height: `30px`,
        borderRadius: `15px`,
        fontSize: `14px`,
        fontWeight: `600`,
        color: `#DEDEDE`,
        textAlign: `center`,
        cursor: `default`,
        lineHeight: `30px`,
        ...(type === `complete` && {
          border: 0,
          backgroundColor: `#009F78`,
          color: `#fff`,
          cursor: `pointer`,
        }),
        ...(type === `incomplete` && {
          borderColor: `#DEDEDE`,
          borderStyle: `solid`,
          borderWidth: `1px`,
          backgroundColor: `#fff`,
          color: `#DEDEDE`,
          lineHeight: `28px`,
        }),
        ...(type === `active` && {
          border: 0,
          backgroundColor: `#009F78`,
          color: `#fff`,
        }),
      })}
    >
      {type === `complete` ? (
        <svg
          className={css({ marginLeft: `-1px`, marginBottom: `-1px` })}
          width="17"
          height="13"
          viewBox="0 0 17 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 7L8.5 11.5L15.5 1"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ) : (
        position
      )}
    </button>
  );
};
