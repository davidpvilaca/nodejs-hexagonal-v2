import { adapter } from '@nodejs-hexagonal-v2/adapters'
import { appConfig, AWSDynamoConfig } from '@nodejs-hexagonal-v2/config'
import { Todo } from '@nodejs-hexagonal-v2/models'
import { databaseRepository, handleLogger } from '@nodejs-hexagonal-v2/ports'
import { config as AWSConfig, DynamoDB } from 'aws-sdk'
import * as express from 'express'
import { json as expressJson, urlencoded as expressUrlEncoded } from 'express'
import { getRoutes } from './routes'

// setting app
const app = express()
// logger
const logger = handleLogger(appConfig.appName, appConfig.envName)

// AWS Dynamo configuration.
AWSConfig.update(AWSDynamoConfig)
const dynamo = new DynamoDB.DocumentClient()

// inject repositories
const databaseRepoInstance = databaseRepository<Todo>(dynamo, appConfig.todo.tableName)
const adapterInstance = adapter(logger, databaseRepoInstance)

app.use(expressJson({ limit: '50mb' }))
app.use(expressUrlEncoded({ extended: false }))

// Routes
const routes = getRoutes(logger, adapterInstance)
app.use('/api/v1', routes.index)
app.use('/api/v1/todos', routes.todo)

export default app
