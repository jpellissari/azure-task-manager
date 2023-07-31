import { Router } from 'express'
import { CreateTaskController } from '../modules/us-breaker/use-cases/create-task/create-task-controller'
import { SearchWorkItemController } from '../modules/us-breaker/use-cases/search-work-item/search-work-item-controller'

const routes = Router()

routes.get('/statuscheck', (request, response) =>
  response.json({ message: "It's working baby" })
)

routes.get('/api/us-breaker/', new SearchWorkItemsForBreakdownSession().handle)
routes.post(
  '/api/us-breaker/:parentID/new-task',
  new CreateTaskController().handle
)
routes.get('/api/us-breaker/:workItemID', new SearchWorkItemController().handle)

export default routes
