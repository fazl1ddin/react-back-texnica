import { Layout } from "antd";
import { useLayoutEffect, useState } from "react";
import "./App.css";
import { private_routes, public_routes } from "./Router";
import { storeUser } from "./Store";
import BaseLoader from "./Components/Loaders/BaseLoader";
import { RouterProvider } from "react-router-dom";
import { UserMe } from "./Store/user";
import Cookies from "js-cookie";

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);

  storeUser.subscribe(() => {
    const { user, loading } = storeUser.getState();
    setLoading(loading);
    setUser(user);
  });

  useLayoutEffect(() => {
    (async () => {
      if (Cookies.get("token")) await storeUser.dispatch(UserMe());
    })();
  }, []);

  return (
    <>
      {loading ? (
        <BaseLoader
          width={"10%"}
          height={"10vh"}
          circlewidth={200}
          circleHeight={200}
        />
      ) : user === undefined ? (
        <RouterProvider router={public_routes} />
      ) : (
        <Layout>
          <Layout.Sider
            className="fixed left-0 top-0 h-full"
            width={"24rem"}
          ></Layout.Sider>
          <Layout.Content className="ml-96 p-2 h-screen">
            <RouterProvider router={private_routes} />
          </Layout.Content>
        </Layout>
      )}
    </>
  );
}

export default App;
