import React from 'react'
import { NavLink } from 'react-router-dom'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Logo.module.css'
import config from '../../config/index'
const { CLIENT_URL: baseURL } = config

const Logo = ({ height }) => {
  return (
    <div className={classes.Logo} style={{ height }}>
      <NavLink exact to={`${baseURL}/`}>
        <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon> {'Find Apartment'}
      </NavLink>
    </div>
  )
}

export default Logo
