import { styled, StyleObject } from "styletron-react";

export type ButtonType = "primary" | "secondary";

const buttonTypes: Record<ButtonType, StyleObject> = {
  primary: {
    transition: `background 0.2s ease-in-out`,
    background: `#009F78`,
    ":hover": {
      background: `#00775A`,
    },
  },
  secondary: {
    transition: `color 0.2s ease-in-out`,
    background: 0,
    color: `#BBBBBB`,
    ":hover:enabled": {
      color: `#009F78`,
    },
    ":disabled": {
      cursor: `not-allowed`,
    },
  },
};

export const Button = styled<any, { $type: ButtonType }>(`button`, (props) => ({
  color: `#FFF`,
  borderStyle: `none`,
  borderRadius: `3px`,
  fontSize: `18px`,
  height: `40px`,
  fontWeight: 600,
  cursor: `pointer`,
  padding: `0 20px`,
  ...buttonTypes[props.$type],
}));
