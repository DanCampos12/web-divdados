import { normalizeText } from '@/helpers'
import { Category } from '@/models'

class CategoryHelper {
  filterCategories (categories: Category[], searchText: string) {
    if (!searchText) return [...categories]
    return categories.filter((category) => normalizeText(category.name)
      .includes(normalizeText(searchText)))
  }
}

const instance = new CategoryHelper()
export default instance
