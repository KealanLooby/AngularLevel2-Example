import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationStoreService {

  // Initialize with an empty array of strings
  private stateSource = new BehaviorSubject<string[]>([]);

  // Expose the observable for components to subscribe
  currentState$ = this.stateSource.asObservable();

  constructor() {}

  // Get the current state
  get currentState(): string[] {
    return this.stateSource.getValue();
  }

  // Add a new string to the list
  // addLocation(location: string) {
  //   const currentList = this.stateSource.getValue();
  //   this.stateSource.next([...currentList, location]);
  // }
  addLocation(location: string): boolean {
    const currentList = this.stateSource.getValue();

    if (currentList.includes(location)) {
      return false;  // Location already present
    }

    this.stateSource.next([...currentList, location]);
    return true;  // Location added successfully
  }


  // Remove a string from the list
  removeLocation(location: string) {
    const currentList = this.stateSource.getValue();
    const filteredList = currentList.filter(s => s !== location);
    this.stateSource.next(filteredList);
  }
}
