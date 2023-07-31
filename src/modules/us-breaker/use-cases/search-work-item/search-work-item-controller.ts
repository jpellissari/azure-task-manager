import { Request, Response } from 'express'
import { SearchWorkItemUsecase } from './search-work-item-usecase'

export class SearchWorkItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { workItemID } = request.params

    const searchWorkItemUsecase = new SearchWorkItemUsecase()
    const workItem = await searchWorkItemUsecase.execute(parseInt(workItemID))

    return response.json(workItem)
  }
}
