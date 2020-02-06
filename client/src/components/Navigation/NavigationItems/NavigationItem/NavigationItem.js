import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'

const NavigationItem = ({ link, exact, children }) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={link}
        exact={exact}
        activeClassName={classes.active}
        data-testid={`nav-item-${link.replace('/', '')}`}
      >
        {children}
      </NavLink>
    </li>
  )
}

export default NavigationItem
