import { Router } from 'express'

import { ApolloServer } from 'apollo-server-express'
import typeDefs from "../../graphql/typeDefs"  
import resolvers from "../../graphql/resolvers"
import jwtAuth from '../../middleware/jwtAuth'
import addUser from '../../middleware/addUser'

const router = Router()

//router.use(jwtAuth)
//router.user(addUser)

const gqlServer = new ApolloServer({
  playground: true,
  typeDefs, 
  resolvers,
})

gqlServer.applyMiddleware({app: router, path: "/"})

export default router
