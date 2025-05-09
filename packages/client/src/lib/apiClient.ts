import { AxiosInstance, AxiosResponse } from 'axios'
import { JsonStoreApiClient, ObjectRecord, ObjectSchema } from '~/types.ts'

//////////////////
// CONFIGURATION API
//////////////////

export const apiClient = (http: AxiosInstance): JsonStoreApiClient => {
  const listObjectNamespaces = async (prefix: string): Promise<string[]> => {
    return http
      .get(`/object/namespaces/?prefix=${prefix}`)
      .then((response: AxiosResponse<string[]>) => response.data)
  }

  const listObjectNamespaceKeys = async (namespace: string): Promise<string[]> => {
    return http
      .get(`/object/keys/?namespace=${namespace}`)
      .then((response: AxiosResponse<string[]>) => response.data)
  }

  // const getObjectValues = async (namespace: string) => {
  //     return objectHttp
  //         .get(`/object/values/?namespace=${namespace}`)
  //         .then((response: AxiosResponse<object>) => response.data);
  // };
  //
  // const updateObjectValues = async (namespace: string, values: any, schemaId?: string) => {
  //     return objectHttp
  //         .post(`/object/values/?namespace=${namespace}&schemaId=${schemaId || ""}`, values)
  //         .then((response: AxiosResponse<object>) => response.data);
  // };

  const getObject = async (namespace: string): Promise<ObjectRecord> => {
    return http
      .get(`/object/?namespace=${namespace}`)
      .then((response: AxiosResponse<ObjectRecord>) => response.data)
  }

  const updateObject = async (
    namespace: string,
    values: any,
    schemaId?: string,
  ): Promise<ObjectRecord> => {
    return http
      .post(`/object/?namespace=${namespace}`, {
        schemaId: schemaId || null,
        values: values,
      })
      .then((response: AxiosResponse<ObjectRecord>) => response.data)
  }

  const listObjectSchemas = async (): Promise<string[]> => {
    return http
      .get(`/object/schema/index`)
      .then((response: AxiosResponse<string[]>) => response.data)
  }

  const getObjectSchema = async (schemaId: string): Promise<ObjectSchema> => {
    return http
      .get(`/object/schema/?schemaId=${schemaId}`)
      .then((response: AxiosResponse<ObjectSchema>) => response.data)
  }

  const updateObjectSchema = async (schemaId: string, schemaJson: any): Promise<ObjectSchema> => {
    return http
      .post(`/object/schema/?schemaId=${schemaId}`, schemaJson)
      .then((response: AxiosResponse<ObjectSchema>) => response.data)
  }

  // const getJsonObjectSchema = async (schemaName: string) => {
  //   return objectHttp
  //     .get(`/object/schema/${schemaName}?v=2`)
  //     .then((response: AxiosResponse<any>) => response.data)
  // }
  //
  // const getJsonObjectValues = async (schemaName: string, namespace: string) => {
  //   return objectHttp
  //     .get(`/object/values/?namespace=${namespace}&schemaId=${schemaName}`)
  //     .then((response: AxiosResponse<any>) => response.data)
  // }
  //
  // const updateJsonObjectValues = async (schemaName: string, namespace: string, values: any) => {
  //   return objectHttp
  //     .post(`/object/values/?namespace=${namespace}&schemaId=${schemaName}`, values)
  //     .then((response: AxiosResponse<any>) => response.data)
  // }
  //
  // const getJsonObjectObject = async (namespace: string, schemaName: string) => {
  //   return objectHttp
  //     .get(`/object/object/?namespace=${namespace}&schemaId=${schemaName}`)
  //     .then((response: AxiosResponse<any>) => response.data)
  // }
  //
  // const updateJsonObjectObject = async (namespace: string, schemaName: string, object: any) => {
  //   return objectHttp
  //     .post(`/object/object/?namespace=${namespace}&schemaId=${schemaName}`, object)
  //     .then((response: AxiosResponse<any>) => response.data)
  // }

  // const getVaultObject = async (namespace: string, schemaName: string, decrypt: boolean) => {
  //   return objectHttp
  //     .get(`/object/vault/?namespace=${namespace}&d=${decrypt ? 1 : 0}&schemaId=${schemaName}`)
  //     .then((response: AxiosResponse<any>) => response.data)
  // }
  //
  // const updateVaultObject = async (namespace: string, schemaName: string, object: any) => {
  //   return objectHttp
  //     .post(`/object/vault/?namespace=${namespace}&schemaId=${schemaName}`, object)
  //     .then((response: AxiosResponse<any>) => response.data)
  // }

  // const getObjectNamespace = async (namespace: string) => {
  //   return objectHttp
  //     .get(`/object/nodes/?namespace=${namespace}`)
  //     .then((response: AxiosResponse<any>) => response.data)
  // }

  return {
    listObjectNamespaces,
    listObjectNamespaceKeys,
    // getObjectValues,
    // updateObjectValues,
    getObject,
    updateObject,

    listObjectSchemas,
    getObjectSchema,
    updateObjectSchema,
  }
}
