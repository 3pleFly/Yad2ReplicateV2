export interface ValidationMessages {
  required?: string;
  requiredTrue?: string;
  pattern?: string;
  minlength?: string;
  email?: string;
  passwordMatch?: string;

  [key: string]: string | undefined;

}
