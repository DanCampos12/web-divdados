import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios'
import QS from 'qs'
import { HttpStatusCodeEnum } from '@/enums/HttpStatusCode'
import Vue from 'vue'

class HttpResponse implements AxiosResponse<any> {
  data: any;
  status!: number;
  statusText!: string;
  headers!: AxiosResponseHeaders;
  config!: AxiosRequestConfig;
  request?: any;
}

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

      this.$http.interceptors.request.use(this.onRequest)
      this.$http.interceptors.response.use((response) => response, this.interceptError)
    }

    return this.$http
  }

  static async onRequest (requestConfig: Record<string, any>) {
    const authConfig = Vue.$authorizer.getLocalStorageAuthConfig()
    if (authConfig.idToken) requestConfig.headers.authorization = `Bearer ${authConfig.idToken}`
    requestConfig.headers['x-client-id'] = process.env.VUE_APP_CLIENT_ID
    return requestConfig
  }

  static async interceptError (error: AxiosError<any>) {
    if (!error.response || !error.response.data || !error.response.status) {
      error.response = new HttpResponse()
      error.response.data = [
        { message: 'O serviço não está respondendo adequadamente' },
        { message: 'Isso pode ser um problema na sua conexão, ou pode ser um problema de disponibilidade de nossos serviços' }
      ]
    }

    if (error.response.status === HttpStatusCodeEnum.InternalServerError) {
      error.response.data = [{ message: 'Erro ao executar a solicitação' }]
    }

    if (!Array.isArray(error.response.data)) {
      error.response.data = [{ ...error.response.data }]
    }

    return Promise.reject(error)
  }
}
