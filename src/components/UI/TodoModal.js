import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ModalForm = (props) => {
    const submitHandler = (event) => {
        event.preventDefault();
        props.modalHandler();
        let item;
        if (props.item) {
            item = {
                _id: props.item._id,
                title: event.target.title.value,
                description: event.target.description.value
            }
        }
        else {
            item = {
                title: event.target.title.value,
                description: event.target.description.value
            }
        }
        props.onSubmit(item);
    }

    return (
        <Modal show={props.show} onHide={props.modalHandler} size="md">
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitHandler}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter a Title" defaultValue={props.item ? props.item.title : ''} name="title" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter a description" defaultValue={props.item ? props.item.description : ''} name="description" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.modalHandler}>Close</Button>
                    <Button type="submit" variant="primary">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ModalForm;