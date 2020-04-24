import { ActionType } from './weather.state';
interface IState {
  data?: IWeatherData | null;
  location: string;
}

interface IAction {
  type: ActionType;
  payload: Partial<IState> | Partial<IRequestState>;
}
interface IRequestState {
  status: string;
  errorMsg: string;
}

interface IStateContextProps {
  state: IState;
  apiState: IRequestState;
}
interface IDispatchContextProps {
  dispatch: React.Dispatch<IAction>;
  apiDispatch: React.Dispatch<IAction>;
}
interface ILocation {
  lon: number;
  lat: number;
}
interface IWeatherData {
  coord: ILocation;
  weather: {
    main: string;
    description: string;
    temp: {
      current: number;
      feelsLike: number;
      min: number;
      max: number;
    };
    pressure: number;
    humidity: number;
    visibility: number;
    wind: {
      speed: number;
      deg: number;
      direction: string;
    };
  };
  //"clouds":{"all":1},
  // Maybe do some time manipulation on the server side to get a better time of day?
  dt: number;
  country: string;
  sunrise: number;
  sunset: number;
  timezone: number;
  city: string;
}

export type {
  IAction,
  IState,
  IRequestState,
  IStateContextProps,
  IDispatchContextProps,
  IWeatherData,
};
