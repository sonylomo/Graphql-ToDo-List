
# So, you finally decided to build a GraphQL API 🚀
This is a simple To-Do List App with basic mutations and queries to help you learn GraphQL.
![complete-app-todo](https://user-images.githubusercontent.com/49971500/164016057-5eb33673-afef-4c82-9028-d5b94d8e763c.png)

## Tech used for this App 👩🏾‍💻
#### Frontend
  - [TypeScript](https://www.typescriptlang.org/) - a strongly typed programming language that builds on JavaScript.
  - [Next.js](https://nextjs.org/) (with TypeScript config) - JavaScript framework that lets you build server-side-rendered and static web apps using React.
  - [GraphQL request](https://www.npmjs.com/package/graphql-request) - a simple GraphQL client that helps you send queries and mutations with a single line of code.
 
#### Backend
  - [GraphQL Yoga](https://www.graphql-yoga.com/) - GraphQL server that’s focused on easy setup for building your API. If you’re familiar with building a REST API with Node.js, GraphQL Yoga is similar to using the [Express.js](https://expressjs.com/) framework for your server.
  - [Prisma](https://www.prisma.io/) - the bridge between your MongoDB database and your code. You’ll use it inside your GraphQL resolvers in a later section.
  - [MongoDB](https://www.mongodb.com/) - a cross-platform document-oriented database program for your app.


## The GraphQL API 😎
#### Queries
  - getAllTasks: [Task!]!
  - getAllTags: [Tag!]!
  - getTaskByID(id: String!): Task

#### Mutations
  - addTask(description: String!tagName: String!): Task!
  - updateTask(
      id: String!
      description: String
      complete: Boolean
      tagName: String!
      ): Task!
  - deleteTask(id: String!): Task!
