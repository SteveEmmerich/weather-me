import React from 'react';
import { IState, IAction, IRequestState } from './weather.types';

enum ActionType {
  SetLocation = 'setLocation',
  SetData = 'setData',
  ClearData = 'clearData',
  Fetching = 'WeatherFetching',
  Success = 'WeatherSuccess',
  Error = 'WeatherError',
}

const initialDataState: IState = { data: null, location: '34116' };
const initialRequestState: IRequestState = { status: '', errorMsg: '' };

const stateReducer: React.Reducer<IState, IAction> = (
  state: IState,
  action: IAction
) => {
  /*
    We are type casting here since we want the action payload to be a parital of IState
    and our reducer function is expecting a full IState. Also, since payload is a union of
    the IRequestState and IState we need to tell typescript the payload is the correct type.
  */
  const payload = action.payload as IState;
  switch (action.type) {
    case ActionType.SetLocation: {
      return { ...state, location: payload.location };
    }
    case ActionType.SetData: {
      return { ...state, data: payload.data };
    }
    case ActionType.ClearData: {
      return { ...state, data: null };
    }
    default: {
      throw new Error(`No action of type: ${action.type}`);
    }
  }
};
const requestReducer: React.Reducer<IRequestState, IAction> = (
  state: IRequestState,
  action: IAction
) => {
  const payload = action.payload as IRequestState;
  switch (action.type) {
    case ActionType.Fetching: {
      return { ...state, status: 'fetching' };
    }
    case ActionType.Success: {
      return { ...state, status: 'success' };
    }
    case ActionType.Error: {
      console.log(`error: ${payload.errorMsg}`);
      return { errorMsg: payload.errorMsg, status: 'error' };
    }
    default: {
      throw new Error(`No action of type: ${action.type}`);
    }
  }
};
export {
  stateReducer,
  requestReducer,
  ActionType,
  initialDataState,
  initialRequestState,
};
// Create hook for api request with own reducer so we can dispatch the make request call and hide the whole process form the component.
