import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import Feed from './components/Feed';
import Auth from './components/Auth/Auth';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  //const [message, setMessage] = useState('');
  const [error, setError] = useState({
    message: null,
    variant: null
  });

  useEffect(() => {
    getUser();
  }, [])

  const getUser = () => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    setIsAuth(true);
  }

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
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
        const res = await result.json()
        setError({
          message: res.message,
          variant: "danger"
        })
        return res;
      }
      setError({
        message: "User Added",
        variant: "success"
      })
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
        console.log(result)
        if (result.status !== 200 && result.status !== 201) {
          result.json().then(res => {
            setError({
              message: res.message,
              variant: "danger"
            })
            return res;
          })
        }
        return result.json()
      }).then(data => {
        setToken(data.token);
        setUserId(data.userId);
        setIsAuth(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("user", data.user.email)
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
      })

    } catch (error) {
      console.log(error);
    }
  }

  let routes = (
    <Switch>
      <Route path="/" exact render={props => (
        <Auth onLogin={loginHandler} onSignup={signupHandler} error={error} showAlert={error.message ? true : false} />
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
