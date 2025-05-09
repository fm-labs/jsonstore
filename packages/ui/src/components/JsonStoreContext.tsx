import React, { PropsWithChildren } from 'react'
import { apiHttpClient, apiClient } from '@jsonstore/client'
import type { JsonStoreApiClient } from '@jsonstore/client'

type JsonStoreContextType = {
  api: JsonStoreApiClient
}

const JsonStoreContext = React.createContext<JsonStoreContextType | undefined>(undefined)

interface JsonStoreContextProviderProps extends PropsWithChildren {
  apiBaseUrl: string
}

export const JsonStoreContextProvider = ({
  children,
  apiBaseUrl,
}: JsonStoreContextProviderProps) => {
  const http = apiHttpClient(apiBaseUrl)
  const api = apiClient(http)
  const context = { api }
  return <JsonStoreContext.Provider value={context}>{children}</JsonStoreContext.Provider>
}

export const useJsonStoreContext = () => {
  const context = React.useContext(JsonStoreContext)
  if (context === undefined) {
    throw new Error('useObjectContext must be used within a ObjectContextProvider')
  }
  return context
}
