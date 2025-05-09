import * as React from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { AppBar, Button, ButtonProps, Chip, DialogActions } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useJsonStoreContext } from '~/components/JsonStoreContext.tsx'
import type { ObjectRecord } from '@jsonstore/client'

export interface AddObjectDialogButtonProps {
  open?: boolean
  label?: string
  onClose?: () => void
  onSubmit?: (object: ObjectRecord) => Promise<void>
  dialogProps?: Partial<DialogProps>
  buttonProps?: ButtonProps
}

export const AddObjectDialogButton = ({
  open: initialOpen,
  label,
  onClose,
  onSubmit,
  dialogProps,
  buttonProps,
}: AddObjectDialogButtonProps) => {
  const { api } = useJsonStoreContext()

  const [open, setOpen] = React.useState(initialOpen || false)
  const [error, setError] = React.useState<string | null>(null)

  const [schemaIds, setSchemaIds] = React.useState<string[]>([])

  const [namespace, setNamespace] = React.useState('')
  const [schemaId, setSchemaId] = React.useState('')
  const [valuesStr, setValuesStr] = React.useState('{}')

  const valuesObj = React.useMemo(() => {
    try {
      if (!valuesStr) {
        setError(null)
        return null
      }

      const data = JSON.parse(valuesStr)
      setError(null)
      return data
    } catch (err) {
      console.log('Invalid JSON', err)
      setError('Invalid JSON')
      return null
    }
  }, [valuesStr, setError])

  const fetchSchemaList = React.useCallback(() => {
    api.listObjectSchemas().then((data) => {
      setSchemaIds(data)
    })
  }, [api])

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setOpen(false)
  }

  const handleSubmit = () => {
    if (!valuesObj) {
      setError('No addObject data')
      return
    }

    if (onSubmit) {
      onSubmit({ namespace: namespace, values: valuesObj, schemaId: schemaId })
        .then(handleClose)
        .catch((err) => {
          console.error('Failed to addObject', err)
          throw err
        })
    } else {
      console.warn('No submit handler provided')
    }
  }

  React.useEffect(() => {
    fetchSchemaList()
  }, [fetchSchemaList])

  return (
    <React.Fragment>
      <Button variant={'contained'} onClick={() => setOpen(true)} {...buttonProps}>
        {label || 'Add Object'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={false}
        fullWidth={true}
        maxWidth={'md'}
        {...dialogProps}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              {label}
            </Typography>
            {/*<Button autoFocus color='inherit' onClick={onClose}>
              save
            </Button>*/}
            <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <DialogContent>
          {error && <Chip label={error} color={'error'}></Chip>}

          <div>
            <input
              name={'namespace'}
              placeholder={'namespace'}
              value={namespace}
              onChange={(e) => setNamespace(e.currentTarget.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            {schemaIds && (
              <select onChange={(e) => setSchemaId(e.currentTarget.value)} value={schemaId}>
                <option value={''}>No schema</option>
                {schemaIds.map((schemaId) => (
                  <option key={schemaId} value={schemaId}>
                    {schemaId}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <textarea
              rows={20}
              style={{ width: '100%' }}
              value={valuesStr}
              onChange={(e) => setValuesStr(e.currentTarget.value)}
            ></textarea>
          </div>

          <hr />

          {namespace && <pre>ObjectId: {namespace}</pre>}
          {valuesObj && <pre>{JSON.stringify(valuesObj, null, 2)}</pre>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant={'contained'} color={'error'}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant={'contained'}
            color={'primary'}
            disabled={!valuesObj}
          >
            {label || 'AddObject'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
