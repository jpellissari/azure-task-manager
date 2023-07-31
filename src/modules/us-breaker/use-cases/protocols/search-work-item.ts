import { IWorkItem } from '../../models/work-item'

export interface ISearchWorkItemUsecase {
  execute(workItemID: number): Promise<IWorkItem>
}
