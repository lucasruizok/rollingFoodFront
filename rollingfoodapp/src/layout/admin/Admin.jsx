import React from 'react';
import './admin.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';

//Pages
import { SideBarAdmin } from './SideBarAdmin';
import { AdminUsers } from './AdminUsers';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';


export const Admin = () => {
  const { Content, Sider } = Layout;

  return (
    <div>
      <Layout>
        <Sider className='siderAdmin'>
          <SideBarAdmin />
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route
                path='users'
                element={<AdminUsers />} />
              <Route
                path='products'
                element={<AdminProducts />} />
              <Route
                path='orders'
                element={<AdminOrders />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
