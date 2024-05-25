import React from 'react'
import Login from './Login'
import Browse from './Browse'
import NotFound from './NotFound';
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login/> 
        },
        {
            path: "/browse",
            element: <Browse/>
        },
        {
            path: '*', // This acts as a catch-all for any undefined routes
            element: <NotFound />,
        },
    ])
    
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body