import React from 'react'
import { ToastContainer } from 'react-toastify'
import { CssBaseline } from '@mui/material'
import { Index } from '~/components/Index.tsx'
import AppLayout from '~/AppLayout.tsx'
import { JsonStoreContextProvider } from '~/components/JsonStoreContext.tsx'

export function App({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <JsonStoreContextProvider apiBaseUrl={baseUrl}>
        <AppLayout>
          <Index />
        </AppLayout>
        <ToastContainer position={'bottom-left'} pauseOnFocusLoss={false} pauseOnHover={false} />
      </JsonStoreContextProvider>
    </>
  )
}
