import { CategoryEntity } from '@/models'

class CategoryFormHelper {
  getActionAPI (category: CategoryEntity) {
    return category.isEdit() ? 'category/putCategory' : 'category/postCategory'
  }

  disableConfirmButton (formValid: boolean, operationInProgress: boolean, isAutomaticInput: boolean) {
    return !formValid || operationInProgress || isAutomaticInput
  }

  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  fieldHintMessage (isAutomaticInput: boolean) {
    return isAutomaticInput ? 'Campo não editável' : ''
  }

  getFormTitle (category: CategoryEntity) {
    return `Cadastro de categoria - ${category.isEdit() ? 'Alteração' : 'Inclusão'}`
  }
}

const instance = new CategoryFormHelper()
export default instance
