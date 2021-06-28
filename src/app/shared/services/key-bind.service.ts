import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KeyBindService {
  private keyDownListener$: Observable<KeyboardEvent>;

  constructor() {
    this.keyDownListener$ = fromEvent<KeyboardEvent>(window, 'keydown');
  }

  public matchBinding$(matchKey: string, matchModifiers: string[]): Observable<KeyboardEvent> {
    return this.keyDownListener$.pipe(
      filter((event: KeyboardEvent) => {
        return this.eventMatchModfiers(event, matchModifiers) && event.key.toLowerCase() === matchKey.toLowerCase();
      }),
    );
  }

  private eventMatchModfiers(event: KeyboardEvent, modifiers: string[]) {
    const eventModifiers = this.getModifierKeys(event);
    let result = false;
    eventModifiers.forEach((mod) => {
      if (modifiers.includes(mod)) {
        result = true;
      }
    });
    return result;
  }

  private getModifierKeys(event: KeyboardEvent): string[] {
    const modifiers = [];
    if (event.ctrlKey) {
      modifiers.push('ctrl');
    }
    if (event.metaKey) {
      modifiers.push('meta');
    }
    if (event.altKey) {
      modifiers.push('alt');
    }
    if (event.shiftKey) {
      modifiers.push('shift');
    }
    return modifiers;
  }
}
