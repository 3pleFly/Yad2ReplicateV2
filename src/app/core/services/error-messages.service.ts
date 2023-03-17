import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ReactiveMessageService {
  constructor() {}
  private _responseMessage$ = new Subject<string>();
  private _error$ = new Subject<string>();
  public message$ = this._responseMessage$.asObservable();
  public error$ = this._error$.asObservable();

  emitMessageOrError(
    stream$: Subject<string>,
    milliseconds: number,
    message: string
  ) {
    stream$.next(message);
    setTimeout(() => {
      stream$.next('');
    }, milliseconds);
  }

  emitMessage(message: string, milliseconds: number = 5000) {
    this.clearError();
    this.emitMessageOrError(this._responseMessage$, milliseconds, message);
  }

  emitError(message: string, milliseconds: number = 5000) {
    this.clearMessage();
    this.emitMessageOrError(this._error$, milliseconds, message);
  }

  clearError() {
    this._error$.next('');
  }

  clearMessage() {
    this._responseMessage$.next('');
  }
}
