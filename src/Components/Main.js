import React from 'react';
import {useSelector} from 'react-redux'
import {Container} from 'semantic-ui-react';
import {Record} from './Record';

/**
 * Компонент главная область приложения.
 */
export const Main = () => {
    const records = useSelector(state => state.records);

    return (
        <Container className="main">
            {records.map((record) => (
                <Record
                    id={record.id}
                    key={record.id}
                    {...record}
                />
            ))}
        </Container>
    );
};
