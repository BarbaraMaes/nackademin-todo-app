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


const Feed = (props) => {
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(true);
    const [listTitle, setListTitle] = useState(null);
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
                const response = await fetch("http://localhost:3000/todo", {
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
        const result = await fetch("http://localhost:3000/todo", {
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
                <Row className="justify-content-around align-content-center"><Button variant="danger" className="my-3" size="sm" onClick={props.onLogout}>Logout</Button><h1 className="text-center mt-4">Hi {user}, these are your Todo Items</h1></Row>
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
            </Container>
        )
    }
}

export default Feed;