import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SharedLayout from '../SharedLayout';
import Main from '../../pages/Main';
import Products from '../../pages/Products';
import ItemPage from '../../pages/ItemPage';
import Cart from '../../pages/Cart';
import Admin from '../../pages/Admin';
import NotFound from '../../pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Main />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productURL" element={<ItemPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="admin" element={<Admin />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
