import React from 'react';
import {Button, Col, Container, Dropdown, DropdownButton, Form, FormControl, Row} from "react-bootstrap";
import ModerationTable from "../components/ModerationTable";

const ModerationPage = () => {

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <Form inline>
                        <FormControl type="text" placeholder="Введите уникальное имя сообщества" className=" mr-sm-2" style={{width:"50%"}} />
                        <Button type="button">Поиск</Button>
                    </Form>
                </Col>
            </Row>

            <h3 className="my-3">Комментарии</h3>
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
                            { id: 1, date:'20.01.2021',  comment: "Hi", user: "Dayana" },
                            { id: 2, date:'22.01.2021',  comment: "Hi", user: "Dayana2"  },
                            { id: 3, date:'22.01.2021' , comment: "Hi my name is Dayana", user: "Dayana3"  },
                            { id: 4, date: '23.01.2021', comment: "Hi my name is Dayana", user: "Dayana4" },
                            { id: 5, date: '24.01.2021', comment: "Hi my name is Dayana", user: "Dayana5"  },
                            { id: 6, date: '25.01.2021', comment: "Hi my name is Dayana", user: "Dayana6"  },
                            { id: 7, date: '10.01.2021', comment:"Hi my name is Dayana", user: "Dayana7"  },
                        ]}
                    />
                </Col>
            </Row>

        </Container>
    );
};

export default ModerationPage;
