import React, { useState } from "react";
import { useCss } from "kremling";
import PageHeader from "../page-header.component";

import CheckDuplicate from "./check-duplicate.component";
import ListDuplicates from "./list-duplicates.component";
import ContactInformation from "./contact-information.component";
import ClientSource from "./client-source.component";
import Confirm from "./confirm.component";
import DemographicInformation, {
  PayInterval,
  EnglishLevel,
  CivilStatus
} from "./demographic-information.component";
import Services from "./services.component";
import Finished from "./finished.component";

import { mediaMobile, mediaDesktop } from "../styleguide.component";

export default function AddClient(props: AddClientProps) {
  const scope = useCss(css);
  const [step, setStep] = useState<Step>(Step.CHECK_DUPLICATE);
  const [clientState, setClientState] = useState<ClientState>({});
  const [duplicateWarning, setDuplicateWarning] = useState<DuplicateWarning>(
    null
  );
  const StepComponent = stepComponents[step];

  return (
    <div {...scope}>
      <PageHeader title="Add a new client" />
      <div className="card">
        <div className="form-with-hints">
          {duplicateWarning ? (
            <ListDuplicates
              duplicateWarning={duplicateWarning}
              continueAnyway={continueAnyway}
              goBack={reset}
            />
          ) : (
            <StepComponent
              nextStep={nextStep}
              clientState={clientState}
              goBack={goBack}
              reset={reset}
              showDuplicateWarning={showDuplicateWarning}
            />
          )}
        </div>
      </div>
    </div>
  );

  function nextStep(stepName: Step, newState: ClientState) {
    setClientState({ ...clientState, ...newState });
    setStep(stepName);
  }

  function goBack(step: Step) {
    setStep(step);
  }

  function reset() {
    setDuplicateWarning(null);
    setClientState({});
    setStep(Step.CHECK_DUPLICATE);
  }

  function showDuplicateWarning(duplicateWarning) {
    setDuplicateWarning(duplicateWarning);
  }

  function continueAnyway(clientState) {
    setStep(Step.CONTACT_INFORMATION);
    setDuplicateWarning(null);
    setClientState(clientState);
  }
}

export enum Step {
  CHECK_DUPLICATE = "CHECK_DUPLICATE",
  LIST_DUPLICATES = "LIST_DUPLICATES",
  CONTACT_INFORMATION = "CONTACT_INFORMATION",
  DEMOGRAPHICS_INFORMATION = "DEMOGRAPHICS_INFORMATION",
  CLIENT_SOURCE = "CLIENT_SOURCE",
  SERVICES = "SERVICES",
  CONFIRM = "CONFIRM",
  FINISHED = "FINISHED"
}

const stepComponents = {
  [Step.CHECK_DUPLICATE]: CheckDuplicate,
  [Step.CONTACT_INFORMATION]: ContactInformation,
  [Step.DEMOGRAPHICS_INFORMATION]: DemographicInformation,
  [Step.CLIENT_SOURCE]: ClientSource,
  [Step.SERVICES]: Services,
  [Step.CONFIRM]: Confirm,
  [Step.FINISHED]: Finished
};

type AddClientProps = {
  path: string;
};

export type ClientState = {
  firstName?: string;
  lastName?: string;
  birthday?: string;
  gender?: string;
  duplicates?: [];
  //Contacts
  dateOfIntake?: string;
  phone?: string;
  smsConsent?: boolean;
  streetAddress?: string;
  city?: string;
  state?: string;
  zip?: string;
  housing?: string;
  email?: string;
  //Demographics
  civilStatus?: CivilStatus;
  countryOfOrigin?: string;
  dateOfUSArrival?: string;
  primaryLanguage?: string;
  englishLevel?: EnglishLevel;
  currentlyEmployed?: string;
  employmentSector?: string;
  payInterval?: PayInterval;
  weeklyEmployedHours?: string;
  annualIncome?: number;
  householdSize?: number;
  householdSizeChildren?: number;
  isStudent?: boolean;
  eligibleToVote?: boolean;
  registerToVote?: boolean;
  // Client source
  clientSource?: ClientSources | string;
  couldVolunteer?: boolean;
};

export type StepComponentProps = {
  nextStep: (stepName: string, newClientState: ClientState) => void;
  clientState: ClientState;
  goBack(Step): void;
  reset(): void;
  showDuplicateWarning(DuplicateWarning): void;
};

export type DuplicateWarning = {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  duplicates: Duplicate[];
};

export enum ClientSources {
  facebook = "facebook",
  instagram = "instagram",
  website = "website",
  promotionalMaterial = "promotionalMaterial",
  consulate = "consulate",
  friend = "friend",
  previousClient = "previousClient",
  employee = "employee",
  sms = "sms",
  radio = "radio",
  tv = "tv"
}

type Duplicate = {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
};

const css = `
& form > div {
  margin-bottom: 16rem;
}

& .form-with-hints {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

& .hints-and-instructions {
  margin-bottom: 32rem;
}

& .form-with-hints form {
  align-self: center;
}

& .form-with-hints form input[type="checkbox"] {
  min-width: inherit;
  width: inherit;
  margin-right: 8rem;
}

${mediaMobile} {
  & .form-with-hints form input:not([type="radio"]):not([type="checkbox"]), & .form-with-hints form select {
    width: 170rem;
  }

  & .form-with-hints form {
    width: 350rem;
  }
}

${mediaDesktop} {
  & .form-with-hints form input:not([type="radio"]):not([type="checkbox"]), & .form-with-hints form select {
    min-width: 200rem;
    max-width: 300rem;
  }
}


& .hints-and-instructions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16rem;
}

& .hint-icon {
  height: 70rem;
  margin-bottom: 16rem;
}

& .instruction {
  max-width: 200rem;
}

& label {
  display: flex;
  align-items: center;
}

& form > div > label > span {
  display: inline-block;
  width: 140rem;
  text-align: right;
  margin-right: 24rem;
}

& form .radio-options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

& .actions {
  display: flex;
  justify-content: center;
  margin-top: 32rem;
}

& .vertical-options {
  display: block;
}

& .vertical-options > * {
  padding: 8rem 0;
}
`;
