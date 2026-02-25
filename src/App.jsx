import 'modern-css-reset';
import './styles/globals.scss';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import { AuthProvider } from './contexts/AuthContext'; // ← ДОБАВИТЬ

import AppRouter from './router/AppRouter';
import Header from './widgets/Header/Header';
import Footer from './widgets/Footer/Footer';

function App() {
  return (
    <AuthProvider> {/* ← ДОБАВИТЬ */}
      <CartProvider>
        <BrowserRouter>
          <Header />
          <main className="main">
            <AppRouter />
          </main>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider> {/* ← ДОБАВИТЬ */}
  );
}

export default App;