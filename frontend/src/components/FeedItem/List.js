import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Item from './FeedItem';
import Modal from '../UI/Modal';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const List = props => {
    const [modalShow, setModalShow] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [feedItem, setFeedItem] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setUserId(localStorage.getItem("userId"));
        props.item.items.map(item => console.log(item))
    }, [])

    const modalHandler = (item) => {
        if (modalShow === true) {
            setModalShow(false)
        }
        else setModalShow(true);
        if (item) setFeedItem(item);
    }

    const modalSubmitHandler = async (item) => {
        modalHandler();
        try {
            console.log(item);
            if (item._id) {
                //update
                const result = await fetch("http://localhost:3000/todo/item", {
                    method: "PUT",
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": 'Bearer ' + token
                    },
                    body: JSON.stringify(item)
                })
                if (result.status !== 200 && result.status !== 201) {
                    const res = await result.json()
                    /*setError({
                        message: res.message,
                        variant: "danger"
                    })*/
                    return res;
                }
                props.fetchItems();
                return await result.json();
            }
            //create
            else {
                const result = await fetch("http://localhost:3000/todo/" + props.item._id, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": 'Bearer ' + token
                    },
                    body: JSON.stringify(item)
                });
                //console.log(json)
                if (result.status !== 200 && result.status !== 201) {
                    const res = await result.json()
                    /*setError({
                        message: res.message,
                        variant: "danger"
                    })*/
                    return res;
                }
                props.fetchItems();
                return await result.json();
            }
        } catch (error) {
            console.log(error);
            //catchError(error);
        }
    }

    const checkedHandler = async (item) => {
        try {
            //update
            let doneToggle = item.done ? false : true;
            const result = await fetch("http://localhost:3000/todo/item", {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + token
                },
                body: JSON.stringify({ ...item, done: doneToggle })
            })
            if (result.status !== 200 && result.status !== 201) {
                const res = await result.json()
                /*setError({
                    message: res.message,
                    variant: "danger"
                })*/
                return res;
            }
            props.fetchItems();
            return await result.json();
        } catch (error) {
            //catchError(error);
        }
    }

    const deleteHandler = async (id) => {
        try {
            const result = await fetch("http://localhost:3000/todo/item/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + token
                }
            });
            if (result.status !== 200 && result.status !== 201) {
                const res = await result.json()
                console.log(res.message);
                /*setError({
                    message: res.message,
                    variant: "danger"
                })*/
                return res;
            }
            props.fetchItems();
            return result.json();
        } catch (error) {
            //catchError(error);
        }
    }

    const deleteListHandler = async (id) => {
        try {
            const result = await fetch("http://localhost:3000/todo/list/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + token
                }
            });
            if (result.status !== 200 && result.status !== 201) {
                const res = await result.json()
                console.log(res.message);
                /*setError({
                    message: res.message,
                    variant: "danger"
                })*/
                return res;
            }
            props.fetchItems();
            return result.json();
        } catch (error) {
            //catchError(error);
        }
    }



    return (
        <Container>
            <Card className="text-center m-3">
                <Card.Header>{props.item.title}</Card.Header>
                <Card.Body>
                    {props.item.items.length !== 0 ? props.item.items.map(item => (
                        <Item item={item} onModal={() => modalHandler(item)} key={item._id} checkedHandler={() => checkedHandler(item)} onDelete={() => deleteHandler(item._id)} />
                    )) : null}
                </Card.Body>
                <Card.Footer>
                    <ButtonGroup className="d-flex justify-content-around">
                        <Button variant="info" className="mx-3" onClick={modalHandler}>Add Item</Button>
                        <Button variant="danger" className="mx-3" onClick={() => deleteListHandler(props.item._id)}>Delete List</Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
            <Modal show={modalShow} modalHandler={modalHandler} modalTitle="Add Todo Item" onSubmit={modalSubmitHandler} item={feedItem} />
        </Container>)
}

export default List