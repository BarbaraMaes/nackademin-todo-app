import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const item = props => (
    <Accordion defaultActiveKey="1" className="justify-content-md-center">
        <Card className="text-center">
            <Card.Header><Accordion.Toggle as={Button} variant="button" eventKey="0">{props.item.title}</Accordion.Toggle></Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Card.Text>{props.item.description}</Card.Text>
                    <ButtonGroup className="d-flex justify-content-around">
                        <Button className="mx-2" variant="primary" onClick={() => props.onModal(props.item)}>Update</Button>
                        <Button className="mx-2" variant="danger" onClick={props.onDelete}>Delete</Button>
                    </ButtonGroup>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
)

export default item