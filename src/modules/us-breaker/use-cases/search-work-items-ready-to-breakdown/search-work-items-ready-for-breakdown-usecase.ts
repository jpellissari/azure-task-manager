import axios from 'axios'
import { ISearchWorkItemsReadyForBreakdownUsecase } from '../protocols/search-work-items-ready-for-breakdown'

type AzureWiqlResponse = {
  workItems: {
    id: string
    url: string
  }[]
}
export class SearchWorkItemsReadyForBreakdownUsecase
  implements ISearchWorkItemsReadyForBreakdownUsecase
{
  async execute(): Promise<number> {
    const organization = 'pellissarijoao'
    const project = 'azure-task-manager'
    const team = 'product'

    const workItems = await axios.post<AzureWiqlResponse>(
      `https://dev.azure.com/${organization}/${project}/${team}/_apis/wit/wiql?api-version=7.0`,
      {
        query:
          "Select [System.Id], [System.Title], [System.State], [] From workItems Where [System.BoardColumn] = 'Breakdown'",
      },
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

    return workItems.data.workItems.length
  }
}
