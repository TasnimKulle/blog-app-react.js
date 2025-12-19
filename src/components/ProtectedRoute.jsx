import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router';

export const ProtectedRoute = ({children, redirectTo='/signin'}) => {
    const { isLoggedIn, isLoading }=useAuth();
    if(isLoading){
        <div className='min-h-screen flex items-center justify-center'>
            <div className='animate-spin rounded-full h-12 w-12  border-t-2 border-b-2 border-orange-500'></div>
        </div>
    }
    if(!isLoggedIn){
        return <Navigate to={redirectTo} replace/>
    }
  return children
}
