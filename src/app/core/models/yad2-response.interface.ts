export class Yad2Response {
  constructor(success: boolean, data: any, message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  success!: boolean;
  data: any;
  message: string = '';

  static isYad2Response(obj: any) {
    return 'Success' in obj && 'Data' in obj && 'Message' in obj;
  }

  static convertToYad2Response(obj: any) {
    if (this.isYad2Response(obj))
      return new Yad2Response(obj.Success, obj.Data, obj.Message);
    throw new Error('Object of invalid type!');
  }
}

export interface Yad2ErrorResponse extends Yad2Response {
  code: string;
}
