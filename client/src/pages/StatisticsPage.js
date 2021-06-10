import React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

const StatisticsPage = () => {
    const isSearch = false;
    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <Form inline className="my-3">
                        <Form.Control type="text" placeholder="Введите уникальное имя сообщества"
                                      className=" mr-sm-2" style={{width: "50%"}}/>
                        <Button className="" type="button">Поиск</Button>

                        {isSearch ?
                            <Button className="ml-4" type="button">Экспорт</Button> : ""
                        }
                    </Form>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>

                </Col>
            </Row>


        </Container>
    );
};

export default StatisticsPage;
