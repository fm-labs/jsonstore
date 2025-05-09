import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { DATA_DIR, SERVER_PORT } from './constants.js'
import { ObjectApiMongo } from './api/object-api-mongo.js'
import { SchemaApiMongo } from './api/schema-api-mongo.js'

console.log('Data directory: ' + DATA_DIR)
console.log('Starting jsonstore api server on port ' + SERVER_PORT)

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
ObjectApiMongo(app)
SchemaApiMongo(app)

const server = app.listen(SERVER_PORT)

// Signal handling
function handle(signal: any) {
  console.log(`Signal received: ${signal}`)
  server.close(() => {
    console.log('Server closed')
  })
}
process.on('SIGINT', handle)
