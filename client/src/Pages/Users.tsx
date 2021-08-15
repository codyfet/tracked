import {CLEAR_USERS} from "../Actions/ActionTypes";
import {getUsers} from "../Actions/Actions";
import {Container, Header, Pagination, Table} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Page} from "../Components/Common/Page";
import {IApplicationReduxState} from "../Reducers";

/**
 * Страница журнал просмотров.
 */
export const Users = () => {
    const dispatch = useDispatch();
    const {
        users: {data: usersData},
    } = useSelector((state: IApplicationReduxState) => state);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        dispatch(getUsers({page: currentPage}));
        return () => {
            dispatch({type: CLEAR_USERS});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useEffect(() => {
        if (usersData) {
            setTotalPages(Math.ceil(usersData.total / usersData.limit));
        }
    }, [usersData]);

    return (
        <Page asyncDataKeys={["users"]}>
            <Container className="users">
                <Header as="h2" size="large">
                    Пользователи
                </Header>
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Пользователь</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {usersData?.items.map((user) => (
                            <Table.Row key={user._id}>
                                <Table.Cell>
                                    <Link to={`/profile/${user._id}`} key="profile">
                                        {user.username}
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Pagination
                    defaultActivePage={currentPage + 1}
                    totalPages={totalPages}
                    onPageChange={(_event, data) => {
                        setCurrentPage(Number(data.activePage) - 1);
                    }}
                />
            </Container>
        </Page>
    );
};
