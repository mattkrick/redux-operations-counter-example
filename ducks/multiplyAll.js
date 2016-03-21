import {operationReducerFactory} from 'redux-operations';
import {INCREMENT_COUNTER} from './counter';

const defaultState = 0;
export const multiplyAll = operationReducerFactory(defaultState, {
  INCREMENT_COUNTER: {
    //priority must be higher so it comes later than the origination click and update
    priority: 100,
    resolve: (state, action)=> {
      return action.meta.operationResults.counter.state * action.meta.operationResults.clickCounter.state;
    },
    description: 'All counters clicked multiplied by value of last counter clicked'
  }
});
