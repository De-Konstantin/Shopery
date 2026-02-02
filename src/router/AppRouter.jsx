import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound/NotFound';
import SignIn from '../pages/SignIn/SignIn';
import CreateAccountForm from '../pages/Register/CreateAccountForm';
import Shop from '../pages/Shop/Shop';
import About from '../pages/About/About';
import Blog from '../pages/blog';
import Contact from '../pages/Contact';
import Product from '../pages/Product';
import CartPage from '../pages/CartPage/CartPage';
import ProductPage from '../pages/ProductPage/ProductPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/CreateAccount" element={<CreateAccountForm />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
