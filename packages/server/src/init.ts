import { connectMongoDb } from './mongodb/mongodb-util.js'
import { ObjectRecordModel } from './mongodb/mongodb-models.js'

const init = async () => {
  await connectMongoDb()
  console.log('MongoDB connected')

  const record = ObjectRecordModel.updateOne(
    { namespace: 'test/test1' },
    {
      namespace: 'test/test1',
      data: {
        key1: 'value1',
        key2: 'value2',
      },
    },
    { upsert: true, new: true },
  ).exec()
  console.log('ObjectRecordModel created', record)

  const record2 = ObjectRecordModel.updateOne(
    { namespace: 'test/test2' },
    {
      namespace: 'test/test2',
      data: {
        key1: 'value1',
        key2: 'value2',
      },
    },
    { upsert: true, new: true },
  ).exec()
  console.log('ObjectRecordModel created', record2)

  const fruit1 = ObjectRecordModel.updateOne(
    { namespace: 'test/fruit/apple' },
    {
      namespace: 'test/fruit/apple',
      schemaId: 'fruit',
      data: {
        name: 'apple',
        color: 'red',
        size: 'small',
        sweetness: 8,
      },
    },
    { upsert: true, new: true },
  ).exec()
  console.log('ObjectRecordModel created', fruit1)
}

init().then(() => {
  console.log('Init complete')

  setTimeout(() => {
    process.exit()
  }, 5000)
})
