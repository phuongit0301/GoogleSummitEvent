import {createStore, applyMiddleware} from 'redux';  
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from '../reducers';

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

let middleware = [];

if(process.env.NODE_ENV === 'production') {
  middleware = [thunk];
} else {
  middleware = [logger, thunk];
}

const store = createStore(
	rootReducer,
	applyMiddleware(...middleware)
);

const persistor = persistStore(store);

export { store, persistor };