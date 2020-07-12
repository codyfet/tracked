import React from "react";
import {Button, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";

/**
 * Главная страница приложения.
 */
export const Main = () => {
    return (
        <div className="main-page">
            <div className="main-page-tape">
                <Image src={"../src/Assets/tape.png"} />
            </div>
            <div className="main-page-text">
                <div className="text">Журнал для учёта просмотренных фильмов и сериалов</div>
                <div className="start-button">
                    <Button as={Link} to="/login" key="login" color="green">
                        Начать
                    </Button>
                </div>
            </div>
        </div>
    );
};
