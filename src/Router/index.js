import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import React from "react";
import Home from "../Pages/Home/Home";

export const public_routes = createBrowserRouter([
    {
        path: '*',
        element: <div>404</div>
        
    },
    {
        path: '/',
        element: <Login/>
    }
])

export const private_routes = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    }
])