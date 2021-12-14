import React from "react";
import {Container, List} from "semantic-ui-react";

/**
 * Страница "О проекте".
 */
export const About = () => {
    return (
        <div className="about">
            <Container className="about">
                <h1 className="mt20">О проекте</h1>
                <p>
                    Tracked - это веб-приложение для ведения учёта просмотренных фильмов и сериалов,
                    а также создания ежегодного итогового рейтинга лучших просмотренных фильмов и
                    сериалов за год.
                </p>

                <p>
                    Tracked вдохновлён такими проектами, как{" "}
                    <a href="https://letterboxd.com/" target="_blank" rel="noreferrer">
                        Letterboxd
                    </a>{" "}
                    и{" "}
                    <a href="https://www.kinopoisk.ru/" target="_blank" rel="noreferrer">
                        КиноПоиск
                    </a>
                    .
                </p>
                <br />
                <p>Уже сейчас Tracked позволяет пользователям:</p>
                <List>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>
                            Добавлять записи о просмотренных фильмах и сериалах в журнал просмотров
                            с привязкой к дате просмотра
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>Ставить оценки просмотренным фильмам</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>
                            Просматривать статистику в разных аспектах, созданную автоматически на
                            основе внесённых данных
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>
                            Подводить итоги года и создавать списки лучших просмотренных фильмов и
                            сериалов за год
                        </List.Content>
                    </List.Item>
                </List>
                <br />
                <p>Сервис планируется развивать в таких направлениях, как:</p>
                <List>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>Статистика</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>Алгоритмы рекомендаций</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>Геймификация</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>Социальные сети</List.Content>
                    </List.Item>
                </List>
                <br />
                <p>В будущем планируется добавить:</p>

                <List>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>
                            Возможность добавления записей в список желаемого
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>
                            Систему рекомендаций фильмов/сериалов на основе оригинального алгоритмай
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>
                            Возможность подписки на пользователей, возможность просмотра новостной
                            ленты (кто что посмотрел, кто что добавил в список желаемого и т.д.)
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>Элементы геймификации - бейджи и др.</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="angle right" />
                        <List.Content>
                            Возможность внесения не только просмотренных фильмов и сериалов, но и
                            компьютерных игр, в которые удалось поиграть, а также книг, которые
                            удалось прочитать
                        </List.Content>
                    </List.Item>
                </List>

                <br />
                <hr />
                <br />

                <p>
                    Если у вас есть желание поучаствовать в проекте, то пишите в телеграм
                    @alexander_volkov. Также вы можете задать вопрос или сообщить о проблеме{" "}
                    <a
                        href="https://github.com/codyfet/tracked/issues"
                        target="_blank"
                        rel="noreferrer"
                    >
                        здесь
                    </a>
                    .
                </p>
            </Container>
        </div>
    );
};
