import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import './styles/globals.scss';

import Header from './layouts/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
