import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import {API_BASE_URL} from './weather.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weather = 'https://api.openweathermap.org/data/2.5/forecast';
  private city = 'London';
  private apiKey = '9c979471ac2ddceb26ede287659e5f19';
  private cnt = '2';
  private units = 'metric'; // С
  constructor(private _app: AppService, private http: HttpClient) {
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
