import React from "react";
import {Button, Modal} from "semantic-ui-react";

/**
 * Компонент стандартное модальное окно с кнопками Отмена/Ок.
 */
export const SimpleModal = ({header, content, onClose, onSuccess, successText, successDisabled}) => (
    <Modal
        onClose={onClose}
        open
        closeOnDimmerClick={false}
    >
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
            {content}
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={onClose}>Отмена</Button>
            <Button onClick={onSuccess} disabled={successDisabled} positive>{successText || "Ок"}</Button>
        </Modal.Actions>
    </Modal>
);
