import { Request, Response } from 'express'
import { CreateTaskUsecase } from './create-task-usecase'

export class CreateTaskController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { parentID } = request.params
    const { title, description, estimatedTime } = request.body

    if (title === undefined || estimatedTime === undefined) {
      return response.status(400).json({
        error: 'MissingParamError',
        message: 'Title and estimatedTime are required',
      })
    }

    const createTaskUsecase = new CreateTaskUsecase()
    try {
      createTaskUsecase.execute({
        parentID: parseInt(parentID),
        title,
        description,
        estimatedTime: parseFloat(estimatedTime),
      })
    } catch (err) {
      return response.status(500).json({
        error: 'InternalServerError',
        message: "Whoops, I'm not feeling very well! Call an ambulance!",
      })
    }

    return response.json({ message: 'Task created' })
  }
}
