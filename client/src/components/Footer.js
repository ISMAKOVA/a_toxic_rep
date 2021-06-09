import {Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";
import styles from '../styles.css';
import React from "react";

var style = {
    backgroundColor: "#F0F0F3",
    borderTop: "1px solid rgba(174, 174, 192, 0.4)",
    textAlign: "center",
    padding: "15px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}

function Footer() {
    return (

        <div >
            <div style={phantom} />
            <div style={style} >

                <div className="d-flex justify-content-between container">
                    <p className="small-text"> &copy; {new Date().getFullYear()} Ismakova</p>
                    <div className="d-inline-flex">
                        <Link className="pr-2 small-text" href="https://vk.com/ismakova">Вконтакте</Link>
                        <Link className="small-text" href="https://www.instagram.com/ismaakova/?hl=ru">Instagram</Link>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Footer;
