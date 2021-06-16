import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavDropdown, NavLink} from "react-bootstrap";
import {BrowserRouter, Route, Link, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import styles from '../styles.css';
import {LOGIN_ROUTE, MAIN_ROUTE, MODERATION_ROUTE, STATISTICS_ROUTE, USER_ROUTE} from "../utils/consts";
import jwt_decode from "jwt-decode";
import {fetchOneUser} from "../http/user_api";

const NavBar = observer(() => {
    const storedToken = localStorage.getItem("token");
    // console.log("navBar token: ", jwt_decode(storedToken))
    if (storedToken) {
        let decodedData = jwt_decode(storedToken, {header: true});
        let expirationDate = decodedData.exp;
        let current_time = Date.now() / 1000;
        if (expirationDate < current_time) {
            localStorage.removeItem("token");
        }
    }
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    const [avatar, setAvatar] = useState('')
    if (storedToken) {
        fetchOneUser(parseInt(jwt_decode(storedToken).id)).then(data => data!==null? setAvatar(data.avatar): "")
    }

    return (
        <Navbar expand="lg" className="bg_color pt-3">
            <Container>
                <Navbar.Brand as={Link} to={isLogin ? LOGIN_ROUTE : MAIN_ROUTE} className="logo">a_toxic</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        user.isAuth ?
                            <Nav className="ml-auto">
                                <Nav.Link as={Link} to={MAIN_ROUTE} className="my-auto">Главная</Nav.Link>
                                <Nav.Link as={Link} to={MODERATION_ROUTE} className="my-auto">Модерация
                                    контента</Nav.Link>
                                <Nav.Link as={Link} to={STATISTICS_ROUTE} className="my-auto">Статистика</Nav.Link>
                                <Nav.Link as={Link} to={LOGIN_ROUTE} onClick={() => logOut()}
                                          className="my-auto">Выйти</Nav.Link>
                                <Nav.Link as={Link} to={USER_ROUTE} className=" my-auto"><img
                                    className="avatar_img" src={process.env.REACT_APP_API_URL + avatar} alt="pic"/>
                                </Nav.Link>
                            </Nav>
                            :
                            <Nav className="ml-auto">
                                <Nav.Link as={Link} to={LOGIN_ROUTE}>Войти</Nav.Link>
                            </Nav>
                    }

                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
});

export default NavBar;
