import axios from 'axios'
import { ICreateTaskUsecase, NewTaskDTO } from '../protocols/create-task'

type AzureOperation = {
  op: 'add'
  path: string
  from: string | null
  value: string | {}
}

type AzurePayload = AzureOperation[]

export class CreateTaskUsecase implements ICreateTaskUsecase {
  async execute(task: NewTaskDTO): Promise<void> {
    const taskTitle: AzureOperation = {
      op: 'add',
      path: '/fields/System.Title',
      from: null,
      value: task.title,
    }

    const taskEstimatedTime: AzureOperation = {
      op: 'add',
      path: '/fields/Microsoft.VSTS.Scheduling.OriginalEstimate',
      from: null,
      value: task.estimatedTime,
    }

    const taskRemainingWork: AzureOperation = {
      op: 'add',
      path: '/fields/Microsoft.VSTS.Scheduling.RemainingWork',
      from: null,
      value: task.estimatedTime,
    }

    const taskDescription: AzureOperation = {
      op: 'add',
      path: '/fields/System.Description',
      from: null,
      value: task.description ? task.description : '',
    }

    const taskRelation: AzureOperation = {
      op: 'add',
      path: '/relations/-',
      from: null,
      value: {
        rel: 'System.LinkTypes.Hierarchy-Reverse',
        url: `https://dev.azure.com/joaopellissari/_apis/wit/workItems/${task.parentID}`,
        attributes: {
          isLocked: false,
          name: 'Child',
        },
      },
    }

    const azurePayload: AzurePayload = [
      taskTitle,
      taskDescription,
      taskRelation,
      taskEstimatedTime,
      taskRemainingWork,
      {
        op: 'add',
        path: '/fields/Microsoft.VSTS.Common.Activity',
        from: null,
        value: 'Development',
      },
    ]

    await axios.post(
      'https://dev.azure.com/joaopellissari/azure-task-manager-board/_apis/wit/workitems/$Task?api-version=7.1-preview.3',
      azurePayload,
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
  }
}
