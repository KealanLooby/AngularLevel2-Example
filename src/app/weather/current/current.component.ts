import {Component, Input, OnInit} from '@angular/core';
import {LocationStoreService} from "../../store/location.store.service";
import {WeatherService} from "../../services/weather.service";
import {Observable, switchMap} from "rxjs";
import {CurrentWeather} from "../../models/current-weather";
import {Router} from "@angular/router";

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  @Input() cityTitle: string | undefined = ''

  weatherData$ : Observable<CurrentWeather>;

  constructor(public weatherService: WeatherService,
              private router: Router,
              private locationStoreService: LocationStoreService ) {
    this.weatherData$ = new Observable<CurrentWeather>();
  }
  ngOnInit(): void {
    console.log('Value in ngOnInit:', this.cityTitle);
    if (this.cityTitle) {
      this.weatherData$ = this.weatherService.getGeoLocData(this.cityTitle)
        .pipe(
          switchMap(geoResp => {
            if (geoResp.length > 0) {
              return this.weatherService.getCurrentWeather(geoResp[0].lat, geoResp[0].lon);
            }
            throw new Error('No location found for given city');
          })
        );
    }
  }

  removeLocation() {
    // Logic to remove the city from your store
    if (this.cityTitle) {
      this.locationStoreService.removeLocation(this.cityTitle);
    }
  }

  navigateToForecast() {
    this.router.navigate(['/forecast', this.cityTitle]);
  }

}
