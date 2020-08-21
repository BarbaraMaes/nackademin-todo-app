import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const Feed = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchItems();
    }, [data])

    const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:3000/", {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const JSONdata = await response.json()
            setData(JSONdata)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container>
            <h1 className="text-center">Todo Items</h1>
            {data != null ? data.map((item) => (
                <Accordion defaultActiveKey="1" key={item._id}>
                    <Card className="text-center">
                        <Card.Header><Accordion.Toggle as={Button} variant="button" eventKey="0">{item.title}</Accordion.Toggle></Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Card.Text>{item.description}</Card.Text>
                                <ButtonGroup size="md" className="d-flex justify-content-around">
                                    <Button className="mx-2" variant="primary">Update</Button>
                                    <Button className="mx-2" variant="danger">Delete</Button>
                                </ButtonGroup>
                            </Card.Body>

                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            )) : null}
        </Container>
    )
}

export default Feed;