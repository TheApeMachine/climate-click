import { useStyletron } from "styletron-react";
import { Card, CardContents, CardDivider } from "./components/Card";
import { Faq } from "./components/Faq/Faq";
import { Tabs } from "./components/Tab";
import { useOrganization } from "./hooks/useOrganization";
import { Logo } from "./Logo";
import { GeneralQuestions } from "./components/Faq/FaqItem";

export const Support = () => {
  const [css] = useStyletron();

  // TODO: we're not doing anything with this yet, but it's required to actual take the access token
  // from the search param and use it.
  useOrganization();

  return (
    <div className={css({ background: `#F6F6F7`, padding: `50px 0` })}>
      <Card>
        <CardContents $style={{ color: `#1A2E76` }}>
          <Logo />
        </CardContents>

        <Tabs/>

        <CardDivider />

        <CardContents>
          <Faq title="Frequently Asked Questions" questions={GeneralQuestions}/>
        </CardContents>
      </Card>
    </div>
  );
};
