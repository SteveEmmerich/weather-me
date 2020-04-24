import React from 'react';
import { useWeatherState } from '../services/weather.context';
import { WeatherCard } from './WeatherCard.component';
import { WeatherErrorCard } from './WeaterErrorCard.compoent';
import { IWeatherData } from '../services/weather.types';
const Weather = () => {
  const { state, apiState } = useWeatherState();
  const data = state?.data as IWeatherData;
  const { errorMsg } = apiState;
  return (
    <div>
      {errorMsg !== '' ? <WeatherErrorCard error={errorMsg} /> : null}
      {data != null ? <WeatherCard weatherData={data} /> : null}
    </div>
  );
};
export default Weather;
