import {configureStore, combineReducers} from "@reduxjs/toolkit";

// importing our reducer - userSlice.reducer
import userReducer from './userSlice.js'

// for persist storage of the browser by redux
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'



// basic redux persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }


// just combine in case useful in coplex application with many different reducers
const rootReducer = combineReducers({user: userReducer});

// taking persist and our root reducer and take it into the persist reducer 
const persistedReducer = persistReducer(persistConfig, rootReducer)



// to store in the browser redux
export const store = configureStore({ // setting the data in the browser database that comes from the reducer from different places
    reducer: persistedReducer,
    // middleware to pass it 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// exporting storer through persistStorage
export const persistor = persistStore(store);




