import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from "./Reducers/rootReducer";

import "./Styles/styles";
import 'semantic-ui-css/semantic.min.css';

import {App} from './Components/App';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('root')
);