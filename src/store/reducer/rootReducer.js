import {combineReducers} from 'redux';
import {testReducer} from './test';
import createReducer from './create';
import auth from './auth'

export default combineReducers({
    tests: testReducer,
    create: createReducer,
    auth
})