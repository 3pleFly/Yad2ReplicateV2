import { Injectable } from '@angular/core';
import { Yad2FormData } from '../models/yad2-form-data.interface';

@Injectable()
export class FormDataService<T extends Yad2FormData> {
  _formData!: T;

  set formData(value: T) {
    this._formData = { ...value };

  }

  get formData() {
    return this._formData;
  }
}
