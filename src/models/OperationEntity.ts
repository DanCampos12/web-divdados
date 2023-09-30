import { Operation } from './Operation'

export class OperationEntity implements Operation {
  id?: string;
  type: string;
  description: string;
  value: number | null;
  date: string;
  effected: boolean;
  userId: string;
  categoryId: string;
  eventId?: string;

  constructor () {
    this.type = ''
    this.description = ''
    this.value = null
    this.date = ''
    this.effected = true
    this.userId = ''
    this.categoryId = ''
  }

  static parse (operation: Operation) {
    const instance = new OperationEntity()
    if (operation) {
      instance.id = operation.id
      instance.type = operation.type
      instance.description = operation.description
      instance.value = operation.value
      instance.date = operation.date
      instance.effected = operation.effected
      instance.userId = operation.userId
      instance.categoryId = operation.categoryId
      instance.eventId = operation.eventId
    }
    return instance
  }

  isEdit () {
    return !!this.id
  }
}
