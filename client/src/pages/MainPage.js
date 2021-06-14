import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const responsive = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 3000},
        items: 5
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 3
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
};

const MainPage = () => {

    return (
        <Container className="">
            <Row className="my-3">
                <Col>
                    <h2 className="my-3">Сообщества</h2>
                    <Carousel responsive={responsive}>
                        <div className="m-4">
                            <div className="res-circle "><Link to="#" className="circle-txt mt-4">Журнал КОД</Link></div>
                        </div>
                        <div className="m-4">
                            <div className="res-circle"><Link to="#" className="circle-txt">Item 2</Link></div>
                        </div>
                        <div className="m-4">
                            <div className="res-circle"><Link to="#" className="circle-txt">Item 3</Link></div>
                        </div>
                        <div className="m-4">
                            <div className="res-circle"><Link to="#" className="circle-txt">Item 4</Link></div>
                        </div>
                        <div className="m-4">
                            <div className="res-circle"><Link to="#" className="circle-txt">Item 5</Link></div>
                        </div>

                    </Carousel>
                </Col>
            </Row>
            <Row className="my-4 row-window">
                <Col>
                    <Card body>Здесь будет краткая статистика</Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MainPage;
