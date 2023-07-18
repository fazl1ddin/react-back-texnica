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
  const [first, setFirst] = useState(false)

  storeUser.subscribe(() => {
    const { user, loading } = storeUser.getState();
    setLoading(loading);
    setUser(user);
  });

  console.log(user, loading);

  useLayoutEffect(() => {
    if (first === false) {
      console.log(first);
      (async () => {
        if (Cookies.get("token")) await storeUser.dispatch(UserMe());
      })();
    }
    setFirst(true)
  }, []);

  return (
    <>
      {loading ? (
        <BaseLoader
          width={"100%"}
          height={"100vh"}
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
