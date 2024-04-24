import { configureStore } from '@reduxjs/toolkit'

//persist
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'
import rootReducer from'./rootReducer'


  const persistConfig = {
    key: 'root',
    storage,
    // Add other state keys you want to persist here
    whitelist: ['user']
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer)

    export const store = configureStore({
        reducer: persistedReducer,
    })

    export const persistor = persistStore(store);
    export default store;