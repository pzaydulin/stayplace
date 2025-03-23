import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AsyncStorage {
  readonly storage: Storage;

  getItem<T>(key: string): Observable<T>;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
}

export const STORAGE_KEY = 'STAYPLACE_LOCAL_STATE';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage implements AsyncStorage {
  protected readonly state$!: BehaviorSubject<Record<string, any>>;
  protected key = STORAGE_KEY;

  // TODO: if localStorage is not available use sessionStorage
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  public readonly storage: Storage = localStorage;

  protected constructor() {
    this.state$ = new BehaviorSubject<Record<string, any>>(
      this.getLocalState()
    );
  }

  private get state(): Record<string, any> {
    return this.state$.getValue();
  }

  get length(): number {
    return Object.keys(this.state).length;
  }

  clear(): void {
    this.setState({});
  }

  getItem<T = any>(key: string): Observable<T> {
    return this.state$.pipe(map((state) => state[key] ?? null));
  }

  removeItem(key: string): void {
    const state = { ...this.state };
    if (key in state) {
      delete state[key];

      this.setState(state);
    }
  }

  setItem<T = any>(key: string, value: T): void {
    this.setState({ ...this.state$.getValue(), [key]: value });
  }

  protected setState(state: Record<string, any>): void {
    this.state$.next(state);
    this.setLocalState(state);
  }

  protected setLocalState(state: Record<string, any>): void {
    try {
      this.storage.setItem(this.key, JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }

  protected getLocalState(): Record<string, any> {
    const state = this.storage.getItem(this.key);

    return state ? JSON.parse(state) : {};
  }
}
