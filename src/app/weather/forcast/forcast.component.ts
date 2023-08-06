import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {WeatherService} from "../../services/weather.service";
import {FiveDayForcast} from "../../models/five-day-forcast.model";
import { Location } from '@angular/common';

@Component({
  selector: 'app-forcast',
  templateUrl: './forcast.component.html',
  styleUrls: ['./forcast.component.css']
})
export class ForcastComponent implements OnInit {

  //city: string; // / This will throw an error in strict mode because it's not initialized.
  city!: string; // TypeScript will not complain about the uninitialized property.

  forecastData$! : Observable<FiveDayForcast>;

  constructor(public weatherService: WeatherService,
              private route: ActivatedRoute,
              private locationNav: Location) {
  }

  ngOnInit(): void {

    this.city = this.route.snapshot.paramMap.get('city') || '';

    // Now you can use this.city to call the backend for data.

    // need to make similiar call, with city name, get lat/long - call 5 dat forcast
    // as Observable, and populate the table like in forcast
    if (this.city) {
      this.forecastData$ = this.weatherService.getGeoLocData(this.city)
        .pipe(
          switchMap(geoResp => {
            if (geoResp.length > 0) {
              return this.weatherService.getForecast(geoResp[0].lat, geoResp[0].lon);
            }
            throw new Error('No location found for given city');
          })
        );
    }
  }

  goBack() {
    this.locationNav.back();
  }

}


