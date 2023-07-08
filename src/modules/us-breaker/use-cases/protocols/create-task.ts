export type NewTaskDTO = {
  parentID: number
  title: string
  description?: string
  estimatedTime: number
}

export interface ICreateTaskUsecase {
  execute(task: NewTaskDTO): Promise<void>
}
