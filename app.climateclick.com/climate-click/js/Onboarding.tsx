import { FC, FormEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useStyletron } from "styletron-react";
import { Button } from "./components/Button";
import { Card, CardContents, CardDivider, CardFooter } from "./components/Card";
import {
  FieldContainer,
  FieldDescription,
  FieldError,
  FieldTitle,
  FormField,
} from "./components/FormField";
import { FormSection } from "./components/FormSection";
import {
  InfoCard,
  InfoCardDescription,
  InfoCardIcon,
  InfoPlacer,
} from "./components/InfoCard";
import {
  LabelContents,
  LabelDescription,
  LabelTitle,
} from "./components/Label";
import { RadioField, RadioInput } from "./components/Radio";
import { StepContainer } from "./components/StepContainer";
import { Input } from "./Input";
import { Logo } from "./Logo";
import { Step } from "./Step";
import { Switch } from "./Switch";
import { useOrganization } from "./hooks/useOrganization";
import DetailedButton from "./components/Buttons/Detailed";
import SwitchButton from "./components/Buttons/Switch";
import CheckboxButton from "./components/Buttons/Checkbox";

interface Step1FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface Step2FormData {
  compensationStrategy: string;
}

interface Step3FormData {
  isEnabled: boolean;
  buttonOption: string;
}

type FormData = Step1FormData & Step2FormData & Step3FormData;

interface StepProps {
  formData: Partial<FormData>;
  onBack: () => void;
  onNext: (formData: Partial<FormData>) => void;
}

const Step1: FC<StepProps> = ({ formData, onBack, onNext }) => {
  const placeholderFirstName = useMemo(
    () => (Math.random() < 0.5 ? `John` : `Jane`),
    []
  );
  const { handleSubmit, register, formState } = useForm<Step1FormData>({
    defaultValues: formData,
  });
  const onSubmit = handleSubmit((data) => {
    onNext(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <CardContents>
        <InfoPlacer>
          <InfoCard>
            <InfoCardIcon />
            <InfoCardDescription>
              Did you know that climate offsetting may increase conversion by{" "}
              <strong>up to 15%</strong>?
            </InfoCardDescription>
          </InfoCard>
        </InfoPlacer>

        <FormSection>
          <LabelContents>
            <LabelTitle>Getting started</LabelTitle>
            <LabelDescription>Great to have you.</LabelDescription>
          </LabelContents>

          <FormField $style={{ marginBottom: `10px` }}>
            <FieldTitle>First name</FieldTitle>
            <Input
              placeholder={placeholderFirstName}
              {...register(`firstName`, { required: true })}
            />
            {formState.errors.firstName && (
              <FieldError>Please fill in your first name.</FieldError>
            )}
          </FormField>

          <FormField $style={{ marginBottom: `10px` }}>
            <FieldTitle>Last name</FieldTitle>
            <Input
              placeholder="Doe"
              {...register(`lastName`, { required: true })}
            />
            {formState.errors.lastName && (
              <FieldError>Please fill in your last name.</FieldError>
            )}
          </FormField>

          <FormField>
            <FieldTitle>Email</FieldTitle>
            <Input
              placeholder="jdoe@example.com"
              {...register(`email`, { required: true })}
            />
            {formState.errors.email && (
              <FieldError>Please fill in your email.</FieldError>
            )}
          </FormField>
        </FormSection>
      </CardContents>

      <CardFooter>
        <Button $type="secondary" disabled onClick={onBack}>
          Back
        </Button>
        <Button type="submit" $type="primary">
          Next
        </Button>
      </CardFooter>
    </form>
  );
};

const Step2: FC<StepProps> = ({ formData, onBack, onNext }) => {
  console.log(`<Step2 />`, formData);

  const { handleSubmit, register, formState } = useForm<Step2FormData>({
    defaultValues: formData,
  });
  const onSubmit = handleSubmit((data) => {
    console.log(`onSubmit`, formData, data);

    onNext(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <CardContents>
        <InfoPlacer>
          <InfoCard>
            <InfoCardIcon />
            <InfoCardDescription>
              Did you know that climate offsetting may increase conversion by{" "}
              <strong>up to 15%</strong>?
            </InfoCardDescription>
          </InfoCard>
        </InfoPlacer>

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
          {formState.errors.compensationStrategy && (
            <FieldError>Please select your compensation strategy.</FieldError>
          )}
        </FormSection>
      </CardContents>

      <CardFooter>
        <Button disabled $type="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" $type="primary">
          Next
        </Button>
      </CardFooter>
    </form>
  );
};

const Step3: FC<StepProps> = ({ formData, onBack, onNext }) => {
  const { handleSubmit, register, watch } = useForm<Step3FormData>({
    defaultValues: {
      isEnabled: formData.isEnabled ?? false,
      buttonOption: formData?.buttonOption ?? ""
    },
  });
  const { isLoading, organization, saveOrganization } = useOrganization();

  const [error, setError] = useState<string>();
  const [css] = useStyletron();
  const onSubmit = handleSubmit((data) => {
    if (!data.isEnabled) {
      setError(
        `Please enable the checkout button to continue. You can turn it off later in the settings.`
      );
    } else {
      onNext(data);
    }
  });

  const isEnabled = watch(`isEnabled`);

  return (
    <form onSubmit={onSubmit}>
      <CardContents>
        <InfoPlacer>
          <InfoCard>
            <InfoCardIcon />
            <InfoCardDescription>
              Did you know that climate offsetting may increase conversion by{" "}
              <strong>up to 15%</strong>?
            </InfoCardDescription>
          </InfoCard>
        </InfoPlacer>

        <FormSection>
          <LabelContents>
            <LabelTitle>Turn on</LabelTitle>
            <LabelDescription>
              You can quickly enable or disable in the settings - go ahead and
              turn on the extension.
            </LabelDescription>
          </LabelContents>

          <div className={css({ display: `flex`, alignItems: `center` })}>
            <Switch {...register(`isEnabled`)} />
            <div className={css({ marginLeft: `15px` })}>
              <FieldTitle>{isEnabled ? `Enabled` : `Disabled`}</FieldTitle>
              <FieldDescription>
                {isEnabled
                  ? `The extension is active`
                  : `The extension is not active right now`}
              </FieldDescription>
            </div>
          </div>
        </FormSection>

        { organization?.showEligibleButtons && <FormSection>
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

        {error && <FieldError>{error}</FieldError>}
      </CardContents>

      <CardFooter>
        <Button $type="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" $type="primary">
          Next
        </Button>
      </CardFooter>
    </form>
  );
};

const Step4: FC<StepProps> = ({ formData, onBack, onNext }) => {
  const [css] = useStyletron();
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    onNext(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <CardContents $style={{ textAlign: `center` }}>
        <div className={css({ margin: `40px 0` })}>
          <h1 className={css({ margin: 0 })}>
            You are ready to start carbon offsetting your orders.
          </h1>
          {formData.compensationStrategy === `CUSTOMER_PAYING` && (
            <p>At the end of every month you'll receive an invoice.</p>
          )}
          {formData.compensationStrategy === `MERCHANT_PAYING` && (
            <p>At the end of every month you'll receive an invoice.</p>
          )}
        </div>

        <div>
          <Button $type="primary">Continue</Button>
        </div>
        <div>
          <Button $type="secondary" onClick={onBack}>
            Back
          </Button>
        </div>
      </CardContents>
    </form>
  );
};

export const Onboarding: FC = () => {
  const location = useLocation();
  const position = location.state?.position || 0;
  const [formData, setFormData] = useState<Partial<FormData> | undefined>(
    location.state?.formData || undefined
  );
  const navigate = useNavigate();
  const onNext = (newFormData: Partial<FormData>) => {
    console.log(`onNext`, newFormData);

    changePosition(Math.min(position + 1, 3), newFormData);
  };

  const onBack = () => {
    changePosition(Math.max(position - 1, 0));
  };

  const changePosition = (
    newPosition: number,
    newFormData?: Partial<FormData>
  ) => {
    navigate(`/onboarding`, {
      state: {
        position: newPosition,
        formData: {
          ...formData,
          ...newFormData,
        },
      },
    });
    setFormData({
      ...formData,
      ...newFormData,
    });
  };
  const { isLoading, organization, saveOrganization } = useOrganization();
  useEffect(() => {
    if (!organization) {
      return;
    }

    setFormData({
      firstName: organization.firstName,
      lastName: organization.lastName,
      compensationStrategy: organization.compensationStrategy,
      email: organization.email,
      isEnabled: organization.isEnabled,
      buttonOption: organization.buttonOption
    });
  }, [organization]);

  const onSave = async (formData: Partial<FormData>) => {
    try {
      // TODO: this is actually a non-partial FormData by now, but difficult to fix in the typing.
      // Nevertheless, would be nice to get this as any gone.
      await saveOrganization(formData as any);

      navigate(`/`);
    } catch {
      // TODO: error
    }
  };

  return (
    <Card>
      <CardContents $style={{ color: `#1A2E76` }}>
        <Logo />
      </CardContents>

      <CardDivider />

      <StepContainer>
        <Step
          position="1"
          type={position === 0 ? `active` : `complete`}
          onClick={() => changePosition(0)}
        />
        <Step
          position="2"
          type={
            position === 1 ? `active` : position < 1 ? `incomplete` : `complete`
          }
          onClick={() => changePosition(1)}
        />
        <Step
          position="3"
          type={
            position === 2 ? `active` : position < 2 ? `incomplete` : `complete`
          }
          onClick={() => changePosition(2)}
        />
        <Step
          position="4"
          type={
            position === 3 ? `active` : position < 3 ? `incomplete` : `complete`
          }
          onClick={() => changePosition(3)}
        />
      </StepContainer>

      {isLoading && <div>Loading...</div>}
      {!isLoading && formData && (
        <>
          {position === 0 && (
            <Step1 formData={formData} onBack={onBack} onNext={onNext} />
          )}
          {position === 1 && !organization?.doNotShowEnableButtonSetting && (
            <Step2 formData={formData} onBack={onBack} onNext={onNext} />
          )}
          {position === 2 && !organization?.doNotShowEnableButtonSetting && (
            <Step3 formData={formData} onBack={onBack} onNext={onNext} />
          )}
          {position === 3 && (
            <Step4 formData={formData} onBack={onBack} onNext={onSave} />
          )}
        </>
      )}
    </Card>
  );
};
