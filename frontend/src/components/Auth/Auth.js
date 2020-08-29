import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';

const Auth = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const emailChange = e => {
        setEmail(e.target.value);
    }

    const passwordChange = e => {
        setPassword(e.target.value)
    }

    return (
        <Container>
            <h1 className="text-center mt-4">Login/Register</h1>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Alert variant="success" show={props.showAlert}>
                        {props.message}
                    </Alert>
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={emailChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={passwordChange} />
                        </Form.Group>
                        <ButtonGroup className="d-flex justify-content-around">
                            <Button className="mx-2" variant="secondary" onClick={() => { props.onLogin(email, password) }}>Login</Button>
                            <Button className="mx-2" variant="primary" onClick={() => { props.onSignup(email, password) }}>Signup</Button>
                        </ButtonGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;