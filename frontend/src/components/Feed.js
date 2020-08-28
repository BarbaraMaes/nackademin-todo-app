import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Item from './FeedItem/FeedItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from './UI/Modal';
const sessionstorage = require("sessionstorage");


const Feed = (props) => {
    const [data, setData] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [feedItem, setFeedItem] = useState(false);
    const [user, setUser] = useState(sessionstorage.getItem("user"));
    useEffect(() => {
        fetchItems();
    }, [])

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

    const modalHandler = (item) => {
        if (modalShow === true) {
            setModalShow(false)
        }
        else setModalShow(true)
        if (item) setFeedItem(item);
    }

    const deleteHandler = async (id) => {
        try {
            const result = await fetch("http://localhost:3000/" + id, {
                method: "DELETE"
            });
            if (result.status !== 200 && result.status !== 201) {
                console.log("deleting item failed");
            }
            fetchItems();
            return result.json();
        } catch (error) {
            console.log(error);
        }
    }

    const modalSubmitHandler = async (item) => {
        modalHandler();
        console.log(item);
        try {
            if (item._id) {
                //update
                const result = await fetch("http://localhost:3000/" + item.id, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(item)
                })
                if (result.status !== 200 && result.status !== 201) {
                    console.log("couldn't add item");
                }
                fetchItems();
                return await result.json();
            }
            //create
            else {
                const result = await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(item)
                });
                if (result.status !== 200 && result.status !== 201) {
                    console.log("couldn't add item");
                }
                fetchItems();
                return await result.json();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkedHandler = async (item) => {
        try {
            //update
            let doneToggle = item.done ? false : true;
            const result = await fetch("http://localhost:3000/" + item.id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...item, done: doneToggle })
            })
            if (result.status !== 200 && result.status !== 201) {
                console.log("couldn't add item");
            }
            fetchItems();
            return await result.json();
        } catch (error) {

        }
    }

    return (
        <Container>
            <h1 className="text-center mt-4">Hi {user}, these are your Todo Items</h1>
            {data != null ? data.map((item) => (
                <Row className="justify-content-center" key={item._id}><Col xs={8}><Item item={item} checkedHandler={checkedHandler} onDelete={deleteHandler.bind(this, item._id)} onModal={modalHandler} /></Col></Row>
            )) : null}
            <Row className="justify-content-center mt-3"><Col xs={8}><Button variant="info" size="lg" block onClick={modalHandler}>Add Item</Button></Col></Row>
            <Row className="justify-content-center mt-3"><Col xs={8}><Button variant="danger" size="lg" block onClick={props.onLogout}>Logout</Button></Col></Row>
            <Modal show={modalShow} modalHandler={modalHandler} modalTitle="Add Todo Item" onSubmit={modalSubmitHandler} item={feedItem} />
        </Container>
    )
}

export default Feed;