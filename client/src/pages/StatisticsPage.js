import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import BarChart from "../components/BarChart";
import jwt_decode from "jwt-decode";
import {fetchAllUserGroups} from "../http/groups_api";
import {fetchAllGroupPosts} from "../http/posts_api";
import {getAllToxicityByGroupId} from "../http/toxicity_api";
import {fetchAllCommentsByGroupId} from "../http/comments_api";
import PieChart from "../components/PieChart";
import {ExportToExcel} from '../components/ExportToExcel'

const StatisticsPage = () => {
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
    const [toxic, setToxic] = useState(undefined)
    const [countToxic, setCountToxic] = useState(undefined)
    const [dataToExport, setDataToExport] = useState(undefined)
    const GetStatistics = async () => {
        if (groupId !== undefined) {
            getAllToxicityByGroupId(groupId).then(data => setToxic(data))
            console.log(toxic)
            if(toxic  !== undefined) {

                setCountToxic({
                    'toxic': toxic.filter(item => item.toxic_value * 100 > 50).length,
                    'untoxic': toxic.filter(item => item.toxic_value * 100 < 50).length
                })
                const dataExport = []
                toxic.map(item=> dataExport.push({id:item.id,toxic_value:item.toxic_value, groupId: item.groupVkId, postId: item.groupVkId}) )
                setDataToExport(dataExport)
            }
            console.log(countToxic)
        }
    }

    const fileName = "myfile";

    return (
        <Container>
            <Row className="mt-3">
                <Col sm={8}>
                    <Form inline>

                        <DropdownButton id="dropdown-basic-button" title="Сообщество" className="my-4"
                                        onSelect={e => setGroupId(e)}>
                            {favoriteGroups ?
                                favoriteGroups.map((group) =>
                                    <Dropdown.Item eventKey={group.id}>{group.info}</Dropdown.Item>
                                ) : ""}
                        </DropdownButton>
                        <Button className="ml-4" onClick={GetStatistics} type="button">Просмотреть</Button>
                    </Form>
                </Col>
                <Col className="justify-content-end d-flex">
                    {countToxic?
                    <ExportToExcel apiData={dataToExport} fileName={fileName} />:""}
                    {/*<Button className="" onClick={GetStatistics} type="button"> Экспорт</Button>*/}
                </Col>
            </Row>
            {countToxic?
            <Row className="mt-3">
                <Col sm={1}>
                </Col>
                <Col>
                    <Card className="my-4 mx-4">
                        <Card.Body className="box-shadow-card">
                            <Row>
                                <Col sm={8}>

                                    <PieChart data={[
                                        {data: [countToxic.untoxic,countToxic.toxic]}
                                    ]}/>
                                </Col>
                                <Col className="justify-content-center d-flex my-auto ">
                                    <div className="">

                                        <div className="d-inline-flex"><span className="circle bg_color_2 mr-3 mt-1" > </span><p>Тоскичные: {countToxic.toxic}</p></div>
                                        <div className="d-inline-flex"><span className="circle bg_color_3 mr-3 mt-1" > </span><p>Нетоскичные: {countToxic.untoxic}</p></div>

                                    </div>
                                </Col>
                            </Row>


                        </Card.Body>
                    </Card>
                </Col>
            </Row>: ""
            }

            {/*{countToxic?*/}
            {/*<Row className="mt-3">*/}
            {/*    <Col sm={2}>*/}
            {/*        <DropdownButton id="dropdown-basic-button" title="Период" className="my-4">*/}
            {/*            <Dropdown.Item eventKey={0}>За день</Dropdown.Item>*/}
            {/*            <Dropdown.Item eventKey={1}>За неделю</Dropdown.Item>*/}
            {/*            <Dropdown.Item eventKey={2}>За месяц</Dropdown.Item>*/}
            {/*        </DropdownButton>*/}
            {/*        /!*<DropdownButton id="dropdown-basic-button" title="Период" className="my-3">*!/*/}
            {/*        /!*    <Dropdown.Item eventKey={0}>За день</Dropdown.Item>*!/*/}
            {/*        /!*    <Dropdown.Item eventKey={1}>За неделю</Dropdown.Item>*!/*/}
            {/*        /!*    <Dropdown.Item eventKey={2}>За месяц</Dropdown.Item>*!/*/}
            {/*        /!*</DropdownButton>*!/*/}

            {/*    </Col>*/}
            {/*    <Col>*/}
            {/*        <Card className="my-4 mx-4">*/}
            {/*            <Card.Body className="box-shadow-card">*/}
            {/*                <div className="justify-content-start d-flex">*/}
            {/*                    <BarChart data={[*/}
            {/*                        {data: [1, 2, 7, 99]},*/}
            {/*                        {data: [5, 7]},*/}
            {/*                        {data: [13, 17]}*/}
            {/*                    ]}/>*/}
            {/*                </div>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>: ""*/}
            {/*}*/}

        </Container>
    );
};

export default StatisticsPage;
