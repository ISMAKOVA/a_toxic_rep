import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {login, registration} from "../http/user_api";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";

const Auth = observer(() => {

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const history = useHistory()
    const {user} = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [file, setFile] = useState(null)
    const fileInput = useRef(null)
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const storedToken = localStorage.getItem("token");
    if (storedToken){
        let decodedData = jwt_decode(storedToken, { header: true });
        let expirationDate = decodedData.exp;
        let current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token");
        }
    }
    const click = async () => {
        try {
            let data;
            if (isLogin) {
                // console.log(email, password)
                data = await login(email, password);
                // console.log(data)

            } else {
                const formData = new FormData()
                formData.append('email', email)
                formData.append('username', username)
                formData.append('avatar', file)
                formData.append('password', password)
                // for (const key of formData.entries()) {
                //     console.log(key[0] + ', ' + key[1])
                // }
                data = await registration(formData);

            }
            if (data) {
                user.setIsAuth(true)
                console.log('sddddd-',user.isAuth)
                user.setUser(data)
                history.push(MAIN_ROUTE)
            }
        } catch (e) {
            // history.push(LOGIN_ROUTE)
            return alert(e.response.data.message)
        }

    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center "
            style={{height: window.innerHeight - 100}}
        >
            <Card className="p-2 auth_card">
                <h2 className="m-auto pb-4">{isLogin ? 'Вход' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column" encType="multipart/form-data">
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
                    <Form.Control
                        className="input_style"
                        placeholder="Выберите файл"
                        type="file"
                        onChange={selectFile}
                        ref={fileInput}
                        style={{display: 'none'}}
                    />
                    {isLogin ? "" :


                        <Button className="mt-3 text_color norm_font" onClick={() => fileInput.current.click()}>
                            Загрузить аватар
                        </Button>

                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Button onClick={click} className="mt-3">{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                    {isLogin ?
                        <div className="d-flex justify-content-center mt-2 small-text">Нет аккаунта? <NavLink
                            to={REGISTRATION_ROUTE}> Зарегистрироваться</NavLink></div>
                        :
                        <div className="d-flex justify-content-center mt-2 small-text">Уже есть аккаунт? <NavLink
                            to={LOGIN_ROUTE}> Войти</NavLink></div>
                    }
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
