import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound/NotFound';
import SignIn from '../pages/SignIn/SignIn';
import CreateAccountForm from '../pages/Register/CreateAccountForm';
import Shop from '../pages/Shop/Shop';
import About from '../pages/About/About';
import Blog from '../pages/blog';
import Contact from '../pages/Contact';
import CartPage from '../pages/CartPage/CartPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import Checkout from '../pages/Checkout/Checkout';
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess';
import Orders from '../pages/Orders/Orders';
import OrderDetails from '../pages/OrderDetails/OrderDetails';
import Wishlist from '../pages/Wishlist/Wishlist';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import ProductForm from '../pages/AdminDashboard/ProductForm';
import AdminOrders from '../pages/AdminOrders/AdminOrders';

export default function AppRouter() {
  const { isAdmin, isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<CreateAccountForm />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route
        path="/order-success/:orderId"
        element={<OrderSuccess />}
      />
      <Route path="/orders" element={<Orders />} />
      <Route
        path="/order-details/:orderId"
        element={<OrderDetails />}
      />
      <Route path="/wishlist" element={<Wishlist />} />

      {isAdmin && isAuthenticated && (
        <>
          <Route
            path="/admin/products"
            element={<AdminDashboard />}
          />
          <Route
            path="/admin/products/new"
            element={<ProductForm />}
          />
          <Route
            path="/admin/products/:id/edit"
            element={<ProductForm />}
          />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
