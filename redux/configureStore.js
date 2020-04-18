import { createStore } from 'redux';

//redux-persist related imports
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

//Reducers
import rootReducer from './reducers/RootReducer'

const persistConfig = {
    key: "root",
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer)
const persistor = persistStore(store)

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};

export {
    getStore,
    getState,
    getPersistor
};

export default {
    getStore,
    getState,
    getPersistor
}