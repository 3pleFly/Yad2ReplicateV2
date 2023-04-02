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
import { Yad2Response } from '../models/yad2-response.interface';
import { LocalisationService } from '../services/localisation.service';

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
}

export function yad2Translate(): OperatorFunction<
  string | null | undefined,
  string | null
> {
  const localService = inject(LocalisationService);

  return (source$) =>
    source$.pipe(
      map((y2Name) => {
        if (!y2Name) return null;
        if (!(y2Name in localService.y2Translatables)) return null;

        return localService.y2Translatables[y2Name];
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
