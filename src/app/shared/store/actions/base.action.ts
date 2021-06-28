import { createAction } from '@ngrx/store';

export interface Action<T> {
  payload: T;
}

export const noopAction = createAction('[noop] noop action');
