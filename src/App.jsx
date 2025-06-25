import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import './styles/globals.scss';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
