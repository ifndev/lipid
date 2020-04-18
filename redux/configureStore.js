import { combineReducers } from 'redux';
import { createStore } from 'redux';

//Persist
import { persistStore, persistReducer } from 'redux-persist';
import {AsyncStorage } from 'react-native';

//Reducers
import productReducer from './reducers/ProductReducer'

//Persist config
const persistConfig = {
    key: "root",
    storage: AsyncStorage
};

export default createStore(combineReducers({
    products: productReducer,
}));