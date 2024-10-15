import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Product } from '@/pages/product';
import { Category } from '@/pages/category';
import { Home } from '@/pages/home';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Product />} />
        <Route path="categories" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
