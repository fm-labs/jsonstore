export type ObjectRecord<T = any> = {
  namespace: string
  schemaId?: string
  values: T
}

export type ObjectSchema = {
  schemaId: string
  schemaJson: object
}

export interface JsonStoreApiClient {
  listObjectNamespaces: (prefix: string) => Promise<string[]>
  listObjectNamespaceKeys: (namespace: string) => Promise<string[]>

  // getObjectValues: (namespace: string) => Promise<any>
  // updateObjectValues: (namespace: string, values: any, schemaName?: string) => Promise<any>

  getObject: (namespace: string) => Promise<ObjectRecord>
  updateObject: (namespace: string, values: object, schemaId?: string) => Promise<ObjectRecord>

  listObjectSchemas: () => Promise<string[]>
  getObjectSchema: (schemaId: string) => Promise<ObjectSchema>
  updateObjectSchema: (schemaId: string, schemaJson: object) => Promise<ObjectSchema>
}
