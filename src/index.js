import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'
import {rootReducer} from "./Reducers/rootReducer";

import "./Styles/Styles";
import "./Styles/Autosuggest";
import 'semantic-ui-css/semantic.min.css';

import {App} from './Components/App';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('root')
);