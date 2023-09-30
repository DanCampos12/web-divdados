import { normalizeText } from '@/helpers'
import { Operation } from '@/models'

class OperationHelper {
  isValidDescription (operation: Operation, searchText: string) {
    return !operation.description || normalizeText(operation.description)
      .includes(normalizeText(searchText))
  }

  isValidType (operation: Operation, inflow: boolean, outflow: boolean) {
    return (operation.type === 'I' && inflow) ||
      (operation.type === 'O' && outflow)
  }

  filterOperations (operations: Operation[], filters: {
    searchText: string;
    inflow: boolean;
    outflow: boolean
  }) {
    return operations.filter((operation) => {
      return this.isValidDescription(operation, filters.searchText) &&
        this.isValidType(operation, filters.inflow, filters.outflow)
    })
  }

  getOperationsEffected (operations: Operation[]) {
    return operations.filter((operation) => operation.effected)
  }

  getOperationsPending (operations: Operation[]) {
    return operations.filter((operation) => !operation.effected)
  }
}

const instance = new OperationHelper()
export default instance
