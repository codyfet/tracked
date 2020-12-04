import {CLEAR_USERS} from "../Actions/ActionTypes";
import {getUsers} from "../Actions/Actions";
import {Container, Table} from "semantic-ui-react";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

/**
 * Страница журнал просмотров.
 */
export const Users = () => {
    const dispatch = useDispatch();
    const {users: {data: users}} = useSelector(state => state);

    useEffect(() => {
        dispatch(getUsers());
        return () => {
            dispatch({type: CLEAR_USERS});
        };
    });


    return (
        <Container className="users">
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Пользователь</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {users?.map((user) => (
                        <Table.Row>
                            <Table.Cell>
                                <Link to="/profile" key="profile">{user.username}</Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    );
};
