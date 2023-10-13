import { Category } from './Category'

export class CategoryEntity implements Category {
  id?: string;
  name: string;
  color: string;
  userId: string;
  allocation: number;
  maxValueMonthly: number | null;
  isAutomaticInput: boolean;

  constructor () {
    this.name = ''
    this.color = '#E6E6E6'
    this.userId = ''
    this.allocation = 0
    this.maxValueMonthly = null
    this.isAutomaticInput = false
  }

  static parse (category: Category) {
    const instance = new CategoryEntity()
    if (category) {
      instance.id = category.id
      instance.name = category.name
      instance.color = category.color
      instance.userId = category.userId
      instance.allocation = category.allocation
      instance.maxValueMonthly = category.maxValueMonthly
      instance.isAutomaticInput = category.isAutomaticInput
    }
    return instance
  }

  isEdit () {
    return !!this.id
  }
}
