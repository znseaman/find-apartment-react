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
