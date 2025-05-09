import {
  connectMongoDb,
  mapMongoArrayToJson,
  mapMongoObjectToJson,
} from '../mongodb/mongodb-util.js'
import { ObjectRecordModel } from '../mongodb/mongodb-models.js'
import { Express } from 'express'

export const ObjectApiMongo = (app: Express) => {
  // GET all object namespaces
  app.get('/object/namespaces', async (req, res) => {
    try {
      await connectMongoDb()
      // fetch distinct namespaces
      const namespaceList = await ObjectRecordModel.distinct('namespace').exec()
      res.send(namespaceList)
    } catch (err) {
      console.error('ERROR', err)
      res.status(500).send({ error: 'Failed to fetch namespaces', details: err })
    }
  })

  // // GET object values for a specific namespace
  // app.get("/object/values", async (req, res) => {
  //     const namespace = req.query.namespace
  //     if (!namespace) {
  //         res.status(400).send({ error: "Missing namespace" })
  //         return
  //     }
  //
  //     try {
  //         await connectMongoDb()
  //         const record = await ObjectRecordModel
  //             .findOne({namespace: namespace}).exec()
  //         if (!record) {
  //             res.status(404).send({ error: "Namespace not found" })
  //             return
  //         }
  //         res.send(record.values)
  //     } catch (err) {
  //         console.error("ERROR", err)
  //         res.status(500).send({ error: "Failed to fetch values", details: err })
  //     }
  // })
  //
  // // POST to create or update object values for a specific namespace
  // app.post("/object/values", async (req, res) => {
  //     const namespace = req.query.namespace
  //     const schemaId = req.query.schemaId
  //     if (!namespace) {
  //         res.status(400).send({ error: "Missing namespace" })
  //         return
  //     }
  //
  //     try {
  //         await connectMongoDb()
  //         const values = req.body
  //         const record = await ObjectRecordModel.findOneAndUpdate(
  //             { namespace: namespace },
  //             { namespace: namespace, values: values },
  //             { upsert: true, new: true },
  //         )
  //         res.send(record.values)
  //     } catch (err) {
  //         res.status(500).send({ error: "Failed to update values" })
  //     }
  // })

  // GET object values for a specific namespace
  app.get('/object', async (req, res) => {
    const namespace = req.query.namespace
    if (!namespace) {
      res.status(400).send({ error: 'Missing namespace' })
      return
    }

    try {
      await connectMongoDb()
      const record = await ObjectRecordModel.findOne({ namespace: namespace }).exec()
      if (!record) {
        res.status(404).send({ error: 'Namespace not found' })
        return
      }
      res.send(mapMongoObjectToJson(record))
    } catch (err) {
      console.error('ERROR', err)
      res.status(500).send({ error: 'Failed to fetch values', details: err })
    }
  })

  // POST to create or update object values for a specific namespace
  app.post('/object', async (req, res) => {
    const namespace = req.query.namespace
    if (!namespace) {
      res.status(400).send({ error: 'Missing namespace' })
      return
    }

    try {
      await connectMongoDb()
      const values = req.body.values
      const schemaId = req.body?.schemaId
      const record = await ObjectRecordModel.findOneAndUpdate(
        { namespace: namespace },
        { namespace: namespace, values: values, schemaId: schemaId },
        { upsert: true, new: true },
      )
      res.send(mapMongoObjectToJson(record))
    } catch (err) {
      res.status(500).send({ error: 'Failed to update values' })
    }
  })
}
