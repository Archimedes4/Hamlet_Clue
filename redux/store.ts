import { configureStore } from '@reduxjs/toolkit';
import dimentionsReducer from './reducers/dimentionsReducer';
import gameStateReducer from './reducers/gameStateReducer';
import screensReducer from './reducers/screensReducer';

const store = configureStore({
  reducer: {
    dimentions: dimentionsReducer,
    gameState: gameStateReducer,
    screens: screensReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
    }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
