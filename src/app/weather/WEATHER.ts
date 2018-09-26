export interface WEATHER {
  cnt?: number;
  list?: Array<object>;
  main?: Object;
  city?: {
    name: string
  };
}
export interface TEMP {
  main?: {
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
}
