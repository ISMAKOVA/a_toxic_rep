import React, {useRef, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, FormControl, Nav, Row, Tab} from "react-bootstrap";
import {Scrollbars} from 'rc-scrollbars';
import jwt_decode from "jwt-decode";
import {observer} from "mobx-react-lite";
import {fetchOneUser, update} from "../http/user_api";
import {Link} from "react-router-dom";
import {createGroupVK, fetchAllUserGroups, fetchOneGroupFromVK} from "../http/groups_api";

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
            // fetchAllUserGroups(parseInt(jwt_decode(storedToken).id)).then(data => setFavoriteGroups(data.info))
            // console.log(favoriteGroups)
        }

    }, [])
    //this data for update
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [username, setUsername] = useState(undefined)
    const [file, setFile] = useState(null)
    const fileInput = useRef(null)

    // this data to add new group
    const [groupId, setGroupId] = useState(undefined)
    console.log(groupId)
    const [groupInfo, setGroupInfo] = useState(undefined)
    const [groupNumId, setGroupNumId] = useState(undefined)
    const [groupName, setGroupName] = useState(undefined)
    const [groupDescription, setGroupDescription] = useState(undefined)
    const [groupPic, setGroupPic] = useState(undefined)
    const [groupPrivacy, setPrivacy] = useState(undefined)

    // const [favoriteGroups, setFavoriteGroups] = useState(undefined)
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

    const GetGroup = async () => {
        fetchOneGroupFromVK(groupId).then(data => setGroupInfo(data['groups']['0']))
        if (groupInfo !== undefined) {
            setGroupNumId(groupInfo['id'])
            setGroupName(groupInfo['name'])
            setGroupDescription(groupInfo['description'])
            setGroupPic(groupInfo['photo_200'])
            setPrivacy(groupInfo['is_closed'])
        }
    }

    const AddGroupToUser = async () => {
        createGroupVK(groupNumId, groupName, groupPrivacy, groupPic, parseInt(jwt_decode(storedToken).id)).then()
        alert("Group has been added")
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
                                <Nav.Link eventKey="second" className="neo-nav-item">Избранное</Nav.Link>
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
                                        {groupInfo !== undefined && groupId !== undefined ?
                                            <Card className="my-4 box-shadow-card">
                                                <Card.Body className="">
                                                    <Row>
                                                        <Col className="ml-2" sm={4}><img src={groupPic} alt="pic"
                                                                                          width={200}
                                                                                          height={200}/></Col>
                                                        <Col sm={6}>
                                                            <h5>{groupName}</h5>
                                                            <div>{groupDescription}</div>
                                                        </Col>

                                                    </Row>
                                                    {groupName !== "Группа Закрыта" ?
                                                        <Row className="justify-content-end"><Col sm={4}>
                                                            <Button className="ml-4"
                                                                    type="button" onClick={AddGroupToUser}>Добавить</Button></Col></Row> : ""}


                                                </Card.Body>
                                            </Card>

                                            : ""}
                                    </Card.Body>
                                </Card>
                                <Card className="my-4 box-shadow-card">
                                    <Card.Body>
                                        <Form.Label className="h5">Добавленные сообщества</Form.Label>
                                        <Scrollbars style={{width: "auto", height: "44vh"}}>

                                            <p><Link to="#">Группа</Link></p>


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
