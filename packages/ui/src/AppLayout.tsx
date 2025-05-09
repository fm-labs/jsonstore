import React, { PropsWithChildren } from 'react'
import Toolbar from '@mui/material/Toolbar'
import { CssBaseline } from '@mui/material'
import Import from '~/components/Import.tsx'
import AddObject from '~/components/AddObject.tsx'
import AddSchema from '~/components/AddSchema.tsx'

const JsonStoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CssBaseline />
      <Toolbar>
        <div style={{ flexGrow: 1 }}>JsonStore</div>
        <Import />
        <AddObject />
        <AddSchema />
      </Toolbar>
      {children}
    </>
  )
}

export default JsonStoreLayout
