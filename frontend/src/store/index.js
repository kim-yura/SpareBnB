
// -------------------- IMPORTS -------------------- //

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session.js';
import spotReducer from './spotReducer.js';
import userReducer from './userReducer.js';
import bookingReducer from './bookingReducer.js';

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

// -------------------- ROOT REDUCER -------------------- //

const rootReducer = combineReducers({
    session: sessionReducer,
    spot: spotReducer,
    users: userReducer,
    bookings: bookingReducer
});

// -------------------- EXPORTS -------------------- //

export default configureStore;
