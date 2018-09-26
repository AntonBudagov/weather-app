import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';

import {WeatherService} from '../weather.service';


@Component({
  selector: 'app-chart-weather',
  templateUrl: './chart-weather.component.html',
  styleUrls: ['./chart-weather.component.css']
})
export class ChartWeatherComponent implements OnInit {
  public chart = [];
  public city: string;
  public temp;
  public allDay;
  public notFound: Boolean = false;

  constructor(private _service: WeatherService) {
  }

  ngOnInit() {
    this.getWeather();
  }

  public getWeather() {
    this._service.dailyForecast().subscribe((data) => {
      this.city = data['city'].name;
      this.temp = data['list'].map(res => res.main.temp);
      this.allDay = data['list'].map(res => res.dt);
      this.chartDraw();
    });
  }

  public getCity(cityName: string) {
    if (!cityName) return;
    this._service.searchCity(cityName).subscribe((data: any) => {
        console.log(data);
        if (data.cod === '200') {
        this.notFound = false;
        this.city = data['city'].name;
        this.temp = data['list'].map(res => res.main.temp);
        this.allDay = data['list'].map(res => res.dt);
        this.chartDraw();
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
      let date: any = new Date(res * 1000);
      date = ('0' + date.getDate()).slice(-2) + '.' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
      weatherDates.push(date);
    });
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: this.temp,
            backgroundColor: grd,
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
}
