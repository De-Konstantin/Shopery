import 'modern-css-reset';
import './styles/globals.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import Header from './widgets/Header/Header';
import Footer from './widgets/Footer/Footer';
import { CartProvider } from 'react-use-cart';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <main className="main">
              <AppRouter />
            </main>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
