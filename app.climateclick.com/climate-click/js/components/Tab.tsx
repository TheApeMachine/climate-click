import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { styled, useStyletron } from "styletron-react";

export const TabContainer = styled(`div`, {
  padding: `0 40px`,
});

export const Tab = styled(`div`, {
  display: `flex`,
  gap: `20px`,
  marginBottom: `-1px`,
});

export const TabItem: FC<{ to: string; children: ReactNode }> = ({
  to,
  children,
}) => {
  const [css] = useStyletron();

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        css({
          display: `inline-block`,
          textDecoration: `none`,
          fontSize: `16px`,
          borderBottom: isActive ? `2px solid #009F78` : `0`,
          padding: `0 0 10px 0`,
          color: isActive ? `#009F78` : `#A4A4A4`,
          fontWeight: `600`,
          ":hover": {
            color: `#009F78`,
            fontWeight: `600`,
          },
        })
      }
    >
      {children}
    </NavLink>
  );
};

export const Tabs = () => (
  <TabContainer>
    <Tab>
      <TabItem to="/">Dashboard</TabItem>

      <TabItem to="/settings">Settings</TabItem>

      <TabItem to="/support">Support</TabItem>
    </Tab>
  </TabContainer>
)