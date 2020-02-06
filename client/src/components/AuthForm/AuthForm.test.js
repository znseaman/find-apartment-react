import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import AuthForm from './AuthForm'
import history from '../../utils/history'
import { auth } from '../../components/Auth/Auth'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Router history={history}><AuthForm {...history} auth={auth} /></Router>, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('should render for /login route', () => {
  const pathname = '/login'
  history.push(pathname)
  const div = document.createElement('div')
  ReactDOM.render(<Router history={history}><AuthForm {...history} auth={auth} /></Router>, div)

  expect(history.location.pathname).toBe(pathname)
  expect(div.querySelector('button').textContent).toBe('Log In')
})

it('should render for /signup route', () => {
  const pathname = '/signup'
  history.push(pathname)
  const div = document.createElement('div')
  ReactDOM.render(<Router history={history}><AuthForm {...history} auth={auth} /></Router>, div)

  expect(history.location.pathname).toBe(pathname)
  expect(div.querySelector('button').textContent).toBe('Sign Up')
})