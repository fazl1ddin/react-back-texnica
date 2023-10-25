import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import "antd/dist/reset.css"
import './index.css';
import configStyles from './Config/config.styles.js';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        colorPrimary: configStyles.defaultColorBg,
        token: {
          colorTextDisabled: configStyles.defaultDisabledColor,
        },
        components: {
          Switch: configStyles.Switch
        }
      }}
    ><QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
)