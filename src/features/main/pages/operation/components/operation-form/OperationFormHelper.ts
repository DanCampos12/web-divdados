import { OperationEntity } from '@/models'

class OperationFormHelper {
  getActionAPI (operation: OperationEntity) {
    return operation.isEdit() ? 'operation/putOperation' : 'operation/postOperation'
  }

  disableConfirmButton (formValid: boolean, operationInProgress: boolean, operation: OperationEntity) {
    return !formValid || operationInProgress || !!operation.eventId
  }

  disableForEditing (operation: OperationEntity, disableInEdit: boolean) {
    return !!operation.eventId || (operation.isEdit() && disableInEdit)
  }

  fieldHintMessage (disabled: boolean) {
    return disabled ? 'Campo não editável' : ''
  }

  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  getFormTitle (operation: OperationEntity) {
    return `Cadastro de operação - ${operation.eventId ? 'Visualização' : operation.isEdit() ? 'Alteração' : 'Inclusão'}`
  }
}

const instance = new OperationFormHelper()
export default instance
