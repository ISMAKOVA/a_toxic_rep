import React, {useRef, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, FormControl, Nav, Row, Tab} from "react-bootstrap";
import {Scrollbars} from 'rc-scrollbars';
import jwt_decode from "jwt-decode";
import {observer} from "mobx-react-lite";
import {fetchOneUser, update} from "../http/user_api";
import {Link} from "react-router-dom";
import {createGroupVK, fetchAllUserGroups, fetchOneGroupFromVK} from "../http/groups_api";
import {createUserVK, fetchAllUserUsers, fetchOneUserFromVK} from "../http/users_api";
import {createPostVK, fetchPostsFromVK} from "../http/posts_api";
import {createToxicityValue} from '../http/toxicity_api';
import CreateComplaint from "../components/CreateComplaint";
import ModalWindow from "../components/ModalWindow";

const UserPage = observer(() => {
    //get token of current user
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        let decodedData = jwt_decode(storedToken, {header: true});
        let expirationDate = decodedData.exp;
        let current_time = Date.now() / 1000;
        if (expirationDate < current_time) {
            console.log("remove")
            localStorage.removeItem("token");
        }
    }

    useEffect(() => {
        if (storedToken) {
            fetchOneUser(parseInt(jwt_decode(storedToken).id)).then(data => setEmail(data.email))
            fetchOneUser(parseInt(jwt_decode(storedToken).id)).then(data => setUsername(data.username))
            fetchAllUserGroups(parseInt(jwt_decode(storedToken).id)).then(data => setFavoriteGroups(data))
            fetchAllUserUsers(parseInt(jwt_decode(storedToken).id)).then(data => setFavoriteUsers(data))
        }
    }, [])
    //this data for update
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [username, setUsername] = useState(undefined)
    const [file, setFile] = useState(null)
    const fileInput = useRef(null)

    // this data to add new group
    const [groupInfo, setGroupInfo] = useState(undefined)
    const [groupId, setGroupId] = useState(undefined)
    const [favoriteGroups, setFavoriteGroups] = useState(undefined)

    // this data to add new user
    const [userInfo, setUserInfo] = useState(undefined)
    const [userId, setUserId] = useState(undefined)
    const [favoriteUsers, setFavoriteUsers] = useState(undefined)

    const [createComplainVisible, setCreateComplainVisible] = useState(false)


    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const Update = async () => {
        const formData = new FormData()
        formData.append('id', parseInt(jwt_decode(storedToken).id))
        formData.append('email', email)
        formData.append('username', username)
        formData.append('avatar', file)
        formData.append('password', password)
        for (const key of formData.entries()) {
            console.log(key[0] + ', ' + key[1])
        }
        update(formData).then()
        alert("Данные обновлены");
    }

    const GetUser = async () => {
        if (userId !== undefined) {
            fetchOneUserFromVK(userId).then(data => setUserInfo({
                'id': data['users'][0]['id'],
                'username': data['users'][0]['first_name'] + ' ' + data['users'][0]['last_name'],
                'privacy': data['users'][0]['is_closed'],
                'avatar': data['users'][0]['photo_200']
            }))
        }
    }

    const GetGroup = async () => {
        if (groupId !== undefined) {
            fetchOneGroupFromVK(groupId).then((data) => setGroupInfo({
                'id': data['groups']['0']['id'],
                'info': data['groups']['0']['name'],
                'description': data['groups']['0']['description'],
                'pic': data['groups']['0']['photo_200'],
                'privacy': data['groups']['0']['is_closed'],
                'screen_name': data['groups']['0']['screen_name']
            }))
        }
    }
    const AddUserToUser = async () => {
        createUserVK(userInfo.id, userInfo.username, userInfo.privacy, userInfo.avatar, parseInt(jwt_decode(storedToken).id)).then()
        alert("Пользователь добавлен!")
    }
    const AddGroupToUser = async () => {
        createGroupVK(groupInfo.id, groupInfo.info, groupInfo.privacy, groupInfo.screen_name, groupInfo.pic,
            parseInt(jwt_decode(storedToken).id)).then()

        // createPostVK(88883, 'group', "sdfasdf", 1212342233, null, groupInfo.id).then()

        fetchPostsFromVK(groupId).then((data) =>
                data['posts']['items'].map(item =>
                    createPostVK(item.id, 'group', item.text, item.date, null, groupInfo.id).then())
            // console.log(item.id, 'group', item.text, item.date, null, groupInfo.id))
        )
        fetchPostsFromVK(groupId).then((data) =>
                data['labeled'].map(item =>
                    createToxicityValue(item['toxicity'], null, null,
                        null, null, groupInfo.id, item["post_id"], null))

        )
        alert("Группа добавлена!")

    }

    return (
        <Container>
            <Tab.Container id="" defaultActiveKey="first">
                <Row className="mt-4">
                    <Col sm={3}>
                        <Nav className="flex-column neo-nav">
                            <Nav.Item className="">
                                <Nav.Link eventKey="first" className="neo-nav-item">Профиль</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="neo-nav-item">Сообщества</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third" className="neo-nav-item">Пользователи</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Form encType="multipart/form-data">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Почта</Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                className=""
                                                placeholder="Почта"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Имя пользователя</Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                className="input_style"
                                                placeholder="Имя пользователя"
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Аватар</Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                className="input_style"
                                                placeholder="Выберите файл"
                                                type="file"
                                                onChange={selectFile}
                                                ref={fileInput}
                                                style={{display: 'none'}}
                                            />
                                            <Button className="ml-4" onClick={() => fileInput.current.click()}>
                                                Загрузить аватар
                                            </Button>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Пароль</Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                className=""
                                                placeholder="Пароль"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                type="password"
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Button variant="primary" onClick={Update}>
                                        Обновить
                                    </Button>
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Card className="small my-4">
                                    <Card.Body>
                                        <Form.Label className="h5">Добавить новое сообщество</Form.Label>
                                        <Form inline className="my-3">
                                            <Form.Control type="text" placeholder="Введите уникальное имя сообщества"
                                                          value={groupId}
                                                          onChange={e => setGroupId(e.target.value)}
                                                          className=" mr-sm-2" style={{width: "50%"}}/>
                                            <Button className="" onClick={GetGroup} type="button">Поиск</Button>

                                        </Form>
                                        {groupInfo ?
                                            <Card className="my-4 box-shadow-card">
                                                <Card.Body className="">
                                                    <Row>
                                                        <Col className="ml-2" sm={4}><img className="round_img"
                                                                                          src={groupInfo.pic} alt="pic"
                                                                                          width={200}
                                                                                          height={200}/></Col>
                                                        <Col sm={6}>
                                                            <h5>{groupInfo.info}</h5>
                                                            <div>{groupInfo.description}</div>
                                                            <div>ВК название: {groupInfo.screen_name}</div>
                                                        </Col>

                                                    </Row>
                                                    {groupInfo.info !== "Группа Закрыта" ?
                                                        <Row className="justify-content-end"><Col sm={4}>
                                                            <Button className="ml-4 mt-3"
                                                                    type="button"
                                                                    onClick={AddGroupToUser}>Добавить</Button></Col></Row> : ""}


                                                </Card.Body>
                                            </Card>

                                            : ""}
                                    </Card.Body>
                                </Card>
                                <Card className="my-4 box-shadow-card">
                                    <Card.Body>
                                        <Form.Label className="h5">Добавленные сообщества</Form.Label>
                                        <Scrollbars style={{width: "auto", height: "44vh"}}>
                                            {favoriteGroups ?
                                                favoriteGroups.map((group) =>
                                                    <p className="ml-3"><img className="mr-3 round_img"
                                                                             src={group.avatar} width={30} height={30}
                                                                             alt="pic"/><Link
                                                        to={'https://vk.com/' + group.id}>{group.info}</Link></p>
                                                ) : ""

                                            }


                                        </Scrollbars>
                                    </Card.Body>
                                </Card>

                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Card className="small my-4">
                                    <Card.Body>
                                        <Form.Label className="h5">Добавить нового пользователя</Form.Label>
                                        <Form inline className="my-3">
                                            <Form.Control type="text" placeholder="Введите id пользователя"
                                                          value={userId}
                                                          onChange={e => setUserId(e.target.value)}
                                                          className=" mr-sm-2" style={{width: "50%"}}/>
                                            <Button className="" onClick={GetUser} type="button">Поиск</Button>

                                        </Form>
                                        {userInfo ?
                                            <Card className="my-4 box-shadow-card">
                                                <Card.Body className="">
                                                    <Row>
                                                        <Col className="ml-2" sm={4}><img className="round_img"
                                                                                          src={userInfo.avatar}
                                                                                          alt="pic"
                                                                                          width={200}
                                                                                          height={200}/></Col>
                                                        <Col sm={6}>
                                                            <h5>{userInfo.username}</h5>
                                                            <p>Профиль: {userInfo.privacy === 0 ? 'закрытый' : 'открытый'} </p>
                                                            <p>ВК Id: {userInfo.id} </p>
                                                        </Col>

                                                    </Row>
                                                    {userInfo.privacy !== 0 ?
                                                        <Row className="justify-content-end"><Col sm={4}>
                                                            <Button className="ml-4 mt-3"
                                                                    type="button"
                                                                    onClick={AddUserToUser}>Добавить</Button></Col></Row> : ""}


                                                </Card.Body>
                                            </Card>

                                            : ""}
                                    </Card.Body>
                                </Card>
                                <Card className="my-4 box-shadow-card">
                                    <Card.Body>
                                        <Form.Label className="h5">Добавленные пользователи</Form.Label>
                                        <Scrollbars style={{width: "auto", height: "44vh"}}>
                                            {favoriteUsers ?
                                                favoriteUsers.map((user) =>
                                                    <p className="mx-3 mt-2 justify-content-between d-flex">
                                                        <span>
                                                            <img className="mr-3 round_img"
                                                                 src={user.avatar} width={30} height={30}
                                                                 alt="pic"/>
                                                            <Link
                                                                to={'https://vk.com/' + user.id}>{user.username}</Link>
                                                        </span>
                                                        <Button
                                                            onClick={() => setCreateComplainVisible(true)}> Пожаловаться </Button>
                                                        <CreateComplaint show={createComplainVisible}
                                                                         onHide={() => setCreateComplainVisible(false)}/>
                                                    </p>
                                                ) : ""}
                                        </Scrollbars>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
});

export default UserPage;
