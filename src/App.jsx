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
      loading ? <BaseLoader width={'100%'} height={'100vh'} circlewidth={200} circleHeight={200} /> :
      user === undefined ? 
        <RouterProvider fallbackElement={<BaseLoader
          width={"100%"}
          height={"100vh"}
          circlewidth={200}
          circleHeight={200}
        />} router={public_routes} />
        :
        <Layout>
          <Layout.Sider className='fixed left-0 top-0 h-full' width={'24rem'}>
          </Layout.Sider>
          <Layout.Content className='ml-96 p-2 h-screen'>main content</Layout.Content>
        </Layout>
    }
  </>
}

export default App;