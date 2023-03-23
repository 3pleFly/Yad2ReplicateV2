import { StepData } from "./step-data.interface";

export interface IStep {
  stepData: StepData;
  nextStep?: Function;
  prevStep?: Function;
}
