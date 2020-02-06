import React from 'react'
import { withRouter } from 'react-router-dom'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import { auth } from '../../Auth/Auth'
import config from '../../../config/index'
let { CLIENT_URL: baseURL } = config

const NavigationItems = ({ loggedIn }) => {
  const items = auth.loggedIn ? (
    <>
      <NavigationItem exact link={`${baseURL}/`}>
        Listings
      </NavigationItem>
      <NavigationItem exact link={`${baseURL}/favorites`}>
        Favorites
      </NavigationItem>
      <NavigationItem exact link={`${baseURL}/map`}>
        Map
      </NavigationItem>
      <NavigationItem exact link={`${baseURL}/settings`}>
        Settings
      </NavigationItem>
      <NavigationItem exact link={`${baseURL}/logout`}>
        Logout
      </NavigationItem>
    </>
  ) : (
    <>
      <NavigationItem exact link={`${baseURL}/login`}>
        Log In
      </NavigationItem>
      <NavigationItem exact link={`${baseURL}/signup`}>
        Sign Up
      </NavigationItem>
    </>
  )

  return <ul className={classes.NavigationItems}>{items}</ul>
}

export default withRouter(NavigationItems)
