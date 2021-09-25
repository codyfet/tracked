import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Routes} from "../Routes/Routes";
import {Header} from "./Header";
import {Footer} from "./Footer";

export const App = () => {
    return (
        <Router>
            <Header />
            <Routes />
            <Footer />
        </Router>
    );
};
