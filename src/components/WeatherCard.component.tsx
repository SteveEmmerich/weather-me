import React from 'react';
import './WeatherCard.css';
import { IWeatherData } from '../services/weather.types';
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonCardSubtitle,
  IonLabel,
} from '@ionic/react';
interface IProps {
  weatherData: IWeatherData;
}

const WeatherCard = (props: IProps) => {
  const { weatherData } = props;

  return (
    <IonCard
      className={`weatherContainer ${weatherData.weather.main.toLowerCase()}`}
    >
      <IonCardHeader>
        <IonCardSubtitle>
          {weatherData.city.toLocaleUpperCase()}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>{weatherData.weather.description}</IonItem>
        <IonLabel>Current Temperature</IonLabel>
        <IonItem>{weatherData.weather.temp.current}°F</IonItem>

        <IonLabel>Current Pressure</IonLabel>
        <IonItem>{weatherData.weather.pressure} hpa</IonItem>

        <IonLabel>Wind</IonLabel>
        <IonItem>
          {weatherData.weather.wind.direction} at{' '}
          {weatherData.weather.wind.speed} mph
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export { WeatherCard };
