import React from 'react'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import SyncIcon from '@mui/icons-material/Sync'
import { useJsonStoreContext } from './JsonStoreContext.tsx'
import { Container } from '@mui/material'
import { ObjectNamespaceView } from './ObjectNamespaceView.tsx'

export const Index = () => {
  const { api } = useJsonStoreContext()
  const [namespaces, setNamespaces] = React.useState<string[]>([])
  const [schemaIds, setSchemaIds] = React.useState<string[]>([])
  const [selectedNamespace, setSelectedNamespace] = React.useState<string>('')
  const rootNode = ''

  const fetchNamespaces = React.useCallback(() => {
    api.listObjectNamespaces(rootNode).then((data) => {
      setNamespaces(data)
    })
  }, [api, rootNode])

  const fetchSchemaList = React.useCallback(() => {
    api.listObjectSchemas().then((data) => {
      setSchemaIds(data)
    })
  }, [api, rootNode])

  React.useEffect(() => {
    fetchNamespaces()
    fetchSchemaList()
  }, [])

  const colStyle = {
    height: '100%',
    //flexGrow: '1',
    //backgroundColor: '#fefefe',
  }

  const headerStyle = { fontWeight: 'bold', textDecoration: 'underline' }

  return (
    <Container maxWidth={false}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          //justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            ...colStyle,
            //backgroundColor: '#fefefe',
            overflowY: 'scroll',
            flexBasis: '20%',
          }}
        >
          <div style={{ ...headerStyle }}>
            Namespaces{' '}
            <IconButton onClick={() => fetchNamespaces()}>
              <SyncIcon fontSize={'small'} />
            </IconButton>
          </div>
          {namespaces &&
            namespaces.map((namespace: string) => {
              const parts = namespace.split('/')
              const lastPart = parts[parts.length - 1]
              if (lastPart.startsWith('.')) {
                return null
              }

              return (
                <div key={namespace}>
                  <span
                    style={{ fontWeight: selectedNamespace === namespace ? 'bold' : 'normal' }}
                    onClick={() => {
                      setSelectedNamespace(namespace)
                    }}
                  >
                    {namespace}
                  </span>
                </div>
              )
            })}

          <div style={{ ...headerStyle }}>
            Schemas{' '}
            <IconButton onClick={() => fetchSchemaList()}>
              <SyncIcon fontSize={'small'} />
            </IconButton>
          </div>
          {schemaIds &&
            schemaIds.map((schemaId: string) => {
              return (
                <div key={schemaId}>
                  <span>{schemaId}</span>
                  <span>
                    <IconButton>
                      <AddIcon fontSize={'small'} />
                    </IconButton>
                  </span>
                </div>
              )
            })}
        </div>

        {selectedNamespace && (
          <div
            style={{
              ...colStyle,
              flexBasis: '80%',
              //backgroundColor: 'rgba(104,137,181,0.45)',
              overflowY: 'scroll',
            }}
          >
            <ObjectNamespaceView namespace={selectedNamespace} />
          </div>
        )}
      </div>
    </Container>
  )
}
