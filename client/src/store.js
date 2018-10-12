
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'; //Will bring in the combineReducer which will give access to all reducer files

const initialState = {}

const middleware = [thunk];

const store = createStore(
        rootReducer, 
        initialState, 
        //Setting up the chrome redux extension which allows redux to be displayed
        compose(applyMiddleware(...middleware), 
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) );

export default store;