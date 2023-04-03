import { inject } from '@angular/core';
import {
  Observable,
  OperatorFunction,
  debounceTime,
  filter,
  switchMap,
  iif,
  of,
  map,
} from 'rxjs';
import {
  Checkmark,
  CheckmarkState,
} from 'src/app/shared/models/checkmark.interface';
import { TranslationType } from 'src/app/shared/models/translation-type.interface';
import { Yad2Response } from '../models/yad2-response.interface';
import { Yad2Resource } from '../models/yad2resource.interface';
import { LocalisationService } from '../services/localisation.service';

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
}

export function yad2Translate<T extends Yad2Resource | Yad2Resource[]>(
  translationSource: TranslationType
): OperatorFunction<T, T> {
  return (source$) =>
    source$.pipe(
      map((data) => {
        if (!data) throw new Error('Missing data to translate');

        if (Array.isArray(data)) {
          return data.map((item) => {
            return { ...item, name: translationSource[item.name] };
          }) as T;
        } else {
          return {
            ...data,
            name: translationSource[data.name],
          } as T;
        }
      })
    );
}

export function autoCompleteSearch<T>(
  debounceMilliseconds: number,
  minLength: number,
  searchFn: (term: string) => Observable<string[]>
): OperatorFunction<string | null, string[]> {
  return (source$) =>
    source$.pipe(
      debounceTime(debounceMilliseconds),
      filter((term): term is string => term !== null),
      switchMap((term) =>
        iif(() => term.length > minLength, searchFn(term), of([]))
      )
    );
}

export function isANumber(value: string): boolean {
  return !isNaN(Number(value));
}

export function convertNumberCommaFormatToNumber(value: string) {
  return parseInt(value.replaceAll(',', ''));
}

export function isYad2ErrorResponse(obj: any) {
  if (!obj) return false;
  return Yad2Response.isYad2Response(obj) && 'Code' in obj;
}

export function convertToYad2ErrorResponse(obj: any) {
  const yad2Resposne = Yad2Response.convertToYad2Response(obj);
  return { ...yad2Resposne, code: obj.Code };
}

export function convertCheckmarkStateToBoolean(state: CheckmarkState): boolean {
  if (state === 'indeterminate')
    throw new Error("Cannot convert 'indeterminate' to boolean.");
  return state === 'checked' ? true : false;
}
