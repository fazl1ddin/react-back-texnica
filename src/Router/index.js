import Login from "../Pages/Login/Login";
import React from "react";
import Orders from "../Pages/Orders/Orders";

export const public_routes = [
    {
        path: '*',
        element: <div>404</div>
        
    },
    {
        path: '/',
        element: <Login/>
    }
]

export const private_routes = [
    {
        path: '/',
        element: <Orders />,
        title: 'Orders'
    }
]