import {
  FC,
} from "react";
import { useForm } from "react-hook-form";
import { useStyletron } from "styletron-react";
import { Button } from "./components/Button";
import { Card, CardContents, CardDivider } from "./components/Card";
import {
  FieldContainer,
  FieldDescription,
  FieldTitle,
} from "./components/FormField";
import { FormSection } from "./components/FormSection";
import {
  LabelContents,
  LabelDescription,
  LabelTitle,
} from "./components/Label";
import { RadioField, RadioInput } from "./components/Radio";
import { StepContainer } from "./components/StepContainer";
import { Tabs } from "./components/Tab";
import {
  Organization,
  SaveOrganizationFn,
  useOrganization,
} from "./hooks/useOrganization";
import { Logo } from "./Logo";
import { Switch } from "./Switch";
import CheckboxButton from "./components/Buttons/Checkbox";
import SwitchButton from "./components/Buttons/Switch";
import DetailedButton from "./components/Buttons/Detailed";

interface SettingsFormData {
  compensationStrategy: "MERCHANT_PAYING" | "CUSTOMER_PAYING";
  isEnabled: boolean;
  showEligibleButtons: boolean
  buttonOption: "SWITCH" | "CHECKBOX" | "DETAILED"
}

interface SettingsFormProps {
  organization: Organization;
  saveOrganization: SaveOrganizationFn;
}

export const Settings = () => {
  const { organization, saveOrganization } = useOrganization();

  if (!organization) {
    return <div />;
  }

  return (
    <div>
      <SettingsForm
        organization={organization}
        saveOrganization={saveOrganization}
      />
    </div>
  );
};

export const SettingsForm: FC<SettingsFormProps> = ({
  organization,
  saveOrganization,
}) => {
  const [css] = useStyletron();

  const { register, handleSubmit } = useForm<SettingsFormData>({
    defaultValues: organization,
  });



  const onSubmit = handleSubmit(async (formData) => {
    const result = await saveOrganization({
      ...organization,
      ...formData,
    });
    if (!result) {
      //
    }

    //
  });

  return (
    <div className={css({ background: `#F6F6F7`, padding: `50px 0` })}>
      <Card>
        <CardContents $style={{ color: `#1A2E76` }}>
          <Logo />
        </CardContents>

        <Tabs />

        <CardDivider />

        <CardContents>
          {organization.doNotShowEnableButtonSetting && <LabelContents>
            <LabelDescription>
              There are no available settings for your integration.
            </LabelDescription>
          </LabelContents>}

          {!organization.doNotShowEnableButtonSetting && <form onSubmit={onSubmit}>
            <FormSection>
              <LabelContents>
                <LabelTitle>Compensation strategy</LabelTitle>
                <LabelDescription>
                  We have a style for every shop. Pick yours.
                </LabelDescription>
              </LabelContents>

              <RadioField>
                <RadioInput
                  value="MERCHANT_PAYING"
                  {...register("compensationStrategy", { required: true })}
                />
                <FieldContainer>
                  <FieldTitle>Merchant paying</FieldTitle>
                  <FieldDescription>
                    You will compensate every order
                  </FieldDescription>
                </FieldContainer>
              </RadioField>

              <RadioField>
                <RadioInput
                  value="CUSTOMER_PAYING"
                  {...register("compensationStrategy", { required: true })}
                />
                <FieldContainer>
                  <FieldTitle>Customer paying</FieldTitle>
                  <FieldDescription>
                    The customer may choose to compensate his or her order
                  </FieldDescription>
                </FieldContainer>
              </RadioField>
            </FormSection>

            <FormSection>
              <LabelContents>
                <LabelTitle>Turn on</LabelTitle>
                <LabelDescription>
                  You can quickly enable or disable in the settings - go ahead
                  and turn on the extension.
                </LabelDescription>
              </LabelContents>

              <div className={css({ display: `flex`, alignItems: `center` })}>
                <Switch {...register(`isEnabled`)} />
                <div className={css({ marginLeft: `15px` })}>
                  <FieldTitle>{true ? `Enabled` : `Disabled`}</FieldTitle>
                  <FieldDescription>
                    {true
                      ? `The extension is active`
                      : `The extension is not active right now`}
                  </FieldDescription>
                </div>
              </div>
            </FormSection>

            {organization?.showEligibleButtons && <FormSection>
              <LabelContents>
                <LabelTitle>Select design</LabelTitle>
                <LabelDescription>
                  We have a style for every shop. Pick yours.
                </LabelDescription>
              </LabelContents>
              <div className={css({ display: `inline-block` })}>
                <RadioField>
                  <RadioInput
                    value="DETAILED"
                    {...register("buttonOption", { required: false })}
                  />
                  <FieldContainer>

                    <FieldTitle>Detailed</FieldTitle>
                    <FieldDescription>
                      More information for your customers
                    </FieldDescription>

                    <DetailedButton />

                  </FieldContainer>
                </RadioField>

                <RadioField>
                  <RadioInput
                    value="SWITCH"
                    {...register("buttonOption", { required: false })}
                  />
                  <FieldContainer>
                    <FieldTitle>Switch</FieldTitle>
                    <FieldDescription>
                      Modern with twist
                    </FieldDescription>
                    <SwitchButton />
                  </FieldContainer>
                </RadioField>
                <RadioField>
                  <RadioInput
                    value="CHECKBOX"
                    {...register("buttonOption", { required: false })}
                  />
                  <FieldContainer>
                    <FieldTitle>Checkbox</FieldTitle>
                    <FieldDescription>
                      Traditional and simple
                    </FieldDescription>
                    <CheckboxButton />
                  </FieldContainer>
                </RadioField>

              </div>


            </FormSection>}

            {/* TODO: this API key is not exposed in the projection yet */}
            {/* <FormSection>
            <LabelContents>
              <LabelTitle>API key</LabelTitle>
              <LabelDescription>This is your secret api jey.</LabelDescription>
            </LabelContents>
            <Input disabled chevron={<CopyIcon />} />
          </FormSection> */}
            <Button $type="primary">Save</Button>
          </form>}
        </CardContents>
      </Card>
    </div>
  );
};
