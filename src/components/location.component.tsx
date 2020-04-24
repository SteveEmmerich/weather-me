import React from 'react';
import { IonItem, IonInput, IonSearchbar } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';

import { useWeather } from '../services/weather.context';
import { SetLocation } from '../services/weather.action';
const Location = () => {
  const [{ state }, { dispatch }] = useWeather();
  const updateInput = (e: CustomEvent<InputChangeEventDetail>) => {
    const { value } = e.detail;
    dispatch(SetLocation({ location: value as string }));
  };
  return (
    <IonItem>
      <IonSearchbar
        inputMode="numeric"
        onIonChange={updateInput}
        value={state.location}
        debounce={300}
      />
    </IonItem>
  );
};

export { Location };
