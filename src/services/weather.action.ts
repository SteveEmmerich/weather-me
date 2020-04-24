import { ActionType } from './weather.state';
import { IAction, IWeatherData } from './weather.types';
const SetLocation = (payload: { location: string }): IAction => {
  return {
    type: ActionType.SetLocation,
    payload,
  };
};
//TODO: replace this with shared data type
const SetData = (payload: IWeatherData) => {
  return {
    type: ActionType.SetData,
    payload: { data: payload },
  };
};
const ClearData = () => {
  return {
    type: ActionType.SetData,
    payload: {},
  };
};
const Fetching = (): IAction => {
  return {
    type: ActionType.Fetching,
    payload: {},
  };
};
const WeatherSuccess = (): IAction => {
  return {
    type: ActionType.Success,
    payload: {},
  };
};
const WeatherError = (errorString: string): IAction => {
  return {
    type: ActionType.Error,
    payload: { errorMsg: errorString },
  };
};

export {
  SetLocation,
  SetData,
  ClearData,
  Fetching,
  WeatherError,
  WeatherSuccess,
};
