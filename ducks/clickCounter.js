import {operationReducerFactory} from 'redux-operations';
import {INCREMENT_COUNTER} from './counter';

const defaultState = 0;
export const clickCounter = operationReducerFactory('clickCounter', defaultState, {
  INCREMENT_COUNTER: {
    resolve: (state, action)=> {
      return state + 1;
    },
    description: 'Number of times all counters were incremented'
  }
});

