
import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button, DropdownButton, Dropdown, Col} from "react-bootstrap";


const ModalWindow = ({show, onHide, text}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {text}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Закрыть</Button>

            </Modal.Footer>
        </Modal>
    );
};

export default ModalWindow;
