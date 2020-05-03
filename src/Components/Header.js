import React from 'react';
import {Container, Image, Menu, Dropdown} from 'semantic-ui-react';

const years = [
    {key: '2019', value: '2019', text: '2019'},
    {key: '2018', value: '2018', text: '2018'},
    {key: '2017', value: '2017', text: '2017'}
]

/**
 * Компонент шапка-приложения.
 */
export const Header = () => (
    <Menu borderless>
        <Container>
            <Menu.Menu position="right">
                <Menu.Item as="a" name="diary">
                    дневник
                </Menu.Item>

                <Menu.Item as="a" name="stats">
                    статистика
                </Menu.Item>

                <Menu.Item as="a" name="results">
                    итоги
                </Menu.Item>

                <Menu.Item as="a" name="year">
                    <Dropdown
                        inline
                        options={years}
                        defaultValue={years[0].value}
                    />
                </Menu.Item>

                <Menu.Item as="a" name="avatar">
                    <div className="avatar-block">
                        <Image size="mini" src='src/Assets/matthew.png' avatar />
                        <span>Alexander Volkov</span>
                    </div>
                </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
);