import React from 'react';
import './ExploreContainer.css';
import { IonIcon } from '@ionic/react';
import CloudyDay from '../assets/img/cloudy-day-1.svg';
import CloudyNight from '../assets/img/cloudy-night-1.svg';

import { Location } from './location.component';
import Weather from './WeatherDetails.component';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <IonIcon style={{ fontSize: '3em' }} color="white" src={CloudyDay} />
      <strong>{name}</strong>

      <IonIcon style={{ fontSize: '3em' }} color="white" src={CloudyNight} />
      <Location />
      <Weather />
    </div>
  );
};

export default ExploreContainer;
