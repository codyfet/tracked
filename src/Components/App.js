import React, {Fragment, useEffect} from "react";
import {useDispatch} from 'react-redux';
import {getGenres} from '../Services/TMDBServices';

import {Header} from "./Header";
import {Main} from "./Main";

export const App = () => {
    // Загружаем справочник жанров.
    const dispatch = useDispatch();
    useEffect(() => dispatch(getGenres), []);

    return (
        <Fragment>
            <Header />
            <Main />
        </Fragment>
    );
};
