import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import {API_BASE_URL} from './weather.config';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private _app: AppService) {
  }
  public dailyForecast() {
    return this._app.get(API_BASE_URL, '80', 'metric');
  }

  searchCity(city: string) {
    if (!city.trim()) {
      // if not search term, return empty hero array.
      return;
    }
    return this._app.get(API_BASE_URL, '80', 'metric', city);
  }
}
