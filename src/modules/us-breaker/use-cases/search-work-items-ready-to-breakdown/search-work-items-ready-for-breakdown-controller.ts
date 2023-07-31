import { Request } from 'express'

export class SearchWorkItemsReadyForBreakdownController {
  async handle(request: Request, response: Response): Promise<Response> {
    const searchWorkItemsReadyForBreakdownUsecase =
      new SearchWorkItemsReadyForBreakdownUsecase()
    const workItems = await searchWorkItemsReadyForBreakdownUsecase.execute()

    return response.json(workItems)
  }
}
