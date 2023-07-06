import axios from 'axios'

const baseURL =  'https://libretranslate.com/translate';

const translateFetch = axios.create({
  baseURL
})

export { translateFetch, baseURL }
