import { combineReducers } from 'redux';
import { createStore } from 'redux'

import productReducer from './reducers/ProductReducer'

export default createStore(combineReducers({
    products: productReducer,
}));