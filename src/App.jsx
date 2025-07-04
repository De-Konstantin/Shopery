import 'modern-css-reset';
import './styles/globals.scss';

import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';

import Header from './widgets/Header/Header';
import Footer from './widgets/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <AppRouter />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
