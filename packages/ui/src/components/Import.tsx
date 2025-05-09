import React from 'react'
import { toast } from 'react-toastify'
import { ImportDialogButton } from './ImportDialogButton'
import { useJsonStoreContext } from './JsonStoreContext.tsx'

const Import = () => {
  const { api } = useJsonStoreContext()

  const importItem = async (item: any) => {
    console.log('Importing', item)
    if (!item) {
      console.error('No item to import')
      return
    } else if (!item.namespace) {
      console.error('No namespace to import')
      return
    } else if (!item.data) {
      console.error('No data to import')
      return
    }

    await api
      .updateObject(item.namespace, item.data, item?.schemaId)
      .then(() => {
        console.log('Imported', item.namespace)
      })
      .catch((err) => {
        console.error('Failed to import', item.namespace, err)
      })
  }

  const handleSubmit = async (data: any[]) => {
    console.log('Importing ' + data.length + ' items')

    const promises = data.map(async (item) => await importItem(item))
    await toast.promise(Promise.all(promises), {
      pending: 'Importing ' + data.length + ' items',
      success: 'Imported ' + data.length + ' items',
      error: 'Failed to import',
    })

    // Promise.all(promises)
    //   .then(() => {
    //     toast.success('Imported ' + data.length + ' items')
    //   })
    //   .catch((err) => {
    //     console.error('Failed to import', err)
    //     toast.error('Failed to import')
    //   })
  }

  return (
    <div>
      <ImportDialogButton
        dialogProps={{ fullScreen: true }}
        label={'Import'}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Import
