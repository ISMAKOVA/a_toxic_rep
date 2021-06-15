import React, {useEffect, useState} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {fetchOneUser} from "../http/user_api";
import jwt_decode from "jwt-decode";
import {fetchAllUserGroups} from "../http/groups_api";
import {fetchAllUserUsers} from "../http/users_api";
import {Scrollbars} from "rc-scrollbars";
import {observer} from "mobx-react-lite";


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


const MainPage = observer(() => {

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
    const [favoriteGroups, setFavoriteGroups] = useState(undefined)

    useEffect(() => {
        if (storedToken) {
            fetchAllUserGroups(parseInt(jwt_decode(storedToken).id)).then(data => setFavoriteGroups(data))
        }
    }, [])

    return (
        <Container className="">
            <Row className="my-3">
                <Col>
                    <h2 className="my-3">Сообщества</h2>
                    <Carousel responsive={responsive}>
                        {favoriteGroups ?
                            favoriteGroups.map((item) =>
                                <div className="m-4">
                                    <Link to={'https://vk.com/' + item.id} className="mt-4"><img
                                        src={item.avatar} width={80} height={80} alt="pic" className="round_img"/>
                                    </Link>

                                </div>
                            ) : <div> </div>

                        }

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
});

export default MainPage;
