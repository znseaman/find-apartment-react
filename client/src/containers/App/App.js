import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import classes from './App.module.css'

import Layout from '../../hoc/Layout/Layout'

import AuthForm from '../../components/AuthForm/AuthForm'

import Listings from '../../components/Listings/Listings'
import SimpleMap from '../../components/SimpleMap/SimpleMap'
import Settings from '../../components/Settings/Settings'
import Logout from '../../components/Auth/Logout/Logout'
import Favorites from '../../components/Listings/Favorites'
import config from '../../config/index'
const { CLIENT_URL: baseURL } = config

function containsMap(pathname) {
  const regex = new RegExp('map')
  return regex.test(pathname)
}

const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      props.auth = auth
      return auth.loggedIn ? (
        <Component {...props}></Component>
      ) : (
        <Redirect to={`${baseURL}/login`}></Redirect>
      )
    }}
  ></Route>
)

const App = props => {
  const [hasMap, setHasMap] = useState(false)

  useEffect(() => {
    setHasMap(containsMap(window.location.pathname))
  }, [props])

  props.history.listen((location, action) => {
    setHasMap(containsMap(location.pathname))
  })

  const { auth } = props

  let routes = (
    <Switch>
      <Route
        path={`${baseURL}/login`}
        render={props => {
          props.auth = auth
          return auth.loggedIn ? (
            <Redirect to={`${baseURL}/`}></Redirect>
          ) : (
            <AuthForm {...props}></AuthForm>
          )
        }}
      ></Route>
      <Route
        path={`${baseURL}/signup`}
        render={props => {
          props.auth = auth
          return auth.loggedIn ? (
            <Redirect to={`${baseURL}/`}></Redirect>
          ) : (
            <AuthForm {...props}></AuthForm>
          )
        }}
      ></Route>
      <AuthRoute
        exact
        auth={auth}
        path={`${baseURL}/`}
        component={Listings}
      ></AuthRoute>
      <AuthRoute
        auth={auth}
        path={`${baseURL}/favorites`}
        component={Favorites}
      ></AuthRoute>
      <AuthRoute
        auth={auth}
        path={`${baseURL}/map`}
        component={SimpleMap}
      ></AuthRoute>
      <AuthRoute
        auth={auth}
        path={`${baseURL}/settings`}
        component={Settings}
      ></AuthRoute>
      <Route
        path={`${baseURL}/logout`}
        render={props => <Logout auth={auth} {...props}></Logout>}
      ></Route>
      <Redirect to={`${baseURL}/`}></Redirect>
    </Switch>
  )

  return (
    <Layout hasMap={hasMap} auth={auth}>
      {routes}
    </Layout>
  )
}

export default App
