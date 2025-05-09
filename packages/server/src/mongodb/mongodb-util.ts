import mongoose from 'mongoose'
import { MONGODB_DB_NAME, MONGODB_URL } from '../constants.js'

let mongodb: mongoose.Mongoose | null = null

export const connectMongoDb = async () => {
  console.log('Connecting to MongoDB', MONGODB_URL)
  if (!MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined')
  }

  if (mongodb) {
    console.log('Already connected to MongoDB')
    return mongodb
  }
  mongodb = await mongoose.connect(MONGODB_URL, {
    //authSource: "admin",
    //user: MONGODB_USER,
    //pass: MONGODB_PASSWORD,
    //dbName: "jsonstore",
    //autoIndex: false, // Don't build indexes
    //serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    //socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    //family: 4, // Use IPv4, skip trying IPv6
  })
  console.log('Connected to MongoDB', MONGODB_URL)
  mongodb.connection.useDb(MONGODB_DB_NAME)
  return mongodb
}

export const mapMongoObjectToJson = (obj: any) => {
  if (obj == null) {
    return obj
  }
  if (obj.toObject) {
    obj = obj.toObject({ getters: false, virtuals: false })
  }

  // strip __v and _id
  if (obj?.__v !== undefined) {
    delete obj.__v
  }
  if (obj?._id !== undefined) {
    delete obj._id
  }
  return obj
}

export const mapMongoArrayToJson = (arr: any[]) => {
  if (arr == null) {
    return arr
  }
  return arr.map((item) => mapMongoObjectToJson(item))
}
