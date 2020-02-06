import '@testing-library/jest-dom/extend-expect'
import { getQueriesForElement } from '@testing-library/dom'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import AuthForm from './AuthForm'
import history from '../../utils/history'
import { auth } from '../../components/Auth/Auth'

describe('AuthForm', () => {
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

    // Inputs
    const { getByLabelText } = getQueriesForElement(div);
    const inputEmail = getByLabelText(/email address/i);
    expect(inputEmail).toHaveAttribute('type', 'email')
    expect(inputEmail).toHaveAttribute('required')

    const inputPassword = getByLabelText(/password/i);
    expect(inputPassword).toHaveAttribute('type', 'password')
    expect(inputPassword).toHaveAttribute('required')

    // Submit Button
    expect(div.querySelector('button')).toHaveAttribute('type', 'submit')
    expect(div.querySelector('button')).toHaveTextContent('Log In')
  })

  it('should render for /signup route', () => {
    const pathname = '/signup'
    history.push(pathname)
    const div = document.createElement('div')
    ReactDOM.render(<Router history={history}><AuthForm {...history} auth={auth} /></Router>, div)

    expect(history.location.pathname).toBe(pathname)

    // Inputs
    const { getByLabelText } = getQueriesForElement(div);
    const inputEmail = getByLabelText(/email address/i);
    expect(inputEmail).toHaveAttribute('type', 'email')
    expect(inputEmail).toHaveAttribute('required')

    const inputPassword = getByLabelText(/password/i);
    expect(inputPassword).toHaveAttribute('type', 'password')
    expect(inputPassword).toHaveAttribute('required')

    // Submit Button
    expect(div.querySelector('button')).toHaveAttribute('type', 'submit')
    expect(div.querySelector('button')).toHaveTextContent('Sign Up')
  })
})