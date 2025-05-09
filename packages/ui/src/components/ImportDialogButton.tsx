import * as React from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { AppBar, Button, ButtonProps, Chip, DialogActions } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export interface ImportDialogButtonProps {
  open?: boolean
  label?: string
  onClose?: () => void
  onSubmit?: (data: any) => Promise<void>
  dialogProps?: Partial<DialogProps>
  buttonProps?: ButtonProps
}

export const ImportDialogButton = ({
  open: initialOpen,
  label,
  onClose,
  onSubmit,
  dialogProps,
  buttonProps,
}: ImportDialogButtonProps) => {
  const [importDataStr, setImportDataStr] = React.useState('')
  const [open, setOpen] = React.useState(initialOpen || false)
  const [error, setError] = React.useState<string | null>(null)

  const importData = React.useMemo(() => {
    try {
      if (!importDataStr) {
        setError(null)
        return null
      }

      const data = JSON.parse(importDataStr)
      setError(null)
      return data
    } catch (err) {
      console.log('Invalid JSON', err)
      setError('Invalid JSON')
      return null
    }
  }, [importDataStr])

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setOpen(false)
  }

  const handleSubmit = () => {
    if (!importData) {
      setError('No import data')
      return
    }

    if (onSubmit) {
      onSubmit(importData)
        .then(handleClose)
        .catch((err) => {
          console.error('Failed to import', err)
          throw err
        })
    } else {
      console.warn('No submit handler provided')
    }
  }

  return (
    <React.Fragment>
      <Button variant={'contained'} onClick={() => setOpen(true)} {...buttonProps}>
        {label || 'Import'}
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
          <textarea
            rows={20}
            style={{ width: '100%' }}
            value={importDataStr}
            onChange={(e) => setImportDataStr(e.currentTarget.value)}
          ></textarea>

          {importData && Array.isArray(importData) && (
            <div style={{ maxHeight: '500px', overflow: 'auto' }}>
              <h6>Found Import Data</h6>
              {importData.map((item, i) => (
                <div key={i}>
                  {item.namespace} - SchemaId:{item?.schemaId} - Len:
                  {JSON.stringify(item?.data)?.length}
                  {/*<pre>{JSON.stringify(item, null, 2)}</pre>*/}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant={'contained'} color={'error'}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant={'contained'}
            color={'primary'}
            disabled={!importData}
          >
            {label || 'Import'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
