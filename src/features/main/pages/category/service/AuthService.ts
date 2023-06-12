import ApiService from '@/core/services/ApiService'
import { Category, CategoryEntity } from '@/models'
import { AxiosResponse } from 'axios'

export class CategoryService extends ApiService {
  static async getCategories (userId: string): Promise<AxiosResponse<Category[]>> {
    return this.httpService.get(`v1/users/${userId}/categories`)
  }

  static async postCategory (category: CategoryEntity): Promise<AxiosResponse<Category>> {
    return this.httpService.post(`v1/users/${category.userId}/categories`, category)
  }

  static async putCategory (category: CategoryEntity): Promise<AxiosResponse<Category>> {
    return this.httpService.put(`v1/users/${category.userId}/categories/${category.id}`, category)
  }

  static async deleteCategory (category: CategoryEntity): Promise<AxiosResponse<string>> {
    return this.httpService.delete(`v1/users/${category.userId}/categories/${category.id}`)
  }
}
