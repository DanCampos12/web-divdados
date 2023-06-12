import { CategoryEntity } from '@/models'

class CategoryFormHelper {
  getActionAPI (category: CategoryEntity) {
    return category.isEdit() ? 'category/putCategory' : 'category/postCategory'
  }

  disableConfirmButton (formValid: boolean, operationInProgress: boolean) {
    return !formValid || operationInProgress
  }

  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  getFormTitle (category: CategoryEntity) {
    return `Cadastro de categoria - ${category.isEdit() ? 'Alteração' : 'Inclusão'}`
  }
}

const instance = new CategoryFormHelper()
export default instance
