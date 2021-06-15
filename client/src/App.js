import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/user_api";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        check().then(data => {
            user.setUser(true);
            user.setIsAuth(true);
        }).finally(() => setLoading(false))
    }, []);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
