import 'dotenv/config'

import express from 'express'
import mongoose from 'mongoose'
import cors from './middleware/cors'
import bodyParser from './middleware/bodyParser'
import { tokens, users, graphql } from './routes'
const app = express();

app.use(cors)
app.use(bodyParser)

app.use("/graphql", graphql)
app.use("/tokens", tokens)
app.use("/users", users)

const start = async () => {

  const db = await mongoose.connect(`mongodb://localhost:27017/${process.env.MGO_DB}`, { useUnifiedTopology: true, useNewUrlParser: true })

  app.listen(process.env.PORT, () => {
    console.log(`API listening at ${process.env.PORT}`)
  })

}

start()
