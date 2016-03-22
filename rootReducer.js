import { combineReducers } from 'redux'
import {counter} from './ducks/counter'
import {clickCounter} from './ducks/clickCounter'
import {multiplyAll} from './ducks/multiplyAll'

const reducers = {
  counter,
  clickCounter,
  multiplyAll
};

export default combineReducers(reducers);
