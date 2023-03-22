import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldSubString',
  standalone: true,
})
export class BoldSubStringPipe implements PipeTransform {
  transform(textValue: any, subTextValue: string): any {
    return textValue.replace(
      subTextValue,
      '<strong>' + subTextValue + '</strong>'
    );
  }
}
