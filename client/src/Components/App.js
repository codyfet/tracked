import React from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

import {Header} from "./Header";
import {Main} from "../Pages/Main";
import {Diary} from "../Pages/Diary";

export const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/diary" component={Diary} />
            </Switch>
        </Router>
    );
};
