import React from 'react'
import { useJsonStoreContext } from './JsonStoreContext.tsx'
import { AddSchemaDialogButton } from '~/components/AddSchemaDialogButton.tsx'
import { toast } from 'react-toastify'

const AddSchema = () => {
  const { api } = useJsonStoreContext()

  const handleSubmit = async (data: any) => {
    console.log('submit new schema', data)

    await api
      .updateObjectSchema(data.schemaId, data.schemaJson)
      .then(() => {
        console.log('Added schema', data.schemaId)
        toast.success('Added schema ' + data.schemaId)
      })
      .catch((err) => {
        console.error('Failed to add schema', data.schemaId, err)
        toast.error('Failed to add schema ' + data.schemaId)
      })
  }

  return (
    <div>
      <AddSchemaDialogButton
        dialogProps={{ fullScreen: true }}
        label={'Add Schema'}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default AddSchema
