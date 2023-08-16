import { Layout } from "antd";
import { useLayoutEffect, useState } from "react";
import "./App.css";
import { private_routes, public_routes } from "./Router";
import { storeUser } from "./Store";
import BaseLoader from "./Components/Loaders/BaseLoader";
import {
  Link,
  Route,
  Routes,
} from "react-router-dom";
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
          width={"100%"}
          height={"100vh"}
          circlewidth={200}
          circleHeight={200}
        />
      ) : user === undefined ? (
        <Routes>
          {public_routes.map((item, index) => (
            <Route key={index} element={item.element} path={item.path}></Route>
          ))}
        </Routes>
      ) : (
        <Layout>
          <Layout.Sider className="fixed left-0 top-0 h-full" width={"24rem"}>
            {private_routes.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-white p-2 text-2xl"
              >
                {item.title}
              </Link>
            ))}
          </Layout.Sider>
          <Layout.Content className="ml-96 p-2 h-screen">
            <Routes>
              {private_routes.map((item, index) => (
                <Route key={index} element={item.element} path={item.path}></Route>
              ))}
            </Routes>
          </Layout.Content>
        </Layout>
      )}
    </>
  );
}

export default App;
