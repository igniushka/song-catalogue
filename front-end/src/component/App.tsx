import { useState } from 'react'
import Example from '../Example.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PageNotFound from '../page/NotFound.tsx'
import {Register} from '../page/Register.tsx'
import {Login} from '../page/Login.tsx'
import { Catalogue } from '../page/Catalogue.tsx'


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
      element: <Register/>,
    },
    {
      path: '/login',
      element: <Login user={user} setUser={setUser}/>,
    },
    {
        path: '/catalogue',
        element: <Catalogue user={user} setUser={setUser}/>,
      }

    
  ])}/>
}