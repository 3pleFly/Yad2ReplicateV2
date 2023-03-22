import {
  Observable,
  OperatorFunction,
  debounceTime,
  filter,
  switchMap,
  iif,
  of,
} from 'rxjs';

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
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
