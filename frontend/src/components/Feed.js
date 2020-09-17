import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import List from './FeedItem/List';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import PolicyModal from './UI/PolicyModal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
const URI = require("../constants/URI");

const Feed = (props) => {
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(true);
    const [listTitle, setListTitle] = useState(null);
    const [cookieShow, setCookieShow] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState({
        message: null,
        variant: null
    });

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setUser(localStorage.getItem("user"));
        setUserId(localStorage.getItem("userId"));
        fetchItems();
    }, [token])

    const fetchItems = async () => {
        if (token && user) {
            try {
                const response = await fetch(URI + "/todo", {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": 'Bearer ' + token
                    }
                })
                const JSONdata = await response.json()
                setData(JSONdata)
            } catch (error) {
                catchError(error);
            }
            setLoading(false)
        }
    }

    const toggleModal = () => {
        setShowModal(showModal => !showModal);
    }

    const errorHandler = () => {
        setError(null);
    };

    const catchError = error => {
        setError(error);
    };

    const listTitleHandler = (e) => {
        setListTitle(e.target.value);
    }

    const addListHandler = async () => {
        const result = await fetch(URI + "/todo", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": 'Bearer ' + token
            },
            body: JSON.stringify({ title: listTitle, userId: userId })
        });
        if (result.status !== 200 && result.status !== 201) {
            const res = await result.json()
            setError({
                message: res.message,
                variant: "danger"
            })
            return res;
        }
        fetchItems();
        return await result.json();
    }

    if (loading) {
        return (
            <Container className="text-center m-5">
                <Spinner animation="border" variant="secondary" size="lg" />
            </Container>
        )
    }
    else {
        return (
            <Container className="justify-content-center">
                <Alert className="m-5" show={cookieShow} variant="success">
                    <Alert.Heading>Cookie Consent</Alert.Heading>
                    <p>Token sparas för att kunna hålla användaren inloggad.
                        Användar ID samt mejladress sparas för att kunna personalisera användarupplevelsen genom att visa mejladressen på användaren samt användarens egna todo listor</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setCookieShow(false)} variant="outline-success">
                            Consent
                        </Button>
                    </div>
                </Alert>

                <Row className="justify-content-around align-content-center"><h1 className="text-center mt-4">Hi {user}, these are your Todo Items</h1></Row>
                <Row className=" align-content-center justify-content-center"><ButtonGroup className="d-flex"><Button variant="danger" className="m-3" size="sm" onClick={props.onLogout}>Logout</Button><Button variant="secondary" className="m-3" size="sm" onClick={toggleModal} > Show Policy</Button></ButtonGroup></Row>
                <Row className="justify-content-center">
                    <Alert variant={error.variant} show={error.message ? true : false}>
                        {error.message}
                    </Alert></Row>
                <Row className="justify-content-center mt-3"><Col xs={8}>  <InputGroup className="mb-3">
                    <FormControl
                        onChange={listTitleHandler}
                        placeholder="List Title"
                        aria-label="list Title"
                    />
                    <InputGroup.Append>
                        <Button onClick={addListHandler} variant="outline-secondary">Add List</Button>
                    </InputGroup.Append>
                </InputGroup></Col></Row>
                {
                    data.items.length !== 0 ? data.items.map((item) => (
                        <Row className="justify-content-center" key={item._id}><Col xs={8}><List item={item} fetchItems={fetchItems} /></Col></Row>
                    )) : null
                }

                <Row className="justify-content-center mt-3"><Col xs={8}></Col></Row>
                <PolicyModal showModal={showModal} onToggle={toggleModal} />
            </Container>
        )
    }
}

export default Feed;