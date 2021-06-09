import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {login, registration} from "../http/user_api";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const history = useHistory()
    const {user} = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const click = async () => {
        try {
            let data;
            if (isLogin) {
                console.log(email, password)
                data = await login(email, password);
                console.log(data)

            } else {
                const formData = new FormData()
                formData.append('email', email)
                formData.append('username', username)
                formData.append('file', file)
                formData.append('password', password)
                console.log(email, username, file, password)
                data = await registration(formData);
                console.log(data)
            }
            console.log(data)
            if(data) {
                user.setIsAuth(true)
                user.setUser(data)
                history.push(MAIN_ROUTE)
            }
        } catch (e) {
            history.push(LOGIN_ROUTE)
            return alert(e.response.data.message)
        }

    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center "
            style={{height: window.innerHeight-100}}
        >
            <Card className="p-2 auth_card">
                <h2 className="m-auto pb-4">{isLogin? 'Вход' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3 input_style"
                        placeholder="Почта"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {isLogin ? "" :

                        <Form.Control
                            className="mt-3 input_style"
                            placeholder="Имя пользователя"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    }
                    {isLogin ? "" :

                        <Form.Control
                            className="mt-3 input_style"
                            placeholder="Выберите файл"
                            type="file"
                            onChange={selectFile}
                        />
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Button onClick={click} className="mt-3">{isLogin? 'Войти': 'Зарегистрироваться'}</Button>
                    {isLogin ?
                        <div className="d-flex justify-content-center mt-2 small-text">Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> Зарегистрироваться</NavLink></div>
                        :
                        <div className="d-flex justify-content-center mt-2 small-text">Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войти</NavLink></div>
                    }
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
