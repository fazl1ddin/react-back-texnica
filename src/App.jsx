import { Layout } from "antd";
import { useLayoutEffect, useState } from "react";
import "./App.css";
import { private_routes, public_routes } from "./Router";
import { storeUser } from "./Store";
import BaseLoader from "./Components/Loaders/BaseLoader";
import {
  NavLink,
  Outlet,
  Route,
  Routes
} from "react-router-dom";
import { UserMe } from "./Store/user";
import Cookies from "js-cookie";

// SSE
// async function getSt() {
//   storeStatistics.dispatch(setLoading(true));
//   const res = await instance({ url: "/statistics", method: "GET" });
//   storeStatistics.dispatch(setLoading(false));
//   if (res.data.success === 1) {
//     storeStatistics.dispatch(setStatistics(res.data.data));
//     await instance({ url: "/statistics", method: "POST" });
//     getSt();
//   }
// }

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  // const [statistics, setStatistics] = useState(undefined);
  // const [stLoading, setStLoading] = useState(true);

  // storeStatistics.subscribe(() => {
  //   const { statistics, loading } = storeStatistics.getState();
  //   setStatistics(statistics);
  //   setStLoading(loading);
  // });

  storeUser.subscribe(() => {
    const { user, loading } = storeUser.getState();
    setLoading(loading);
    setUser(user);
  });

  useLayoutEffect(() => {
    (async () => {
      if (Cookies.get("token")) await storeUser.dispatch(UserMe());
      // await getSt();
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
        <Routes>
          <Route
            path="/"
            element={
              <Layout className="h-full">
                <Layout.Sider
                  className="fixed left-0 top-0 h-full"
                  width={"12rem"}
                >
                  {private_routes.map((item, index) => item.noneMenu ? undefined : (
                    <NavLink
                      key={index}
                      to={item.path}
                      className={({ isActive }) =>
                        `text-white p-2 text-2xl block hover:bg-gray-400 ${
                          isActive ? "bg-gray-400" : ""
                        }`
                      }
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </Layout.Sider>
                <Layout.Content className="ml-48 bg-white p-2 h-full">
                  <Outlet />
                </Layout.Content>
              </Layout>
            }
          >
            {private_routes.map((item, index) => (
              <Route
                key={index}
                element={{
                  ...item.element,
                  props: { ...item.element.props, title: item.title },
                }}
                path={item.path}
              ></Route>
            ))}
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
