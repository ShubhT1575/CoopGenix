import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import  dashdataSlice from './Dashdata'


const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
    coreCrowd:counterReducer,
    coopgenix:dashdataSlice
     //persistReducer(persistConfig, counterReducer),
  })

  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

  const persistore = persistStore(store);

  
export {store, persistore}