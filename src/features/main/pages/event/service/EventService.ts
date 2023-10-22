import ApiService from '@/core/services/ApiService'
import { Event, EventEntity } from '@/models'
import { AxiosResponse } from 'axios'

export class EventService extends ApiService {
  static async getEvents ({ userId, date }: { userId: string, date: string }): Promise<AxiosResponse<Event[]>> {
    return this.httpService.get(`v1/users/${userId}/events/${date}`)
  }

  static async postEvent (event: EventEntity): Promise<AxiosResponse<Event>> {
    return this.httpService.post(`v1/users/${event.userId}/events`, event)
  }

  static async putEvent (event: EventEntity): Promise<AxiosResponse<Event>> {
    return this.httpService.put(`v1/users/${event.userId}/events/${event.id}`, event)
  }

  static async deleteEvent (event: EventEntity): Promise<AxiosResponse<string>> {
    return this.httpService.delete(`v1/users/${event.userId}/events/${event.id}`)
  }
}
