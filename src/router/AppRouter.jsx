import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound/NotFound';
import SignIn from '../pages/SignIn/SignIn';
import CreateAccountForm from '../pages/Register/CreateAccountForm';
import Shop from '../pages/Shop';
import About from '../pages/About/About';
import Blog from '../pages/blog';
import Contact from '../pages/Contact';
import Product from '../pages/Product';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/CreateAccount" element={<CreateAccountForm />} />
      <Route path="/product/:id" element={<Product />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
