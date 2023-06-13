import { styled } from "styletron-react";

export const FieldContainer = styled(`div`, {
  margin: `0 0 0 15px`,
});

export const FormField = styled(`label`, {
  display: `block`,
  ":focus-within": {
    color: `#009F78`,
  },
});

export const FieldError = styled(`p`, {
  color: `#f00`,
  margin: `3px 0 0 0`,
  fontWeight: 500,
});

export const FieldTitle = styled(`h3`, {
  fontSize: `14px`,
  fontWeight: 600,
  margin: `0 0 3px 0`,
  padding: `0`,
});

export const FieldDescription = styled(`p`, {
  color: `#8B8B8B`,
  fontSize: `14px`,
  lineHeight: `21px`,
  margin: `0`,
  padding: `0`,
});
