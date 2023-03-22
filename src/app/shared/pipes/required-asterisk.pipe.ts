import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requiredAsterisk',
  standalone: true
})
export class RequiredAsteriskPipe implements PipeTransform {

  transform(value: any, required: boolean): string {
    if(required) {
      return value + "*";
    }
    return value;
  }

}
