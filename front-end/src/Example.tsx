import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Example.css'
import { Navigate } from 'react-router-dom';

function Example() {
  const [count, setCount] = useState(0);
  return <Navigate to="/login" />

}

export default Example
