import { styled } from "styletron-react";

export const CardDivider = styled(`hr`, {
  borderTop: `1px solid #DEDEDE`,
  borderBottom: `none`,
  margin: `0`,
});

export const Card = styled(`div`, {
  maxWidth: `724px`,
  margin: `40px auto`,
  borderStyle: `solid`,
  borderWidth: `1px`,
  borderColor: `#DEDEDE`,
  borderRadius: `8px`,
  background: `#FFF`,
  boxShadow: `0px 0px 4px rgba(0, 0, 0, 0.1)`,
});

export const CardContents = styled(`div`, {
  padding: `40px`,
});

export const CardFooter = styled(`div`, {
  display: `flex`,
  justifyContent: `center`,
  gap: `10px`,
  margin: `20px 0 40px 0`,
});
