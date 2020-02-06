const uuid = require('uuid/v4')
const hash = require('./hash')
const User = require('../models/user')

class Session {
  constructor(email) {
    this.email = email
    this.id = uuid()
  }

  toString() {
    return Session.dataToString(this.email, this.id)
  }

  static userData(email, id) {
    return `${email}|${id}`
  }

  static dataToString(email, id) {
    const user_data = Session.userData(email, id)
    return `${user_data}|${hash(user_data)}`
  }

  static parse(session_str = '||') {
    const [email, id, session_hash] = session_str.split(`|`)
    return {email, id, session_hash}
  }

  static verify(session_str) {
    const {email, id, session_hash} = Session.parse(session_str)
    const user_data = Session.userData(email, id)

    return hash(user_data) === session_hash
  }

  static getExpires() {
    // 3600000 milliseconds = 1 hour
    const later = 3600000
    const expires = new Date(Date.now() + later)
    return expires
  }

  static set_session(email, res, session_id) {
    let session
    let session_str

    if (session_id) {
      session_str = Session.dataToString(email, session_id)
    } else {
      session = new Session(email)
      session_str = session.toString()
    }

    return new Promise(async (resolve, reject) => {
      if (session_id) {
        set_session_cookie(session_str, res)
        resolve()
      } else {
        try {
          // @TODO: should pass in the userId into the where clause for security
          await User.update(
            {
              session_id: session.id,
            },
            {
              where: {
                email,
              },
            },
          )
          set_session_cookie(session_str, res)
          resolve()
        } catch (error) {
          reject(error)
        }
      }
    })

    function set_session_cookie(session_str, res) {
      const expires = Session.getExpires()
      res.cookie('session_str', session_str, {
        // TODO: express this through date-fns to be more precise for maintenance
        expires,
        httpOnly: true,
        secure: false, // use with https for a secure cookie (set to true when using https)
      })
    }
  }
}

module.exports = Session
