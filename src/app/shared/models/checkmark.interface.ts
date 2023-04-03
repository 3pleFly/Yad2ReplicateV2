export type CheckmarkState = 'checked' | 'indeterminate' | 'unchecked';

export interface Checkmark {
  id?: number;
  name: string;
  state: CheckmarkState;
}
