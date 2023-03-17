export type CheckmarkState = 'checked' | 'indeterminate' | 'unchecked';

export interface Checkmark {
  name: string;
  state: CheckmarkState;
}
