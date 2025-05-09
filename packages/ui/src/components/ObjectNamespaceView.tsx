import React from 'react'
import RJSFForm from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import { ObjectValuesView } from '~/components/ObjectValues.view.tsx'
import { ObjectValuesRawEditor } from '~/components/ObjectValuesRawEditor.tsx'
import { useJsonStoreContext } from '~/components/JsonStoreContext.tsx'
import { BasicTabItem, BasicTabs } from '~/components/BasicTabs.tsx'
import { RJSFSchema } from '@rjsf/utils'

export const ObjectNamespaceView = ({
  namespace,
  schemaId,
}: {
  namespace: string
  schemaId?: string
}) => {
  const { api: api } = useJsonStoreContext()

  const [objectValues, setObjectValues] = React.useState<object>({})
  const [objectSchemaId, setObjectSchemaId] = React.useState<string | undefined>(schemaId)
  const [objectSchema, setObjectSchema] = React.useState({})
  const [compiledSchema, setCompiledSchema] = React.useState<RJSFSchema | undefined>(undefined)

  // const namespaceValues = React.useMemo(() => {
  //   if (!data) {
  //     return {}
  //   }
  //
  //   // sort object by keys
  //   const keys = Object.keys(data).sort()
  //   const sortedData: Record<string, string> = {}
  //   keys.forEach((key) => {
  //     sortedData[key] = data[key]
  //   })
  //   return sortedData
  // }, [data])

  // const compiledSchema = React.useMemo(async () => {
  //   if (!objectSchema) {
  //     return {}
  //   }
  //
  //   // const ajv = new Ajv()
  //   // const validate = ajv.compile(objectSchema)
  //   // console.log('validate', validate)
  //   // return validate.schema
  // }, [objectSchema])

  const fetchNamespaceValues = React.useCallback(async () => {
    if (!namespace) {
      return
    }

    const object = await api.getObject(namespace)
    console.log('retrieved object', namespace, object)
    const values = object.values
    const schemaId = object?.schemaId
    // if (data && data['.schemaId']) {
    //   schemaId = data['.schemaId']
    //   delete data['.schemaId']
    // }
    setObjectValues(values)
    setObjectSchemaId(schemaId)

    if (schemaId) {
      console.log('Found schemaId', schemaId)
      //const schemaUrl = '/schema/' + schemaId + '.schema.json'
      //fetchSchema(schemaUrl)
      const schema = await api.getObjectSchema(schemaId).catch((err) => {
        console.error('Failed to fetch schema', err)
      })

      if (!schema) {
        setObjectSchema({})
        return
      }
      console.log('schema', schema)
      setObjectSchema(schema.schemaJson)
    }
  }, [namespace, api, setObjectValues, setObjectSchema])

  const submitNamespaceValues = React.useCallback(
    async (values) => {
      console.log('submitNamespaceValues', namespace, values)
      api.updateObject(namespace, values, objectSchemaId).then((object) => {
        console.log('updated', object)
        setObjectValues(object.values)
      })
    },
    [namespace, api, objectSchemaId, setObjectValues],
  )

  React.useEffect(() => {
    fetchNamespaceValues()
    //fetchNamespaceMeta()
  }, [fetchNamespaceValues])

  // React.useEffect(() => {
  //   if (!objectSchema) {
  //     return
  //   }
  //
  //   $RefParser.dereference(objectSchema).then((clonedSchema) => {
  //     console.log('dereferenced schema', clonedSchema)
  //     setCompiledSchema(clonedSchema as RJSFSchema)
  //   })
  // }, [compiledSchema])

  const tabs = React.useMemo(() => {
    const tabs: BasicTabItem[] = []

    const ValuesTab = () => {
      return (
        <>
          {objectValues && <ObjectValuesView values={objectValues} />}
          {/*<h4>Meta</h4>*/}
          {/*namespaceMeta && <ObjectValuesView values={namespaceMeta} />*/}
        </>
      )
    }
    const RawEditorTab = () => {
      return (
        <>
          <ObjectValuesRawEditor
            namespace={namespace}
            initialValues={objectValues}
            onUpdate={submitNamespaceValues}
          />
        </>
      )
    }

    const RJSFFormTab = () => {
      if (!objectSchema) {
        return <div>No schema</div>
      }

      return (
        <>
          <RJSFForm
            formData={objectValues}
            schema={objectSchema}
            validator={validator}
            onChange={({ formData }) => console.log('onChange', formData)}
            onSubmit={({ formData }) => submitNamespaceValues(formData)}
            onError={(err) => console.log('error', err)}
          />
        </>
      )
    }

    // const SchemaFormTab = () => {
    //   if (!namespaceSchema) {
    //     return <div>No schema</div>
    //   }
    //   return (
    //     <>
    //       <JsonConfEditor
    //         controlRenderer={JsonConfMuiFormRenderer}
    //         schema={namespaceSchema}
    //         values={namespaceValues}
    //         onFormSubmit={(values) => submitNamespaceValues(values as any)}
    //       />
    //     </>
    //   )
    // }

    const ExportTab = () => {
      const exportData = {
        namespace: namespace,
        schemaId: objectSchemaId,
        data: objectValues,
      }
      return (
        <>
          <textarea
            style={{ width: '100%', height: '100%' }}
            rows={15}
            defaultValue={JSON.stringify(exportData, null, 2)}
          />
        </>
      )
    }

    tabs.push({ label: 'Data', children: <ValuesTab /> })
    tabs.push({ label: 'Editor', children: <RawEditorTab /> })
    //tabs.push({ label: 'SchemaForm', children: <SchemaFormTab /> })
    tabs.push({ label: 'RJSFForm', children: <RJSFFormTab /> })
    tabs.push({ label: 'Export', children: <ExportTab /> })

    return tabs
  }, [namespace, objectValues, objectSchema, submitNamespaceValues])

  return (
    <>
      <div>Namespace: {namespace}</div>
      <div>Schema: {objectSchemaId}</div>
      <BasicTabs items={tabs} />
    </>
  )
}
