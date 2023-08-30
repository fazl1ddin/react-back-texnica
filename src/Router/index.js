import Login from "../Pages/Login/Login";
import React from "react";
import Products from "../Pages/Products/products";
import Orders from "../Pages/Orders/orders";

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
    },
    {
        path: "/products",
        element: <Products />,
        title: "Products"
    }
]