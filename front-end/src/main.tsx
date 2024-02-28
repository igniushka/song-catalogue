import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './component/App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PageNotFound from './page/NotFound.tsx'
import {Register} from './page/Register.tsx'
import {Login} from './page/Login.tsx'

// const [user, setUser] = useState<User>({});



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
