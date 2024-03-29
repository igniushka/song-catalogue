import Example from '../Example.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageNotFound from '../page/NotFound.tsx'
import { Register } from '../page/Register.tsx'
import { Login } from '../page/Login.tsx'
import { HomePage } from '../page/Homepage.tsx'


export const App = () => {

  return <RouterProvider router={createBrowserRouter([
    {
      path: '/',
      element: <Example />,
      errorElement: <PageNotFound />
    },
    {
      path: '/register',
      element: <Register/>,
    },
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/catalogue',
      element: <HomePage/>,
    }


  ])} />
}