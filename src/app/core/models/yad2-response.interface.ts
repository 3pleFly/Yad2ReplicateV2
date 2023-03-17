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

export class Yad2ErrorResponse extends Yad2Response {

  static isYad2ErrorResponse(obj: any) {
    return Yad2Response.isYad2Response(obj) && 'Code' in obj;
  }

  static convertToYad2ErrorResponse(obj: any) {
    const yad2Resposne = Yad2Response.convertToYad2Response(obj);
    return { ...yad2Resposne, code: obj.Code };
  }
}
