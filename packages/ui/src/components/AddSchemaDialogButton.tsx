import * as React from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { AppBar, Button, ButtonProps, Chip, DialogActions } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export interface AddSchemaDialogButtonProps {
  open?: boolean
  label?: string
  onClose?: () => void
  onSubmit?: (data: any) => Promise<void>
  dialogProps?: Partial<DialogProps>
  buttonProps?: ButtonProps
}

export const AddSchemaDialogButton = ({
  open: initialOpen,
  label,
  onClose,
  onSubmit,
  dialogProps,
  buttonProps,
}: AddSchemaDialogButtonProps) => {
  const [open, setOpen] = React.useState(initialOpen || false)
  const [error, setError] = React.useState<string | null>(null)

  const [schemaId, setSchemaId] = React.useState('')
  const [schemaContentStr, setSchemaContentStr] = React.useState('')

  const schemaJson = React.useMemo(() => {
    try {
      if (!schemaContentStr) {
        setError(null)
        return null
      }

      // if (schemaContentStr.startsWith('http')) {
      //   console.log('Fetching schema from URL', schemaContentStr)
      //   const response = await fetch(schemaContentStr)
      //   if (!response.ok) {
      //     setError('Failed to fetch schema')
      //     return null
      //   }
      //   const data = await response.json()
      //   setError(null)
      //   return data
      // }

      const data = JSON.parse(schemaContentStr)
      setError(null)
      return data
    } catch (err) {
      console.log('Invalid JSON', err)
      setError('Invalid JSON')
      return null
    }
  }, [schemaContentStr, setError])

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setOpen(false)
  }

  const handleSubmit = () => {
    if (!schemaJson) {
      setError('No addSchema data')
      return
    }

    if (onSubmit) {
      onSubmit({ schemaId, schemaJson })
        .then(handleClose)
        .catch((err) => {
          console.error('Failed to addSchema', err)
          throw err
        })
    } else {
      console.warn('No submit handler provided')
    }
  }

  return (
    <React.Fragment>
      <Button variant={'contained'} onClick={() => setOpen(true)} {...buttonProps}>
        {label || 'Add Schema'}
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
              name={'schemaId'}
              placeholder={'schemaId'}
              value={schemaId}
              onChange={(e) => setSchemaId(e.currentTarget.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <textarea
              rows={20}
              style={{ width: '100%' }}
              value={schemaContentStr}
              onChange={(e) => setSchemaContentStr(e.currentTarget.value)}
            ></textarea>
          </div>

          <hr />

          {schemaId && <pre>SchemaId: {schemaId}</pre>}
          {schemaJson && <pre>{JSON.stringify(schemaJson, null, 2)}</pre>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant={'contained'} color={'error'}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant={'contained'}
            color={'primary'}
            disabled={!schemaJson}
          >
            {label || 'AddSchema'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
