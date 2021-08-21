import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import createDebounce from "redux-debounced";
import reducer from "./Reducers";

import "./Styles/index";
import "semantic-ui-css/semantic.min.css";

import {App} from "./Components/App";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(createDebounce(), thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
