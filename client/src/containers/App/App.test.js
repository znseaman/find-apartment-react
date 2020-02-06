import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Router } from 'react-router-dom'
import history from '../../utils/history'
import { auth } from '../../components/Auth/Auth'

import { Provider } from 'react-redux'
import store from '../../redux/store'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      <App auth={auth} history={history}></App>
    </Router>
  </Provider>, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders /login without crashing', () => {
  const pathname = '/login'
  history.push(pathname)

  const div = document.createElement('div')
  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      <App auth={auth} history={history}></App>
    </Router>
  </Provider>, div)

  expect(history.location.pathname).toBe(pathname)

  ReactDOM.unmountComponentAtNode(div)
})

it('renders /signup without crashing', () => {
  const pathname = '/signup'
  history.push(pathname)

  const div = document.createElement('div')
  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      <App auth={auth} history={history}></App>
    </Router>
  </Provider>, div)

  expect(history.location.pathname).toBe(pathname)

  ReactDOM.unmountComponentAtNode(div)
})

it('will redirect from / to /login when not logged in', () => {
  const pathname = '/'
  history.push(pathname)

  const div = document.createElement('div')
  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      <App auth={auth} history={history}></App>
    </Router>
  </Provider>, div)

  expect(history.location.pathname).toBe('/login')

  ReactDOM.unmountComponentAtNode(div)
})

it('will not redirect from / when logged in', () => {
  const pathname = '/'
  history.push(pathname)

  auth.loggedIn = true;

  const div = document.createElement('div')
  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      <App auth={auth} history={history}></App>
    </Router>
  </Provider>, div)

  expect(history.location.pathname).toBe(pathname)

  ReactDOM.unmountComponentAtNode(div)
})