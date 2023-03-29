import { Pipe, PipeTransform } from '@angular/core';
import { TranslationType } from '../models/translation-type.interface';

@Pipe({
  name: 'yad2Translate',
  standalone: true,
})
export class Yad2TranslationPipe implements PipeTransform {
  transform(value: any, src: TranslationType): any {
    if(src) {
      if(value in src) {
        return src[value];
      }
    }
    return value;
  }
}
