import React from "react";
import {Button, Modal} from "semantic-ui-react";

interface IProps {
    header: string;
    content: React.ReactNode;
    onClose: () => void;
    onSuccess: () => void;
    successText: string;
    successDisabled: boolean;
    hideCancel?: boolean;
}

/**
 * Компонент стандартное модальное окно с кнопками Отмена/Ок.
 */
export const SimpleModal = ({
    header,
    content,
    onClose,
    onSuccess,
    successText,
    successDisabled,
    hideCancel,
}: IProps) => (
    <Modal onClose={onClose} open closeOnDimmerClick={false}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>{content}</Modal.Content>
        <Modal.Actions>
            {!hideCancel && <Button onClick={onClose}>Отмена</Button>}
            <Button onClick={onSuccess} disabled={successDisabled} positive>
                {successText || "Ок"}
            </Button>
        </Modal.Actions>
    </Modal>
);
