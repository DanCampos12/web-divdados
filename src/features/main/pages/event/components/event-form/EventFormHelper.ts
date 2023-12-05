import { EventEntity } from '@/models'

class EventFormHelper {
  getActionAPI (event: EventEntity) {
    return event.isEdit() ? 'event/putEvent' : 'event/postEvent'
  }

  disableConfirmButton (formValid: boolean, operationInProgress: boolean) {
    return !formValid || operationInProgress
  }

  fieldHintMessage (event: EventEntity) {
    return event.isEdit() ? 'Campo não editável' : ''
  }

  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  getFormTitle (event: EventEntity) {
    return `Cadastro de evento - ${event.isEdit() ? 'Alteração' : 'Inclusão'}`
  }
}

const instance = new EventFormHelper()
export default instance
