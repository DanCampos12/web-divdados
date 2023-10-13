import { ObjectiveEntity } from '@/models'

class ObjectiveFormHelper {
  getActionAPI (objective: ObjectiveEntity) {
    return objective.isEdit() ? 'objective/putObjective' : 'objective/postObjective'
  }

  disableConfirmButton (formValid: boolean, objectiveInProgress: boolean, objective: ObjectiveEntity) {
    return !formValid || objectiveInProgress || objective.status !== 'inProgress'
  }

  disableForEditing (objective: ObjectiveEntity, disableInEdit: boolean) {
    return objective.status !== 'inProgress' || (objective.isEdit() && disableInEdit)
  }

  fieldHintMessage (disabled: boolean) {
    return disabled ? 'Campo não editável' : ''
  }

  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  getFormTitle (objective: ObjectiveEntity) {
    return `Cadastro de objetivo - ${objective.status !== 'inProgress' ? 'Visualização' : objective.isEdit() ? 'Alteração' : 'Inclusão'}`
  }
}

const instance = new ObjectiveFormHelper()
export default instance
