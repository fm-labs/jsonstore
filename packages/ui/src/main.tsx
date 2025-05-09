import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '~/App.tsx'
import { JSONSTORE_API_BASEURL } from '~/constants.ts'
import './main.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App baseUrl={JSONSTORE_API_BASEURL} />
  </React.StrictMode>,
)
