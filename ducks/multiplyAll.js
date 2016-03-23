import {operationReducerFactory} from 'redux-operations';
import {INCREMENT_COUNTER} from './counter';

const initialState = 0;
export const multiplyAll = operationReducerFactory('multiplyAll', initialState, {
  INCREMENT_COUNTER: {
    //priority must be higher so it comes later than the origination click and update
    priority: 100,
    resolve: (state, action)=> {
      return action.meta.operations.results.counter.state * action.meta.operations.results.clickCounter.state;
    },
    description: 'All counters clicked multiplied by value of last counter clicked'
  }
});
