import { createServer } from '@graphql-yoga/node'
import { NextApiRequest, NextApiResponse } from 'next'
import tasks_data from "../../utils/tasks.json"
import tags_data from "../../utils/tags.json"
import { tagProps, taskProps } from '../../utils/types'

const server = createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema: {
    typeDefs: /* GraphQL */ `
		 type Tag{
        id:    String! 
        name:  String!
        tasks: [Task]
      }

      type Task {
        id:         String!
        description: String!
        complete:    Boolean!
        tag: Tag
      }

      type Query {
        getAllTasks:[Task!]!
        getAllTags :[Tag!]!
        getTaskByID(id:String!) : Task
      }

      type Mutation {
        addTask(description:String!, tagName :String!):Task!
        updateTask(id:String!, description:String, complete: Boolean, tagName: String!):Task!
        deleteTask(id:String!):Task!
      }
      `,

    resolvers: {
      Tag:
      {
        id: (parent: tagProps) => parent.id,
        name: (parent: tagProps) => parent.name,
        tasks: (parent: any) => {
          return parent.tasks.map(({ id, description, complete }: taskProps) => ({
            id, description, complete
          }))
        }
      },

      Task:
      {
        id: (parent: taskProps) => parent.id,
        description: (parent: taskProps) => parent.description,
        complete: (parent: taskProps) => parent.complete,
        tag: (parent: any) => ({
          id: parent.tag.id,
          name: parent.tag.name,
        })
      },

      Query: {
        getAllTasks: () => tasks_data,
        getAllTags: () => tags_data,
        getTaskByID: (parent: unknown, args: { id: string }) => {
          return tasks_data.filter((task) => { return (task['id'] == args.id); })
        }
      },

      Mutation: {
        addTask: (parent: unknown, args: { description: string; tagName: string }) => {
          const newTask = {
            id: "5",
            description: args.description,
            complete: false,
            tag: {
              id: "10",
              name: args.tagName
            }
          };
          tasks_data.push(newTask);
          return newTask;
        },

        updateTask: (parent: unknown, args: { id: string, description: string, complete: boolean, tagName: string }) => {
          const updateTask = tasks_data.find(i => i.id === args.id)

          if (updateTask) {
            updateTask.description = args.description
            updateTask.complete = args.complete
            updateTask.tag.name = args.tagName

            return updateTask
          }
          throw new Error('Id not found');
        },

        deleteTask: (parent: unknown, args: { id: string }) => {
          const idx = tasks_data.findIndex(i => i.id === args.id)

          if (idx !== -1) {
            tasks_data.splice(idx, 1)
            return args.id
          }

          throw new Error('Id not found');
        }
      }
    }
  }
})

export default server