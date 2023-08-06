import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GeoResp} from "../models/geo-resp";
import {CurrentWeather} from "../models/current-weather";
import {FiveDayForcast} from "../models/five-day-forcast.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_KEY = '5a4b2d457ecbef9eb2a71e480b947604';
  private GEO_BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct';
  private WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  private FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast/daily';

  constructor(private http: HttpClient) {}

  public getGeoLocData(city: string): Observable<GeoResp[]> {
    const url = `${this.GEO_BASE_URL}?q=${city}&limit=5&appid=${this.API_KEY}`;
    return this.http.get<GeoResp[]>(url);
  }

  public getCurrentWeather(lat: number, lon: number): Observable<CurrentWeather> {
    const url = `${this.WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`;
    return this.http.get<CurrentWeather>(url);
  }

  public getForecast(lat: number, lon: number): Observable<FiveDayForcast> {
    const url = `${this.FORECAST_BASE_URL}?lat=${lat}&lon=${lon}&cnt=5&appid=${this.API_KEY}`;
    return this.http.get<FiveDayForcast>(url);
  }
}
