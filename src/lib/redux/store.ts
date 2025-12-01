// Redux store configuration
import { createStore, applyMiddleware, combineReducers, compose, AnyAction } from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { userReducer } from './reducers/userReducer';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Redux DevTools setup
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Create store with middleware and DevTools
export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunk))
);

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;