import { createStore, applyMiddleware } from 'redux';
import reducer from './ducks/reducer';
 

export default createStore(
    reducer,
    // applyMiddleware(reduxPromiseMiddleware())
);