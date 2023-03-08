import { Injectable } from '@angular/core';
import { fromEvent, map, Observable, of, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  constructor() {}

  windowLength$(): Observable<number> {
    return fromEvent(window, 'resize').pipe(
      startWith(this.getWindowWidth()),
      map(() => this.getWindowWidth())
    );
  }

  private getWindowWidth() {
    return window.innerWidth;
  }
}
