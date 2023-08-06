import {Component, OnInit} from '@angular/core';
import {LocationStoreService} from "../store/location.store.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(public locationStoreService: LocationStoreService) {
  }

  ngOnInit(): void {
    // emulate values from local storage
    this.locationStoreService.addLocation('New York');
    // this.locationStoreService.addLocation('London');
    // this.locationStoreService.addLocation('Paris');



  }

}
