import React from "react";
import {Image} from "semantic-ui-react";
import {getRandomInt} from "../Utils/Utils";

/**
 * Главная страница приложения.
 */
export const Main = () => {
    return (
        <div className="hero">
            <Image src={`../src/Assets/films/${getRandomInt(1, 3)}.jpg`} fluid />
        </div>
    );
};
