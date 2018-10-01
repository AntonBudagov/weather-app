import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import * as moment from 'moment';
import {WeatherService} from '../weather.service';
import {TODAY, WEATHER} from '../WEATHER';


@Component({
  selector: 'app-chart-weather',
  templateUrl: './chart-weather.component.html',
  styleUrls: ['./chart-weather.component.css']
})
export class ChartWeatherComponent implements OnInit {
  public weather: WEATHER = {};
  public chart: any = [];
  public chartWind: any = [];
  public city: string;
  public temp;
  public wind;
  public allDay;
  public notFound: Boolean = false;
  public toDay = moment().format('MMMM, DD YYYY');
  public toDayWeather: TODAY;
  public statusDay;

  constructor(private _service: WeatherService) {
  }

  ngOnInit() {
    this.getWeather();
  }

  public getWeather() {
    this._service.dailyForecast().subscribe((data: any) => {
      this.weather = data;
      this.city = data['city'].name;
      this.temp = data['list'].map(res => res.main.temp);
      this.wind = data['list'].map(res => res.wind.speed);
      this.allDay = data['list'].map(res => res.dt);
      this.toDayWeather = data['list'][0].main;
      this.statusDay = data['list'][0].sys.pod === 'd' ? 'Day' : 'Night';
      this.chartDraw();
      this.windChartDraw();
    });
  }

  public getCity(cityName: string) {
    if (!cityName) return;
    this._service.searchCity(cityName).subscribe((data: any) => {
      console.log(data);
      if (data.cod === '200') {
        this.notFound = false;
        this.weather = data;
        this.city = data['city'].name;
        this.temp = data['list'].map(res => res.main.temp);
        this.allDay = data['list'].map(res => res.dt);
        this.toDayWeather = data['list'][0].main;
        if (this.chart.length) {
          this.chart.destroy();
          this.chartWind.destroy();
        }
        this.chartDraw();
        this.windChartDraw();
      } else {
        this.notFound = true;
        this.chart = [];
      }
    });
  }

  public chartDraw() {
    const c: any = document.getElementById('canvas');
    const ctx = c.getContext('2d');
    const grd = ctx.createLinearGradient(0, 0, 0, 450);
    grd.addColorStop(0, '#fcdd2f');
    grd.addColorStop(1, '#00d87a');
    ctx.fillStyle = grd;
    ctx.fillRect(20, 20, 150, 100);
    const weatherDates = [];
    this.allDay.map((res) => {
      const date = moment(res * 1000).format('DD hh:mm');
      weatherDates.push(date);
    });

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: weatherDates,
        datasets: [
          {
            label: '°C',
            data: this.temp,
            backgroundColor: grd || 'red',
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.city
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Day'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: '°C'
            }
          }]
        }
      }
    });
  }

  public windChartDraw() {
    const weatherDates = [];
    this.allDay.map((res) => {
      const date = moment(res * 1000).format('DD. hh:mm');
      weatherDates.push(date);
    });
    this.chartWind = new Chart('canvas2', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            label: 'speed wind',
            data: this.wind,
            fillColor: 'rgba(151,187,205,0.5)',
            borderColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Wind Speed'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Day'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'm/s'
            }
          }]
        }
      }
    });
  }
}
