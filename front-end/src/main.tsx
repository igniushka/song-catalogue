import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PageNotFound from './page/NotFound.tsx'
import {Register} from './page/Register.tsx'
import {Login} from './page/Login.tsx'

const [user, setUser] = useState<User | null>(null);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <PageNotFound/>
  },
  {
    path: '/register',
    element: <Register/>,
  },
  {
    path: '/login',
    element: <Login user={user} setUser={setUser}/>,
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
