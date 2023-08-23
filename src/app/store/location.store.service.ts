import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationStoreService {

  // Initialize with an empty array of strings
  private _stateSource = new BehaviorSubject<string[]>([]);

  // Expose the observable for components to subscribe
  currentState$ = this._stateSource.asObservable();

  constructor() {}

  // Get the current state
  get currentState(): string[] {
    return this._stateSource.getValue();
  }

  addLocation(location: string): boolean {
    const currentList = this._stateSource.getValue();
    if (currentList.includes(location)) {
      return false;  // Location already present
    }
    this._stateSource.next([...currentList, location]);
    return true;  // Location added successfully
  }

  removeLocation(location: string) {
    const currentList = this._stateSource.getValue();
    const filteredList = currentList.filter(s => s !== location);
    this._stateSource.next(filteredList);
  }
}
