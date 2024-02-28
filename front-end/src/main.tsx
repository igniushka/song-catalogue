import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PageNotFound from './pages/NotFound.tsx'
import RegisterLogin from './pages/RegisterLogin.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <PageNotFound/>
  },
  {
    path: '/register',
    element: <RegisterLogin/>,
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
