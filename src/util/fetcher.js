import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://94.46.246.11:8000/api'
    : `https://${process.env.SITE_NAME}/api`

const publicFetch = axios.create({
  baseURL
})

export { publicFetch, baseURL }
