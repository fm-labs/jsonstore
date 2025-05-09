import React from 'react'
import { useJsonStoreContext } from './JsonStoreContext.tsx'
import { AddObjectDialogButton } from '~/components/AddObjectDialogButton.tsx'
import { toast } from 'react-toastify'

const AddObject = () => {
  const { api } = useJsonStoreContext()

  const handleSubmit = async (object: any) => {
    console.log('submit new object', object)

    await api
      .updateObject(object.namespace, object.values, object.schemaId)
      .then(() => {
        console.log('Added object', object.objectId)
        toast.success('Added object ' + object.objectId)
      })
      .catch((err) => {
        console.error('Failed to add object', object.objectId, err)
        toast.error('Failed to add object ' + object.objectId)
      })
  }

  return (
    <div>
      <AddObjectDialogButton
        dialogProps={{ fullScreen: true }}
        label={'Add Object'}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default AddObject
