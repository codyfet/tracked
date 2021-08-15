import React from "react";
import {Loader} from "semantic-ui-react";

/**
 * Компонент оверлей со спиннером.
 */
export const LoadingOverlay = () => (
    <div className="loading-overlay">
        <Loader active />
    </div>
);
