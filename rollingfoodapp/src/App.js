import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Error404 } from './layout/error404/Error404';
import { Menu } from './layout/menu/Menu';
import { Login } from './layout/login/Login';
import { Register } from './layout/register/Register';
import { Orders } from './layout/orders/Orders';
import { About } from './layout/about/About';
import { FooterRolling } from './layout/footer/FooterRolling';
import { Admin } from './layout/admin/Admin';
import { AdminUsers } from './layout/admin/AdminUsers';
import { AdminProducts } from './layout/admin/AdminProducts';
import { AdminOrders } from './layout/admin/AdminOrders';
// import { PrivateRoutes } from './routes/PrivateRoutes';
import { DataProvider } from './context/DataContext';
import { Navbar } from './layout/navbar/Navbar';
import { Routes, Route,} from 'react-router-dom';

function App() {
  return (
      <DataProvider>
            <>
                  <Navbar/>
                        <main>
                              <Routes>
                                    <Route path='/' element={<Menu />} />
                                    <Route path='menu' element={<Menu />} />
                                    <Route path='orders' element={<Orders />} />
                                    <Route path='about'  element={<About />} />
                                    <Route path='login'  element={<Login />} />
                                    <Route path='register'element={<Register />} />
                                    <Route path='admin' element={<Admin />}>
                                          <Route path='users' element={<AdminUsers />} />
                                          <Route path='products' element={<AdminProducts />} />
                                          <Route path='orders' element={<AdminOrders />} />
                                    </Route>
                                    <Route path='*' element={<Error404 />} />
                              </Routes>
                        </main>
                        <FooterRolling />
            </>   
      </DataProvider>
  );
}

export default App;
