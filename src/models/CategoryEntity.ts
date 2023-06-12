import { Category } from './Category'

export class CategoryEntity implements Category {
  id?: string;
  name: string;
  color: string;
  userId: string;

  constructor () {
    this.name = ''
    this.color = ''
    this.userId = ''
  }

  static parse (category: Category) {
    const instance = new CategoryEntity()
    if (category) {
      instance.id = category.id
      instance.name = category.name
      instance.color = category.color
      instance.userId = category.userId
    }
    return instance
  }

  isEdit () {
    return !!this.id
  }
}
