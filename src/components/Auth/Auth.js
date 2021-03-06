import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import PolicyModal from '../UI/PolicyModal';

const Auth = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [role, setRole] = useState(false)

    const emailChange = e => {
        setEmail(e.target.value);
    }

    const passwordChange = e => {
        setPassword(e.target.value)
    }

    const roleChange = e => {
        setRole(e.target.checked)
    }

    return (
        <Container>
            <h1 className="text-center mt-4">Login/Register</h1>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Alert variant={props.error.variant} show={props.showAlert}>
                        {props.error.message}
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
                        <Form.Group>
                            <Form.Check type="checkbox" label="Admin" name="admin" onChange={roleChange} />
                        </Form.Group>
                        <ButtonGroup className="d-flex justify-content-around">
                            <Button className="mx-2" variant="secondary" onClick={() => { props.onLogin(email, password) }}>Login</Button>
                            <Button className="mx-2" variant="primary" onClick={props.toggleModal} >Signup</Button>
                        </ButtonGroup>
                        <ButtonGroup className="d-flex justify-content-around">
                            <Button className="m-2" block variant="danger" onClick={() => { props.deleteUser(email, password) }}> Delete user</Button>
                        </ButtonGroup>
                    </Form>
                </Col>
            </Row>
            <PolicyModal showModal={props.showModal} policy={props.policy} email={email} password={password} admin={role} />
        </Container>
    )
}

export default Auth;