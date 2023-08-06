import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WeatherComponent} from "./weather/weather.component";
import {ForcastComponent} from "./weather/forcast/forcast.component";

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent },
  {
    path: 'forecast/:city',
    component: ForcastComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
