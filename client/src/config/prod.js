const {PUBLIC_URL} = process.env

const config = {
  FULL_CLIENT_URL: window.location.origin + PUBLIC_URL,
  CLIENT_URL: PUBLIC_URL,
  FULL_SERVER_URL: window.location.origin + PUBLIC_URL,
  SERVER_URL: PUBLIC_URL,
}

export default {
  config,
}
