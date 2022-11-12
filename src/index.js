import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'
import WindowClose from './components/WindowClose'

ReactDOM.render(
  <React.StrictMode>
    <WindowClose />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
