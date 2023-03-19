import Axios, { AxiosInstance } from 'axios'
import QS from 'qs'
import axiosRetry from 'axios-retry'
import { HttpStatusCodeEnum } from '@/enums/HttpStatusCode'

export default class HttpService {
  static $http: AxiosInstance;

  static getInstance () {
    if (!this.$http) {
      this.$http = Axios.create({
        baseURL: process.env.VUE_APP_API_URL,
        paramsSerializer: (params) => {
          for (const key in params) {
            (params[key] !== undefined && params[key] !== null) || delete params[key]
          }
          return QS.stringify(params, { arrayFormat: 'repeat' })
        }
      })

      axiosRetry(this.$http, {
        retries: 5,
        retryDelay: (retryCount) => {
          return retryCount * 1000
        },
        retryCondition: (error) => {
          const { status = 0 } = error.response || {}
          return status === HttpStatusCodeEnum.Unauthorized
        }
      })
    }

    return this.$http
  }
}
