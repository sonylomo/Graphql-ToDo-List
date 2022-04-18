import { createServer } from '@graphql-yoga/node'
import type { Tag, Task } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const server = createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema: {
    typeDefs: /* GraphQL */ `
      type Task {
        id:         String!
        description: String!
        complete:    Boolean!
        tag: Tag
      }

      type Tag{
        id:    String! 
        name:  String!
        tasks: [Task]
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
        id: (parent: Tag) => parent.id,
        name: (parent: Tag) => parent.name,
        //fix type
        tasks: (parent: any) => {
          return parent.tasks.map(({ id, description, complete }: Task) => ({
            id, description, complete
          }))
        }
      },

      Task:
      {
        id: (parent: Task) => parent.id,
        description: (parent: Task) => parent.description,
        complete: (parent: Task) => parent.complete,
        tag: (parent: any) => ({
          id: parent.tag.id,
          name: parent.tag.name,
        })
      },

      Query: {
        getAllTasks: async () => {
          return await prisma.task.findMany({
            include: {
              tag: true
            }
          })
        },

        getAllTags: async () => {
          return await prisma.tag.findMany({
            include: {
              tasks: true
            }
          })
        },

        getTaskByID: async (parent: unknown, args: { id: string }) => {
          return await prisma.task.findUnique({
            where: {
              id: args.id
            },
            include: {
              tag: true
            }
          })
        },
      },

      Mutation: {
        addTask: async (parent: unknown, args: { description: string; tagName: string }) => {
          const newTask = await prisma.task.create({
            data: {
              description: args.description,
              complete: false,
              tag: {
                connectOrCreate: {
                  where: {
                    name: args.tagName
                  }, create: {
                    name: args.tagName
                  }
                }
              }
            }, include: {
              tag: true
            }
          })
          return newTask;
        },

        updateTask: async (parent: unknown, args: { id: string, description: string, complete: boolean, tagName: string }) => {
          const updateTask = await prisma.task.update({
            where: {
              id: args.id
            },
            data: {
              description: args.description,
              complete: args.complete,
              tag: {
                connectOrCreate: {
                  where: {
                    name: args.tagName
                  }, create: {
                    name: args.tagName
                  }
                }
              }
            },
            include: {
              tag: true
            }
          })
          return updateTask;
        },

        deleteTask: async (parent: unknown, args: { id: string }) => {
          const deleteTask = await prisma.task.delete({
            where: {
              id: args.id,
            },
            include: {
              tag: true
            }
          })
          return deleteTask;
        },
      }
    }
  }
})

export default server