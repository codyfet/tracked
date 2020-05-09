import React from 'react';
import {Container, Image, Menu} from 'semantic-ui-react';

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