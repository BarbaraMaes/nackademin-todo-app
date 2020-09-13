import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const PolicyModal = (props) => {

    return (
        <Modal show={props.showModal} onHide={props.onToggle}>
            {props.policy ? <Modal.Header>Privacy Policy</Modal.Header> : <Modal.Header closeButton >Privacy Policy</Modal.Header>}
            <Modal.Body>
                <p>* Mejladressen och lösenord sparas för att möjliggöra login funktionaliteten. Dvs som login credentials. </p>
                <p>* Både todolistor och todoitems läggs till av användaren och sparas i databasen så att användaren har sina todolistor och items på sitt konto, även nästa gång hen använder appen. </p>
                <p>* Datan som samlas in fås via formulär som användaren fyller i, den säljs inte.</p>
                <p>* Ens data kan tas bort genom att trycka på “delete user” efter att ha fyllt i mejl och lösenord på login skärmen.</p>
            </Modal.Body>
            {props.policy ?
                <Modal.Footer>
                    <ButtonGroup className="d-flex justify-content-around">
                        <Button className="mx-2" variant="secondary" onClick={() => { props.policy(true, props.email, props.password) }}>Ok</Button>
                        <Button className="mx-2" variant="danger" onClick={() => { props.policy(false) }}>Decline</Button>
                    </ButtonGroup>
                </Modal.Footer>
                : null}
        </Modal >
    )
}

export default PolicyModal;