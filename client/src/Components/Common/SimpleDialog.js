import React from "react";
import {Button, Modal} from "semantic-ui-react";

/**
 * Компонент простой диалог с кнопками Да/Нет.
 */
export const SimpleDialog = ({header, text, onClose, onNegative, onPositive}) => (
    <Modal size="mini" open={open} onClose={onClose}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
            <p>{text}</p>
        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={onNegative}>
                Нет
            </Button>
            <Button
                positive
                onClick={() => {
                    onPositive();
                    onClose();
                }}
            >
                Да
            </Button>
        </Modal.Actions>
    </Modal>
);
