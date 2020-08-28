import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import Feed from './components/Feed';
import Auth from './components/Auth/Auth';
import './App.css';

const sessionstorage = require("sessionstorage");

function App() {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getUser();
  }, [])

  const getUser = () => {
    const token = sessionstorage.getItem("token");
    const expiryDate = sessionstorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = sessionstorage.getItem("userId");
    setIsAuth(true);
  }

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    sessionstorage.removeItem("token");
    sessionstorage.removeItem("expiryDate");
    sessionstorage.removeItem("userId");
  }

  const signupHandler = async (email, password) => {
    //event.preventDefault();
    try {
      const result = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (result.status !== 200 && result.status !== 201) {
        return;
      }
      setMessage("User Added");
      return await result.json();
    } catch (error) {
      console.log(error);
    }
  }

  const loginHandler = (email, password) => {
    try {
      fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      }).then(result => {
        if (result.status !== 200 && result.status !== 201) {
          return result.json()
        }
        return result.json()
      }).then(data => {
        setToken(data.token);
        setUserId(data.userId);
        setIsAuth(true);
        sessionstorage.setItem("token", data.token);
        sessionstorage.setItem("userId", data.userId);
        sessionstorage.setItem("user", data.user.email)
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        sessionstorage.setItem("expiryDate", expiryDate.toISOString());
      })

    } catch (error) {
      console.log(error);
    }
  }

  let routes = (
    <Switch>
      <Route path="/" exact render={props => (
        <Auth onLogin={loginHandler} onSignup={signupHandler} message={message} showAlert={message ? true : false} />
      )} />
    </Switch>
  )
  if (isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact render={props => (<Feed onLogout={logoutHandler} />)} />
      </Switch>
    )
  }

  return (
    <Fragment>
      {routes}
    </Fragment>
  );
}


export default withRouter(App);
