import { Layout } from 'antd';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { public_routes } from './Router';
import { storeUser } from './Store';
import BaseLoader from './Components/Loaders/BaseLoader';

function App() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()

  storeUser.subscribe(() => {
    const {user, loading} = storeUser.getState()
    setLoading(loading)
    setUser(user)
  })

  return <>
    {
      loading ? <BaseLoader width={'100%'} height={'100vh'} circlewidth={200} circleHeight={200}/> : null
    }
    <div className={loading ? "hidden" : ""}>
      {
        user === undefined ? 
        <div className="App">
          <RouterProvider router={public_routes}/>
        </div> :
        <Layout>
            <Layout.Header>
              header
              <BaseLoader width={400} height={ 400} />
          </Layout.Header>
          <Layout>
            <Layout.Sider>left sidebar</Layout.Sider>
            <Layout.Content>main content</Layout.Content>
            <Layout.Sider>right sidebar</Layout.Sider>
          </Layout>
          <Layout.Footer>footer</Layout.Footer>
        </Layout>
      }
    </div>
  </>
}

export default App;