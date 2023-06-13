import { styled } from "styletron-react";

export const InfoPlacer = styled(`div`, {
  float: `right`,
});

export const InfoCard = styled(`div`, {
  borderRadius: `8px`,
  background: `#F3F3FF`,
  padding: `20px`,
  maxWidth: `210px`,
});

export const InfoCardDescription = styled(`p`, {
  color: `#001649`,
  fontSize: `14px`,
  lineHeight: `22px`,
  margin: `20px 0 0 0`,
});

export const InfoCardIcon = () => (
  <svg
    width="41"
    height="41"
    viewBox="0 0 41 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="20.5"
      cy="20.5"
      r="19.5"
      fill="white"
      stroke="#00328A"
      strokeWidth="2"
    />
    <path
      d="M20.5928 15.8379C21.3838 15.8379 22.0342 15.2051 22.0342 14.4141C22.0342 13.6143 21.3838 12.9814 20.5928 12.9814C19.8018 12.9814 19.1426 13.6143 19.1426 14.4141C19.1426 15.2051 19.8018 15.8379 20.5928 15.8379ZM19.3008 27H21.8672V17.3232H19.3008V27Z"
      fill="#00328A"
    />
  </svg>
);
