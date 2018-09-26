import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartWeatherComponent } from './chart-weather.component';

describe('ChartWeatherComponent', () => {
  let component: ChartWeatherComponent;
  let fixture: ComponentFixture<ChartWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
