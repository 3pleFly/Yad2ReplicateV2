export interface Yad2FormData {}

export interface Yad2RealestateFormData extends Yad2FormData {}

export function isYad2RealestateFormData(
  form: Yad2FormData
): form is Yad2RealestateFormData {
  if ('propertyType' in form) return true;
  return false;
}
