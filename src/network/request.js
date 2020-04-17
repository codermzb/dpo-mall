import axios from 'axios'
export function request(config) {
  const instance1 = axios.create({
    // baseURL: 'http://152.136.185.210:8000/api/h8',
    baseURL: 'http://123.207.32.32:8000/api/h8',
    // baseURL: 'http://106.54.54.237:8000/api/h8',
    timedOut:5000
  })
  instance1.interceptors.request.use(config => {
    return config
  },err => {
    return err
  })
  instance1.interceptors.response.use(res => {
    return res.data
  },err => {
    return err
  })
  return instance1(config)
}

