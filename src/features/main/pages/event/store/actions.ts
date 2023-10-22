import { EventState, EventEntity, RootState } from '@/models'
import { ActionTree } from 'vuex'
import { EventService } from '../service/EventService'

export const actions: ActionTree<EventState, RootState> = {
  async getEvents (_, { userId, date }: { userId: string, date: string }) {
    try {
      const response = await EventService.getEvents({ userId, date })
      return response.data || []
    } catch (error: any) {
      throw error.response.data
    }
  },
  async postEvent (_, event: EventEntity) {
    try {
      const response = await EventService.postEvent(event)
      return response.data || new EventEntity()
    } catch (error: any) {
      throw error.response.data
    }
  },
  async putEvent (_, event: EventEntity) {
    try {
      const response = await EventService.putEvent(event)
      return response.data || new EventEntity()
    } catch (error: any) {
      throw error.response.data
    }
  },
  async deleteEvent (_, event: EventEntity) {
    try {
      const response = await EventService.deleteEvent(event)
      return response.data || ''
    } catch (error: any) {
      throw error.response.data
    }
  }
}
