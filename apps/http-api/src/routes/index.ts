import { AdapterFacade } from '@nodejs-hexagonal-v2/adapters'
import { LoggerInstance } from '@nodejs-hexagonal-v2/ports'
import { Router } from 'express'
import { indexRouter } from './index.router'
import { todoRouter } from './todo.router'

/**
 * @description Get route definitions.
 *
 * @function
 * @param {LoggerInstance} logger instance of logger
 * @param {AdapterFacade} adapter instantiated adapter
 */
export const getRoutes = (logger: LoggerInstance, adapter: AdapterFacade): { readonly [key: string]: Router } => {
  return {
    index: indexRouter(logger),
    todo: todoRouter(logger, adapter)
  }
}
