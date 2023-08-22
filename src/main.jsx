import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodoPage } from './pages/todo'
// https://ramble.impl.co.jp/1414/#:~:text=logo.svg%27%3B-,import%20%27./App.css%27%3B,-function%20App(
import "./index.css"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoPage />
  </React.StrictMode>,
)
