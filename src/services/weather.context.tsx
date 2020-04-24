import React, { createContext, useReducer, useEffect } from 'react';
import {
  stateReducer,
  requestReducer,
  initialDataState,
  initialRequestState,
} from './weather.state';
import {
  IState,
  IAction,
  IRequestState,
  IStateContextProps,
  IDispatchContextProps,
  IWeatherData,
} from './weather.types';
import { useSafeContext } from './weather.utils';
import {
  Fetching,
  WeatherSuccess,
  WeatherError,
  SetData,
  ClearData,
} from './weather.action';
import fetch from 'cross-fetch';

interface ProviderParameters {
  temporaryState: IState;
  children: any;
}
const WeatherStateContext = createContext<IStateContextProps>({
  state: initialDataState,
  apiState: initialRequestState,
});
const WeatherDispatchContext = createContext<IDispatchContextProps>({
  dispatch: () => {},
  apiDispatch: () => {},
});

const WeatherProvider = ({ temporaryState, children }: ProviderParameters) => {
  // faux redux
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
    stateReducer,
    temporaryState || initialDataState
  );
  const [apiState, apiDispatch] = useReducer<
    React.Reducer<IRequestState, IAction>
  >(requestReducer, initialRequestState);

  useEffect(() => {
    const makeRequest = async () => {
      console.log('starting fetch');
      apiDispatch(Fetching());
      try {
        console.log('making request');
        const res = await fetch(
          `http://localhost:3000/v1/weather?zip=${state.location}`
        );
        console.log(`request status: ${res.status}, ${res.statusText}`);
        if (res.status === 200) {
          apiDispatch(WeatherSuccess());
          try {
            // TODO: add correct type
            const responseData = (await res.json()) as IWeatherData;
            console.log(`response data: ${JSON.stringify(responseData)}`);
            dispatch(SetData(responseData));
            apiDispatch(WeatherError(''));
          } catch (e) {
            apiDispatch(WeatherError(e));
          }
        } else if (res.status === 404) {
          try {
            // TODO: add correct type
            const responseData = await res.json();
            console.log(`response data: ${JSON.stringify(responseData)}`);
            dispatch(ClearData());
            apiDispatch(WeatherError(responseData.msg));
          } catch (e) {
            apiDispatch(WeatherError(e));
          }
        } else if (res.status === 400) {
          dispatch(ClearData());
          apiDispatch(WeatherError(''));
        } else {
          apiDispatch(
            WeatherError(
              `Request failed with error code ${res.status}, ${res.statusText}`
            )
          );
        }
      } catch (e) {
        console.log(`fetch error: ${e}`);
        apiDispatch(WeatherError(e));
      }
    };
    // Make sure we don't send the request while one is in progress, we could also cancel the reqest.
    if (apiState.status !== 'fetching') {
      makeRequest();
    }
  }, [state.location]);

  // Wrap anything in our providers
  return (
    <WeatherStateContext.Provider value={{ state, apiState }}>
      <WeatherDispatchContext.Provider value={{ dispatch, apiDispatch }}>
        {children}
      </WeatherDispatchContext.Provider>
    </WeatherStateContext.Provider>
  );
};

// Custom State Hook
const useWeatherState = (): IStateContextProps => {
  // check for context
  return useSafeContext(WeatherStateContext);
};

// Custom Dispatch Hook
const useWeatherDispatch = (): IDispatchContextProps => {
  //check for context
  return useSafeContext(WeatherDispatchContext);
};

const useWeather = (): [IStateContextProps, IDispatchContextProps] => {
  return [useWeatherState(), useWeatherDispatch()];
};

interface withProviderProps {
  initialState: IState;
  props: any;
}

const withProvider = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & withProviderProps> => ({
  initialState,
  ...props
}: withProviderProps) => (
  <WeatherProvider temporaryState={initialState}>
    <WrappedComponent {...(props as P)} />
  </WeatherProvider>
);

export {
  withProvider,
  WeatherProvider,
  useWeatherDispatch,
  useWeatherState,
  useWeather,
};
