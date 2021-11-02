import { DynamoRepositoryInstance, LoggerInstance } from '@nodejs-hexagonal-v2/ports'
import { Todo } from '@nodejs-hexagonal-v2/models'
import todoAdapterFactory, { TodoAdapterInstance } from './todo'

export type AdapterFacade = {
  readonly todo: TodoAdapterInstance
}

/**
 * @description dynamo repository for state machine
 *
 * @function
 * @param {Logger} logger - Instance of logger.
 * @param {DynamoRepositoryInstance} repository repository instatiated
 */
export const adapter = (logger: LoggerInstance, repository: DynamoRepositoryInstance<Todo>): AdapterFacade => ({
  todo: todoAdapterFactory(logger, repository)
})
