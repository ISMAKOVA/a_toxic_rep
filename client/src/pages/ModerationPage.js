import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Dropdown, DropdownButton, Form, FormControl, Row} from "react-bootstrap";
import ModerationTable from "../components/ModerationTable";
import {fetchOneUser} from "../http/user_api";
import jwt_decode from "jwt-decode";
import {createGroupVK, fetchAllUserGroups, fetchOneGroupByScreenName} from "../http/groups_api";
import {fetchAllUserUsers} from "../http/users_api";
import {Link} from "react-router-dom";
import {createPostVK, fetchAllGroupPosts, fetchPostsFromVK} from "../http/posts_api";
import {forEach} from "react-bootstrap/ElementChildren";
import {Scrollbars} from "rc-scrollbars";

const ModerationPage = () => {
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
            fetchAllUserGroups(parseInt(jwt_decode(storedToken).id)).then(data => setFavoriteGroups(data))
        }
    }, [])

    const [groupId, setGroupId] = useState(undefined)
    const [favoriteGroups, setFavoriteGroups] = useState(undefined)
    const [currentPosts, setCurrentPosts] = useState(undefined)

    const GetPosts = async () => {
        if (groupId !== undefined) {
            fetchAllGroupPosts(groupId).then(data => setCurrentPosts(data))
        }
    }


    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <Form inline>

                        <DropdownButton id="dropdown-basic-button" title="Сообщество" className="my-3"
                                        onSelect={e => setGroupId(e)}>
                            {favoriteGroups ?
                                favoriteGroups.map((group) =>
                                    <Dropdown.Item eventKey={group.id}>{group.info}</Dropdown.Item>
                                ) : ""}
                        </DropdownButton>
                        <Button className="ml-3" onClick={GetPosts} type="button">Просмотреть</Button>
                    </Form>
                </Col>
            </Row>

            <h5 className="my-3">Посты </h5>
            <Row className="my-3">
                <Col sm={2}>
                    <DropdownButton id="dropdown-basic-button" title="Период" className="my-3">
                        <Dropdown.Item eventKey={0}>За последний день</Dropdown.Item>
                        <Dropdown.Item eventKey={1}>За последнюю неделю</Dropdown.Item>
                        <Dropdown.Item eventKey={2}>За месяц</Dropdown.Item>
                    </DropdownButton>
                    <Button className=""type="button">Применить</Button>
                </Col>
                <Col>
                    <Scrollbars className="px-3" style={{width: "auto", height: "90vh"}}>
                        {currentPosts ?
                            currentPosts.map((post) =>

                                <Card className="my-4 mx-4">
                                    <Card.Body className="border-card">
                                        <Row>
                                            <Col sm={3}><h5>Токисчность: %</h5></Col>
                                            <Col>
                                                <div>
                                                    <h5>Дата: {new Date(post.date * 1000).toDateString()}</h5>
                                                    <div className="norm_font">{post.text}</div>
                                                </div>

                                            </Col>

                                        </Row>

                                    </Card.Body>
                                </Card>
                            )
                            : ""}
                    </Scrollbars>
                </Col>
            </Row>


            <h5 className="my-3">Комментарии</h5>
            <Row className="my-3">

                <Col sm={3}>
                    <DropdownButton id="dropdown-basic-button" title="Период" className="my-3">
                        <Dropdown.Item href="#/action-1">За день</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">За неделю</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">За месяц</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Dropdown button" className="my-3">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Dropdown button" className="my-3">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </Col>

                <Col>
                    <ModerationTable
                        comments={[
                            {id: 1, date: '20.01.2021', comment: "Hi", user: "Dayana"},
                            {id: 2, date: '22.01.2021', comment: "Hi", user: "Dayana2"},
                            {id: 3, date: '22.01.2021', comment: "Hi my name is Dayana", user: "Dayana3"},
                            {id: 4, date: '23.01.2021', comment: "Hi my name is Dayana", user: "Dayana4"},
                            {id: 5, date: '24.01.2021', comment: "Hi my name is Dayana", user: "Dayana5"},
                            {id: 6, date: '25.01.2021', comment: "Hi my name is Dayana", user: "Dayana6"},
                            {id: 7, date: '10.01.2021', comment: "Hi my name is Dayana", user: "Dayana7"},
                        ]}
                    />
                </Col>
            </Row>

        </Container>
    );
};

export default ModerationPage;
