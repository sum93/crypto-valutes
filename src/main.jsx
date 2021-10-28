import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { CoinsProvider } from './hooks/useCoins'
import './styles/index.css'

ReactDOM.render(
  <React.StrictMode>
    <CoinsProvider>
      <App />
    </CoinsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
