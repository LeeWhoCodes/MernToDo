import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './output.css'
import App from './App.jsx'
import ToDoList from './ToDoList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToDoList />
    <div className='text-center text-red-500'>
      Hello, Tailwind
    </div>
    <div className='text-center text-yellow-500'>
      This is green
    </div>
    <App />
  </StrictMode>,
)
