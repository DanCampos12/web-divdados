import ApiService from '@/core/services/ApiService'
import { Overview } from '@/models'
import { AxiosResponse } from 'axios'

export class HomeService extends ApiService {
  static async getOverview (userId: string, date: string): Promise<AxiosResponse<Overview>> {
    return this.httpService.get(`v1/users/${userId}/overview/${date}`)
  }
}
