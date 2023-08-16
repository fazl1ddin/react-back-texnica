import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import configStyles from './Config/config.styles.cjs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        colorPrimary: configStyles.defaultColorBg,
      }}
      
    >
      <App/>
    </ConfigProvider>
  </React.StrictMode>
)