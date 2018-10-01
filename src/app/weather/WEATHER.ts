export interface WEATHER {
  cnt?: number;
  list?: {
    wind: {
      speed: number
    },
    sys: {},
    weather: {},
    clouds: {
      all: number
    },
    main: {}
  };
  main?: Object;
  city?: {
    name: string;
    country: string;
  };
}

export interface TODAY {
  temp: number;
  temp_kf?: number;
  temp_max?: number;
  temp_min?: number;
  pressure: number;
  humidity: number;
}
