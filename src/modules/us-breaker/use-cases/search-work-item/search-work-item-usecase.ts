import axios from 'axios'
import { IWorkItem } from '../../models/work-item'
import { ISearchWorkItemUsecase } from '../protocols/search-work-item'

type AzureWorkItem = {
  data: {
    id: number
    fields: {
      'System.Title': string
      'System.Description': string
    }
  }
}

export class SearchWorkItemUsecase implements ISearchWorkItemUsecase {
  async execute(workItemID: number): Promise<IWorkItem> {
    const azureWorkItem: AzureWorkItem = await axios.get(
      `https://dev.azure.com/joaopellissari/_apis/wit/workitems/${workItemID}`,
      {
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
        auth: {
          username: process.env.AZURE_USERNAME || '',
          password: process.env.AZURE_TOKEN || '',
        },
      }
    )
    return this.mapToDomain(azureWorkItem)
  }

  private mapToDomain(azureWorkItemResponse: AzureWorkItem): IWorkItem {
    const { data: azureWorkItem } = azureWorkItemResponse
    return Object.assign({} as IWorkItem, {
      id: azureWorkItem.id,
      title: azureWorkItem.fields['System.Title'],
      description: azureWorkItem.fields['System.Description'],
    })
  }
}
