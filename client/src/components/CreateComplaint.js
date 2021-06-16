
import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button, DropdownButton, Dropdown, Col} from "react-bootstrap";


const CreateComplaint = ({show, onHide}) => {
    const [comment, setComment] = useState('')
    const [reason, setReason] = useState(undefined)
    const sendComplain = () => {
        console.log(comment, reason)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Отправить жалобу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <DropdownButton id="dropdown-basic-button" title="Причина жалобы" className="my-3" onSelect={e=>setReason(e)}>
                        <Dropdown.Item eventKey={'porn'}>Порнография</Dropdown.Item>
                        <Dropdown.Item eventKey={'spam'}>Рассылка спама</Dropdown.Item>
                        <Dropdown.Item eventKey={'insult'}>Оскорбительное поведение</Dropdown.Item>
                        <Dropdown.Item eventKey={'advertisеment'}>Рекламная страница, засоряющая поиск</Dropdown.Item>
                    </DropdownButton>
                    <Form.Control
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder={"Причина жалобы"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={onHide}>Отправить жалобу</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateComplaint;
