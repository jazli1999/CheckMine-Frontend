import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme'

import './index.css';
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
