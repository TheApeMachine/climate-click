import { styled } from "styletron-react";

export const ToolTip = styled("div", {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  borderRadius: "5px",
  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
  padding: "3px",
});

export const generateTooltip = ({ active, payload, label }:any) => {
  if (active && payload && payload.length) {
    return (
      <ToolTip>
        <p className="label">{`${label} : €${payload[0].value.toFixed(2)}`}</p>
      </ToolTip>
    );
  }
  return <ToolTip></ToolTip>;
};
