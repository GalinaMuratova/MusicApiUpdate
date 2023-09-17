import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/artists/artistsSlice';
import { albumsReducer } from '../features/albums/albumsSlice';
import {tracksReducer} from "../features/tracks/tracksSlice";
import { usersReducer } from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const usersPersistConfig = {
  key: 'musicApp:users',
  storage,
  whitelist:['user'],
}

const rootReducer = combineReducers({
  artistsReducer: artistsReducer,
  albumsReducer: albumsReducer,
  tracksReducer: tracksReducer,
  usersReducer: persistReducer(usersPersistConfig, usersReducer),
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persist = persistStore(store);