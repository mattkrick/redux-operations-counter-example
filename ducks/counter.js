import {operationReducerFactory, bindOperationToActionCreators} from 'redux-operations';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
export const SET_COUNTER = 'SET_COUNTER';
export const FETCH_RANDOM_REQUEST = 'FETCH_RANDOM_REQUEST';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  }
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  }
}

export function incrementIfOdd() {
  return {
    type: INCREMENT_IF_ODD
  }
}

export function incrementAsync() {
  return {
    type: INCREMENT_ASYNC
  }
}

export function setFromFetch() {
  return {
    type: FETCH_RANDOM_REQUEST
  }
}

export function setCounter(newValue) {
  return {
    type: SET_COUNTER,
    payload: {newValue: +newValue}
  }
}

export const actionCreators = {increment, decrement, incrementIfOdd, incrementAsync, setFromFetch, setCounter};

const initialState = 0;
export const counter = operationReducerFactory('counter', initialState, {
  INCREMENT_COUNTER: {
    resolve: (state, action)=> state + 1
  },
  DECREMENT_COUNTER: {
    resolve: (state, action)=> state - 1
  },
  INCREMENT_IF_ODD: {
    resolve: (state, action) => state % 2 ? state + 1 : state
  },
  INCREMENT_ASYNC: {
    resolve: (state, action)=> {
      setTimeout(()=> {
        const {dispatch, locationInState} = action.meta.operations;
        const inc = bindOperationToActionCreators(locationInState, counter, increment);
        dispatch(inc());
      }, 1000);
      return state;
    }
  },
  SET_COUNTER: {
    resolve: (state, action) => action.payload.newValue,
    arguments: {
      newValue: {type: Number, description: 'The new value for the counter'}
    }
  },
  FETCH_RANDOM_REQUEST: {
    priority: 1,
    resolve: (state, action)=> {
      const {dispatch, locationInState} = action.meta.operations;
      const set = bindOperationToActionCreators(locationInState, counter, setCounter);
      window.fetch('http://localhost:3000/randomnumber')
        .then(res => {
          return res.text()
        })
        .then(data => {
          dispatch(set(parseInt(data)));
        })
        .catch(err => {
          console.log('ERR', err)
        });
      return state;
    }
  }
});

