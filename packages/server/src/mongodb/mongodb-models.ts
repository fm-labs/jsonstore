import mongoose from 'mongoose'

// Mongoose Model Schemas
export const ObjectRecordModelSchema = new mongoose.Schema({
  namespace: { type: String, required: true, unique: true },
  schemaId: { type: String, required: false, default: null },
  values: mongoose.Schema.Types.Mixed,
})

export const ObjectSchemaModelSchema = new mongoose.Schema({
  schemaId: { type: String, required: true, unique: true },
  schemaJson: mongoose.Schema.Types.Mixed,
})

// Mongoose Models
export const ObjectRecordModel = mongoose.model('ObjectRecord', ObjectRecordModelSchema, 'objects')

export const ObjectSchemaModel = mongoose.model('ObjectSchema', ObjectSchemaModelSchema, 'schemas')
