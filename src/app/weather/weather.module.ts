import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartWeatherComponent} from './chart-weather/chart-weather.component';
import {WeatherService} from './weather.service';
import {FormsModule} from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChartWeatherComponent],
  declarations: [ChartWeatherComponent],
  providers: [WeatherService]
})
export class WeatherModule {
}
