import React from 'react'
import ReactDOM from 'react-dom'
import history from './utils/history'
import { Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { auth } from './components/Auth/Auth'
import App from './containers/App/App'

import { Provider } from 'react-redux'
import store from './redux/store'

import * as Sentry from '@sentry/browser'
Sentry.init({
  dsn: 'https://3092fecb7cef45e38c5f99ae92609569@sentry.io/1760253',
})

auth.checkAuthentication().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App auth={auth} history={history}></App>
      </Router>
    </Provider>,
    document.getElementById('root'),
  )
})
