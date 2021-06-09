import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavDropdown, NavLink} from "react-bootstrap";
import {BrowserRouter, Route, Link, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import styles from '../styles.css';
import {LOGIN_ROUTE, MAIN_ROUTE, MODERATION_ROUTE, STATISTICS_ROUTE, USER_ROUTE} from "../utils/consts";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    return (

        <Navbar expand="lg" className="bg_color pt-3">
            <Container >
                <Navbar.Brand as={Link} to={isLogin?LOGIN_ROUTE:MAIN_ROUTE} className="logo">a_toxic</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        user.isAuth?
                            <Nav className="ml-auto">
                                <Nav.Link as={Link} to={MAIN_ROUTE} className="my-auto">Главная</Nav.Link>
                                <Nav.Link as={Link} to={MODERATION_ROUTE} className="my-auto">Модерация контента</Nav.Link>
                                <Nav.Link as={Link} to={STATISTICS_ROUTE} className="my-auto">Статистика</Nav.Link>
                                <Nav.Link as={Link} to={LOGIN_ROUTE} onClick={()=>user.setIsAuth(false)} className="my-auto">Выйти</Nav.Link>
                                <Nav.Link as={Link} to={USER_ROUTE} className="avatar my-auto"> </Nav.Link>
                            </Nav>
                            :
                            <Nav className="ml-auto">
                                <Nav.Link href="#link2" onClick={()=>user.setIsAuth(true)}>Войти</Nav.Link>
                            </Nav>
                    }

                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
});

export default NavBar;
