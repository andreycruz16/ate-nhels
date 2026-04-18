import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { menuContent } from './features/menu/data/menuContent'
import './index.css'

document.title = menuContent.browserTitle

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
