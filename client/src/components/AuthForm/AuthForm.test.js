import '@testing-library/jest-dom/extend-expect'
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
    expect(div.querySelector('input#form-email')).toHaveAttribute('type', 'email')
    expect(div.querySelector('input#form-email')).toHaveAttribute('required')
    expect(div.querySelector('label[for="form-email"]')).toHaveTextContent('Email')

    expect(div.querySelector('input#form-password')).toHaveAttribute('type', 'password')
    expect(div.querySelector('input#form-password')).toHaveAttribute('required')
    expect(div.querySelector('label[for="form-password"]')).toHaveTextContent('Password')

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
    expect(div.querySelector('input#form-email')).toHaveAttribute('type', 'email')
    expect(div.querySelector('input#form-email')).toHaveAttribute('required')
    expect(div.querySelector('label[for="form-email"]')).toHaveTextContent('Email')

    expect(div.querySelector('input#form-password')).toHaveAttribute('type', 'password')
    expect(div.querySelector('input#form-password')).toHaveAttribute('required')
    expect(div.querySelector('label[for="form-password"]')).toHaveTextContent('Password')

    // Submit Button
    expect(div.querySelector('button')).toHaveAttribute('type', 'submit')
    expect(div.querySelector('button')).toHaveTextContent('Sign Up')
  })
})