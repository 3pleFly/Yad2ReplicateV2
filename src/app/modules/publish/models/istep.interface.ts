import { StepData } from "./step-data.interface";

export interface IStep {
  stepData: StepData;
  currentStep: number;
  nextStep?: Function;
  prevStep?: Function;
}
