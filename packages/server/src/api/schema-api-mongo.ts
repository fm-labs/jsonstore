import { connectMongoDb, mapMongoObjectToJson } from '../mongodb/mongodb-util.js'
import { ObjectSchemaModel } from '../mongodb/mongodb-models.js'
import { Express } from 'express'
import { compileSchema } from '../schema_util.js'

export const SchemaApiMongo = (app: Express) => {
  // GET all schema ids
  app.get('/object/schema/index', async (req, res) => {
    try {
      await connectMongoDb()
      const result = await ObjectSchemaModel.distinct('schemaId').exec()
      res.send(result)
    } catch (err) {
      console.error('ERROR', err)
      res.status(500).send({ error: 'Failed to fetch namespaces', details: err })
    }
  })

  // GET schema
  app.get('/object/schema', async (req, res) => {
    const schemaId = req.query.schemaId
    if (!schemaId) {
      res.status(400).send({ error: 'Missing schemaId' })
      return
    }

    try {
      await connectMongoDb()
      const document = await ObjectSchemaModel.findOne({ schemaId: schemaId }).exec()
      if (!document) {
        res.status(404).send({ error: 'Namespace not found' })
        return
      }
      res.send(mapMongoObjectToJson(document))

      // const response = {
      //   schemaId: document.schemaId,
      //   schemaJson: await compileSchema(document.schemaJson),
      // }
      // res.send(response)
    } catch (err) {
      console.error('ERROR', err)
      res.status(500).send({ error: 'Failed to fetch schemaJson', details: err })
    }
  })

  // POST to create or update schema schemaJson for a specific schemaId
  app.post('/object/schema', async (req, res) => {
    const schemaId = req.query.schemaId
    if (!schemaId) {
      res.status(400).send({ error: 'Missing schemaId' })
      return
    }

    try {
      await connectMongoDb()
      const schemaJson = req.body
      const document = await ObjectSchemaModel.findOneAndUpdate(
        { schemaId: schemaId },
        { schemaId: schemaId, schemaJson: schemaJson },
        { upsert: true, new: true },
      )
      res.send(mapMongoObjectToJson(document))
    } catch (err) {
      res.status(500).send({ error: 'Failed to update schemaJson' })
    }
  })
}
