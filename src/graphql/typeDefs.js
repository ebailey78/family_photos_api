import { gql } from 'apollo-server-express'

let schema = gql`

type Query {
  user: User
  users: [User]
}

type User {
  userId: ID!
  firstName: String
  lastName: String
  email: String
  accessLevel: String
  status: String
}

`

export default schema