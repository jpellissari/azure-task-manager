import { IWorkItem } from '../../models/work-item'
import { ISearchWorkItemUsecase } from '../protocols/search-work-item'

export class SearchWorkItemUsecase implements ISearchWorkItemUsecase {
  async execute(workItemID: number): Promise<IWorkItem> {
    throw new Error('Method not implemented.')
  }
}
