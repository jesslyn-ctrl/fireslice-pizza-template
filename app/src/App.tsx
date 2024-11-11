import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from './routes/ProtectedRoute';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"
import CartPage from './pages/Cart';
import ProductDetailPage from './pages/ProductDetail';
import AdvancedSearchPage from './pages/AdvancedSearch';
import MyProfilePage from './pages/MyProfile';

const App = () => {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          {/* Protected Cart route */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          {/* Protected My Profile route*/}
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<AdvancedSearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App
