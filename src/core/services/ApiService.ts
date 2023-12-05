import HttpService from './HttpService'
import { AxiosInstance } from 'axios'

export default class ApiService {
  protected static httpService: AxiosInstance = HttpService.getInstance();
}
