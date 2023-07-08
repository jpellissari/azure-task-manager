import { Router } from 'express'

const routes = Router()

routes.get('/statuscheck', (request, response) =>
  response.json({ message: "It's working baby" })
)

export default routes
