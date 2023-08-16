import Login from "../Pages/Login/Login";
import React from "react";
import Home from "../Pages/Home/Home";

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
        element: <Home />,
        title: 'Home'
    }
]