import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const item = props => {
    return (
        <Accordion defaultActiveKey="1" className="justify-content-md-center">
            <Card className="text-center" bg={props.item.done ? 'secondary' : null} border="info">
                <Card.Header><Accordion.Toggle as={Button} variant="button" eventKey="0">{props.item.done ? "DONE  " : null}{props.item.title}</Accordion.Toggle></Card.Header>
                <Accordion.Collapse eventKey="0">
                    {props.item ?
                        <Card.Body>
                            <Card.Text>{props.item.description}</Card.Text>
                            <Form className="my-3">
                                <Form.Check type="checkbox" label="done" size="lg" checked={item.done} onChange={() => props.checkedHandler(item)}></Form.Check>
                            </Form>
                            <ButtonGroup className="d-flex justify-content-around">
                                <Button className="mx-2" variant="primary" onClick={() => props.onModal(item)}>Update</Button>
                                <Button className="mx-2" variant="danger" onClick={props.onDelete}>Delete</Button>
                            </ButtonGroup>
                        </Card.Body>
                        : null}
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default item