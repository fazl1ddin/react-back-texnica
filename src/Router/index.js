import { createBrowserRouter, defer } from "react-router-dom";
import Login from "../Pages/Login/Login";
import { storeUser } from "../Store";
import { UserMe } from "../Store/user";

export const public_routes = createBrowserRouter([
    {
        path: '*',
        element: <div>404</div>,
        loader: undefined,
        
    },
    {
        path: '/',
        element: <Login />,
        loader: async () => {
            if (document.cookie.includes('token')) {
                console.log('1');
                return defer({data: storeUser.dispatch(UserMe())})
            }
            return null
        },
    }
])