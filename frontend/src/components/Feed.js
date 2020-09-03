import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Item from './FeedItem/FeedItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from './UI/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';


const Feed = (props) => {
    const [data, setData] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [feedItem, setFeedItem] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        message: null,
        variant: null
    });

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setUser(localStorage.getItem("user"));
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

    const modalHandler = (item) => {
        if (modalShow === true) {
            setModalShow(false)
        }
        else setModalShow(true)
        if (item) setFeedItem(item);
    }

    const deleteHandler = async (id) => {
        try {
            const result = await fetch("http://localhost:3000/todo/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + token
                }
            });
            if (result.status !== 200 && result.status !== 201) {
                console.log(result);
                const res = await result.json()
                //console.log(res);
                setError({
                    message: res.message,
                    variant: "danger"
                })
                return res;
            }
            fetchItems();
            return result.json();
        } catch (error) {
            catchError(error);
        }
    }

    const modalSubmitHandler = async (item) => {
        modalHandler();
        try {
            if (item._id) {
                //update
                const result = await fetch("http://localhost:3000/todo/" + item.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": 'Bearer ' + token
                    },
                    body: JSON.stringify(item)
                })
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
            //create
            else {
                const result = await fetch("http://localhost:3000/todo", {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": 'Bearer ' + token
                    },
                    body: JSON.stringify(item)
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
        } catch (error) {
            catchError(error);
        }
    }

    const checkedHandler = async (item) => {
        try {
            //update
            let doneToggle = item.done ? false : true;
            const result = await fetch("http://localhost:3000/todo/" + item.id, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + token
                },
                body: JSON.stringify({ ...item, done: doneToggle })
            })
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
        } catch (error) {
            catchError(error);
        }
    }

    const errorHandler = () => {
        setError(null);
    };

    const catchError = error => {
        setError(error);
    };
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
                <h1 className="text-center mt-4">Hi {user}, these are your Todo Items</h1>
                <Row className="justify-content-center">
                    <Alert variant={error.variant} show={error.message ? true : false}>
                        {error.message}
                    </Alert></Row>
                {
                    data != null ? data.map((item) => (
                        <Row className="justify-content-center" key={item._id}><Col xs={8}><Item item={item} checkedHandler={checkedHandler} onDelete={deleteHandler.bind(this, item._id)} onModal={modalHandler} /></Col></Row>
                    )) : null
                }
                <Row className="justify-content-center mt-3"><Col xs={8}><Button variant="info" size="lg" block onClick={modalHandler}>Add Item</Button></Col></Row>
                <Row className="justify-content-center mt-3"><Col xs={8}><Button variant="danger" size="lg" block onClick={props.onLogout}>Logout</Button></Col></Row>
                <Modal show={modalShow} modalHandler={modalHandler} modalTitle="Add Todo Item" onSubmit={modalSubmitHandler} item={feedItem} />
            </Container>
        )
    }
}

export default Feed;