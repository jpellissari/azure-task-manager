import { Router } from 'express'
import { CreateTaskController } from '../modules/us-breaker/use-cases/create-task/create-task-controller'

const routes = Router()

routes.get('/statuscheck', (request, response) =>
  response.json({ message: "It's working baby" })
)

routes.post('/us-breaker/:parentID/new-task', new CreateTaskController().handle)

export default routes
