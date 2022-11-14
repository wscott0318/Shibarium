import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import rootReducer from '.';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (typeof window !== "undefined")&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const RStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  
  ;