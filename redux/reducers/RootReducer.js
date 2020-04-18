// A rootReducer is needed to persist all states. That's what we want for the moment

import productReducer from './ProductReducer'
import { combineReducers } from 'redux';

export default combineReducers({
    products: productReducer,
})