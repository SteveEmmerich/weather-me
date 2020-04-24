import React from 'react';
import './WeatherCard.css';

import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonCardSubtitle,
} from '@ionic/react';
interface IProps {
  error: string;
}

const WeatherErrorCard = (props: IProps) => {
  const { error } = props;

  return (
    <IonCard className={`weatherContainer`}>
      <IonCardHeader>
        <IonCardSubtitle>API Error</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>{error}</IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export { WeatherErrorCard };
