import { Event } from './Event'

export class EventEntity implements Event {
  id?: string;
  type: string;
  description: string;
  value: number | null;
  initialDate: string;
  finalDate: string;
  period: string;
  userId: string;
  categoryId: string;
  categoryName: string;
  completed: boolean;

  constructor () {
    this.type = ''
    this.description = ''
    this.value = null
    this.initialDate = ''
    this.finalDate = ''
    this.period = ''
    this.userId = ''
    this.categoryId = ''
    this.categoryName = ''
    this.completed = false
  }

  static parse (event: Event) {
    const instance = new EventEntity()
    if (event) {
      instance.id = event.id
      instance.type = event.type
      instance.description = event.description
      instance.value = event.value
      instance.initialDate = event.initialDate
      instance.finalDate = event.finalDate
      instance.period = event.period
      instance.userId = event.userId
      instance.categoryId = event.categoryId
      instance.categoryName = event.categoryName
      instance.completed = event.completed
    }
    return instance
  }

  isEdit () {
    return !!this.id
  }
}
