export interface ValidationMessages {
  required?: string;
  pattern?: string;
  minlength?: string;
  email?: string;
  passwordMatch?: string;

  [key: string]: string | undefined;

}
