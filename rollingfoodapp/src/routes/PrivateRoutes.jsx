import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext';

export const PrivateRoutes = ({ children }) => {
    // const {user} = useContext(DataContext);
  const user = {}
  return (
        user ? children : <Navigate to='login' replace/>
  )
}
