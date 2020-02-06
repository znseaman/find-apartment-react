import history from '../../utils/history'
import axiosConfig from '../../shared/axios'
import config from '../../config/index'
const { CLIENT_URL: baseURL } = config

class Auth {
  loggedIn = false

  authenticate = type => async (email, password) =>
    axiosConfig.post(`/${type}`, { email, password }).then(data => {
      this.loggedIn = true
      history.replace(`${baseURL}/`)
    })

  logout = () =>
    axiosConfig.get(`/logout`).then(() => {
      this.loggedIn = false
      history.replace(`${baseURL}/login`)
    })

  checkAuthentication = async () =>
    axiosConfig.get(`/authenticated`).then(data => {
      if (data && data.authenticated) {
        this.loggedIn = true
      }
    })
}

export const auth = new Auth()
