import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Item from './FeedItem';
import Modal from '../UI/Modal';
import Container from 'react-bootstrap/Container'

const List = props => {
    const [modalShow, setModalShow] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [feedItem, setFeedItem] = useState(null);

    useEffect(() => {
        /*props.item.items.map(item => {
            console.log(item);
        })*/
        setToken(localStorage.getItem("token"));
        //setUser(localStorage.getItem("user"));
        setUserId(localStorage.getItem("userId"));
        //fetchItems();
    }, [token])

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
                console.log(props.item.id);
                const result = await fetch("http://localhost:3000/todo/" + props.item._id, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": 'Bearer ' + token
                    },
                    body: JSON.stringify(item)
                });
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
            //catchError(error);
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


    return (
        <Container>
            <Card className="text-center m-3">
                <Card.Header>{props.item.title}</Card.Header>
                {/* onDelete={props.deleteHandler.bind(this, item._id)}*/}
                <Card.Body>
                    {props.item.items.length !== 0 ? props.item.items.map(item => (
                        <Item item={item} onModal={modalHandler} key={props.item.title} checkedHandler={checkedHandler} />
                    )) : null}
                </Card.Body>
                <Card.Footer>
                    <Button variant="info" size="lg" block onClick={modalHandler}>Add Item</Button>
                </Card.Footer>
            </Card>
            <Modal show={modalShow} modalHandler={modalHandler} modalTitle="Add Todo Item" onSubmit={modalSubmitHandler} item={feedItem} />
        </Container>)
}

export default List