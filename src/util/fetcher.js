import axios from 'axios'

const baseURL =  ' https://api.thedogapi.com/v1';

const publicFetch = axios.create({
  baseURL
})

export { publicFetch, baseURL }
