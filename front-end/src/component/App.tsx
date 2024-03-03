import { useState } from 'react'
import Example from '../Example.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PageNotFound from '../page/NotFound.tsx'
import {Register} from '../page/Register.tsx'
import {Login} from '../page/Login.tsx'
import { HomePage } from '../page/Homepage.tsx'


export const App = ()  => {
    const [user, setUser] = useState<User>({});

    return <RouterProvider router={createBrowserRouter([
    {
      path: '/',
      element: <Example/>,
      errorElement: <PageNotFound/>
    },
    {
      path: '/register',
      element: <Register user={user} setUser={setUser}/>,
    },
    {
      path: '/login',
      element: <Login user={user} setUser={setUser}/>,
    },
    {
        path: '/catalogue',
        element: <HomePage user={user} setUser={setUser}/>,
      }

    
  ])}/>
}