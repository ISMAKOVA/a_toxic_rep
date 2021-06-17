import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Dropdown, DropdownButton, Form, FormControl, Row, Table} from "react-bootstrap";
import ModerationTable from "../components/ModerationTable";
import {fetchOneUser} from "../http/user_api";
import jwt_decode from "jwt-decode";
import {createGroupVK, fetchAllUserGroups, fetchOneGroupByScreenName} from "../http/groups_api";
import {fetchAllUserUsers} from "../http/users_api";
import {Link} from "react-router-dom";
import {createPostVK, fetchAllGroupPosts, fetchPostsFromVK} from "../http/posts_api";
import {forEach} from "react-bootstrap/ElementChildren";
import {Scrollbars} from "rc-scrollbars";
import {getAllToxicityByGroupId} from "../http/toxicity_api";
import {fetchAllCommentsByGroupId} from "../http/comments_api";

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
    const [toxic, setToxic] = useState(undefined)
    const [toxicFiltered, setToxicFiltered] = useState(toxic)
    const [filterToxic, setFilterToxic] = useState(undefined)
    const [comments, setComments] = useState(undefined)
    const [datePeriod, setDatePeriod] = useState(undefined)
    const [dateFilter, setDateFilter] = useState(undefined)
    const GetPosts = async () => {
        if (groupId !== undefined) {
            fetchAllGroupPosts(groupId).then(data => setCurrentPosts(data))
            getAllToxicityByGroupId(groupId).then(data => setToxic(data))
            fetchAllCommentsByGroupId(groupId).then(data => setComments(data))
            console.log(comments)
            setToxicFiltered(toxic)
            setDatePeriod(comments)
        }
    }
    const ApplyFilters = async () => {
        if (filterToxic !== undefined) {
            switch (filterToxic) {
                case "0":
                    const result = []
                    toxic.filter(value => value.toxic_value * 100 > 50).map(value => result.push(value))
                    setToxicFiltered(result)
                    break;
                case "1":
                    const result2 = []
                    toxic.filter(value => value.toxic_value * 100 < 50).map(value => result2.push(value))
                    setToxicFiltered(result2)
                    break;
            }
        }
    }
    const ApplyFilters2 = async () => {
        if (dateFilter !== undefined && comments) {
            const todayDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
            const weekAgoDate = (new Date().getDate() - 7) + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
            const monthAgoDate = new Date().getDate()  + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
            switch (dateFilter) {
                case '0':
                    const result = []
                    comments.filter(comment => new Date(comment.date * 1000).getDate() + '/' + (new Date(comment.date * 1000).getMonth() + 1) + '/' + new Date(comment.date * 1000).getFullYear()
                        === todayDate).map(item => result.push(item))
                    setDatePeriod(result)
                    break;
                case '1':
                    const result1 = []
                    comments.filter(comment => new Date(comment.date * 1000).getDate() + '/' +
                        (new Date(comment.date * 1000).getMonth() + 1) + '/' + new Date(comment.date * 1000).getFullYear()
                        >= todayDate && weekAgoDate < new Date(comment.date * 1000).getDate() + '/' +
                        (new Date(comment.date * 1000).getMonth() + 1) + '/' + new Date(comment.date * 1000).getFullYear()).map(item => result1.push(item))
                    setDatePeriod(result1)
                    break;
                case '2':
                    const result2 = []
                    comments.filter(comment => new Date(comment.date * 1000).getDate() + '/' +
                        (new Date(comment.date * 1000).getMonth() + 1) + '/' + new Date(comment.date * 1000).getFullYear()
                        >= todayDate && monthAgoDate < new Date(comment.date * 1000).getDate() + '/' +
                        (new Date(comment.date * 1000).getMonth() + 1) + '/' + new Date(comment.date * 1000).getFullYear()).map(item => result2.push(item))
                    setDatePeriod(result2)
                    break;
            }
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
                    <DropdownButton id="dropdown-basic-button" title="Токсичность" className="my-3"
                                    onSelect={e => setFilterToxic(e)}>
                        <Dropdown.Item eventKey={0}>Токсичные</Dropdown.Item>
                        <Dropdown.Item eventKey={1}>Нетокиснчые</Dropdown.Item>
                    </DropdownButton>
                    <Button className="" type="button" onClick={ApplyFilters}>Применить</Button>
                </Col>
                <Col>
                    <Scrollbars className="px-3" style={{width: "auto", height: "90vh"}}>

                        {toxicFiltered ?
                            toxicFiltered.map((value) =>

                                <Card className="my-4 mx-4">
                                    <Card.Body className="border-card">

                                        {currentPosts.filter(post => value.postVkId === post.id).map(post =>
                                            <Row>

                                                <Col sm={4}>
                                                    <h5>Токисчность: {Math.round(value.toxic_value * 100 * 10) / 10}%</h5>
                                                </Col>
                                                <Col>

                                                    <div>
                                                        <h5>Дата: {new Date(post.date * 1000).toDateString()}</h5>
                                                        <div className="norm_font">{post.text}</div>
                                                    </div>

                                                </Col>

                                            </Row>)
                                        }


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
                    <DropdownButton id="dropdown-basic-button" title="Период" className="my-3"
                                    onSelect={e => setDateFilter(e)}>
                        <Dropdown.Item eventKey={0}>За день</Dropdown.Item>
                        <Dropdown.Item eventKey={1}>За неделю</Dropdown.Item>
                        <Dropdown.Item eventKey={2}>За месяц</Dropdown.Item>
                    </DropdownButton>

                    <Button className="" type="button" onClick={ApplyFilters2}>Применить</Button>
                </Col>

                <Col>
                    <Scrollbars className="px-3" style={{width: "auto", height: "90vh"}}>
                        <ModerationTable
                            comments={datePeriod ? datePeriod : [{date: "", text: "", postVkId: ""}]}
                        />
                    </Scrollbars>
                </Col>

            </Row>

        </Container>
    )
        ;
};

export default ModerationPage;
