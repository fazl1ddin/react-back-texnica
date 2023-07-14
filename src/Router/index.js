import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";

export const public_routes = createBrowserRouter([
    {
        path: '*',
        element: <div>404</div>,
        loader: undefined,
        
    },
    {
        path: '/',
        element: <Login />,
        loader: undefined,
    }
])